export type Project = {
    id: number,
    img: string,
    tag: string,
    title: string,
    desc: {
        id: string,
        en: string
    },
    url: string
}

export type Mastery = {
    icon: string,
    text: string,
    color: string
}
export type WorkExperience = {
    start_month: string,
    end_month: string,
    title: string,
    subtitle?: string,
    description: {
        id: string,
        en: string
    },
    tag?: string
}
export type Repo = {
    id: number,
    name: string,
    url: string,
    description: string,
    tech: string,
}