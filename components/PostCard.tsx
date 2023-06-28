import { DbPost } from "@/lib/model/db/Post"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { millisToDateString, previewInit } from "@/lib/utils"
import MarkdownComponent from "./Markdown"
import Link from "next/link"

const PostCardComponent = ({ post } : { post: DbPost}) => {

    return (
        <Card className={`mb-4 w-full`}>
            <CardHeader>
                <CardTitle>
                    {post.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                    <div>
                        <MarkdownComponent content={previewInit(post.content)}></MarkdownComponent>
                    </div>
                    <div className={`flex justify-between`}>
                        <span>
                            <Link href={`/posts/${post.id}`}>
                                Read...
                            </Link>
                        </span>
                        <span className="text-sm text-muted-foreground pt-4">
                            { post.createdAt &&
                                millisToDateString(post.createdAt)
                            }
                        </span>
                    </div>
            </CardContent>
        </Card>
    )
}

export { PostCardComponent }