import { Dictionary } from "./types";

export const id: Dictionary = {
  header: {
    about_me: 'Tentang Saya',
    experience: 'Pengalaman',
    projects: 'Project',
    playground: 'Playground',
  },
  about_me: {
    heading: "Tentang Saya",
    description_1: 'lorem',
    description_2: 'lorem',
    description_3: 'lorem'
  },
  landing: {
    introduction_1: 'Halo! Nama Saya ',
    introduction_2: (<p>Saya seorang <span className="font-bold">Software Developer</span> yang fokus untuk membuat aplikasi yang interaktif, <i>scalable</i>, dan <i>secure</i>.</p>),
  },
  feed: {
    heading: 'Pengalaman & Project',
    work_experience: 'Pengalaman Kerja',
    featured: 'Galeri Proyek'
  },
  playground: {
    heading: 'Playground',
    sub_heading: 'Demo interaktif & contoh visualisasi'
  }
};