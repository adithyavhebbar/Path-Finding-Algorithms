import { Component, OnInit } from '@angular/core';
import { Vertex } from '../vertex/vertex';
import { BFS } from "../bfs";
import { DFS } from '../dfs';


@Component({
  selector: 'app-vertex',
  templateUrl: './vertex.component.html',
  styleUrls: ['./vertex.component.css']
})



export class VertexComponent implements OnInit {

  private readonly numberOfColumns = 40;
  private readonly numberOfROws = 20;

  selectedAlgorithm: string = "BFS";

  nRows: number[] = [];
  nCols: number[] = [];

  startRow: number = Math.floor(Math.random() * this.numberOfROws);
  startCol: number = Math.floor(Math.random() * this.numberOfColumns);

  endRow: number = Math.floor(Math.random() * this.numberOfROws);
  endCol: number = Math.floor(Math.random() * this.numberOfColumns);

  vertices: Vertex[][] = [[]];
  obstacle: boolean[][] = [[]];

  shortestPath: boolean[][] = [[]];
  // queue: Queue<Vertex> = new Queue();

  /* Algorithm initilization */

  /* Breadth first Search */
  bfs: BFS;

  /* Depth First Search */
  dfs: DFS;



  constructor() {

    this.vertices = [];

    for (let i = 0; i < this.numberOfROws; i++) {
      this.nRows.push(i);
    }

    for (let i = 0; i < this.numberOfColumns; i++) {
      this.nCols.push(i);
    }

    this.initialize();
    this.initializeObstacle();
    this.initializeShortestPath();

  }

  ngOnInit() {

    this.addNeighbours();

  }

  public initialize(): void {

    for (let i = 0; i < this.numberOfROws; i++) {
      this.vertices[i] = [];
      for (let j = 0; j < this.numberOfColumns; j++) {
        this.vertices[i][j] = new Vertex(i, j);
        this.vertices[i][j].isVisited = false;
        this.vertices[i][j].vertices = [];
        if (i === this.startRow && j === this.startCol) {
          this.vertices[i][j].isStartVertex = true;
        }
        if (i === this.endRow && j === this.endCol) {
          this.vertices[i][j].isEndVertex = true;
        }
      }
    }

  }

  public initializeObstacle(): void {
    for (let i = 0; i < this.numberOfROws; i++) {
      this.obstacle[i] = [];
      for (let j = 0; j < this.numberOfColumns; j++) {
        this.obstacle[i][j] = false;
      }
    }
  }

  public initializeShortestPath(): void {

    for (let i = 0; i < this.numberOfROws; i++) {
      this.shortestPath[i] = [];
      for (let j = 0; j < this.numberOfColumns; j++) {
        this.shortestPath[i][j] = false;
      }
    }

  }

  public addNeighbours(): void {

    for (let i = 0; i < this.numberOfROws; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        if (this.vertices[i][j + 1] !== undefined)
          this.vertices[i][j].addvertex(this.vertices[i][j + 1]);

        if (this.vertices[i + 1] !== undefined && this.vertices[i + 1][j] !== undefined)
          this.vertices[i][j].addvertex(this.vertices[i + 1][j]);

        if (this.vertices[i - 1] !== undefined && this.vertices[i - 1][j] !== undefined)
          this.vertices[i][j].addvertex(this.vertices[i - 1][j]);

        if (this.vertices[i][j - 1] !== undefined)
          this.vertices[i][j].addvertex(this.vertices[i][j - 1]);

      }
    }

  }

  public doNothing(event): void {
    event.preventDefault();
  }
  onRightClick(event: any, row: number, col: number) {

    event.preventDefault();
    if (!(row === this.startRow && col === this.endCol)
      && !(row === this.endRow && col === this.endCol)) {
      this.obstacle[row][col] = !this.obstacle[row][col];
      this.vertices[row][col].isObstacle = !this.vertices[row][col].isObstacle;
      this.shortestPath[row][col] = false;
      this.vertices[row][col].isVisited = false;
      this.startAlgorithm();
    }

  }

  public reset(): void {
    for (let i = 0; i < this.numberOfROws; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        this.vertices[i][j].isVisited = false;
      }
    }
  }

  public startAlgorithm() {

    this.addNeighbours();
    this.initializeShortestPath();
    this.reset();
    if (this.selectedAlgorithm === 'BFS') {
      this.bfs = new BFS(this.vertices, this.startRow, this.startCol, this.endRow, this.endCol);

      let pathExists = this.bfs.run();

      console.log("Path exists:", pathExists);
      if (pathExists) {

        let v = this.vertices[this.endRow][this.endCol].getParent();

        while (!v.isStartVertex === true) {
          this.shortestPath[v.getRowColId()[0]][v.getRowColId()[1]] = true;
          v = v.getParent();
        }
      }
    }

    if (this.selectedAlgorithm === 'DFS') {
      this.dfs = new DFS(this.vertices, this.startRow, this.startCol, this.endRow, this.endCol);
      let pathExists = this.dfs.run();

      console.log("Path exists:", pathExists);
      if (pathExists) {
        console.log("%%%%%%%%%%%%%%%%")
        let v = this.vertices[this.endRow][this.endCol].getParent();
        console.log(this.vertices[this.endRow][this.endCol]);
        while (!v.isStartVertex === true) {
          this.shortestPath[v.getRowColId()[0]][v.getRowColId()[1]] = true;
          v = v.getParent();
        }
      }
    }

  }

}


