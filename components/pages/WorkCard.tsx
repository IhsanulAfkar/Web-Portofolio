import { getParam, printLang } from '@/lib/utils'
import { WorkExperience } from '@/types'
import { useParams } from 'next/navigation'
import BorderGlow from '../BorderGlow'

interface Props {
	data: WorkExperience
}

export default function WorkCard({ data }: Props) {
	const params = useParams()

	const lang = getParam(params.lang)
	return (
		<div className="group border-l-2 border-neutral-200 pl-5 transition-all hover:border-blue-400">

			<div className="mb-1 text-xs font-medium tracking-wide text-slate-500 uppercase">
				{data.start_month} — {data.end_month}
			</div>

			<h4 className="text-lg font-semibold text-neutral-900 transition-colors group-hover:text-blue-600">
				{data.title}
			</h4>

			{data.subtitle && (
				<p className="text-sm text-slate-600">
					{data.subtitle}
				</p>
			)}

			<p className="mt-2 text-sm leading-relaxed text-slate-500">
				{printLang(data.description, lang)}
			</p>

			{data.tag && (
				<div className="mt-3 flex flex-wrap gap-2">
					{data.tag.split(',').map((tag) => (
						<span
							key={tag}
							className="
                rounded-md
                bg-slate-100
                px-2 py-1
                text-xs
                font-medium
                text-slate-600
              "
						>
							{tag.trim()}
						</span>
					))}
				</div>
			)}
		</div>
	)
}