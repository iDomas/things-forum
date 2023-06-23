export interface Config {
    firebase: FirebaseConfig
}

export interface FirebaseConfig {
    apiKey: string | undefined;
    authDomain: string | undefined;
    projectId: string | undefined;
    storageBucket: string | undefined;
    messageSenderId: string | undefined;
    appId: string | undefined;
    measurementId: string | undefined;
}

