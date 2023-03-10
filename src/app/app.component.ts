import { Component, Input } from '@angular/core';
import { SudokuService } from './sudoku.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sudoku';
  constructor(private sudokuService: SudokuService) {}
  values: string[][] = new Array(9).fill('').map(() => new Array(9).fill(''));
  // values:string[][] =[
  //   ["4","","","2","","","","6",""],
  //   ["","","","","7","","3","8","5"],
  //   ["9","8","","","1","","","",""],
  //   ["","","","","6","","","1",""],
  //   ["","","7","4","","","8","",""],
  //   ["6","9","","","","3","7","",""],
  //   ["5","","4","","8","","","2",""],
  //   ["2","1","","","9","6","","","7"],
  //   ["","","","3","","","","",""]
  // ]
  // values!:number[][] ;
  disable = false;
  calculate() {
    console.log("Inside ts taking values");
    console.log(this.values);

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.values[i][j].length > 0) {
          let a = i.toString() + j.toString();
          document.getElementById(a)!.style.color = 'red';
        } else {
          let a = i.toString() + j.toString();
          document.getElementById(a)!.style.color = 'blue';
        }
      }
    }
    // setTimeout(() => {
    // this.values = this.sudokuService.solveSudoku(this.values);
    // }, 1500);
    setTimeout(() => {
    let b=this.sudokuService.checkValidInput(this.values);
    if(b){
      this.sudokuService.solveSudoku(this.values);
      this.values=this.sudokuService.changeToString();
      console.log("True Input");
    }
    },2000);

  }

  // limitInput(){
  //   for (let i = 0; i < 9; i++)
  //     for (let j = 0; j < 9; j++)
  //       if(this.values[i][j].length>1){
  //         alert("Number range only from 1 to 9");
  //       }
  // }

}
