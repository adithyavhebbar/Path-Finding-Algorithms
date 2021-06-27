import { Node } from "./node";
export class ListIterator {

  private list: Node[];
  constructor() {
    this.list = [];
  }

  public addItem(item: Node): void {
    this.list.push(item);
  }

  public getLeastGlobal(): Node {
    this.sortGlobal();
    return this.list.shift();
  }

  public getLeastLocal(): Node {
    this.sortLocal();
    return this.list.shift();
  }

  public isEmpty(): boolean {
    return this.list.length === 0;
  }

  private sortGlobal() {
    this.list.sort((node1: Node, node2: Node) => node1.nodeGlobal - node2.nodeGlobal);
  }

  private sortLocal() {
    this.list.sort((node1: Node, node2: Node) => node1.nodeLocal - node2.nodeLocal);
  }
}
