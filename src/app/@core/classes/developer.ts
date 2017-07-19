export class Developer {
    
    _id?: string;
    uid: string;
    displayName: string;
    enabled: boolean;
    username: string;
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

    oldPassword: string;
    password: string;

    apiKey: string;
    authDomain: string;

    created_at: Date;
    updated_at: Date;

    acitivities: any[];

    constructor(){
        this.uid = null;
        this.displayName = null;
    }
}
