
import { Editor } from "@tiptap/react";
import { NodeSelector } from "./selectors/node-selector";
import { Button } from "../ui/button";
import { TextButtons } from "./selectors/text-buttons";
import { TextAlignSelector } from "./selectors/text-align-selector";

interface DefaultBubbleMenuProps {
    editor: Editor | null,
    setIsAIOpen: (open: boolean) => void
}

export const DefaultBubbleMenu = ({ editor, setIsAIOpen }: DefaultBubbleMenuProps) => {
    if (!editor) return <>Editor not found</>;
    return (
        <div className="max-w-[95vw] w-fit box-border flex rounded-md border bg-background">
            <Button variant="default" className="rounded-l-md rounded-r-none" onClick={() => setIsAIOpen(true)}>
                AI
            </Button>
            <NodeSelector editor={editor} />
            <TextButtons editor={editor} />
            <TextAlignSelector editor={editor} />
        </div>
    )
}
