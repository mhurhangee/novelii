import {
  ArrowUpRight,
  BarChart2,
  BookOpen,
  Briefcase,
  Eye,
  Handshake,
  Heart,
  Laugh,
  Layers,
  Megaphone,
  MessageSquare,
  Minus,
  Scissors,
  ShieldCheck,
  Smile,
  ThumbsUp,
} from 'lucide-react'

import type { aiSettings } from '../editor'
import { GenericSelector } from './generic-selector'

const toneStyleOptions = [
  { label: 'Formal', value: 'formal', icon: ShieldCheck, prompt: 'Use a formal tone.' },
  { label: 'Informal', value: 'informal', icon: Smile, prompt: 'Use an informal tone.' },
  {
    label: 'Professional',
    value: 'professional',
    icon: Briefcase,
    prompt: 'Use a professional tone.',
  },
  { label: 'Friendly', value: 'friendly', icon: Handshake, prompt: 'Use a friendly tone.' },
  { label: 'Persuasive', value: 'persuasive', icon: ThumbsUp, prompt: 'Use a persuasive tone.' },
  { label: 'Neutral', value: 'neutral', icon: Minus, prompt: 'Use a neutral, objective tone.' },
  { label: 'Humorous', value: 'humorous', icon: Laugh, prompt: 'Use humor in the writing.' },
  { label: 'Empathetic', value: 'empathetic', icon: Heart, prompt: 'Use an empathetic tone.' },
  { label: 'Assertive', value: 'assertive', icon: Megaphone, prompt: 'Use an assertive tone.' },
  {
    label: 'Encouraging',
    value: 'encouraging',
    icon: ArrowUpRight,
    prompt: 'Use an encouraging tone.',
  },
  {
    label: 'Analytical',
    value: 'analytical',
    icon: BarChart2,
    prompt: 'Be analytical and logical.',
  },
  { label: 'Descriptive', value: 'descriptive', icon: Eye, prompt: 'Use descriptive language.' },
  { label: 'Concise', value: 'concise', icon: Scissors, prompt: 'Be concise and to the point.' },
  { label: 'Detailed', value: 'detailed', icon: Layers, prompt: 'Be detailed and thorough.' },
  {
    label: 'Conversational',
    value: 'conversational',
    icon: MessageSquare,
    prompt: 'Use a conversational style.',
  },
  { label: 'Storytelling', value: 'storytelling', icon: BookOpen, prompt: 'Tell a story.' },
]

export function ToneSelector({
  aiSettings,
  setAiSettings,
}: {
  aiSettings: aiSettings
  setAiSettings: (aiSettings: aiSettings) => void
}) {
  return (
    <GenericSelector
      value={aiSettings.tone}
      onChange={(val, field) => setAiSettings({ ...aiSettings, [field]: val })}
      options={toneStyleOptions}
      label="Tone"
      field="tone"
    />
  )
}
