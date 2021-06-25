export class Stack<T> {

  private items: T[];
  constructor() {
    this.items = [];
  }

  public add(item: T): void {
    this.items.push(item);
  }

  public peek(): T {
    return this.items.pop();
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }

}
