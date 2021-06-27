import { ListIterator } from "./list-iterator";
import { Node } from "./node";

export class DijkstrasSolver {
  private listIterator: ListIterator;
  constructor(private nodes: Node[][], private startRow: number,
    private startCol: number, private endRow: number, private endCol: number) {
    this.listIterator = new ListIterator();
  }

  public run(): boolean {
    let startingNode = this.nodes[this.startRow][this.startCol];

    this.listIterator.addItem(startingNode);

    while (!this.listIterator.isEmpty()) {

      let n = this.listIterator.getLeastLocal();
      if (n.isEndNode) {
        return true;
      }
      n.isVisited = true;
      for (let node of n.getVertices()) {
        if (!node.isVisited && !node.isObstacle) {
          if ((n.nodeLocal + 1) < node.nodeLocal) {
            node.parent = n;
            node.nodeLocal = n.nodeLocal + 1;
            this.listIterator.addItem(node);
            node.isVisited = true;
          }
        }
      }

    }

    return false;

  }

}
