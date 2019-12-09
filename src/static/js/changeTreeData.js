let arr = []
export default function mapTree(list) {
  for (let i = 0; i < list.length; i++) {
    let o = list[i]
    for (let j = 0; j < list.length; j++) {
      let m = list[j]
      if (o.id === m.pId) {
        o.children = m
        arr.push(o)
        list.splice(i, 1)
      }
    }
  }
  return arr
}


