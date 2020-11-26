import {
  NodeConfig,
  EdgeConfig,
  GraphData,
  ComboConfig,
  IPointTuple,
} from './types'

export class BaseLayout {
  public nodes: NodeConfig[] | null = []
  public edges: EdgeConfig[] | null = []
  public combos: ComboConfig[] | null = []

  public positions: IPointTuple[] | null = []
  public destroyed: boolean = false

  public layout(data: GraphData) {
    this.init(data)
    this.execute()
  }

  public init(data: GraphData) {
    this.nodes = data.nodes || []
    this.edges = data.edges || []
    this.combos = data.combos || []
  }

  public execute() {}
  public executeWithWorker() {}
  public getDefaultCfg() {
    return {}
  }

  public updateCfg(cfg: any) {
    Object.assign(this, cfg)
  }

  public destroy() {
    this.positions = null
    this.nodes = null
    this.edges = null
    this.combos = null
    this.destroyed = true
  }
}
