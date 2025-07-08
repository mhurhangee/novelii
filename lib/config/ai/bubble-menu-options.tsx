import {
  Baby,
  Brain,
  Briefcase,
  Coffee,
  Expand,
  Eye,
  Heading,
  Lightbulb,
  List,
  Megaphone,
  Paintbrush,
  Pen,
  Play,
  Quote,
  Scale,
  Scissors,
  Settings2,
  Shrink,
  Sparkle,
  SpellCheck,
  Star,
} from 'lucide-react'

export const bubbleMenuOptions = [
  {
    group: 'Rewrite',
    options: [
      { label: 'Rephrase', value: 'Rephrase the text for clarity and natural flow.', icon: Brain },
      {
        label: 'Fix grammar & spelling',
        value: 'Correct any grammar, spelling, or punctuation errors in the text.',
        icon: SpellCheck,
      },
      {
        label: 'Simplify language',
        value: 'Rewrite the text in simpler language while preserving the meaning.',
        icon: Pen,
      },
      {
        label: 'Change tone',
        value:
          'Rewrite the text with a different tone. Suggest an appropriate tone based on the context.',
        icon: Settings2,
      },
      {
        label: 'Change point of view',
        value:
          'Rewrite the text from a different point of view (for example, from first to third person).',
        icon: Eye,
      },
      {
        label: 'Make more formal',
        value: 'Rewrite the text to be more formal and professional.',
        icon: Briefcase,
      },
      {
        label: 'Make more casual',
        value: 'Rewrite the text to be more casual and conversational.',
        icon: Coffee,
      },
    ],
  },
  {
    group: 'Summarise & Expand',
    options: [
      { label: 'Summarise', value: 'Summarise the text in a concise way.', icon: Pen },
      { label: 'Make longer', value: 'Expand on the text and add more detail.', icon: Expand },
      {
        label: 'Make shorter',
        value: 'Shorten the text by removing unnecessary detail.',
        icon: Scissors,
      },
      {
        label: 'Bullet point summary',
        value: 'Summarise the text as clear bullet points.',
        icon: List,
      },
      {
        label: 'Highlight key points',
        value: 'Highlight the most important points in the text.',
        icon: Star,
      },
      {
        label: "Explain like I'm 5",
        value: 'Rewrite the text in a way that is easy for a 5-year-old to understand.',
        icon: Baby,
      },
    ],
  },
  {
    group: 'Generate',
    options: [
      {
        label: 'Continue writing',
        value: 'Continue writing from where the text ends, keeping the same style and topic.',
        icon: Play,
      },
      {
        label: 'Add a quote',
        value: 'Add a relevant and illustrative quote to the text.',
        icon: Quote,
      },
      {
        label: 'Add heading',
        value: 'Add a clear and descriptive heading above this text.',
        icon: Heading,
      },
      {
        label: 'List ideas',
        value: 'List several related ideas or suggestions based on the text.',
        icon: List,
      },
      {
        label: 'Generate example',
        value: 'Add a practical example to illustrate the text.',
        icon: Lightbulb,
      },
      {
        label: 'Add counterpoint',
        value: 'Add a counterpoint or alternative perspective to the text.',
        icon: Scale,
      },
    ],
  },
  {
    group: 'Style',
    options: [
      {
        label: 'Make persuasive',
        value: 'Rewrite the text to be more persuasive and convincing.',
        icon: Megaphone,
      },
      {
        label: 'Make descriptive',
        value: 'Rewrite the text with more vivid and detailed descriptions.',
        icon: Paintbrush,
      },
      {
        label: 'Make concise',
        value: 'Make the text more concise by removing any unnecessary words.',
        icon: Shrink,
      },
      {
        label: 'Make engaging',
        value: 'Rewrite the text to be more engaging and interesting to read.',
        icon: Sparkle,
      },
    ],
  },
]
