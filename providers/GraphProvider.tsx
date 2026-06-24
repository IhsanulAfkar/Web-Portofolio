'use client'
import { createContext, useContext, useMemo, useState } from 'react'
import { getAllDescendants, SNAPriority } from '@/lib/sna'

type GraphItem = {
  id: number | string
  type: "project" | "issue" | "post"
}

type GraphFilterContextType = {
  selectedGraphs: GraphItem[]
  setSelectedGraphs: React.Dispatch<React.SetStateAction<GraphItem[]>>
  isChecked: (id: any, type: string) => boolean
  applyWithChildren: (
    item: GraphItem,
    checked: boolean,
    graph: SNAPriority
  ) => void
  filterState: {
    projectIds: Set<any>
    issueIds: Set<any>
    isEmpty: boolean
  }
}

const GraphFilterContext = createContext<GraphFilterContextType | null>(null)

export const GraphProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedGraphs, setSelectedGraphs] = useState<GraphItem[]>([])

  const isChecked = (id: any, type: string) => {
    return selectedGraphs.some((s) => s.id == id && s.type === type)
  }

  const applyWithChildren = (
    item: GraphItem,
    checked: boolean,
    graph: SNAPriority
  ) => {
    setSelectedGraphs((prev) => {
      const key = `${item.type}-${item.id}`

      const descendants = getAllDescendants({
        startNodeId: key,
        nodeTree: graph.nodeTree,
      })

      descendants.add(key)

      if (checked) {
        const newItems = [...prev]

        descendants.forEach((nodeId) => {
          const [type, id] = nodeId.split("-")
          if (type === 'post' || type === 'comment') return

          if (!newItems.some((p) => p.id == id && p.type === type)) {
            newItems.push({ id, type: type as any })
          }
        })

        return newItems
      } else {
        return prev.filter(
          (p) => !descendants.has(`${p.type}-${p.id}`)
        )
      }
    })
  }

  const filterState = useMemo(() => ({
    projectIds: new Set(selectedGraphs.filter(s => s.type === "project").map(s => s.id)),
    issueIds: new Set(selectedGraphs.filter(s => s.type === "issue").map(s => s.id)),
    isEmpty: selectedGraphs.length === 0
  }), [selectedGraphs])

  return (
    <GraphFilterContext.Provider
      value={{
        selectedGraphs,
        setSelectedGraphs,
        isChecked,
        applyWithChildren,
        filterState
      }}
    >
      {children}
    </GraphFilterContext.Provider>
  )
}

export const useGraphFilter = () => {
  const ctx = useContext(GraphFilterContext)
  if (!ctx) throw new Error("useGraphFilter must be used inside GraphProvider")
  return ctx
}