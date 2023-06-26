import ReactMarkdown from "react-markdown";
import '@/styles/markdown.css'

const MarkdownComponent = ({ content } : { content: string }) => {
    return (
        <div className="my-4 p-4 border-md bg-white">
            <ReactMarkdown sourcePos={true} className="markdown-body">
                {content}
            </ReactMarkdown>
        </div>
    )
}

export default MarkdownComponent;