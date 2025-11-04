<template>
  <div class="ladder-wrap">
    <svg :width="svgWidth" :height="svgHeight" class="ladder-svg" role="img" aria-label="game ladder">
      <path
        v-if="nodes.length > 1"
        :d="pathD"
        class="ladder-path"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        stroke-width="8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <g
        v-for="(n, i) in nodes"
        :key="n.id"
        :transform="`translate(${n.x},${n.y})`"
        @click="trySelect(n)"
      >
        <circle :r="nodeRadius" :class="['node', nodeState(n)]" />
        <text text-anchor="middle" :y="4" class="node-label">{{ n.id }}</text>
      </g>
    </svg>

    <div class="legend">
      <div class="legend-item"><span class="dot completed"></span> Completed</div>
      <div class="legend-item"><span class="dot active"></span> Current</div>
      <div class="legend-item"><span class="dot locked"></span> Locked</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Level = { id: number; title?: string }
type NodePoint = { id: number; x: number; y: number }

const props = defineProps<{
  levels: Level[]
  unlockedLevel: number
  currentLevelId: number
}>()

const emit = defineEmits<{
  (e: 'select', levelId: number): void
}>()

const svgWidth = 960
const svgHeight = 140
const nodeRadius = 28

// nodes: map levels -> SVG points (x,y). Always return an array (never undefined).
const nodes = computed<NodePoint[]>(() => {
  const arr = props.levels || []
  const count = Math.max(arr.length, 1)
  const margin = 48
  const usable = svgWidth - margin * 2
  return arr.map((lvl, i) => {
    const x = margin + (usable * i) / Math.max(1, count - 1)
    // small wave for playful feel
    const y = svgHeight / 2 + Math.sin((i / Math.max(1, count - 1)) * Math.PI * 2) * 12
    return { id: lvl.id, x, y }
  })
})

// SAFE path builder: guards against empty arrays and missing points
const pathD = computed(() => {
  const pts = nodes.value
  if (!pts || pts.length === 0) return ''

  // start path at first point
  const first = pts[0]
  if (!first) return ''

  let d = `M ${first.x} ${first.y}`

  // build smooth quadratic segments using previous -> mid control points
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const cur = pts[i]
    if (!prev || !cur) continue // defensive check for TS

    const mx = (prev.x + cur.x) / 2
    const my = (prev.y + cur.y) / 2
    d += ` Q ${prev.x} ${prev.y} ${mx} ${my}`
  }

  // final safe append: only if last exists
  const last = pts[pts.length - 1]
  if (last) {
    d += ` T ${last.x} ${last.y}`
  }

  return d
})

const nodeState = (n: NodePoint) => {
  if (n.id < props.currentLevelId) return 'completed'
  if (n.id === props.currentLevelId) return 'active'
  if (n.id <= props.unlockedLevel) return 'unlocked'
  return 'locked'
}

const trySelect = (n: NodePoint) => {
  if (n.id <= props.unlockedLevel) emit('select', n.id)
}
</script>

<style scoped>
.ladder-wrap { display:flex; flex-direction:column; align-items:center; gap:8px; }
.ladder-svg { max-width:100%; height:auto; display:block; }
.ladder-path { filter: drop-shadow(0 6px 12px rgba(0,0,0,0.6)); opacity: 0.85; }

/* node fill & states */
.node { cursor:pointer; stroke: rgba(255,255,255,0.06); stroke-width: 2; transition: all .18s ease; }
.node.completed { fill: #00c985; }
.node.active { fill: #ff6b6b; transform: scale(1.07); filter: drop-shadow(0 8px 20px rgba(255,107,107,0.25)); }
.node.unlocked { fill: #6f5cff; }
.node.locked { fill: #444; opacity:0.6; cursor:not-allowed; }

.node-label { fill: #fff; font-weight:700; font-size:14px; pointer-events:none; }
.legend { display:flex; gap:12px; margin-top:6px; color:#ddd; font-size:13px; }
.dot { width:10px; height:10px; border-radius:50%; display:inline-block; margin-right:6px; }
.dot.completed { background:#00c985; } .dot.active{ background:#ff6b6b } .dot.locked { background:#666 }
@media (max-width:720px) {
  .node-label { font-size:12px }
}
</style>
