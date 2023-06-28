import { FieldValue } from "firebase/firestore";

export interface DbPost extends Post {
    createdAt: FieldValue;
    updatedAt: FieldValue;
}

export interface Post {
    id?: string;
    title: string;
    content: string;
    author: string;
    authorUid: string;
    topics: string[];
}
