const express = require('express');
const SA_A_LIST = express.Router();

var request = require('request');
var cheerio = require('cheerio');

var SITES_COLLECTION = "sites";
var BACKLOG_COLLECTION = "backlogs";

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//The get method takes sitemap entrance information and organize it into two data structure
//1. Site
//   Nested object that uses the nesting logic from the site's sitemap
//2. Entrance
//   Flat array of entrances. Entance is an object that contains entrance url, site name, site info etc..
//   Flat array of entrances is more ideal for implementing clawling and status reporting.
///////////////////////////////////////////////////////////////////////////////////////////////////////////

SA_A_LIST.get('/', function(req, res){

    var posts = [];

    var url = 'http://seekingalpha.com/stock-ideas/long-ideas';//flat array of entrance

    req = request.defaults({jar: true,rejectUnauthorized: false,followAllRedirects: true});
    req.get({url: url,headers: {
            'Cookie':"__gads=ID=4610b0fd69019757:T=1488741936:S=ALNI_MbsfaMe7umrltyl9wo5GvuJvTXrow; __ar_v4=%7CPS3JYG2QRBED3JJ3FSXN76%3A20170304%3A1%7CO3F6HTRPDRGLTFQD5DB4VR%3A20170304%3A1%7CURYLQLHAZNA2XLUVFXEP7S%3A20170304%3A1; __qca=P0-148037005-1492540929727; _igur=https://seekingalpha.com/symbol/AMD?s=amd; bknx_fa=1493835341045; _igt=b963daf0-36b7-46e8-cf9b-18214f11b05b; _igsr=https://seekingalpha.com/insight/global-investing/map; portfolio_sort_type=a_z; u_voc=38%2C56%2C39%2C30; ptac=; marketplace_author_slugs=; a_t=11kd3t%3A1cgksqv%3A8e8b58eb88b2352b4d4958aada7fb57d; _igh=https%3A%2F%2Fseekingalpha.com%2Farticle%2F4067885-amd-drops-weak-earnings-report-investors-buy-now|https%3A%2F%2Fseekingalpha.com%2Farticle%2F4068655-tough-times-ahead-copper-etfs|https%3A%2F%2Fseekingalpha.com%2Farticle%2F4068690-drops-buy-part-2|https%3A%2F%2Fseekingalpha.com%2Farticle%2F4066817-top-3-industrial-reit-picks-april-2017|https%3A%2F%2Fseekingalpha.com%2Fnews%2F3264266-stocks-edge-higher-open-following-april-jobs-report|https%3A%2F%2Fseekingalpha.com%2Fnews%2F3264361-appfolio-beats-0_04-beats-revenue|https%3A%2F%2Fseekingalpha.com%2Fnews%2F3264356-mtge-investment-continues-nice-run-wells-fargo-upgrade|https%3A%2F%2Fseekingalpha.com%2Fnews%2F3264358-universal-display-zooms-24-percent-analysts-raise-targets|https%3A%2F%2Fseekingalpha.com%2Fnews%2F3264298-recode-deal-near-bring-amazon-video-app-onto-apple-tv|https%3A%2F%2Fseekingalpha.com%2Fnews%2F3264364-taitron-components-inc-declares-0_025-dividend; _ig_nump=19:2:0:16:0:14; _ig_sess=17:0:0; _ig=55877528-36e7-4a45-f816-d08462ee97c4; bknx_ss=1494035856979; __utmt=1; cto_sa=; machine_cookie=1641161774223; __utma=150447540.1253156709.1488741936.1494013978.1494035056.15; __utmb=150447540.14.9.1494036052296; __utmc=150447540; __utmz=150447540.1493855002.10.3.utmcsr=email.seekingalpha.com|utmccn=(referral)|utmcmd=referral|utmcct=/article/4067885/track; _sp_id=e1d10665-0d31-4758-8cfa-8e112b7e1295; _sp_ses=e004f92a-a755-4d9a-93aa-175521234dae; _px=8ns/WnAPILlRhBun6W8XOVPVbpjyYlRoECArwa+dWNfXAs5r0MTgfgDCCftYXqNrZSRY8F7GwT/kUKe66STc+w==:1000:xQXIrZvrdZ3gZ4GvQwOdtt2E5soCas3XTWDPy3pXOrhYaLx9sog8EMa1Dpos3MbvNZPZ/ejdxqIcwayvx12ojKMrJJ8DOb6FjTZu9FgADTMBAkCoKkyPJ+i7ariIXRAHB9kAPoXdWqUt0m16YYYDuHUTYWwFCb0bdohsM3OObb4FUjjH5Yq648Zu48sYQ90hQr4Zh/+QJZkA8XhdfxpLlPqfX1ryg35AbXEJDyF4Gg8hqUuXaIBMUtuHGL0Y9EtREejOqTnuqptq6FQUzaRsGA==",
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'
        }
    }, function(error, response, html){
        var $ = cheerio.load(html);
        $('li').filter('.article').each(function(i, el) {
            var post = {};
            post.title = $('.a-title',this).text();
            post.type = "article"
            
            post.url = $('.a-title',this).attr('href');
            post.authorDisplayImage = $('img','.media-left',this).attr('src');
            post.authorName = $('a','.a-info',this).eq(1).text();
            post.authorUsername = $('a','.a-info',this).eq(1).attr('href').split('/')[2];

            posts.push(post);

            // console.log("============================================================================");
            // console.log(post.title);
            // console.log(post.url);
            // console.log(post.authorDisplayImage);
            // console.log(post.authorName);
            // console.log(post.authorUsername);
        });
        
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        
        posts.forEach(post =>{
            post.createDate = new Date();
            db.collection(BACKLOG_COLLECTION).insertOne(post, function(err, doc) {
                console.log("inserted!");
                if (err) {handleError(res, err.message, "Failed to create new task.");} 
            });
        });
    });

})

module.exports = SA_A_LIST;