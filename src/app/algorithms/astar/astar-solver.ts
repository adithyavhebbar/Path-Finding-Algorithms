import { ListIterator } from "./list-iterator";
import { Node } from "./node";

export class AstarSolver {

  private listIterator: ListIterator;
  constructor(private nodes: Node[][], private startRow: number,
    private startCol: number, private endRow: number, private endCol: number) {
    this.listIterator = new ListIterator();
  }

  private distance(n1: Node, n2: Node): number {
    return Math.sqrt(((n1.getRowId() - n2.getRowId()) * (n1.getRowId() - n2.getRowId())) + ((n1.getColId() - n2.getColId()) * (n1.getColId() - n2.getColId())));
  }

  public run(): boolean {
    let startingNode = this.nodes[this.startRow][this.startCol];

    this.listIterator.addItem(startingNode);
    let endNode = this.nodes[this.endRow][this.endCol];

    while (!this.listIterator.isEmpty()) {

      let n = this.listIterator.getLeastGlobal();
      if(n.isEndNode) {
        return true;
      }
      n.isVisited = true;
      for (let node of n.getVertices()) {
        if (!node.isVisited && !node.isObstacle) {
          if ((n.nodeLocal + 1) < node.nodeLocal) {
            node.parent = n;
            node.nodeLocal = n.nodeLocal + 1;
            node.nodeGlobal = node.nodeLocal + this.distance(node, endNode);
            this.listIterator.addItem(node);
            node.isVisited = true;
          }
        }
      }

    }

    return false;

  }


}
