'use client'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Dictionary } from '@/i18n/types'
import { NextPage } from 'next'
import { ReactNode, useState } from 'react'
import { cn, getParam, printLang } from '@/lib/utils'
import { useParams } from 'next/navigation'
import GraphPreview from './partials/GraphPreview'

interface Props {
  dict: Dictionary
}
interface Playground {
  title: string,
  preview: ReactNode
  description: {
    id: string,
    en: string,
  },
  url: string,
}
const playgrounds: Playground[] = [
  {
    title: 'Social Network Analysis',
    preview: <GraphPreview />,
    description: {
      en: 'Social Network Analytics',
      id: 'tobe'
    },
    url: '/playground/sna',
  },
  {
    title: 'Social Network Analysis',
    preview: <GraphPreview />,
    description: {
      en: 'Social Network Analytics',
      id: 'tobe'
    },
    url: '/playground/sna',
  },
]

const Playground: NextPage<Props> = ({ dict }) => {

  const params = useParams()
  const lang = getParam(params.lang)
  const [selected, setSelected] = useState(0);

  const active = playgrounds[selected];
  return (
    <section
      id="playground"
      className="pt-24 pb-12"
    >
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-6xl">
            {dict.playground.heading}
          </h2>

          <p className="mt-4 text-neutral-600">{dict.playground.sub_heading}</p>
        </div>
        <div className="hidden xl:grid xl:grid-cols-[320px_1fr] gap-8 mt-12">
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {playgrounds.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={cn(
                  "w-full rounded-xl border p-5 text-left transition",
                  i === selected
                    ? "border-neutral-900 bg-neutral-100"
                    : "border-neutral-200 hover:border-neutral-400"
                )}
              >
                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-neutral-500 line-clamp-2">
                  {printLang(item.description, lang)}
                </p>
              </button>
            ))}
          </div>
          <div className="rounded-2xl border bg-white overflow-hidden">
            <div className="">
              {active.preview}
            </div>

            <div className="border-t p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">
                    {active.title}
                  </h3>

                  <p className="mt-2 text-neutral-600">
                    {printLang(active.description, lang)}
                  </p>
                </div>

                <Link
                  href={active.url}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-white hover:bg-neutral-800"
                >
                  Open
                  <ExternalLink size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Playground