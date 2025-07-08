import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Heading1, Heading2, Heading3, LetterTextIcon } from "lucide-react";

export function HeaderButtons({ editor }: { editor: Editor }) {
  if (!editor) return null;

  const items = [
    {
      name: "Text",
      icon: LetterTextIcon,
      onClick: () => editor.chain().focus().setParagraph().run(),
      isActive: editor.isActive("paragraph"),
    },
    {
      name: "H1",
      icon: Heading1,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      name: "H2",
      icon: Heading2,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      name: "H3",
      icon: Heading3,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
    },
  ];

  return (
    <div className="flex gap-1">
      {items.map((item) => (
        <Button
          key={item.name}
          variant={item.isActive ? "default" : "ghost"}
          size="icon"
          onClick={item.onClick}
        >
          <item.icon className="size-4" />
        </Button>
      ))}
    </div>
  );
}
