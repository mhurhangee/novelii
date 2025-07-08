import { useState } from "react"
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import type { Editor } from "@tiptap/react"

export function AiCommandMenu({ onSubmit, editor }: { onSubmit: (command: string) => void, editor: Editor | null }) {
    const [input, setInput] = useState("")

    const suggestions = [
        "Summarize this",
        "Expand",
        "Fix grammar",
        "Translate to French",
    ]

    function handleSelect(suggestion: string) {
        setInput(suggestion)
    }

    function handleButtonClick() {
        if (input.trim()) {
            onSubmit(input)
        }
    }

    if (!editor) {
        return null;
    }

    return (
        <>
            <CardHeader>
                <CardTitle>
                    Ask an AI
                </CardTitle>
                <CardDescription>
                    Select an option or send a custom prompt to the AI
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Command>
                    <CommandInput
                        placeholder="Type an AI command..."
                        value={input}
                        onValueChange={setInput}
                        onKeyDown={e => {
                            if (e.key === 'Enter') e.preventDefault() // prevent Enter submit
                        }}
                    />
                    <CommandList>
                        {suggestions.map((s) => (
                            <CommandItem key={s} value={s} onSelect={() => handleSelect(s)}>
                                {s}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </CardContent>
            <CardFooter>
                <div className="flex w-full justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={() => {
                            // Remove selection by setting the cursor at the end, should close the bubble menu
                            const endPos = editor.state.doc.content.size;
                            editor.chain().setTextSelection(endPos).run();
                            // Close bubble menu
                            editor.commands.blur();           
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="button" size="sm" onClick={handleButtonClick}>
                        Submit
                    </Button>
                </div>
            </CardFooter>
        </>
    )
}
