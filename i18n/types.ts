import { ReactNode } from "react";
export type DictItem = string | ReactNode
export type Dictionary = {

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