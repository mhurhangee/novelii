import {
  BookOpenCheck,
  FileText,
  HelpCircle,
  Info,
  Lightbulb,
  MailQuestion,
  Megaphone,
  MessageSquareWarning,
  Music,
  ThumbsUp,
} from 'lucide-react'

import type { aiSettings } from '../editor'
import { GenericSelector } from './generic-selector'

const purposeOptions = [
  { label: 'Inform', value: 'inform', icon: Info, prompt: 'Write to inform the reader.' },
  { label: 'Persuade', value: 'persuade', icon: ThumbsUp, prompt: 'Write to persuade the reader.' },
  { label: 'Entertain', value: 'entertain', icon: Music, prompt: 'Write to entertain the reader.' },
  {
    label: 'Instruct',
    value: 'instruct',
    icon: BookOpenCheck,
    prompt: 'Write to instruct or teach the reader.',
  },
  { label: 'Explain', value: 'explain', icon: HelpCircle, prompt: 'Write to explain a topic.' },
  { label: 'Advise', value: 'advise', icon: Lightbulb, prompt: 'Write to give advice.' },
  { label: 'Request', value: 'request', icon: MailQuestion, prompt: 'Write to make a request.' },
  {
    label: 'Announce',
    value: 'announce',
    icon: Megaphone,
    prompt: 'Write to make an announcement.',
  },
  { label: 'Summarize', value: 'summarize', icon: FileText, prompt: 'Write a summary.' },
  {
    label: 'Critique',
    value: 'critique',
    icon: MessageSquareWarning,
    prompt: 'Write a critique or analysis.',
  },
]

export function PurposeSelector({
  aiSettings,
  setAiSettings,
}: {
  aiSettings: aiSettings
  setAiSettings: (aiSettings: aiSettings) => void
}) {
  return (
    <GenericSelector
      value={aiSettings.purpose}
      onChange={(val, field) => setAiSettings({ ...aiSettings, [field]: val })}
      options={purposeOptions}
      label="Purpose"
      field="purpose"
    />
  )
}
