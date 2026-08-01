import { ReactNode } from "react";
export type DictItem = string | ReactNode
export type Dictionary = {
  header: {
    about_me: DictItem,
    experience: DictItem,
    projects: DictItem,
    playground: DictItem,
  },
  about_me: {
    heading: DictItem,
    description_1: DictItem,
    description_2: DictItem,
    description_3: DictItem,
  }
  landing: {
    introduction_1: DictItem
    introduction_2: DictItem
  },
  feed: {
    heading: DictItem,
    work_experience: DictItem,
    featured: DictItem
  },
  playground: {
    heading: DictItem,
    sub_heading: DictItem
  }
};