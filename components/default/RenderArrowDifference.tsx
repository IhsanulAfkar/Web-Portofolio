import { cn } from "@/lib/utils";
import { NextPage } from "next";

const RenderArrowDifference: NextPage<{ trend: number }> = ({ trend }) => {
    return (
        <div>
            <span className={cn(
                trend > 0.0 && 'text-green-1',
                trend == 0.0 && 'text-yellow-1',
                trend < 0.0 && 'text-red-1',
            )}>
                {trend > 0.0 && '▲'}
                {trend < 0.0 && '▼'}
                {trend == 0.0 && '~'}
                {' '}
                {trend > 0.0 && '+'}
                {trend}
            </span>
        </div>
    );
}

export default RenderArrowDifference;