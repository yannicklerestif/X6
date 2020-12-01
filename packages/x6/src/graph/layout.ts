import { Base } from './base'
import { Model } from '../model/model'
import { Layout, Registy } from '@antv/layout'

export class LayoutManager extends Base {
  public layout: Layout.Base

  doLayout(data: Model.FromJSONData, options: LayoutManager.LayoutOptions) {
    const name = options.name
    const LayoutClass = Registy.getLayoutByName(name)
    if (!LayoutClass) {
      throw new Error('the layout type could not be found')
    }
    this.layout = new LayoutClass()
    this.layout.updateCfg(options)
    this.layout.layout(data as Layout.Model)
  }

  @Base.dispose()
  dispose() {
    if (this.layout) {
      this.layout.destroy()
    }
  }
}

export namespace LayoutManager {
  export type LayoutOptions = Registy.LayoutOptions
}
