
var mongoose =    require('mongoose');
var request =     require('request');
var cheerio =     require('cheerio');

var Author =      require('../content/author.model');
var Article =     require('../content/article.model');
var Backlog =     require('./backlog.model');

var Schema = mongoose.Schema;

var BacklogArchiveSchema = new Schema({

    backlogID: { type: String, required: true, unique: false },
    type: String,
    url:  { type: String, required: true, unique: true },
    content: Schema.Types.Mixed,
    siteUrl: String,
    strategy: Schema.Types.Mixed,
    status: String,

    created_at: Date,
    updated_at: Date
    
});

BacklogArchiveSchema.methods.renew = function() {
    this.status = null;
    
    backlog = new Backlog({
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

    backlog.save();

    this.remove({ backlogID: this.backlogID }, function (err) {
        if (err) return handleError(err);
        else{
            console.log("renewed and removed backlog archive");
        }
    });
};


var BacklogArchive = mongoose.model('BacklogArchive', BacklogArchiveSchema);

module.exports = BacklogArchive;