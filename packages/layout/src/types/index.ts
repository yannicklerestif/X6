export interface NodeConfig {
  id: string
  x: number
  y: number
}

export interface EdgeConfig {
  source: string
  target: string
}

export interface ComboConfig {}

export interface GraphData {
  nodes?: NodeConfig[]
  edges?: EdgeConfig[]
  combos?: ComboConfig[]
}

export type IPointTuple = [number, number]

export type NodeIdxMap = {
  [key: string]: number
}
