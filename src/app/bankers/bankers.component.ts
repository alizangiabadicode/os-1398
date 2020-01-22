import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

export interface Need {
  arr: number[];
  seen: boolean;
  tick: boolean;
  use: number;
}

export interface Result {
  needs: Need[];
  alloc: number[][];
  remaining: number[];
}

@Component({
  selector: 'app-bankers',
  templateUrl: './bankers.component.html',
  styleUrls: ['./bankers.component.css']
})
export class BankersComponent implements OnInit {
//   max = new int[,] {{ 7, 5, 3 }, //P0
// { 3, 2, 2 }, //P1
// { 9, 0, 2 }, //P2
// { 2, 2, 2 }, //P3
// { 4, 3, 3 }};//P4
  sequence = [];
  useNumber = 0;
  needs: Need[] = [
    {
      arr: [3, 2, 2],
      seen: false,
      tick: false,
      use: 0
    },    {
      arr: [9, 0, 2],
      seen: false,
      tick: false,
      use: 0
    },    {
      arr: [2, 2, 2],
      seen: false,
      tick: false,
      use: 0
    },{
      arr: [4, 3, 3],
      seen: false,
      tick: false,
      use: 0
    },
  ];

//   alloc = new int[,] {{ 0, 1, 0 }, //P0
// { 2, 0, 0 }, //P1
// { 3, 0, 2 }, //P2
// { 2, 1, 1 }, //P3
// { 0, 0, 2 }};//P4

  alloc = [
    [2, 0, 0],
    [3, 0, 2],
    [2, 1, 1],
    [0, 0, 2]
  ];

  remaining = [ 3, 3, 2];

  result = new BehaviorSubject<Result[]>([]);

  show = false;

  needTemp: Need[] = [];
  remainingTemp: number[];
  constructor() { }

  ngOnInit() {
    this.needs.forEach((v)=> {
      this.needTemp.push(Object.assign({}, v));
    });
    this.remainingTemp = Object.assign([], this.remaining);
  }

  call() {
    this.removeSeen();
    if (!this.findSuitableNeed()) {
      this.show = false;
    }
  }

  findSuitableNeed(): boolean {
    let anyFound = false;
    this.needs.filter(e => !e.tick).forEach( (need, nIndex) => {
        const safe = need.arr.every((value, index) => {
          return value <=  this.remaining[index]
        });

        if (!safe) {
          // need.tick = false;
          need.seen = true;
        } else {
          // this.sequence.push('P ' + (nIndex + 1).toString());
          need.tick= true;
          need.use = ++this.useNumber;
          // need.seen = true;
          this.addToRemaining(nIndex);
          anyFound = true;
        }
      }
    );
    if (anyFound) {

      this.result.next([...this.result.value, {
        alloc: this.alloc,
        needs: this.needs,
        remaining: this.remaining
      }]);
    }

    console.log(this.result);
    return anyFound ;
  }

  addToRemaining(index: number) {
    this.alloc[index].forEach((v, i) => {
      this.remaining[i] += v;
    })
  }

  removeSeen() {
    this.needs.forEach(
      need => {
        need.seen = false;
      }
    )
  }



}
