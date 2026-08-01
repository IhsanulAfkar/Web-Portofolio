import { Dictionary } from "./types";

export const en: Dictionary = {
  header: {
    about_me: 'About Me',
    experience: 'Experience',
    projects: 'Project',
    playground: 'Playground',
  },
  about_me: {
    heading: "About Me",
    description_1: 'lorem',
    description_2: 'lorem',
    description_3: 'lorem'
  },
  landing: {
    introduction_1: 'Hello! My name is ',
    introduction_2: (<p>I'm a <span className="font-bold">Software Developer</span> focused to build application that interactive, scalable, and secure.</p>),
  },
  feed: {
    heading: 'Experience & Projects',
    work_experience: 'Work Experience',
    featured: 'Project Gallery'
  },
  playground: {
    heading: 'Playground',
    sub_heading: 'Interactive demo and visualizations examples.'
  }
};