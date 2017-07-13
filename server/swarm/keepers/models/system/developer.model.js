
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var developerSchema = new Schema({

    displayName: String,
    username: { type: String, required: true, unique: true },
    displayImage: String,

    uid: String,
    displayName: String,
    username: String,
    password: String,
    photoURL : String,
    email: String,
    emailVerified: String,
    phoneNumber: String,
    isAnomymous: Boolean,

    acitivities: Schema.Types.Mixed,

    providerData: {
        uid: string,
        displayName: string,
        photoURL: string,
        email: string,
        providerId: string
    }[],

    apiKey: String,
    authDomain: String,

    created_at: Date,
    updated_at: Date,
});


var Developer = mongoose.model('Developer', developerSchema);

module.exports = Developer;