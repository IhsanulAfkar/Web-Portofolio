import { NextPage } from 'next'
import PageClient from './page.client'
import { GraphProvider } from '@/providers/GraphProvider'


const Page = () => {

  return <GraphProvider>
    <PageClient />
  </GraphProvider>
}

export default Page