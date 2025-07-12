import {
  Baby,
  Banknote,
  Bell,
  Briefcase,
  Code2,
  GraduationCap,
  ShoppingCart,
  User,
  UserCheck,
  Users,
} from 'lucide-react'

import type { aiSettings } from '../editor'
import { GenericSelector } from './generic-selector'

const audienceOptions = [
  {
    label: 'General Public',
    value: 'public',
    icon: Users,
    prompt: 'Write for a general, non-expert audience.',
  },
  { label: 'Customers', value: 'customers', icon: ShoppingCart, prompt: 'Write for customers.' },
  {
    label: 'Colleagues',
    value: 'colleagues',
    icon: UserCheck,
    prompt: 'Write for work colleagues.',
  },
  { label: 'Executives', value: 'executives', icon: Briefcase, prompt: 'Write for executives.' },
  {
    label: 'Technical Experts',
    value: 'experts',
    icon: Code2,
    prompt: 'Write for technical experts.',
  },
  { label: 'Students', value: 'students', icon: GraduationCap, prompt: 'Write for students.' },
  {
    label: 'Children',
    value: 'children',
    icon: Baby,
    prompt: 'Write for children in simple language.',
  },
  { label: 'Investors', value: 'investors', icon: Banknote, prompt: 'Write for investors.' },
  { label: 'Clients', value: 'clients', icon: User, prompt: 'Write for business clients.' },
  {
    label: 'Subscribers',
    value: 'subscribers',
    icon: Bell,
    prompt: 'Write for newsletter subscribers.',
  },
]
export function AudienceSelector({
  aiSettings,
  setAiSettings,
}: {
  aiSettings: aiSettings
  setAiSettings: (aiSettings: aiSettings) => void
}) {
  return (
    <GenericSelector
      value={aiSettings.audience}
      onChange={(val, field) => setAiSettings({ ...aiSettings, [field]: val })}
      options={audienceOptions}
      label="Audience"
      field="audience"
    />
  )
}
