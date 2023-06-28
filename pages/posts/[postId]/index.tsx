import MarkdownComponent from "@/components/Markdown";
import { db } from "@/lib/firebase";
import { DbPost } from "@/lib/model/db/Post";
import { useUserData } from "@/lib/userContext";
import { mapPost, millisToDateString } from "@/lib/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PostPage = ({ }) => {
    const { query } = useRouter();
    const [post, setPost] = useState<DbPost>();
    const { userContext } = useUserData();

    useEffect(() => {
        const retirevePost = async () => {
            if (query.postId && userContext.uid) {
                // fetch post
                const postDoc = await db.collection(`/posts/user/${userContext.uid}`).doc(query.postId as string).get();  
                if (postDoc.exists) {
                    setPost(mapPost(postDoc));
                }
            }
        }

        retirevePost();
    }, [query.postId, userContext.uid])

    return (
        <main className={`flex flex-col h-full w-full container mx-auto justify-center`}>
            <div className={`pt-8`}>
                <div className={`sm:px-16 flex flex-col items-center`}>
                    <h2 className="text-3xl font-bold tracking-tight mb-4">{post?.title}</h2>
                    <div className={`flex justify-between my-4 w-2/4`}>
                        <span className={`text-sm text-muted-foreground pt-4`}>
                            { post?.author && (
                                post.author
                            )}
                        </span>
                        <span className={`text-sm text-muted-foreground pt-4`}>
                            { post?.createdAt && (
                                    millisToDateString(post.createdAt)
                                )
                            }
                        </span>
                    </div>
                </div>
            </div>
            <div className={`flex flex-col items-center h-full`}>
                <div className={`flex-1 h-full md:w-3/4`}>
                    <MarkdownComponent content={post?.content ?? ""}></MarkdownComponent>
                </div>
            </div>
        </main>
    )
};

export default PostPage;

