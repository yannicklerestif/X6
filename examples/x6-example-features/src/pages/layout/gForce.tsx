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
    for (let i = 1; i <= 100; i += 1) {
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
    for (let i = 1; i <= 100; i += 1) {
      if (i <= 49) {
        edges.push({
          source: `node_${i}`,
          target: 'node_50',
        })
      } else if (i === 50) {
        edges.push({
          source: 'node_50',
          target: 'node_100',
        })
      } else if (i < 100) {
        edges.push({
          source: `node_${i}`,
          target: 'node_100',
        })
      }
    }

    graph.doLayout(
      {
        nodes,
        edges,
      },
      {
        name: 'gForce',
        width: 720,
        height: 560,
        center: [360, 280],
        linkDistance: 50,
        nodeStrength: 30,
        edgeStrength: 0.1,
        nodeSize: 30,
        tick: () => {
          graph.fromJSON({
            nodes,
            edges,
          })
        },
      },
    )
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
