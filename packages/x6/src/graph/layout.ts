import { Base } from './base'
import { Model } from '../model/model'
import { Layout, Registy } from '@antv/layout'
import { LayoutOptions } from '@antv/layout/lib/registy'

export class LayoutManager extends Base {
  public layout: Layout.Base

  doLayout(name: string, data: Model.FromJSONData, options: LayoutOptions) {
    const LayoutClass = Registy.getLayoutByName(name)
    if (!LayoutClass) {
      throw new Error('the layout type could not be found')
    }

    this.layout = new LayoutClass()
    this.layout.updateCfg(options)

    this.graph.trigger('layout:start')
    this.layout.layout(data as Layout.Model)
    this.graph.trigger('layout:end')
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
