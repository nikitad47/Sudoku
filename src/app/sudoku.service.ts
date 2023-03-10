import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SudokuService {
  constructor() {}
  valuesString: string[][] = new Array(9)
    .fill('')
    .map(() => new Array(9).fill(''));

  valuesNumber: number[][] = new Array(9)
    .fill(0)
    .map(() => new Array(9).fill(0));

  solveSudoku(values:string[][]) {
    this.convert(values);
    return this.solver(this.valuesNumber, 0, 0);
  }
  row = 0;
  col = 0;
  changeToString() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.valuesString[i][j] = this.valuesNumber[i][j].toString();
      }
    }
    return this.valuesString;
  }
  convert(value: string[][]) {
    console.log('parsing input');

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.valuesNumber[i][j] = isNaN(parseInt(value[i][j]))
          ? 0
          : parseInt(value[i][j]);
      }
    }
  }

  isSafe(values: number[][], row: number, col: number, num: number) {
    for (let x = 0; x <= 8; x++) if (values[row][x] == num) return false;

    for (let x = 0; x <= 8; x++) if (values[x][col] == num) return false;

    let startRow = row - (row % 3);
    let startCol = col - (col % 3);

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (values[i + startRow][j + startCol] == num) return false;

    return true;
  }
  solver(this: any, grid: number[][], row: number, col: number) {
    if (row == 8 && col == 9) return true;
    if (col == 9) {
      row++;
      col = 0;
    }
    if (grid[row][col] != 0) {
      return this.solver(grid, row, col + 1);
    }
    for (let num = 1; num < 10; num++) {
      if (this.isSafe(grid, row, col, num)) {
        grid[row][col] = num;

        if (this.solver(grid, row, col + 1)) return true;
      }
      grid[row][col] = 0;
    }
    return false;
  }



  checkValidInput(values: string[][]) {
    let b=this.isValidConfig(values,9);
    console.log(b);

    if(b){
      return true;
    }
    else{
      alert("Wrong Input");
      return false;
    }
  }
  isValidConfig(arr: string[][], n: number) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (!this.isValid(arr, i, j)) return false;
      }
    }
    return true;
  }
  isValid(arr: string[][], row: number, col: number) {
    return (
      this.notInRow(arr, row) &&
      this.notInCol(arr, col) &&
      this.notInBox(arr, row - (row % 3), col - (col % 3))
    );
  }

  notInBox(arr: string[][], startRow: number, startCol: number) {
    let st = new Set<string>();
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        let curr = arr[row + startRow][col + startCol];
        if (st.has(curr)) return false;
        if (curr != '') st.add(curr);
      }
    }
    return true;
  }
  notInCol(arr: string[][], col: number) {
    let st = new Set<string>();

    for (let i = 0; i < 9; i++) {
      if (st.has(arr[i][col])) return false;
      if (arr[i][col] != '') st.add(arr[i][col]);
    }
    return true;
  }
  notInRow(arr: string[][], row: number) {
    let st = new Set<string>();

    for (let i = 0; i < 9; i++) {
      if (st.has(arr[row][i])) return false;
      if (arr[row][i] != '') st.add(arr[row][i]);
    }
    return true;
  }
}
