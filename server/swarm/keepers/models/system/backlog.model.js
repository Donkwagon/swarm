
var mongoose =    require('mongoose');
var request =     require('request');
var cheerio =     require('cheerio');

var Author =      require('../content/author.model');
var Article =     require('../content/article.model');
var Log =         require('./log.model');
var BacklogArchive =     require('./backlog_archive.model');

var chalk =       require('chalk');

var Schema = mongoose.Schema;

var BacklogSchema = new Schema({

    backlogID: { type: String, required: true, unique: false },
    articleId: Number,
    type: String,
    url:  { type: String, required: true, unique: true },
    content: Schema.Types.Mixed,
    siteUrl: String,
    strategy: Schema.Types.Mixed,
    status: String,

    created_at: Date,
    updated_at: Date
    
});

BacklogSchema.methods.crawl = function() {
    
  if (this.url){

      if(this.type == 'author'){var URL = 'https://seekingalpha.com' + this.url + '#regular_articles';}
      if(this.type == 'article'){var URL = 'https://seekingalpha.com' + this.url + '#regular_articles';}

      var UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36';
      
      this.requestWebpage(URL,UserAgent);
  }
};

BacklogSchema.methods.requestWebpage = function (URL,UserAgent) {
    
    req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});

    req.get({url: URL,headers: {'User-Agent': UserAgent}},(error, response, html) =>{

        if(error||response.statusCode != 200){

            console.log(chalk.red('error:' + error + 'status:' + response.statusCode));
            console.log(response);

            var log = new Log({
                message: 'Request Error' + response.statusCode + URL,
                subject: 'Request Response',
                level: 2,status: response.statusCode,action: 'Request',
                created_at: new Date()
            });
            
            log.pushToFirebaseDb(log);
            log.save();

        }else{

            console.log(chalk.green('status' + response.statusCode));

            this.processWebpage(html,URL);
            

            var log = new Log({
                message: 'Request OK' + response.statusCode + URL,
                subject: 'Request Response',
                level: 2,status: response.statusCode,action: 'Request',
                created_at: new Date()
            });
            
            log.pushToFirebaseDb(log);
            log.save();

        }
    });
};

BacklogSchema.methods.processWebpage = function (html,URL) {
    
    if(this.type == 'autor'){var data = this.htmlToData_author(html,URL);}
    if(this.type == 'article'){var data = this.htmlToData_article(html,URL);}
    
    this.saveData(data);

    var log = new Log({
        message: 'Parse' + data.title,
        subject: 'Info',
        level: 1,status: 200,action: 'Parse',
        created_at: new Date()
    });
    
    log.pushToFirebaseDb(log);
    log.save();

};

BacklogSchema.methods.saveData = function (data) {

    if(this.type == "author"){
        Author.find({'username' : data.username}, function (err, docs) {
            if (!docs.length){
                data.save(function(err){
                    if (err) throw err;
                    console.log(chalk.green('Saved'));
                    var log = new Log({
                        message: data.displayName,
                        level: 1,
                        status: 200,
                        subject: 'Author',
                        action: 'Save',

                        created_at: new Date()
                    });
                    log.pushToFirebaseDb(log);
                    log.save();
                });
            }else{
                console.log(chalk.yellow('Author already exist!'));
            }
        });//
                
    };

    if(this.type == "article"){
    
        Article.find({'articleId' : data.articleId}, function (err, docs) {
            if (!docs.length){
                data.save(function(err){

                    if (err) throw err;

                    console.log(chalk.green('Article Saved'));

                    var log = new Log({
                        message: 'saved' + data.title,
                        subject: 'Article Info',
                        level: 1,status: 200,action: 'Save',
                        created_at: new Date()
                    });
                    
                    log.pushToFirebaseDb(log);
                    log.save();
                });
            }else{
                console.log(chalk.yellow('article already exist!'));
            }
        });
    }
};



BacklogSchema.methods.archive = function() {
    this.status = "fetched";
    
    backlogArchive = new BacklogArchive({
        backlogID: this.backlogID,
        type: this.type,
        url:  this.url,
        content: this.content,
        siteUrl: this.siteUrl,
        strategy: this.strategy,
        status: this.status,

        created_at: this.created_at,
        updated_at: new Date()
    })

    backlogArchive.save();

    this.remove({ backlogID: this.backlogID }, function (err) {
        if (err) return handleError(err);
        else{
            console.log("archived and removed backlog");
        }
    });
};

///////////////////////////////////////////////////////////////////////////////
//backlog article parsing
///////////////////////////////////////////////////////////////////////////////

BacklogSchema.methods.htmlToData_article = function (html,URL) {
    //page parsing logic
    //takes html and return desired data

    var $ = cheerio.load(html);

    /////////////////////////////////////////////////////////////////////////////////
    //Data values of interest
    var title = $('h1','.sa-art-hd ').text();
    var author = $('span','.name-link').text();
    var primaryStock = null;
    var username = null;
    var articleId = null;
    
    var include_stocks = [];
    var summary = [];
    var publish_at = $('time').attr('content');

    if($('.name-link').attr("href")){
        console.log(URL);
        temp = $('.name-link').attr("href").split('/');
        len = temp.length;
        console.log(temp);
        username = temp[len - 2];
        console.log(username)
    }

    if(URL.split('article/')[1]){
        var articleId = URL.split('article/')[1].split('-')[0];
    }
    
    $('meta').each(function(i, el) {
        //asssuming the first two key words in this meta tag is always ticker and security name for article page
        if($(this).attr('name') == 'news_keywords'){
            primaryStock = {
                symbol:$(this).attr('content').split(', ')[0],
                securityName:$(this).attr('content').split(', ')[1]
            };  
        }
    });
    
    $('p','.article-summary').each(function(i, el) {
        var text = $(this).text();
        summary.push(text);
    });

    if($('a','#about_stocks')){
        $('a','#about_stocks').each(function(i, el) {
            var includedStock = {
                symbol: $(this).text(),
                securityName : $(this).attr('title'),
            }
            include_stocks.push(includedStock);
            console.log(includedStock);
        });
    };

    var article = new Article({
        articleId: articleId,
        title: title,
        author: author,
        username: username,
        summary: summary,
        articleUrl: URL,
        includeStocks: include_stocks,
        primaryStock:primaryStock,

        published_at: publish_at,
        created_at: new Date()
    });
    
    return article;

};

BacklogSchema.methods.htmlToData_author = function (html,URL) {

    var $ = cheerio.load(html);

    /////////////////////////////////////////////////////////////////////////////////
    //Data values of interest
    var authorName = $('.about-author-name').text();
    var username = URL.split('author/')[1].split('/')[0];
    var displayImage = $('.author-avatar','.about-author-image').attr('src');

    var numArticles =         $('.profile-top-nav-count','.articles').text();
    var numPremiunArticles =  $('.profile-top-nav-count','.premium_articles').text();
    var numBlogPosts =        $('.profile-top-nav-count','.instablogs').text();
    var numComments =         $('.profile-top-nav-count','.comments').text();
    var numStockTalks =       $('.profile-top-nav-count','.stocktalks').text();
    var numFollowers =        $('.profile-top-nav-count','.followers').eq(0).text();
    var NumFollowings =       $('.profile-top-nav-count','.following').eq(0).text();

    var bio = $('.about-author-desc').eq(0).attr('data-bio');
    var bioTags = $('#sticky-bio-tags').text();
    var contributorSince = $('.about-member-since').children().last().text();

    var authorCompany = $('.about-company').children().last().text();

    var personal_url = $('#personal_url').attr('href');
    var twitter = $('#twitter').attr('href');
    var linked_in = $('#linked_in').attr('href');
    var rss_link = $('#rss_link').attr('href');

    var RSSFeedUrl = $('#rss_link').attr('href');

    /////////////////////////////////////////////////////////////////////////////////
    //Create new backlog for article and save if it doesn't exist in backlogs list
    var author = new Author({
        displayName: authorName,
        username: username,
        displayImage: displayImage,
        
        numArticles: numArticles,
        numPremiumArticles: numPremiunArticles,
        numBlogPosts: numBlogPosts,
        numComments: numComments,
        numStockTalks: numStockTalks,
        numFollowers: numFollowers,
        NumFollowings: NumFollowings,

        bio: bio,
        bioTags: bioTags,
        RSSFeedUrl: RSSFeedUrl,
        contributorSince: contributorSince,

        links:{
          'personal_url':personal_url,
          'twitter':twitter,
          'linked_in':linked_in,
          'rss_link':rss_link,
        },

        created_at: new Date()
    });

    return author;

};

var Backlog = mongoose.model('Backlog', BacklogSchema);

module.exports = Backlog;