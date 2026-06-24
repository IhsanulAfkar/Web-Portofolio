import { useEffect, useMemo, useRef } from "react"
import { useSigma, useLoadGraph, useRegisterEvents } from "@react-sigma/core"
import Graph from "graphology"
import { getAllAncestors, getAllDescendants, getNodeImage, SNANodeData, SNAPriority } from "@/lib/sna"

const INACTIVE_COLOR = '#1b1b1c'

export const GraphDataController = ({ graph, filterState, onNodeClick }: {
  graph: SNAPriority,
  filterState: {
    projectIds: Set<string | number>;
    issueIds: Set<string | number>;
    isEmpty: boolean;
  },
  onNodeClick: (data: SNANodeData) => void
}) => {

  const sigma = useSigma()
  const loadGraph = useLoadGraph()
  const registerEvents = useRegisterEvents()
  const hoveredNodeRef = useRef<string | null>(null)
  const relatedCacheRef = useRef<Set<string> | null>(null)
  const nodeTreeRef = useRef(graph.nodeTree)
  const parentMapRef = useRef(graph.parentMap)
  useEffect(() => {
    nodeTreeRef.current = graph.nodeTree
    parentMapRef.current = graph.parentMap
  }, [graph])
  useEffect(() => {
    const fullGraph = new Graph();

    graph.nodes.forEach((node) => {
      if (!node?.data) return;
      const pos = graph.positionMap.get(node.id) || { x: Math.random(), y: Math.random() };
      fullGraph.addNode(node.id, {
        ...node.data, // Spread data directly for easier access
        x: pos.x,
        y: pos.y,
        label: node.label || "",
        size: node.size || 6,
        color: (node as any).color || "#999",
        labelColor: "#ffffff",
        type: "circle",
        data: node.data,
        image: getNodeImage(node.data.type, node.data.platform)
      });
    });

    graph.edges.forEach((edge) => {
      if (fullGraph.hasNode(edge.source) && fullGraph.hasNode(edge.target)) {
        fullGraph.addEdge(edge.source, edge.target, { size: edge.size, color: edge.fill || "#ccc" });
      }
    });
    const nodesToKeep = new Set<string>();

    if (filterState.isEmpty) {
      fullGraph.forEachNode((node) => nodesToKeep.add(node));
    } else {
      // ✅ HANDLE PROJECTS
      filterState.projectIds.forEach((projectId) => {
        const nodeId = `project-${projectId}`;

        nodesToKeep.add(nodeId);

        const descendants = getAllDescendants({
          startNodeId: nodeId,
          nodeTree: nodeTreeRef.current,
        });

        descendants.forEach((d) => nodesToKeep.add(d));
      });

      // ✅ HANDLE ISSUES
      filterState.issueIds.forEach((issueId) => {
        const nodeId = `issue-${issueId}`;

        nodesToKeep.add(nodeId);

        const descendants = getAllDescendants({
          startNodeId: nodeId,
          nodeTree: nodeTreeRef.current,
        });

        descendants.forEach((d) => nodesToKeep.add(d));
      });
    }

    const filteredGraph = new Graph();
    nodesToKeep.forEach((id) => {
      if (
        fullGraph.hasNode(id) &&
        !filteredGraph.hasNode(id)
      ) {
        filteredGraph.addNode(
          id,
          fullGraph.getNodeAttributes(id)
        );
      }
    });
    fullGraph.forEachEdge((edge, attr, source, target) => {
      if (nodesToKeep.has(source) && nodesToKeep.has(target)) {
        filteredGraph.addEdgeWithKey(edge, source, target, attr);
      }
    });

    loadGraph(filteredGraph);
    sigma.getCamera().animatedReset();
  }, [graph, loadGraph, sigma, filterState]);

  // ✅ 2. INTERACTION EVENTS
  useEffect(() => {
    registerEvents({
      enterNode: ({ node }) => {
        hoveredNodeRef.current = node
        const descendants = getAllDescendants({
          startNodeId: node,
          nodeTree: nodeTreeRef.current
        })

        const ancestors = getAllAncestors({
          startNodeId: node,
          parentMap: parentMapRef.current
        })

        relatedCacheRef.current = new Set([
          ...descendants,
          ...ancestors
        ])

        sigma.refresh()
      },
      leaveNode: () => {
        hoveredNodeRef.current = null
        relatedCacheRef.current = null

        sigma.refresh()
      },
      clickNode: (e) => {
        const n = sigma.getGraph().getNodeAttributes(e.node)
        onNodeClick({
          ...n.data
        })
      },
    });
  }, [sigma, registerEvents]);

  // ✅ 3. VISUAL REDUCERS (Hover & Highlight)
  useEffect(() => {
    const g = sigma.getGraph();

    sigma.setSetting("nodeReducer", (node, data) => {
      const hovered = hoveredNodeRef.current;
      const relatedNodes = relatedCacheRef.current;
      const isHovered = node === hovered;
      const isVisible =
        !hovered || relatedNodes?.has(node);

      return {
        ...data,
        color: isVisible ? data.color : INACTIVE_COLOR,
        labelColor: isHovered ? '#000000' : '#ffffff',
        opacity: isVisible ? 1 : 0.1,
        zIndex: isHovered ? 999 : isVisible ? 10 : 1,
        label: isVisible ? data.label : "",
        size: data.size,
      };
    });

    sigma.setSetting("edgeReducer", (edge, data) => {
      const hovered = hoveredNodeRef.current;
      const relatedNodes = relatedCacheRef.current;

      const [source, target] = g.extremities(edge);

      const isVisible =
        !hovered ||
        (relatedNodes?.has(source) && relatedNodes?.has(target));

      return {
        ...data,
        color: data.color,
        opacity: isVisible ? 0.4 : 0.05,
        hidden: !isVisible && !!hovered,
      };
    });

    sigma.refresh();
  }, [sigma, filterState]);

  return null;
}