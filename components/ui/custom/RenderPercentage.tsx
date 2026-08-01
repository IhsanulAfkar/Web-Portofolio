
import RenderArrowDifference from '@/components/default/RenderArrowDifference'
import { cn } from '@/lib/utils'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { NextPage } from 'next'

interface Props {
    before: number,
    after: number,
    className?: string,
    showArrow?: boolean
}

const RenderPercentage: NextPage<Props> = ({ before: a, after: b, className, showArrow = true }) => {
    if (a === null || a === undefined || b === null || b === undefined) return <></>
    const difference = b - a;
    return <div className={cn('flex items-center gap-1 text-xs', className)}>
        <RenderArrowDifference trend={difference} />
    </div>
}

export default RenderPercentage