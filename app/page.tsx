import { NextPage } from 'next'
import { redirect } from 'next/navigation'

interface Props { }

const Page: NextPage<Props> = ({ }) => {
  redirect('/en')
}

export default Page