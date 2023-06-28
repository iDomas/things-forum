import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { DbPost } from "./model/db/Post";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const createIdFromTitle = (title: string): string => {
  const strs = title.split(/\s+/);
  const re = /[^A-Za-z0-9]/g;
  const santiziedStrs = strs.map((str) => str.replace(re, '')).filter((str) => str.length > 0);
  return santiziedStrs.join('-').toLowerCase();
}


const millisToDateString = (millis: any): string => {
  return new Date(millis).toISOString().split('T')[0].replace(/-/g, '/');
}

const previewInit = (content: string): string => {
  const canCut = content.length > 200;
  const slicedContent = content.slice(0, canCut ? 200 : content.length);
  return canCut ? slicedContent + '...' : slicedContent;
}

const mapPost = (doc: any): DbPost => {
  const data = doc.data();
  return {
      id: data.id,
      title: data.title,
      content: data.content,
      topics: data.topics,
      author: data.author || 'Unknown',
      createdAt: data.createdAt.toMillis(),
      updatedAt: data.updatedAt.toMillis()
  }
}

export { 
  createIdFromTitle,
  millisToDateString,
  previewInit,
  mapPost,
}