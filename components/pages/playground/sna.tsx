'use client'
import { createNodeImageProgram, NodeImageProgram } from "@sigma/node-image";
import { NextPage } from 'next'
import { useEffect, useMemo, useRef, useState } from 'react'
import Graph from 'graphology'
import Sigma from 'sigma'
import forceAtlas2 from 'graphology-layout-forceatlas2'
import { ChevronLeft, Maximize, Minimize, X } from 'lucide-react'
import { capitalize, cn, dateFormat, formatNumber } from '@/lib/utils'
import { RenderSentiment } from '@/components/default/RenderSentiment'
import LimitText from '@/components/ui/custom/limit-text'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { MAP_SENTIMENT_INDO, SENTIMENT_COLOR, SNA_COLOR } from '@/lib/constant'
import { getAllDescendants, SNAPriority } from '@/lib/sna'

import { Checkbox } from '@/components/ui/checkbox'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SigmaContainer } from '@react-sigma/core'
// @ts-ignore
import "@react-sigma/core/lib/style.css"
import { GraphDataController } from './GraphDataController'
import { drawHover, drawLabel } from "@/lib/canvas";
import { useGraphFilter } from "@/providers/GraphProvider";
import RenderStatistic from "@/components/default/RenderStatistic";
import { TProgramPriority } from "@/lib/sna";
import SocialMediaImage from "@/components/default/SocialMediaImage";
export type TRelatedPost = {
  social_id: number,
  post_id: string,
  comment_id: null,
  source: string,
  text: string,
  author: string,
  sentiment: string,
  link_post: string
  stats: {
    comments: number,
    retweet: number,
    likes: number,
    views: number,
    shares: number,
    reach: number,
    engagement: number
  },
  created_at: string
}
const SNASectionSigma: NextPage<{
  graph: SNAPriority
  onMainNodeClick: (p: number) => void
  onTopicNodeClick: (p: number) => void
  programPriority: TProgramPriority[],
  isMenkp?: boolean
}> = ({ graph, onMainNodeClick, onTopicNodeClick, programPriority, isMenkp = false }) => {
  const {
    selectedGraphs,
    isChecked,
    applyWithChildren,
    filterState,
    setSelectedGraphs
  } = useGraphFilter()
  const selectedNodeRef = useRef<HTMLDivElement>(null)
  const [selectedNode, setSelectedNode] = useState<any>(null)
  const onMainNodeClickRef = useRef(onMainNodeClick)

  useEffect(() => {
    onMainNodeClickRef.current = onMainNodeClick
  }, [onMainNodeClick])
  const onTopicNodeClickRef = useRef(onTopicNodeClick)

  useEffect(() => {
    onTopicNodeClickRef.current = onTopicNodeClick
  }, [onTopicNodeClick])

  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleFullscreen = async () => {
    const el = wrapperRef.current
    if (!el) return

    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedNode &&
        selectedNodeRef.current &&
        !selectedNodeRef.current.contains(event.target as Node)
      ) {
        setSelectedNode(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [selectedNode])
  return (
    <div ref={wrapperRef} className='relative'>
      <SigmaContainer
        style={{ height: isFullscreen ? '100vh' : '100vh', width: '100%', backgroundColor: 'black' }}
        settings={{
          renderLabels: true,
          labelColor: { attribute: 'labelColor' },
          labelSize: 12,
          labelFont: 'Arial',
          zIndex: true,
          allowInvalidContainer: true,
          defaultDrawNodeLabel: drawLabel,
          defaultDrawNodeHover: drawHover
        }}

      >
        {/* Sub-components that interact with the Sigma instance */}
        <GraphDataController graph={graph} filterState={filterState} onNodeClick={(data) => {
          if (data?.posts) setSelectedNode({ data })
          else if (data?.mainNode && data?.projectId) {
            onMainNodeClick(Number(data.projectId))

            applyWithChildren(
              { id: Number(data.projectId), type: "project" },
              true,
              graph
            )
          }
          else if (data?.issueId) {
            onTopicNodeClick(Number(data.issueId))

            applyWithChildren(
              { id: Number(data.issueId), type: "issue" },
              true,
              graph
            )
          }
        }} />

      </SigmaContainer>
      <Link href={'/'}>
        <Button className="absolute top-4 left-4 hover:cursor-pointer text-lg" size={'lg'}>
          <ChevronLeft />
          Go Back
        </Button>
      </Link>
      {programPriority.length > 0 &&
        <div className={cn("absolute bottom-32  z-[99] w-80 bg-[#191919] px-3 rounded-md text-white", 'right-4')}>
          <Accordion type="single" collapsible>
            <AccordionItem value="main">
              <AccordionTrigger>
                <p className="font-semibold">Graph Filter</p>
              </AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="max-h-[40vh] overflow-y-auto pr-2">
                  <Accordion type="multiple" className="w-full space-y-2">
                    {programPriority.map((program) => (
                      <AccordionItem
                        key={program.project_id}
                        value={`program-${program.project_id}`}
                        className="border-none w-full"
                      >
                        {/* PROGRAM (TOPIC) */}
                        <div className="flex items-center gap-2 ">
                          <Checkbox
                            checked={isChecked(program.project_id, "project")}
                            onCheckedChange={(checked) => {
                              applyWithChildren(
                                { id: program.project_id, type: "project" },
                                !!checked,
                                graph
                              )
                            }}
                          />

                          <AccordionTrigger className="p-0 hover:no-underline text-sm font-semibold flex-1 hover:cursor-pointer">
                            {program.project_name}
                          </AccordionTrigger>
                        </div>

                        {/* ISSUES */}
                        <AccordionContent className="ml-6 mt-2 space-y-3">
                          {program.issues.map((issue) => (
                            <div key={issue.id}>
                              {/* ISSUE */}
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  checked={isChecked(issue.id, "issue")}
                                  onCheckedChange={(checked) =>
                                    applyWithChildren(
                                      { id: issue.id, type: "issue" },
                                      !!checked,
                                      graph
                                    )
                                  }
                                />
                                <span className="text-xs">{issue.issue}</span>
                              </div>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </ScrollArea>
                <Button size={'sm'} variant={'ghost'} className='hover:underline mt-2 w-full' onClick={() => {
                  setSelectedGraphs([])
                }}>Reset</Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      }
      <div className={cn("absolute bottom-32   z-10 flex flex-col items-end gap-4 left-4",)}>
        <div className="mt-2 w-40 rounded-md bg-black/50 p-2 shadow shadow-gray-600">

          <Accordion type="single" collapsible defaultValue="legend">
            <AccordionItem value="legend" className="border-none text-white">

              <AccordionTrigger className="py-1 text-sm font-semibold hover:no-underline hover:cursor-pointer">
                Legend
              </AccordionTrigger>

              <AccordionContent className="mb-0">
                <div className="mt-2 space-y-2">

                  {/* MAIN */}
                  <div className="flex gap-2 items-center">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: "#183FB3" }}
                    ></div>
                    <p className="text-xs">Topic Monitoring</p>
                  </div>

                  {/* SENTIMENT */}
                  <div className="space-y-2">
                    <p className="text-sm">Line & Dot</p>

                    {Object.entries(SENTIMENT_COLOR).map(([key, value]) => (
                      <div className="flex gap-2 items-center" key={key}>
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: value }}
                        ></div>
                        <p className="text-xs">
                          {capitalize(MAP_SENTIMENT_INDO[key])}
                        </p>
                      </div>
                    ))}
                    {isMenkp && (
                      <>
                        <p>Engagement</p>
                        <div>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full bg-white"
                            ></div>
                            <p className="text-xs">: 10 Engagement</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* ACTION */}
                <div className="border-t border-white mt-3 pt-2">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 px-0! w-full justify-start flex items-center gap-2"
                    onClick={handleFullscreen}
                  >
                    {isFullscreen ? (
                      <Minimize size={14} />
                    ) : (
                      <Maximize size={14} />
                    )}
                    <p className="text-xs">
                      {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    </p>
                  </Button>
                </div>
              </AccordionContent>

            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {selectedNode && (
        <div
          ref={selectedNodeRef}
          className=" relative z-10"
          style={{
            position: 'absolute',
            left: 12,
            top: 12,
            // background: '#000000',
            borderRadius: 8,
            color: 'white',
            fontSize: 12,
            fontFamily: 'Sans-Serif',
            lineHeight: 1.4,
            maxWidth: 260,
          }}
        >
          <div className="absolute top-1 right-1 bg-white/50 text-black hover:cursor-pointer rounded-full p-1 hover:bg-gray-2 " onClick={() => setSelectedNode(null)}>
            <X size={16} />
          </div>
          <div className="overflow-y-auto max-h-[40vh] space-y-4 show-scrollbar">

            {selectedNode.data?.posts?.map((sample: TRelatedPost, idx: number) =>
              <div className="bg-black p-2 border rounded-md" key={idx}>
                <div className="flex gap-2 my-2 ">
                  <div>
                    <p className="text-sm font-semibold">{sample.author}</p>
                    <p className="text-xs mt-1 text-secondary">{formatNumber(sample.stats.reach)} Reach | {formatNumber(sample.stats.engagement)} Engagement</p>
                  </div>
                  <SocialMediaImage type={sample.source.toLowerCase()} className="flex-none rounded size-5" />
                </div>

                <div className="flex justify-between mb-2">
                  <RenderSentiment
                    sentiment={capitalize(sample.sentiment as any) as any}
                    className="bg-transparent p-0"
                  />
                  <p className="text-secondary text-xs">{dateFormat(sample.created_at)}</p>
                </div>
                {sample.text && (
                  <div className="">
                    <LimitText text={sample.text} />
                    {/* <div>{sample.text as string}</div> */}
                  </div>
                )}
                <RenderStatistic comment={sample.stats.comments} like={sample.stats.likes} retweet={sample.stats.retweet} view={sample.stats.views} />
                <div className=" gap-2 mt-2 ">
                  {sample.link_post && (
                    <Link href={sample.link_post} target="__blank">
                      <Button size={'sm'} className="border-3 border-[#DCE0E580]! w-full text-xs text-black hover:cursor-pointer" variant={'outline'}>Visit Post</Button>
                    </Link>
                  )}

                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  )
}

export default SNASectionSigma