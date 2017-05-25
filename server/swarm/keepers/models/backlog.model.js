
var mongoose =    require('mongoose');
var request =     require('request');
var cheerio =     require('cheerio');

var chalk =       require('chalk');
var Author =      require('./author.model');
var Log =         require('./log.model');
var Article =     require('./article.model');

var Schema = mongoose.Schema;

var backlogSchema = new Schema({

  backlogID: { type: String, required: true, unique: false },
  type: String,
  url: String,
  content: Schema.Types.Mixed,
  siteUrl: String,
  strategy: Schema.Types.Mixed,
  status: String,

  created_at: Date,
  updated_at: Date
});

backlogSchema.methods.fetchAuthorInfo = function() {
    
  if (this.url){
      var URL = "https://seekingalpha.com" + this.url + "#regular_articles";
      var UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36';
      this.webpageOpener(URL,UserAgent);
  }
};

backlogSchema.methods.webpageOpener = function (URL,UserAgent) {
    
    req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});
    req.get({url: URL,headers: {'User-Agent': UserAgent}},(error, response, html) =>{
        if(error||response.statusCode != 200){
            console.log(chalk.red('error:' + error + "status:" + response.statusCode));
            console.log(response);

            var log = new Log({
                message: "Request Error" + response.statusCode + URL,
                subject: "Request Response",
                level: 2,status: response.statusCode,action: "Request",
                created_at: new Date()
            });
            
            log.pushToFirebaseDb(log);
        }else{
            console.log(chalk.green("status" + response.statusCode));
            this.webpageTetacles_author(html,URL);

            var log = new Log({
                message: "Request OK" + response.statusCode + URL,
                subject: "Request Response",
                level: 2,status: response.statusCode,action: "Request",
                created_at: new Date()
            });
            
            log.pushToFirebaseDb(log);
        }
    });
};

backlogSchema.methods.webpageTetacles_author = function (html,URL) {
    //page parsing logic
    //takes html and return desired data

    var $ = cheerio.load(html);

    /////////////////////////////////////////////////////////////////////////////////
    //Data values of interest
    var authorName = $(".about-author-name").text();
    var username = URL.split("author/")[1].split("/")[0];
    var displayImage = $(".author-avatar",".about-author-image").attr("src");

    var numArticles =         $(".profile-top-nav-count",".articles").text();
    var numPremiunArticles =  $(".profile-top-nav-count",".premium_articles").text();
    var numBlogPosts =        $(".profile-top-nav-count",".instablogs").text();
    var numComments =         $(".profile-top-nav-count",".comments").text();
    var numStockTalks =       $(".profile-top-nav-count",".stocktalks").text();
    var numFollowers =        $(".profile-top-nav-count",".followers").eq(0).text();
    var NumFollowings =       $(".profile-top-nav-count",".following").eq(0).text();

    var bio = $(".about-author-desc").eq(0).attr("data-bio");
    var bioTags = $("#sticky-bio-tags").text();
    var contributorSince = $(".about-member-since").children().last().text();

    var authorCompany = $(".about-company").children().last().text();

    var personal_url = $("#personal_url").attr("href");
    var twitter = $("#twitter").attr("href");
    var linked_in = $("#linked_in").attr("href");
    var rss_link = $("#rss_link").attr("href");

    var RSSFeedUrl = $("#rss_link").attr("href");

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
          "personal_url":personal_url,
          "twitter":twitter,
          "linked_in":linked_in,
          "rss_link":rss_link,
        },

        created_at: new Date()
    });
    console.log(author.username);

    this.saveAuthor(author);

    var log = new Log({
        message: "Parse" + author.username,
        subject: "Author Info",
        level: 1,status: 200,action: "Parse",
        created_at: new Date()
    });
    
    log.pushToFirebaseDb(log);

};

backlogSchema.methods.saveAuthor = function (author) {
    
    Author.find({"username" : author.username}, function (err, docs) {
        if (!docs.length){
            author.save(function(err){
                if (err) throw err;
                console.log(chalk.green("Saved"));
                var log = new Log({
                    message: author.displayName,
                    level: 1,
                    status: 200,
                    subject: "Author",
                    action: "Save",

                    created_at: new Date()
                });
                log.pushToFirebaseDb(log);
            });
        }else{
            console.log(chalk.yellow("Author already exist!"));
        }
    });

};

backlogSchema.methods.fetchArticleInfo = function() {
    
  if (this.url){
      var URL = "https://seekingalpha.com" + this.url + "#regular_articles";
      var UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36';
      this.webpageOpenerArticle(URL,UserAgent);
  }
};

backlogSchema.methods.webpageOpenerArticle = function (URL,UserAgent) {
    
    req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});
    req.get({url: URL,headers: {'User-Agent': UserAgent}},(error, response, html) =>{
        if(error||response.statusCode != 200){
            console.log(chalk.red('error:' + error + "status:" + response.statusCode));
            console.log(response);

            var log = new Log({
                message: "Request Error" + response.statusCode + URL,
                subject: "Request Response",
                level: 2,status: response.statusCode,action: "Request",
                created_at: new Date()
            });
            
            log.pushToFirebaseDb(log);
        }else{
            console.log(chalk.green("status" + response.statusCode));
            this.webpageTetacles_article(html,URL);

            var log = new Log({
                message: "Request OK" + response.statusCode + URL,
                subject: "Request Response",
                level: 2,status: response.statusCode,action: "Request",
                created_at: new Date()
            });
            
            log.pushToFirebaseDb(log);
        }
    });
};

backlogSchema.methods.webpageTetacles_article = function (html,URL) {
    //page parsing logic
    //takes html and return desired data

    var $ = cheerio.load(html);

    /////////////////////////////////////////////////////////////////////////////////
    //Data values of interest
    var title = $("h1",".sa-art-hd ").text();
    var username = $(".name-link").attr("href");
    var author = $("span",".name-link").text();
    var articleId = URL.split("article/")[1].split("-")[0];
    var summary = [];
    var publish_at = $("time").attr("content");

    
    $('p',".a-sum").each((i, el) => {
        summary.push($(this).text());
    });
    /////////////////////////////////////////////////////////////////////////////////
    //Create new backlog for article and save if it doesn't exist in backlogs list
    var article = new Article({
        articleId: articleId,
        title: title,
        author: author,
        summary: summary,
        articleUrl: URL,

        published_at: publish_at,
        created_at: new Date()
    });
    console.log(article.title);

    this.saveArticle(article);

    var log = new Log({
        message: "Parse" + article.title,
        subject: "Article Info",
        level: 1,status: 200,action: "Parse",
        created_at: new Date()
    });
    
    log.pushToFirebaseDb(log);

};

backlogSchema.methods.saveArticle = function (article) {
    
    Article.find({"articleId" : article.articleId}, function (err, docs) {
        if (!docs.length){
            article.save(function(err){

                if (err) throw err;

                console.log(chalk.green("Article Saved"));

                var log = new Log({
                    message: "saved" + article.title,
                    subject: "Article Info",
                    level: 1,status: 200,action: "Save",
                    created_at: new Date()
                });
                
                log.pushToFirebaseDb(log);
            });
        }else{
            console.log(chalk.yellow("article already exist!"));
        }
    });

};

var Backlog = mongoose.model('Backlog', backlogSchema);

module.exports = Backlog;