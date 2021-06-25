import { Vertex } from "./vertex/vertex";
import { Queue } from "./queue";

export class BFS {

  private queue: Queue<Vertex>;

  constructor(private vertices: Vertex[][], private startRow: number,
    private startCol: number, private endRow: number, private endCol: number) {

    this.queue = new Queue();
    console.log("Queue in constructor:", this.queue.getItems().length);

  }

  public run(): boolean {
    let i = 0;

    let startingVertex: Vertex = this.vertices[this.startRow][this.startCol];
    console.log("starting Vertex:", startingVertex);

    let endingVertex: Vertex = this.vertices[this.endRow][this.endCol];
    this.queue.add(startingVertex);

    console.log("Queue beg", this.queue);

    while (this.queue.count() > 0) {

      let v: Vertex = this.queue.pop();
      let row = v.getRowColId()[0];
      let col = v.getRowColId()[1];

      console.log(row, "::::", col);
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
      i++;
      // console.log("Queue: ", this.queue);

    }
    return false;
  }

  public printVertices(): void {
    console.log(this.vertices);
  }
}
