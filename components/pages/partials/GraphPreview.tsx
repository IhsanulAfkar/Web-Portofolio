import { SigmaContainer } from '@react-sigma/core'
import { useEffect } from 'react'
import Graph from 'graphology'
import forceAtlas2 from 'graphology-layout-forceatlas2'
import { cn } from '@/lib/utils'
import SimpleGraphController from './GraphController'

import "@react-sigma/core/lib/style.css"

export default function GraphPreview({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full", className)}>

      <SigmaContainer
        style={{ height: '100vh', width: '100%', backgroundColor: 'black' }}
        settings={{
          renderLabels: true,
          labelColor: { attribute: 'labelColor' },
          labelSize: 12,
          labelFont: 'Arial',
          zIndex: true,
          allowInvalidContainer: true,
        }}
      >
        <SimpleGraphController />
      </SigmaContainer>
    </div>
  )
}