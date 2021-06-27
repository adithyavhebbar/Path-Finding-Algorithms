export class Node {
  isVisited: boolean;
  isObstacle: boolean;
  parent: Node;
  vertices: Node[];
  isStartNode: boolean = false;
  isEndNode: boolean = false;
  nodeLocal: number = Infinity;
  nodeGlobal: number = Infinity;

  constructor(private rowId: number, private colId: number) {
    this.vertices = [];
    this.isObstacle = false;
  }
  public addNode(Node: Node): void {
    this.vertices.push(Node);
  }

  public getVertices(): Node[] {
    return this.vertices;
  }
  public isEmpty(): boolean {
    return this.vertices.length === 0 ? true : false;
  }

  public setVisite() {
    this.isVisited = true;
  }

  public getParent(): Node {
    return this.parent;
  }

  public getRowId(): number {
    return this.rowId;
  }

  public getColId(): number {
    return this.colId;
  }

}
