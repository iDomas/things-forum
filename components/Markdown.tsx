import ReactMarkdown from "react-markdown";
import '@/styles/markdown.css'

const MarkdownComponent = ({ content } : { content: string }) => {
    return (
        <div className="my-1 p-1 border-md bg-white w-full">
            <ReactMarkdown className="markdown-body">
                {content}
            </ReactMarkdown>
        </div>
    )
}

export default MarkdownComponent;