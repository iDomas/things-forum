import { FieldValue } from "firebase/firestore";

export interface DbPost extends Post {
    createdAt: FieldValue;
    updatedAt: FieldValue;
}

export interface Post {
    title: string;
    content: string;
    topics: string[];
}
