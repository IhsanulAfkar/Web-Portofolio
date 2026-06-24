'use client'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import programPriority from '@/lib/dummy/program-priority.json'
import { toast } from 'sonner'
import { useMemo, useRef, useState } from 'react'
import { TIssueMonitoringItem, TTopicMonitoring } from '@/lib/sna'
import { topicMonitoring } from '@/lib/constant'
import { buildGraphFromProgramPriority } from '../../../lib/sna'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useGraphFilter } from '@/providers/GraphProvider'
import { dateFormat, formatNumber } from '@/lib/utils'
import RenderSocialAuthorImage from '@/components/default/RenderSocialAuthorImage'
import SocialMediaImage from '@/components/default/SocialMediaImage'
import { RenderSentiment } from '@/components/default/RenderSentiment'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import LimitText from '@/components/ui/custom/limit-text'
import RenderStatistic from '@/components/default/RenderStatistic'
import { DataPagination } from '@/components/default/DataPagination'
const SNASectionSigma = dynamic(
  () => import('@/components/pages/playground/sna'),
  { ssr: false }
)
const PageClient = () => {

  const { setSelectedGraphs } = useGraphFilter()
  const [openDetailIssue, setOpenDetailIssue] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<TTopicMonitoring | null>(null)
  const [openTopicSidebar, setOpenTopicSidebar] = useState(false)
  const [selectedDetailIssue, setSelectedDetailIssue] = useState<TIssueMonitoringItem | null>(null)
  const monitoringRef = useRef(topicMonitoring);
  const issues = (programPriority as any).data.flatMap((d: any) => d.issues)
  const issueRef = useRef(issues)
  const onMainNodeClick = (projectId?: number) => {
    if (!projectId) {
      setSelectedTopic(null)
    }
    const currentData = monitoringRef.current;
    const findTopic = currentData.find(t => t.id == projectId);
    if (findTopic) {
      setSelectedTopic(findTopic)
      setOpenTopicSidebar(true)
    } else {
      toast.error('Topic tidak ditemukan')
    }
  }
  const onTopicNodeClick = (topicId?: number) => {
    if (!topicId) {
      setSelectedDetailIssue(null)
    }
    const findIssue = issueRef.current.find((i: any) => i.id === topicId)
    if (findIssue) {
      setSelectedDetailIssue(findIssue)
      setOpenDetailIssue(true)
    } else {
      toast.error('Issue tidak ditemukan')
    }
  }
  const graph = useMemo(() => {
    const data = (programPriority as any).data
    if (!data) return null

    return buildGraphFromProgramPriority(data)
  }, [programPriority])

  const [pageRelatedPost, setPageRelatedPost] = useState(1)
  const [limitRelatedPost, setLimitRelatedPost] = useState(5)
  const metaRelatedPost = {
    total_pages: Math.ceil((selectedDetailIssue?.related_posts.length ?? 0) / limitRelatedPost)
  }
  const startIndex = (pageRelatedPost - 1) * limitRelatedPost
  const slicedRelatedPost = selectedDetailIssue?.related_posts.slice(startIndex, startIndex + limitRelatedPost)
  return <>
    <div className='w-full h-full relative'>
      <SNASectionSigma graph={graph as any} onMainNodeClick={onMainNodeClick} onTopicNodeClick={onTopicNodeClick} programPriority={(programPriority as any).data} isMenkp />
    </div>
    {selectedDetailIssue && openDetailIssue &&
      <Sheet open={openDetailIssue} onOpenChange={val => {
        setOpenDetailIssue(val)
        if (!val) {
          setSelectedGraphs([])
        }
      }}>
        <SheetContent className="bg-black z-[9999] w-[600px] overflow-hidden px-8 sm:max-w-none gap-0">
          <SheetHeader className="">
            <SheetTitle></SheetTitle>
            <div className="flex items-center justify-between">
              <div className="bg-white p-1 rounded-full size-10">
                <img src={'/assets/logo.png'} />
              </div>
            </div>
          </SheetHeader>
          <div className="relative flex h-[calc(100vh-100px)] flex-col overflow-hidden pb-4 text-gray-300">
            <div id="main-content" className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-1 text-sm">
              <p className='capitalize text-xl font-semibold text-white'>{selectedDetailIssue.issue}</p>
              <div className='flex gap-4'>
                <div className="border-gray-stroke-2 bg-[#191919] flex w-full flex-col justify-between rounded border">
                  <div className="h-full p-2 text-center">
                    <p className="text-blue-1 text-lg font-semibold">
                      {formatNumber(selectedDetailIssue.total_reach)}
                    </p>
                  </div>
                  <div className="bg-yellow-1 p-2 text-center text-[10px] font-bold dark:text-black">
                    TOTAL REACH
                  </div>
                </div>
                <div className="border-gray-stroke-2 bg-[#191919] flex w-full flex-col justify-between rounded border">
                  <div className="h-full p-2 text-center">
                    <p className="text-blue-1 text-lg font-semibold">
                      {formatNumber(selectedDetailIssue.total_engagement)}
                    </p>
                  </div>
                  <div className="bg-yellow-1 p-2 text-center text-[10px] font-bold dark:text-black">
                    TOTAL ENGAGEMENT
                  </div>
                </div>
              </div>
              <div>
                <p className='font-semibold text-white mb-2 uppercase'>Social Media Listening</p>
                <p>{selectedDetailIssue.description}</p>
              </div>
              <div>
                <p className='font-semibold text-white mb-2 uppercase'>Facts</p>
                <div className='prose max-w-full text-sm text-gray-300' dangerouslySetInnerHTML={{ __html: selectedDetailIssue.fact }} />
              </div>

              <div>
                <p className='font-semibold text-white mb-2 uppercase'>SOCIAL MEDIA POST</p>
                <div className='space-y-3'>
                  {slicedRelatedPost?.map((post, idx) => (<div key={idx} className='border rounded-md p-3 bg-[#191919]'>
                    <div className='flex justify-between gap-4'>
                      <div className='flex gap-2'>
                        {/* <RenderSocialAuthor platform={post.source.toLowerCase()} username={post.author} name={post.author} /> */}
                        <RenderSocialAuthorImage username={post.author} name={post.author} />
                        <div>
                          <div className='flex gap-2'>
                            <p className='text-white font-semibold'>{post.author}</p>
                            <SocialMediaImage type={post.source.toLowerCase()} />
                          </div>
                          <p className='text-secondary text-xs'>{formatNumber(post.stats.reach)} Reach | {formatNumber(post.stats.engagement)} Engagement | {dateFormat(post.created_at)}</p>
                        </div>
                      </div>
                      <div className='flex justify-end items-center gap-2'>
                        <RenderSentiment sentiment={post.sentiment} />

                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
                          <DropdownMenuContent side='left' className='z-[9999]'>
                            <DropdownMenuItem onClick={() => {
                              if (post.link_post) {
                                window.open(post.link_post, '__blank')
                              }
                            }}>Visit Post</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className='text-xs text-[#DCDCDC] mt-3'>
                      <LimitText text={post.text} />
                    </div>
                    <div className='mt-2'>
                      <RenderStatistic comment={post.stats.comments} like={post.stats.likes} view={post.stats.reach} retweet={post.stats.shares} engagement={post.stats.engagement} />
                    </div>
                  </div>))}
                </div>
                <div className='mt-2'>
                  <DataPagination modal page={pageRelatedPost} setPage={setPageRelatedPost} lastPage={metaRelatedPost.total_pages} limit={limitRelatedPost} setLimit={setLimitRelatedPost} total={selectedDetailIssue?.related_posts.length ?? 0} />
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    }

  </>
}

export default PageClient