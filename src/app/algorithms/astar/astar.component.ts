import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Node } from "./node";
import { AstarSolver } from "./astar-solver";
import { DijkstrasSolver } from './dijkstras-solver';



@Component({
  selector: 'app-astar',
  templateUrl: './astar.component.html',
  styleUrls: ['./astar.component.css']
})
export class AstarComponent implements OnInit {

  @ViewChild('instructions', { static: false}) instructions: TemplateRef<any>;

  private readonly numberOfColumns = 40;
  private readonly numberOfROws = 20;

  selectedAlgorithm: string = "Dijkstras";

  nRows: number[] = [];
  nCols: number[] = [];

  // startRow: number = Math.floor(Math.random() * this.numberOfROws);
  startRow: number = 7

  // startCol: number = Math.floor(Math.random() * this.numberOfColumns);
  startCol: number = 3

  // endRow: number = Math.floor(Math.random() * this.numberOfROws);
  endRow: number = 7
  endCol: number = 23;

  nodes: Node[][] = [[]];
  obstacle: boolean[][] = [[]];

  shortestPath: boolean[][] = [[]];
  // queue: Queue<node> = new Queue();

  /* Algorithm initilization */
  astarSolver: AstarSolver;

  dijKstra: DijkstrasSolver;


  constructor(private dialog: MatDialog) {

    this.nodes = [];

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
      this.nodes[i] = [];
      for (let j = 0; j < this.numberOfColumns; j++) {
        this.nodes[i][j] = new Node(i, j);
        this.nodes[i][j].isVisited = false;
        this.nodes[i][j].vertices = [];
        if (i === this.startRow && j === this.startCol) {
          this.nodes[i][j].isStartNode = true;
          this.nodes[i][j].nodeLocal = 0;
        }
        if (i === this.endRow && j === this.endCol) {
          this.nodes[i][j].isEndNode = true;
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
        if (this.nodes[i][j + 1] !== undefined)
          this.nodes[i][j].addNode(this.nodes[i][j + 1]);

        if (this.nodes[i + 1] !== undefined && this.nodes[i + 1][j] !== undefined)
          this.nodes[i][j].addNode(this.nodes[i + 1][j]);

        if (this.nodes[i - 1] !== undefined && this.nodes[i - 1][j] !== undefined)
          this.nodes[i][j].addNode(this.nodes[i - 1][j]);

        if (this.nodes[i][j - 1] !== undefined)
          this.nodes[i][j].addNode(this.nodes[i][j - 1]);

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
      this.nodes[row][col].isObstacle = !this.nodes[row][col].isObstacle;
      this.shortestPath[row][col] = false;
      this.nodes[row][col].isVisited = false;
      this.nodes[row][col].nodeLocal = Infinity;
      this.nodes[row][col].nodeGlobal = Infinity;
      this.startAlgorithm();
    }

  }

  private reset(): void {
    for (let i = 0; i < this.numberOfROws; i++) {
      for (let j = 0; j < this.numberOfColumns; j++) {
        this.nodes[i][j].isVisited = false;
        if (!this.nodes[i][j].isStartNode) {
          this.nodes[i][j].nodeLocal = Infinity;
          this.nodes[i][j].nodeGlobal = Infinity;
        }
      }
    }

  }


  public startAlgorithm() {

    // this.addNeighbours();
    this.initializeShortestPath();
    this.reset();

    if (this.selectedAlgorithm === 'Astar') {
      this.astarSolver = new AstarSolver(this.nodes, this.startRow, this.startCol, this.endRow, this.endCol);

      if (this.astarSolver.run()) {
        if (this.nodes[this.endRow][this.endCol].getParent()) {
          console.log("Path exists", true);
          let n = this.nodes[this.endRow][this.endCol].getParent();
          while (!n.isStartNode === true) {
            this.shortestPath[n.getRowId()][n.getColId()] = true;
            n = n.getParent();
          }
        }
      } else {
        console.log("Path exists", false);
      }
    }

    if (this.selectedAlgorithm === 'Dijkstras') {
      this.dijKstra = new DijkstrasSolver(this.nodes, this.startRow, this.startCol, this.endRow, this.endCol);

      if (this.dijKstra.run()) {
        console.log("Path exists");
        if (this.nodes[this.endRow][this.endCol].getParent()) {
          console.log("Path exists", true);
          let n = this.nodes[this.endRow][this.endCol].getParent();
          while (!n.isStartNode === true) {
            this.shortestPath[n.getRowId()][n.getColId()] = true;
            n = n.getParent();
          }
        }
      } else {
        console.log("Path does not exists");
      }
    }
  }

  public openDialog(instruction: TemplateRef<any>): void {
    const ref = this.dialog.open(this.instructions);
    ref.afterClosed().subscribe(() => {
      console.log("Closed")
    })
  }

}
