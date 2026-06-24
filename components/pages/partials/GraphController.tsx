import { useLoadGraph, useSigma } from "@react-sigma/core"
import Graph from "graphology"
import { useEffect } from "react"

export default function SimpleGraphController() {
  const loadGraph = useLoadGraph()
  const sigma = useSigma()

  useEffect(() => {
    const graph = new Graph()

    const nodes = ["1", "2", "3", "4", "5"]
    const radius = 1.5

    nodes.forEach((id, i) => {
      const angle = (i / nodes.length) * Math.PI * 2

      graph.addNode(id, {
        size: id === "1" ? 12 : 8,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        color: "#999",
        label: id,
      })
    })
    const edges = [
      ['1', '2'],
      ['1', '3'],
      ['1', '4'],
    ]

    edges.forEach(([source, target]) => {
      graph.addEdge(source, target)
    })

    loadGraph(graph)

    // 🔥 SAME PATTERN AS YOUR WORKING CODE
    requestAnimationFrame(() => {
      sigma.refresh()
      sigma.getCamera().animatedReset()
    })
  }, [loadGraph, sigma])

  return null
}