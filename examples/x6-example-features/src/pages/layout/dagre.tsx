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

    const data = {
      nodes: [
        {
          id: '1',
          width: 80,
          height: 40,
          shape: 'rect',
          label: 'node',
          attrs: {
            body: {
              stroke: '#ff7a45',
              fill: '#ff9c6e'
            },
            text: {
              fill: '#ffffff'
            }
          }
        },
        {
          id: '2',
          width: 80,
          height: 40,
          shape: 'rect',
          label: 'node',
          attrs: {
            body: {
              stroke: '#ff7a45',
              fill: '#ff9c6e'
            },
            text: {
              fill: '#ffffff'
            }
          }
        },
        {
          id: '3',
          width: 80,
          height: 40,
          shape: 'rect',
          label: 'node',
          attrs: {
            body: {
              stroke: '#ff7a45',
              fill: '#ff9c6e'
            },
            text: {
              fill: '#ffffff'
            }
          }
        },
        {
          id: '4',
          width: 80,
          height: 40,
          shape: 'rect',
          label: 'node',
          attrs: {
            body: {
              stroke: '#ff7a45',
              fill: '#ff9c6e'
            },
            text: {
              fill: '#ffffff'
            }
          }
        },
        {
          id: '5',
          width: 80,
          height: 40,
          shape: 'rect',
          label: 'node',
          attrs: {
            body: {
              stroke: '#ff7a45',
              fill: '#ff9c6e'
            },
            text: {
              fill: '#ffffff'
            }
          }
        },
        {
          id: '6',
          width: 80,
          height: 40,
          shape: 'rect',
          label: 'node',
          attrs: {
            body: {
              stroke: '#ff7a45',
              fill: '#ff9c6e'
            },
            text: {
              fill: '#ffffff'
            }
          }
        },
        {
          id: '7',
          width: 80,
          height: 40,
          shape: 'rect',
          label: 'node',
          attrs: {
            body: {
              stroke: '#ff7a45',
              fill: '#ff9c6e'
            },
            text: {
              fill: '#ffffff'
            }
          }
        },
        {
          id: '8',
          width: 80,
          height: 40,
          shape: 'rect',
          label: 'node',
          attrs: {
            body: {
              stroke: '#ff7a45',
              fill: '#ff9c6e'
            },
            text: {
              fill: '#ffffff'
            }
          }
        },
      ],
      edges: [
        {
          source: '1',
          target: '2',
        },
        {
          source: '1',
          target: '3',
        },
        {
          source: '2',
          target: '4',
        },
        {
          source: '3',
          target: '4',
        },
        {
          source: '4',
          target: '5',
        },
        {
          source: '5',
          target: '6',
        },
        {
          source: '6',
          target: '7',
        },
        {
          source: '6',
          target: '8',
        },
      ],
    };

    graph.doLayout(
      data,
      {
        name: 'dagre',
        ranksep: 10,
        controlPoints: true,
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
