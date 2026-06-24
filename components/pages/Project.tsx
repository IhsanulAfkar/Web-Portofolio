import { getParam, printLang } from '@/lib/utils'
import { Project as ProjectType } from '@/types'
import { NextPage } from 'next'
import { useParams } from 'next/navigation'
import React from 'react'
interface ProjectPage {
  data: ProjectType,
  handleClick: (url: string) => void
}
const Project: NextPage<ProjectPage> = ({ data, handleClick }) => {
  const params = useParams()
  const lang = getParam(params.lang)
  return (
    <div
      onClick={() => handleClick(data.url)}
      className="
    group relative overflow-hidden rounded-2xl
    border border-neutral-200 bg-white
    transition-all duration-300
    hover:-translate-y-1
    hover:border-neutral-300
    hover:shadow-xl
    cursor-pointer
  "
    >
      <div className="aspect-[16/10] overflow-hidden bg-neutral-50">
        <img
          src={data.img}
          alt={data.title}
          className="
        h-full w-full object-cover
        transition-transform duration-500
        group-hover:scale-105
      "
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {data.tag.split(',').map((tag) => (
            <span
              key={tag}
              className="
            rounded-full
            bg-neutral-100
            px-2.5 py-1
            text-xs font-medium
            text-neutral-600
          "
            >
              {tag}
            </span>
          ))}
        </div>

        <h4
          className="
        mb-2 text-lg font-semibold text-neutral-900
        transition-colors
        group-hover:text-blue-600
      "
        >
          {data.title}
        </h4>

        <p
          className="
        line-clamp-3
        text-sm leading-relaxed
        text-neutral-600
      "
        >
          {printLang(data.desc, lang)}
        </p>
      </div>
    </div>
  )
}
export default Project