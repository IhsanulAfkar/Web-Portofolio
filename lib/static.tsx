import { Mastery, Project, Repo, WorkExperience } from "@/types";

export const myProjects: Project[] = [
    {
        id: 1,
        img: '/project/1.jpg',
        tag: 'Web Development, Internet of Things, Agriculture',
        title: 'KKN Abdi Masyarakat ITS',
        desc: {
            en: 'Ciptakan Smart Agriculture Fishing untuk Masyarakat Dusun Kajar Berbasiskan sistem IoT (Internet of Things)',
            id: 'tobe'
        },
        url: 'https://www.its.ac.id/news/2022/11/29/kkn-abmas-its-ciptakan-smart-agriculture-fishing-untuk-masyarakat-dusun-kajar/'
    },
    {
        id: 2,
        img: '/project/3.png',
        tag: 'Web Development, Staff, Comitee',
        title: 'Staff of Website Development ARA 2023',
        desc: {
            en: "Assigned to handle back-end using codeigniter framework in ARA 2023.",
            id: 'tobe'
        },
        url: 'https://www.instagram.com/p/CfD90TzJ8CI/'
    },
    {
        id: 3,
        img: '/project/2.png',
        tag: 'Web Development, Project Manager, Comitee',
        title: 'Chief of Website Development ARA 4.0',
        desc: {
            en: "Determine web framework, Develop both front-end and back-end, Handling staff divisions and jobs, and Manage the hosted server for ARA 4.0.",
            id: 'tobe'
        },
        url: 'https://www.instagram.com/p/CkiC0bvpgF4/'

    },
    {
        id: 4,
        img: '/project/4.png',
        tag: 'Web Development, Internship',
        title: 'Web Developer Internship in PT Adma Digital Solusi (ADS Digital Partner)',
        desc: {
            en: "Create and develop a product called Forwardin in teams as a Web Developer",
            id: 'tobe'
        },
        url: 'https://www.instagram.com/forwardin.id/'
    }
]
export const workExperiences: WorkExperience[] = [
    {
        start_month: 'Aug 2024',
        end_month: 'Now',
        title: 'PT Adma Digital Solusi',
        subtitle: 'Fullstack Web Developer',
        description: {
            en: 'Develop and maintain running projects with other team and division. Communicate with other division for feature and bug requests. Appointed as mentor for interns, providing guidance and support in real projects',
            id: 'tobe'
        },
        tag: 'Laravel, Filament (Laravel), Next JS, Expres JS, TailwindCSS'
    },
    {
        start_month: 'Feb 2024',
        end_month: 'May 2024',
        title: 'Peduly, Yayasan Peduly Gotong Royong (Internship)',
        subtitle: 'Front Web Developer',
        description: {
            en: 'Maintain existing website and create new features. Ensure donation transaction registered successfully',
            id: 'tobe'
        },
        tag: 'React JS, Bootstrap'
    },
    {
        start_month: 'Aug 2023',
        end_month: 'Dec 2023',
        title: 'PT Adma Digital Solusi (MSIB Internship)',
        subtitle: 'Web Developer',
        description: {
            en: 'Develop application called Forwardin with teams consist of Back-End, UI/UX, Technical Writer, Data Analyst, Digital Marketing Specialists.',
            id: 'tobe'
        },
        tag: 'Laravel, Next JS'
    },
]

export const navbarTitle = "Ihsanul's Portofolio"

export const mainTypeWrite = 'Welcome to my portofolio webpage!'
export const typeWrite = 'I am thrilled to present to you a showcase of my skills, experiences, and accomplishments'

export const links: {
    [key: string]: string
} = {
    ig: 'https://www.instagram.com/ihsanulafkar01/',
    ln: 'https://www.linkedin.com/in/ihsanul-afkar-876229218',
    email: 'mailto:ihsanul2001@gmail.com',
    github: 'https://github.com/IhsanulAfkar'
}
export const whatido: string[] = [
    'Build and maintain websites',
    'Build and maintain websites',
    'Build and maintain websites',
]

export const feMastery = 'Tailwind CSS, Bootstrap, Materialize, CSS Preprocessor, React JS, DOM JS'

export const masteries: Mastery[] = [
    {
        icon: 'laravel.png',
        text: 'Laravel',
        color: 'bg-white'
    },
    {
        icon: 'next.png',
        text: 'Next JS',
        color: 'bg-white'
    },
    {
        icon: 'tailwind.png',
        text: 'TailwindCSS',
        color: 'bg-white'
    },
    {
        icon: 'bootstrap.png',
        text: 'Bootstrap',
        color: 'bg-white'
    },
    {
        icon: 'express.png',
        text: 'Express JS',
        color: 'bg-white'
    },
    {
        icon: 'postgres.png',
        text: 'PostgreSQL',
        color: 'bg-white'
    },
    {
        icon: 'mysql.png',
        text: 'MySQL',
        color: 'bg-white'
    },
]

export const myRepos: Repo[] = [
    {
        id: 1,
        name: 'Website ara 4.0',
        url: 'https://github.com/IhsanulAfkar/website-ara-4.0',
        description: 'Repository untuk menyimpan koding event ARA 2023 oleh mahasiswa Teknologi Informasi ITS.',
        tech: 'PHP TailwindCSS Javascript',
    },
    {
        id: 2,
        name: 'WebsiteARA2022',
        url: 'https://github.com/IhsanulAfkar/WebsiteARA2022',
        description: 'Repository untuk menyimpan hasil pembuatan website event ARA 2022 yang diadakan oleh mahasiswa Teknologi Informasi ITS.',
        tech: 'PHP SCSS Javascript',
    },
    {
        id: 3,
        name: 'ARA 4.0 Front End CTF Website',
        url: 'https://github.com/IhsanulAfkar/ara-ctf',
        description: 'Repository front end event CTF ARA 4.0 from CTFd',
        tech: 'Python Javascript CSS',
    },
    {
        id: 4,
        name: 'E-Money Implementation',
        url: 'https://github.com/IhsanulAfkar/emoney-implementation',
        description: 'E-Money implementation using REST API with Express JS',
        tech: 'Node-JS',
    },
    {
        id: 5,
        name: 'Notetopia, learning CRUD with Next JS',
        url: 'https://github.com/IhsanulAfkar/notetopia',
        description: 'learning CRUD and google login for auth with Next JS',
        tech: 'Next-JS TailwindCSS',
    }
]