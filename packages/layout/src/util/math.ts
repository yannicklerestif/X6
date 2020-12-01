export const getDegree = (
  n: number,
  nodeIdxMap: {
    [key: string]: number
  },
  edges: any[],
): number[] => {
  const degrees: number[] = []
  for (let i = 0; i < n; i++) {
    degrees[i] = 0
  }
  edges.forEach((e) => {
    if (e.source) {
      degrees[nodeIdxMap[e.source]] += 1
    }
    if (e.target) {
      degrees[nodeIdxMap[e.target]] += 1
    }
  })
  return degrees
}
