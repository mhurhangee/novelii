import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Editor } from "@tiptap/react";
import {
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  CheckIcon,
  ChevronDownIcon,
} from "lucide-react";

const alignItems = [
  {
    name: "Left",
    icon: AlignLeftIcon,
    command: (editor: Editor) =>
      editor.chain().focus().setTextAlign("left").run(),
    isActive: (editor: Editor) => editor.isActive({ textAlign: "left" }),
  },
  {
    name: "Center",
    icon: AlignCenterIcon,
    command: (editor: Editor) =>
      editor.chain().focus().setTextAlign("center").run(),
    isActive: (editor: Editor) => editor.isActive({ textAlign: "center" }),
  },
  {
    name: "Right",
    icon: AlignRightIcon,
    command: (editor: Editor) =>
      editor.chain().focus().setTextAlign("right").run(),
    isActive: (editor: Editor) => editor.isActive({ textAlign: "right" }),
  },
];

export function TextAlignSelector({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const active = alignItems.find((i) => i.isActive(editor)) ?? alignItems[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 rounded-none border-none">
          <active.icon className="size-4" />
          <ChevronDownIcon className="size-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-1" align="start">
        {alignItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center cursor-pointer rounded-md px-2 py-1.5 text-sm hover:bg-accent"
            onClick={() => {
              item.command(editor);
              setOpen(false);
            }}
          >
            <item.icon className="size-4 me-2" />
            <span>{item.name}</span>
            <div className="flex-1" />
            {item.isActive(editor) && <CheckIcon className="size-4 ms-2" />}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
