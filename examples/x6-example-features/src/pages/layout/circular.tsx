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

    const nodes: any[] = []
    for (let i = 1; i <= 80; i += 1) {
      nodes.push({
        shape: 'circle',
        id: `node_${i}`,
        width: 30,
        height: 30,
        label: i,
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

    const edges: any[] = []
    for (let i = 1; i <= 40; i += 1) {
      edges.push({
        source: `node_${i}`,
        target: `node_${i + 40}`,
      })
    }

    graph.doLayout(
      {
        nodes,
        edges,
      },
      {
        name: 'circular',
        width: 720,
        height: 560,
        center: [360, 280],
      },
    )

    graph.fromJSON({
      edges,
      nodes,
    })
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
