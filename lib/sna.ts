import { GraphNode, GraphEdge } from 'reagraph'
import { SENTIMENT_COLOR, SENTIMENT_COLOR_EDGE, SNA_COLOR, SNA_COLOR_DARKEN } from './constant'
export type TTopicMonitoring = {
  id: number,
  uuid: string,
  name: string,
  total_reach: number,
  total_engagement: number,
  popular_source: {
    name: string,
    count: number,
    total_reach: number,
    total_engagement: number
  },
  platform_stats: {
    source: string,
    reach: number,
    engagement: number
  }[]
}
export type TProgramPriority = {
  project_id: number,
  project_name: string,
  issues: TIssueMonitoringItem[]
}
export type TProject = {
  id: number;
  uuid: string;
  name: string;
  status: string;
  type: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  accounts: {
    id: number;
    uuid: string;
    name: string;
    totalPost: number;
    created_at: string;
    updated_at: string;
  }[];
  keywords: {
    id: number;
    uuid: string;
    name: string;
  }[];
  hashtags: {
    id: number;
    uuid: string;
    name: string;
  }[];
  news: {
    id: number;
    uuid: string;
    title: string;
    url: string;
  }[];
};
export type TSocketIssue = {
  task_id: number,
  step: string,
  status: string,
  message: string
}
export type TIssueMonitoringItem = {
  id: number,
  uuid: string,
  project_id: number,
  project_name: string,
  issue: string,
  description: string,
  sentiment: string,
  created_at: string,
  total_engagement: number,
  total_reach: number,
  fact: string,
  references: {
    id: number,
    uuid: string,
    title: string,
    snippet: string,
    source: string,
    link: string,
    top_issue_id: number
  }[],
  related_posts: TRelatedPost[]
}
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
export type TIssueMonitoring = {
  project_id: number,
  project_name: string,
  issues: TIssueMonitoringItem[]
}
export type NodeTree = Map<string, string[]>
export type SNAPriority = {
  nodes: GraphNode[]
  edges: GraphEdge[]
  positionMap: Map<string, { x: number; y: number; z: number }>,
  nodeTree?: NodeTree,
  parentMap?: NodeTree
}
export type SNANodeData = {
  type: string,
  parentId: string | null,
  isSupport: boolean,
  mainNode?: boolean,
  projectId?: number | string | null,
  issueId?: number | string | null,
  postId?: number | string | null,
  posts?: TRelatedPost[]
  platform?: string
}
const MIN_SIZE = 10
const MAX_SIZE = 40
export const scaleSize = (value: number, min: number, max: number) => {

  if (max === min) return (MIN_SIZE + MAX_SIZE) / 2

  return (
    MIN_SIZE +
    ((value - min) / (max - min)) * (MAX_SIZE - MIN_SIZE)
  )
}
const buildParentMap = (nodeTree: Map<string, string[]>) => {
  const parentMap = new Map<string, string[]>()

  for (const [parent, children] of nodeTree.entries()) {
    for (const child of children) {
      if (!parentMap.has(child)) {
        parentMap.set(child, [])
      }
      parentMap.get(child)!.push(parent)
    }
  }

  return parentMap
}
export const getAllAncestors = ({
  startNodeId,
  parentMap,
}: {
  parentMap?: Map<string, string[]>
  startNodeId: string
}): Set<string> => {
  if (!parentMap) return new Set()

  const result = new Set<string>()
  const stack = [startNodeId]

  while (stack.length > 0) {
    const current = stack.pop()!
    if (result.has(current)) continue

    result.add(current)

    const parents = parentMap.get(current) || []

    for (const parent of parents) {
      if (!result.has(parent)) {
        stack.push(parent)
      }
    }
  }

  return result
}
export const getAllDescendants = ({ startNodeId, nodeTree }: {
  nodeTree?: Map<string, string[]>,
  startNodeId: string
}): Set<string> => {
  if (!nodeTree) return new Set()
  const result = new Set<string>()
  const stack = [startNodeId]

  while (stack.length > 0) {
    const current = stack.pop()!
    if (result.has(current)) continue

    result.add(current)

    const children = nodeTree.get(current) || []

    for (const child of children) {
      if (!result.has(child)) {
        stack.push(child)
      }
    }
  }

  return result
}
export const buildGraphFromProgramPriority = (
  data: TProgramPriority[]
): SNAPriority => {
  const positionMap = new Map<string, { x: number; y: number; z: number }>()
  const nodeTree = new Map<string, string[]>()
  const addToTree = (parentId: string | null, childId: string) => {
    if (!parentId) return

    if (!nodeTree.has(parentId)) {
      nodeTree.set(parentId, [])
    }

    nodeTree.get(parentId)!.push(childId)
  }
  const listNodes = {
    main: [] as GraphNode[],
    topic: [] as GraphNode[],
    post: [] as GraphNode[],
    comment: [] as GraphNode[],
  }

  const edges: any[] = []

  // 📊 collect engagement values
  const issueEngagements: number[] = []
  const postEngagements: number[] = []
  const projectEngagements: number[] = []
  const projectTotals = new Map<string, number>()
  data.forEach(project => {
    const total = project.issues.reduce(
      (sum, issue) => sum + (issue.total_engagement || 0),
      0
    )

    projectTotals.set(`project-${project.project_id}`, total)
    projectEngagements.push(total)
    project.issues.forEach(issue => {
      issueEngagements.push(issue.total_engagement || 0)

      issue.related_posts.forEach(post => {
        postEngagements.push(post.stats.comments || 0)
      })
    })
  })

  const minProject = Math.min(...projectEngagements)
  const maxProject = Math.max(...projectEngagements)
  const minIssue = Math.min(...issueEngagements)
  const maxIssue = Math.max(...issueEngagements)
  const minPost = Math.min(...postEngagements)
  const maxPost = Math.max(...postEngagements)

  // 🔵 PROJECTS
  data.forEach(project => {
    const projectId = `project-${project.project_id}`
    addToTree(null, projectId)
    const mainNode: GraphNode = {
      id: projectId,
      label: project.project_name,
      size: scaleSize(
        projectTotals.get(projectId) || 0,
        minProject,
        maxProject
      ) * 0.8,
      color: '#193fb2',
      data: {
        type: 'project',
        parentId: null,
        isSupport: false,
        mainNode: true,
        projectId: project.project_id
      }
    } as GraphNode

    listNodes.main.push(mainNode)

    // 🟡 ISSUES
    project.issues.forEach(issue => {
      const issueId = `issue-${issue.id}`
      addToTree(projectId, issueId)
      const issueSentiment = issue.sentiment.toLowerCase()
      const sentimentColor = SENTIMENT_COLOR[issueSentiment]

      const issueNode: GraphNode = {
        id: issueId,
        label: issue.issue,
        size: scaleSize(issue.total_engagement, minIssue, maxIssue),
        color: sentimentColor,
        data: {
          type: 'issue',
          parentId: projectId,
          sentiment: issue.sentiment,
          isSupport: false,
          issueId: issue.id ?? null,
        } as SNANodeData
      } as GraphNode

      listNodes.topic.push(issueNode)

      edges.push({
        id: `edge-${projectId}-${issueId}`,
        source: projectId,
        target: issueId,
        fill: SENTIMENT_COLOR_EDGE[issueSentiment],
        size: 1,
        zIndex: 3,
      })

      // 🟢 POSTS
      issue.related_posts.forEach((post, postIndex) => {
        const platform = post.source.toLowerCase()

        const postId = `post-${post.post_id}-${issue.id}-${postIndex}`
        addToTree(issueId, postId)

        const postNode: GraphNode = {
          id: postId,
          label: post.author,
          size: scaleSize(post.stats.comments, minPost, maxPost) * 0.6,
          color: SNA_COLOR[platform] ?? '#b1f2ba',
          data: {
            type: 'post',
            parentId: issueId,
            sentiment: post.sentiment,
            isSupport: false,
            posts: [post],
            postId: post.post_id,
            platform
          } as SNANodeData
        } as GraphNode

        listNodes.post.push(postNode)
        const postSentiment = post.sentiment.toLowerCase()
        edges.push({
          id: `edge-${issueId}-${postId}`,
          source: issueId,
          target: postId,
          fill: SENTIMENT_COLOR_EDGE[postSentiment],
          size: 1,
          zIndex: 2,
        })

        // 🔴 COMMENTS
        const countEngagement = Math.floor(post.stats.engagement / 10)
        for (let i = 0; i < countEngagement; i++) {
          const commentId = `comment-${post.post_id}-${issue.id}-${postIndex}-${i}`
          addToTree(postId, commentId)
          listNodes.comment.push({
            id: commentId,
            label: '',
            size: 2,
            color: SNA_COLOR_DARKEN[platform] ?? '#7ca0ab',
            data: {
              parentId: postId,
              isSupport: true
            } as SNANodeData
          } as GraphNode)

          edges.push({
            id: `edge-${postId}-${commentId}`,
            fill: '#636363',
            source: postId,
            target: commentId,
            size: 1,
            zIndex: 0,
          })
        }
      })
    })
  })

  const nodes = [
    ...listNodes.comment,
    ...listNodes.post,
    ...listNodes.topic,
    ...listNodes.main
  ]
  // =========================
  // 🎯 RADIAL POSITIONING
  // =========================
  const MAIN_SPACING = 400 // distance between main clusters

  listNodes.main.forEach((mainNode, mainIndex) => {
    // 👉 distribute main nodes in big circle
    const angle = (mainIndex / listNodes.main.length) * Math.PI * 2
    const radius = MAIN_SPACING

    const mx = Math.cos(angle) * radius
    const my = Math.sin(angle) * radius

    positionMap.set(mainNode.id, { x: mx, y: my, z: 20 })

    const topics = listNodes.topic.filter(
      t => t.data.parentId === mainNode.id
    )

    // 🟡 TOPICS around main node
    topics.forEach((topic, i) => {
      const tAngle =
        (i / topics.length) * Math.PI * 2 +
        (Math.random() * 0.3 - 0.15)

      const tRadius = 80 + Math.random() * 160

      const tx = mx + Math.cos(tAngle) * tRadius
      const ty = my + Math.sin(tAngle) * tRadius

      positionMap.set(topic.id, { x: tx, y: ty, z: 10 })

      const posts = listNodes.post.filter(
        p => p.data.parentId === topic.id
      )

      // 🟢 POSTS around topic
      posts.forEach((post, j) => {
        const pAngle =
          (j / posts.length) * Math.PI * 2 +
          (Math.random() * 0.4 - 0.2)

        const pRadius = 140 + Math.random() * 80

        const px = tx + Math.cos(pAngle) * pRadius
        const py = ty + Math.sin(pAngle) * pRadius

        positionMap.set(post.id, { x: px, y: py, z: 5 })
      })
    })
  })
  // group comments by parent first (faster)
  const commentGroups = new Map<string, GraphNode[]>()

  nodes.forEach(node => {
    if (node.data?.isSupport && node.data?.parentId) {
      if (!commentGroups.has(node.data.parentId)) {
        commentGroups.set(node.data.parentId, [])
      }
      commentGroups.get(node.data.parentId)!.push(node)
    }
  })

  commentGroups.forEach((comments, parentId) => {
    const parent = positionMap.get(parentId)
    if (!parent) return

    comments.forEach((node, index) => {
      const total = comments.length || 1
      const angle = (2 * Math.PI * index) / total
      const radius = 30 + Math.random() * 80

      const x = parent.x + Math.cos(angle) * radius
      const y = parent.y + Math.sin(angle) * radius

      positionMap.set(node.id, { x, y, z: parent.z - 1 })
    })
  })
  const parentMap = buildParentMap(nodeTree)
  return {
    nodes,
    edges,
    positionMap,
    nodeTree,
    parentMap
  }
}
export const buildGraphFromInsight = (
  project: TProject,
  issues: TIssueMonitoring[]
): SNAPriority => {
  const positionMap = new Map<string, { x: number; y: number; z: number }>()
  const nodeTree = new Map<string, string[]>()
  const addToTree = (parentId: string | null, childId: string) => {
    if (!parentId) return

    if (!nodeTree.has(parentId)) {
      nodeTree.set(parentId, [])
    }

    nodeTree.get(parentId)!.push(childId)
  }
  const listNodes = {
    main: [] as GraphNode[],
    topic: [] as GraphNode[],
    post: [] as GraphNode[],
    comment: [] as GraphNode[],
  }

  const edges: any[] = []

  // 📊 collect engagement values
  const issueEngagements: number[] = []
  const postEngagements: number[] = []
  const allIssues = issues.flatMap(i => i.issues)
  allIssues.forEach(issue => {
    issueEngagements.push(issue.total_engagement || 0)
    issue.related_posts.forEach(rp => {
      postEngagements.push(rp.stats.engagement || 0)
    })
  })

  const minIssue = Math.min(...issueEngagements)
  const maxIssue = Math.max(...issueEngagements)
  const minPost = Math.min(...postEngagements)
  const maxPost = Math.max(...postEngagements)
  const projectNodeId = `project-${project.id}`

  const mainNode: GraphNode = {
    id: projectNodeId,
    label: project.name,
    size: 25,
    color: '#193fb2',
    data: {
      type: 'project',
      parentId: null,
      isSupport: false,
      mainNode: true,
      projectId: project.id
    }
  } as GraphNode

  listNodes.main.push(mainNode)
  addToTree(null, projectNodeId)
  // ISSUES
  allIssues.forEach(issue => {
    const issueId = `issue-${issue.id}`
    addToTree(projectNodeId, issueId)
    const issueSentiment = issue.sentiment.toLowerCase()
    const sentimentColor = SENTIMENT_COLOR[issueSentiment]

    const issueNode: GraphNode = {
      id: issueId,
      label: issue.issue,
      size: scaleSize(issue.total_engagement, minIssue, maxIssue),
      color: sentimentColor,
      data: {
        type: 'topic',
        parentId: projectNodeId,
        sentiment: issue.sentiment,
        isSupport: false,
        issueId: issue.id ?? null,
      } as SNANodeData
    } as GraphNode

    listNodes.topic.push(issueNode)

    edges.push({
      id: `edge-${projectNodeId}-${issueId}`,
      source: projectNodeId,
      target: issueId,
      fill: SENTIMENT_COLOR_EDGE[issueSentiment],
      size: 2,
      zIndex: 3,
    })

    // 🟢 POSTS
    issue.related_posts.forEach((post, postIndex) => {
      const platform = post.source.toLowerCase()

      const postId = `post-${issue.id}-${post.post_id}-${postIndex}`

      addToTree(issueId, postId)
      const postNode: GraphNode = {
        id: postId,
        label: post.author,
        size: scaleSize(post.stats.comments, minPost, maxPost) * 0.6,
        color: SNA_COLOR[platform] ?? '#b1f2ba',
        data: {
          type: 'post',
          parentId: issueId,
          sentiment: post.sentiment,
          isSupport: false,
          posts: [post],
          postId: post.post_id,
          platform
        } as SNANodeData
      } as GraphNode

      listNodes.post.push(postNode)
      const postSentiment = post.sentiment.toLowerCase()
      edges.push({
        id: `edge-${issueId}-${postId}`,
        source: issueId,
        target: postId,
        fill: SENTIMENT_COLOR_EDGE[postSentiment],
        size: 2,
        zIndex: 2,
      })

      // 🔴 COMMENTS
      for (let i = 0; i < post.stats.comments; i++) {
        const commentId = `comment-${postId}-${postIndex}-${i}`

        addToTree(postId, commentId)
        listNodes.comment.push({
          id: commentId,
          label: '',
          size: 2,
          color: SNA_COLOR[platform] ?? '#7ca0ab',
          data: {
            parentId: postId,
            isSupport: true
          } as SNANodeData
        } as GraphNode)

        edges.push({
          id: `edge-${postId}-${commentId}`,
          fill: '#636363',
          source: postId,
          target: commentId,
          size: 1,
          zIndex: 0,
        })
      }
    })
  })

  const nodes = [
    ...listNodes.comment,
    ...listNodes.post,
    ...listNodes.topic,
    ...listNodes.main
  ]

  // =========================
  // 🎯 RADIAL POSITIONING
  // =========================
  const MAIN_SPACING = 400 // distance between main clusters

  listNodes.main.forEach((mainNode, mainIndex) => {
    // 👉 distribute main nodes in big circle
    const angle = (mainIndex / listNodes.main.length) * Math.PI * 2
    const radius = MAIN_SPACING

    const mx = Math.cos(angle) * radius
    const my = Math.sin(angle) * radius

    positionMap.set(mainNode.id, { x: mx, y: my, z: 20 })

    const topics = listNodes.topic.filter(
      t => t.data.parentId === mainNode.id
    )

    // 🟡 TOPICS around main node
    topics.forEach((topic, i) => {
      const tAngle =
        (i / topics.length) * Math.PI * 2 +
        (Math.random() * 0.3 - 0.15)

      const tRadius = 200 + Math.random() * 160

      const tx = mx + Math.cos(tAngle) * tRadius
      const ty = my + Math.sin(tAngle) * tRadius

      positionMap.set(topic.id, { x: tx, y: ty, z: 10 })

      const posts = listNodes.post.filter(
        p => p.data.parentId === topic.id
      )

      // 🟢 POSTS around topic
      posts.forEach((post, j) => {
        const pAngle =
          (j / posts.length) * Math.PI * 2 +
          (Math.random() * 0.4 - 0.2)

        const pRadius = 80 + Math.random() * 30

        const px = tx + Math.cos(pAngle) * pRadius
        const py = ty + Math.sin(pAngle) * pRadius

        positionMap.set(post.id, { x: px, y: py, z: 5 })
      })
    })
  })
  // group comments by parent first (faster)
  const commentGroups = new Map<string, GraphNode[]>()

  nodes.forEach(node => {
    if (node.data?.isSupport && node.data?.parentId) {
      if (!commentGroups.has(node.data.parentId)) {
        commentGroups.set(node.data.parentId, [])
      }
      commentGroups.get(node.data.parentId)!.push(node)
    }
  })

  commentGroups.forEach((comments, parentId) => {
    const parent = positionMap.get(parentId)
    if (!parent) return

    comments.forEach((node, index) => {
      const total = comments.length || 1
      const angle = (2 * Math.PI * index) / total
      const radius = 30 + Math.random() * 40

      const x = parent.x + Math.cos(angle) * radius
      const y = parent.y + Math.sin(angle) * radius

      positionMap.set(node.id, { x, y, z: parent.z - 1 })
    })
  })

  return {
    nodes,
    edges,
    positionMap,
    nodeTree
  }
}
export const getNodeImage = (type: string, platform?: string) => {
  if (type === 'project') return '/assets/icons/sna/project.png'
  if (type === 'issue') return '/assets/icons/sna/issue.png'
  if (type === 'post' && platform) {
    if (platform === 'twitter') return '/assets/icons/sna/twitter.png';
    if (platform === 'instagram') return '/assets/icons/sna/instagram.png';
    if (platform === 'tiktok' || platform === 'tiktok_comment') return '/assets/icons/sna/tiktok.png';
    if (platform === 'facebook') return '/assets/icons/sna/facebook.png';
    if (platform === 'threads') return '/assets/icons/sna/threads.png';
  }
  return ''
}