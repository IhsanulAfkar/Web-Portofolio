'use client'
import { NextPage } from 'next'
import dynamic from 'next/dynamic';
import { ReactNode } from 'react'
const NextThemesProvider = dynamic(
  () => import('next-themes').then((e) => e.ThemeProvider),
  {
    ssr: false,
  },
);
interface Props {
  children: ReactNode
}

const Providers: NextPage<Props> = ({ children }) => {
  return <NextThemesProvider attribute="class" forcedTheme='light'>
    {children}
  </NextThemesProvider>
}

export default Providers