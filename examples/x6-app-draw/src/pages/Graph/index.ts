import { Graph, Addon, FunctionExt, Shape, Cell } from '@antv/x6'
import './shape'
import graphData from './data'

export default class FlowGraph {
  public static graph: Graph
  private static stencil: Addon.Stencil

  public static init() {
    this.graph = new Graph({
      container: document.getElementById('container')!,
      width: 1000,
      height: 800,
      grid: {
        size: 10,
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#cccccc',
            thickness: 1,
          },
          {
            color: '#5F95FF',
            thickness: 1,
            factor: 4,
          },
        ],
      },
      selecting: {
        enabled: true,
        multiple: true,
        rubberband: true,
        movable: true,
        showNodeSelectionBox: true,
      },
      connecting: {
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        highlight: true,
        snap: true,
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#5F95FF',
                strokeWidth: 1,
                targetMarker: {
                  name: 'classic',
                  size: 8,
                },
              },
            },
            router: {
              name: 'manhattan',
            },
          })
        },
        validateConnection({
          sourceView,
          targetView,
          sourceMagnet,
          targetMagnet,
        }) {
          if (sourceView === targetView) {
            return false
          }
          if (!sourceMagnet) {
            return false
          }
          if (!targetMagnet) {
            return false
          }
          return true
        },
      },
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: 'rgba(223,234,255)',
            },
          },
        },
      },
      snapline: false,
      history: true,
      clipboard: {
        enabled: true,
      },
      keyboard: {
        enabled: true,
      },
      embedding: {
        enabled: true,
        findParent({ node }) {
          const bbox = node.getBBox()
          // if the moving node is a parent itself, don't try to embed it
          const data = node.getData<any>()
          if (data && data.parent) {
            return []
          }
          return this.getNodes().filter((node) => {
            // only embed into parent nodes
            const data = node.getData<any>()
            if (data && data.parent) {
              const targetBBox = node.getBBox()
              return bbox.isIntersectWithRect(targetBBox)
            }
            return false
          })
        },
      },
    })
    this.initStencil()
    this.initShape()
    this.initGraphShape()
    this.initEvent()
    return this.graph
  }

  private static initStencil() {
    this.stencil = new Addon.Stencil({
      target: this.graph,
      stencilGraphWidth: 280,
      search: { rect: true },
      collapsable: true,
      groups: [
        {
          name: 'basic',
          title: 'Basic',
          graphHeight: 180,
        },
        {
          name: 'combination',
          title: 'Combination',
          layoutOptions: {
            columns: 1,
            marginX: 60,
          },
          // was 260 before I removed c3 (see below)
          graphHeight: 180,
        },
        {
          name: 'group',
          title: 'Group',
          graphHeight: 100,
          layoutOptions: {
            columns: 1,
            marginX: 60,
          },
        },
      ],
    })
    const stencilContainer = document.querySelector('#stencil')
    stencilContainer?.appendChild(this.stencil.container)
  }

  private static initShape() {
    const { graph } = this
    const r1 = graph.createNode({
      shape: 'flow-chart-rect',
      attrs: {
        body: {
          rx: 24,
          ry: 24,
        },
        text: {
          text: 'Rounded',
        },
      },
    })
    const r2 = graph.createNode({
      shape: 'flow-chart-rect',
      attrs: {
        text: {
          text: 'Rectangle',
        },
      },
    })
    const r3 = graph.createNode({
      shape: 'flow-chart-rect',
      width: 52,
      height: 52,
      angle: 45,
      attrs: {
        'edit-text': {
          style: {
            transform: 'rotate(-45deg)',
          },
        },
        text: {
          text: 'Losange',
          transform: 'rotate(-45deg)',
        },
      },
      ports: {
        groups: {
          top: {
            position: {
              name: 'top',
              args: {
                dx: -26,
              },
            },
          },
          right: {
            position: {
              name: 'right',
              args: {
                dy: -26,
              },
            },
          },
          bottom: {
            position: {
              name: 'bottom',
              args: {
                dx: 26,
              },
            },
          },
          left: {
            position: {
              name: 'left',
              args: {
                dy: 26,
              },
            },
          },
        },
      },
    })
    const r4 = graph.createNode({
      shape: 'flow-chart-rect',
      width: 70,
      height: 70,
      attrs: {
        body: {
          rx: 35,
          ry: 35,
        },
        text: {
          text: 'Circle',
        },
      },
    })

    const c1 = graph.createNode({
      shape: 'flow-chart-image-rect',
    })
    const c2 = graph.createNode({
      shape: 'flow-chart-title-rect',
    })
    const c3 = graph.createNode({
      shape: 'flow-chart-animate-text',
    })

    const g1 = graph.createNode({
      shape: 'groupNode',
      attrs: {
        text: {
          text: 'Group Name',
        },
      },
      data: {
        parent: true,
      },
    })
    this.stencil.load([r1, r2, r3, r4], 'basic')
    // c3 has... too much animation :)
    this.stencil.load([c1, c2 /*, c3*/], 'combination')
    this.stencil.load([g1], 'group')
  }

  private static initGraphShape() {
    this.graph.fromJSON(graphData as any)
  }

  private static showPorts(ports: NodeListOf<SVGAElement>, show: boolean) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }

  private static initEvent() {
    const { graph } = this
    const container = document.getElementById('container')!

    graph.on('node:contextmenu', ({ cell, view }) => {
      const oldText = cell.attr('text/text') as string
      cell.attr('text/style/display', 'none')
      const elem = view.container.querySelector('.x6-edit-text') as HTMLElement
      if (elem) {
        elem.innerText = oldText
        elem.focus()
      }
      const onBlur = () => {
        cell.attr('text/text', elem.innerText)
      }
      elem.addEventListener('blur', () => {
        onBlur()
        elem.removeEventListener('blur', onBlur)
      })
    })
    graph.on(
      'node:mouseenter',
      FunctionExt.debounce(() => {
        const ports = container.querySelectorAll(
          '.x6-port-body',
        ) as NodeListOf<SVGAElement>
        this.showPorts(ports, true)
      }),
      500,
    )
    graph.on('node:mouseleave', () => {
      const ports = container.querySelectorAll(
        '.x6-port-body',
      ) as NodeListOf<SVGAElement>
      this.showPorts(ports, false)
    })

    graph.on('node:collapse', ({ node, e }: any) => {
      e.stopPropagation()
      node.toggleCollapse()
      const collapsed = node.isCollapsed()
      const cells = node.getDescendants()
      cells.forEach((n: Cell) => {
        if (collapsed) {
          n.hide()
        } else {
          n.show()
        }
      })
    })

    graph.bindKey('backspace', () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.removeCells(cells)
      }
    })
  }
}
