'use client'

import { NextPage } from 'next'
import { Dictionary } from '@/i18n/types'

export const AboutMe: NextPage<{
  dict: Dictionary
}> = ({ dict }) => {
  return (
    <section
      id="about"
      className="bg-white rounded-2xl shadow-xl pt-20 pb-12"
    >
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-6xl">
            {dict.about_me.heading}
          </h2>
          
          <div className="mt-12 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-blue-500 opacity-25 blur-lg"></div>
              <img 
                src="/images/profile.jpg" 
                className="relative rounded-full w-48 h-48 object-cover"
              />
            </div>
          </div>
          
          <div className="mt-12 text-lg leading-relaxed text-neutral-700">
            <p className="mb-6">{dict.about_me.description_1}</p>
            <p className="mb-6">{dict.about_me.description_2}</p>
            <p>{dict.about_me.description_3}</p>
          </div>
        </div>
      </div>
    </section>
  )
}