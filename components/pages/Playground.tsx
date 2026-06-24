'use client'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Dictionary } from '@/i18n/types'
import { NextPage } from 'next'
import { ReactNode } from 'react'
import { getParam, printLang } from '@/lib/utils'
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
]

const Playground: NextPage<Props> = ({ dict }) => {

  const params = useParams()
  const lang = getParam(params.lang)
  return (
    <section
      id="playground"
      className="rounded-2xl pt-20 pb-12"
    >
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-6xl">
            {dict.playground.heading}
          </h2>

          <p className="mt-4 text-neutral-600">{dict.playground.sub_heading}</p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-1 xl:grid-cols-2">
          {playgrounds.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              target="_blank"
              className="group"
            >
              <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-xl">
                {/* Preview Area */}
                <div className="relative h-60 overflow-hidden bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200">
                  {item.preview}
                </div>

                <div className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-neutral-900">
                      {item.title}
                    </h3>

                    <ExternalLink
                      size={16}
                      className="shrink-0 text-neutral-400 transition group-hover:text-neutral-900"
                    />
                  </div>

                  <p className="line-clamp-2 text-sm text-neutral-600">
                    {printLang(item.description, lang)}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Playground