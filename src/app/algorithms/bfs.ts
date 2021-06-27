import { Vertex } from "./vertex/vertex";
import { Queue } from "./queue";

export class BFS {

  private queue: Queue<Vertex>;

  constructor(private vertices: Vertex[][], private startRow: number,
    private startCol: number, private endRow: number, private endCol: number) {

    this.queue = new Queue();

  }

  public run(): boolean {

    let startingVertex: Vertex = this.vertices[this.startRow][this.startCol];

    this.queue.add(startingVertex);


    while (this.queue.count() > 0) {

      let v: Vertex = this.queue.pop();
      let row = v.getRowColId()[0];
      let col = v.getRowColId()[1];

      if (v.isEndVertex || (row === this.endRow && col === this.endCol)) {
        return true;
      }

      v.isVisited = true;


      let nodes = v.getVertices();
      for (let node of nodes) {
        if (!node.isVisited && !node.isObstacle) {
          node.parent = v;
          node.isVisited = true;
          this.queue.add(node);
        }
      }

    }
    return false;
  }

}
