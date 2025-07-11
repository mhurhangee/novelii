import { FileText, Newspaper, MessageCircle, Mail, FileBarChart, ClipboardList, PenLine, Star, BookOpen, HelpCircle, FileSignature, MoveDown, StickyNote, MessageSquareDashed, Film, Table } from 'lucide-react'
import { GenericSelector } from './generic-selector'
import type { aiSettings } from '../editor'

const documentTypeOptions = [
    { label: "General", value: "general2", icon: FileText, prompt: "Write as a general document." },
    { label: "Blog Post", value: "blog", icon: FileText, prompt: "Write as a blog post." },
    { label: "Article", value: "article", icon: Newspaper, prompt: "Write as an article." },
    { label: "Social Media Post", value: "social", icon: MessageCircle, prompt: "Write as a social media post." },
    { label: "Email", value: "email", icon: Mail, prompt: "Write as an email." },
    { label: "Report", value: "report", icon: FileBarChart, prompt: "Write as a formal report." },
    { label: "Proposal", value: "proposal", icon: ClipboardList, prompt: "Write as a proposal." },
    { label: "Letter", value: "letter", icon: PenLine, prompt: "Write as a letter." },
    { label: "Review", value: "review", icon: Star, prompt: "Write as a review." },
    { label: "Story", value: "story", icon: BookOpen, prompt: "Write as a story." },
    { label: "Whitepaper", value: "whitepaper", icon: FileText, prompt: "Write as a whitepaper." },
    { label: "Q&A / Interview", value: "qa", icon: HelpCircle, prompt: "Present as a Q&A or interview." },
    { label: "Case Study", value: "case_study", icon: FileSignature, prompt: "Present as a case study." },
    { label: "Step-by-Step Guide", value: "guide", icon: MoveDown, prompt: "Write as a step-by-step guide." },
    { label: "Memo", value: "memo", icon: StickyNote, prompt: "Write as a memo." },
    { label: "Dialogue", value: "dialogue", icon: MessageSquareDashed, prompt: "Write as a dialogue." },
    { label: "FAQ", value: "faq", icon: HelpCircle, prompt: "Present as a FAQ." },
    { label: "Script", value: "script", icon: Film, prompt: "Write as a script." },
    { label: "Table/Chart", value: "table_chart", icon: Table, prompt: "Present information in tables or charts." },
  ];

export function DocumentTypeSelector({ aiSettings, setAiSettings }: { aiSettings: aiSettings, setAiSettings: (aiSettings: aiSettings) => void }) {
  return (
    <GenericSelector
      value={aiSettings.documentType}
      onChange={(val, field) => setAiSettings({ ...aiSettings, [field]: val })}
      options={documentTypeOptions}
      label="Document type"
      field="documentType"
    />
  )
}
