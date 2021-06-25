export class Vertex {
  isVisited: boolean;
  isObstacle: boolean;
  parent: Vertex;
  vertices: Vertex[];
  isStartVertex: boolean = false;
  isEndVertex: boolean = false;

  constructor(private rowId: number, private colId: number) {
    this.vertices = [];
    this.isObstacle = false;
  }
  public addvertex(vertex: Vertex): void {
    this.vertices.push(vertex);
  }

  public getVertices(): Vertex[] {
    return this.vertices;
  }
  public isEmpty(): boolean {
    return this.vertices.length === 0 ? true : false;
  }

  public setVisite() {
    this.isVisited = true;
  }

  public getParent(): Vertex {
    return this.parent;
  }

  public getRowColId(): number[] {
    return [this.rowId, this.colId];
  }

}
