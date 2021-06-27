import { Stack } from "./stack";
import { Vertex } from "./vertex/vertex";

export class DFS {

  private stack: Stack<Vertex>;

  constructor(private vertices: Vertex[][], private startRow: number,
    private startCol: number, private endRow: number, private endCol: number) {
    this.stack = new Stack();
  }

  public run(): boolean {
    let startingVertex: Vertex = this.vertices[this.startRow][this.startCol];

    this.stack.add(startingVertex);

    while (!this.stack.isEmpty()) {
      let v = this.stack.peek();

      v.isVisited = true;

      if (v.isEndVertex) {
        return true;
      }

      for (let node of v.getVertices()) {
        if (!node.isVisited && !node.isObstacle) {
          this.stack.add(node);
          node.isVisited = true;
          node.parent = v;
        }
      }
    }
    return false;
  }
}
