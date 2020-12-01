import React from 'react'
import { Graph } from '@antv/x6'
import '../index.less'

export default class Example extends React.Component {
  private container: HTMLDivElement

  componentDidMount() {
    const graph = new Graph({
      container: this.container,
      width: 800,
      height: 600,
      grid: true,
    })

    const data = []
    for (let i = 0; i < 30; i += 1) {
      data.push({
        shape: 'rect',
        id: `node_${i}`,
        x: 40,
        y: 40,
        width: 80,
        height: 40,
        label: i + 1,
        attrs: {
          body: {
            fill: '#ff9c6e',
            stroke: '#ff7a45',
          },
          text: {
            fill: '#ffffff',
          },
        },
      })
    }

    graph.doLayout(
      'grid',
      {
        nodes: data,
      },
      {
        width: 720,
        height: 560,
        rows: 5,
        cols: 6,
        name: 'sss',
      },
    )

    graph.fromJSON(data)
  }

  refContainer = (container: HTMLDivElement) => {
    this.container = container
  }

  render() {
    return (
      <div className="x6-graph-wrap">
        <div ref={this.refContainer} className="x6-graph" />
      </div>
    )
  }
}
