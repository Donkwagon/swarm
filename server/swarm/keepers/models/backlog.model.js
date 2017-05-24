
var mongoose =    require('mongoose');
var request =     require('request');
var cheerio =     require('cheerio');

var chalk =       require('chalk');
var Author =      require('./author.model');
var Log =         require('./log.model');

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
  console.log("fetching.......");
  if (this.url){
      var URL = "https://seekingalpha.com" + this.url + "#regular_articles";
      console.log(URL);
      var UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36';
      
      this.webpageOpener(URL,UserAgent);
  }
};

backlogSchema.methods.webpageOpener = function (URL,UserAgent) {
    console.log("opening............");
    console.log(URL);
    
    req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});
    req.get({url: URL,headers: {'User-Agent': UserAgent}},(error, response, html) =>{
        if(error||response.statusCode != 200){
            console.log(chalk.red('error:' + error));
            console.log(response);
            console.log(chalk.red("status:" + response.statusCode));
        }else{
            console.log(chalk.green("status" + response.statusCode));
            this.webpageTetacles(html,URL);
        }
    });
}

backlogSchema.methods.webpageTetacles = function (html,URL) {
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
    console.log(author);

    saveAuthor(author);

}

saveAuthor = function (author) {
    
    Author.find({"username" : author.username}, function (err, docs) {
        if (!docs.length){
            author.save(function(err){
                if (err) throw err;
                console.log(chalk.green("Saved"));
                var log = new Log({
                    message: author.displayName,
                    level: 1,
                    status: 200,
                    subject: "Article Url",
                    action: "Save",

                    created_at: new Date()
                });
                log.pushToFirebaseDb(log);
            });
        }else{
            console.log(chalk.yellow("Author already exist!"));
            // author._id = docs[0]._id;
            // docs[0] = author;
            // docs[0].update(function(err){
            //     if (err) throw err;
            //     console.log(chalk.green("Updated"));
            //     var log = new Log({
            //         message: author.displayName,
            //         level: 1,
            //         status: 200,
            //         subject: "Article Url",
            //         action: "Save",

            //         created_at: new Date()
            //     });
            //     log.pushToFirebaseDb(log);
            // });
        }
    });

}



var Backlog = mongoose.model('Backlog', backlogSchema);

module.exports = Backlog;