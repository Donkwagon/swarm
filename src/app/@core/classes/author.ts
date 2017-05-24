export class Author {
    
    _id?: string;

    displayName: String;
    username: String;
    displayImage: String;
    
    numArticles: Number;
    numPremiumArticles: Number;
    numBlogPosts: Number;
    numComments: Number;
    numStockTalks: Number;
    numFollowers: Number;
    NumFollowings: Number;

    bio: String;
    bioTags: String;
    RSSFeedUrl: String;
    contributorSince: Number;

    links: any;

    created_at: Date;
    updated_at: Date;

    constructor(){
    }
}