import { Brain, Expand, Pen, Play, Scissors, SpellCheck } from 'lucide-react'

export const bubbleMenuOptions = [
  {
    label: 'Improve',
    value: 'improve',
    icon: Brain,
  },
  {
    label: 'Summarize',
    value: 'summarize',
    icon: Pen,
  },
  {
    label: 'Expand',
    value: 'expand',
    icon: Expand,
  },
  {
    label: 'Shorten',
    value: 'shorten',
    icon: Scissors,
  },
  {
    label: 'Fix grammar',
    value: 'fix-grammar',
    icon: SpellCheck,
  },
  {
    label: 'Continue',
    value: 'continue',
    icon: Play,
  },
]
