import { CardHeader, CardTitle, CardContent } from "../ui/card";
import { Loader2Icon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export const LoadingCard = () => {
    return (
        <CardHeader>
            <CardTitle className="animate-pulse flex items-center gap-2">
                <Loader2Icon className="animate-spin" /> AI Response
            </CardTitle>
            <CardContent>
                <Skeleton className="w-full h-24" />
            </CardContent>
        </CardHeader>
    )
}