import { Post } from "@/lib/model/db/Post"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const PostCardComponent = ({ post } : { post: Post}) => {
    return (
        <Card className={`mb-4`}>
            <CardHeader>
                <CardTitle>
                    {post.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className={`m-4`}>
                    {post.content}
                </div>
            </CardContent>
        </Card>
    )
}

export { PostCardComponent }