export class Developer {
    
    _id?: string;
    uid: string;
    displayName: string;
    username: string;
    password: string;
    photoURL : string;
    email: string;
    emailVerified: string;
    phoneNumber: string;
    isAnomymous: boolean;

    providerData: {
        uid: string,
        displayName: string,
        photoURL: string,
        email: string,
        providerId: string
    }[];

    apiKey: string;
    authDomain: string;

    created_at: Date;
    updated_at: Date;

    acitivities: any[];

    constructor(){
    }
}
