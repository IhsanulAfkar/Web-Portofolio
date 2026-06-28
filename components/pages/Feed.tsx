'use client'

import { NextPage } from 'next'
import Project from './Project'
import WorkCard from './WorkCard'
import { myProjects, workExperiences } from '@/lib/static'
import { Dictionary } from '@/i18n/types'

export const Feed: NextPage<{
  dict: Dictionary
}> = ({ dict }) => {
  const handleClick = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <section
      id="project"
      className="bg-white rounded-2xl shadow-xl pt-20 pb-12"
    >
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-20">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-6xl">
            {dict.feed.heading}
          </h2>

        </div>

        {/* Experience */}
        <div className="mt-24">
          <h3 className="mb-8 text-3xl font-bold text-neutral-900">
            {dict.feed.work_experience}
          </h3>

          <div className="space-y-8">
            {workExperiences.map((data) => (
              <WorkCard key={data.title} data={data} />
            ))}
          </div>
        </div>
        {/* Projects */}
        <div className="mt-24">
          <div className="mb-10 flex items-center justify-between">
            <h3 className="text-3xl font-bold text-neutral-900">
              {dict.feed.featured}
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...myProjects]
              .reverse()
              .map((project) => (
                <Project
                  key={project.id}
                  data={project}
                  handleClick={handleClick}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}