export class Queue<T> {

  private items: T[];
  constructor() {
    this.items = [];
    // console.log("In QUeee cons---------------------- &&&&&&&&&&&&&&", this.items.toString());

  }
  public add(item: T): void {
    console.log("Item in queue:", item);
    this.items.push(item);
  }

  public getItems(): T[] {
    return this.items;
  }

  public pop(): T {
    let v = this.items.shift();
    console.log("After removing an item from queue", this.items);
    return v;
  }

  public isEmpty(): boolean {
    if (this.items.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  public count(): number {
    return this.items.length;
  }
}
