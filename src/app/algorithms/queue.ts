export class Queue<T> {

  private items: T[];
  constructor() {

    this.items = [];

  }
  public add(item: T): void {

    this.items.push(item);

  }

  public getItems(): T[] {
    return this.items;
  }

  public pop(): T {

    let v = this.items.shift();

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
