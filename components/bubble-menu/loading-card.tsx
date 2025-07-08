import { Loader2Icon } from 'lucide-react'

import { CardContent, CardHeader, CardTitle } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export const LoadingCard = () => {
  return (
    <CardHeader>
      <CardTitle className="flex animate-pulse items-center gap-2">
        <Loader2Icon className="animate-spin" /> AI Response
      </CardTitle>
      <CardContent>
        <Skeleton className="h-24 w-full" />
      </CardContent>
    </CardHeader>
  )
}
