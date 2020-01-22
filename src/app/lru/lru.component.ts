import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface Page {
  hit: boolean;
  miss: boolean;
  counter: number;
  data: number;
}

export interface ArrayOfPageArray {
  PageArr: Page[];
}

@Component({
  selector: 'app-lru',
  templateUrl: './lru.component.html',
  styleUrls: ['./lru.component.css']
})
export class LruComponent implements OnInit {
  data: Page[] = [];
  dataSubject = new BehaviorSubject<ArrayOfPageArray[]>(null);
  Size= 3;
  index = 0;
  disable = false;
  dataToEnter = [7,0,1,2,0,3,0,4,2];
  dataToEnterSubject: BehaviorSubject<number[]>;
  constructor() { }

  ngOnInit() {
    this.dataToEnterSubject =  new BehaviorSubject<number[]>(this.dataToEnter);
  }

  SendData(pageNum: number) {
    if (this.index === this.dataToEnter.length ) {
      this.disable = true;
      // this.index +=1;
      return;
    }
    this.index +=1;
    this.dataToEnterSubject.next(this.dataToEnter.slice(this.index));

    if (this.data.find(e => e.data === pageNum) !== undefined) { // hit
      this.data.filter(e=>e.data !== pageNum).forEach((v) => {
        v.counter += 1;
        v.hit = v.miss = false;
      });
      let data = this.data.find(e=>e.data === pageNum);
      data.counter = 0;
      data.hit = true;
      data.miss = false;
    }
    else { // miss
      if (this.data.length < this.Size) {
        this.data.push({
          miss: true,
          hit: false,
          counter: 0,
          data: pageNum
        } as Page);
        this.data.filter(e=>e.data !== pageNum)
          .forEach((v) => {
            v.counter += 1;
            v.hit = false;
            v.miss = false;
          })
      }
      else { // if the data arr is full
        const index = this.data.findIndex(e => e.data ==this.data.reduce((x,y) => {
          return x.counter > y.counter ? x : y;
        }).data);

        this.data[index] = {
          data: pageNum,
          miss: true,
          hit: false,
          counter: 0
        } as Page;

        this.data.filter(e => e.data !== pageNum)
          .forEach((v) => {
            v.counter +=1;
            v.hit = false;
            v.miss = false;
          });
      }
    }
    let tempData= [];
    this.data.forEach(
      (v) => {
        const temp = Object.assign({}, v);
        tempData.push(temp);
      }
    );
    this.dataSubject.next(this.dataSubject.value ? [...this.dataSubject.value, {
      PageArr: Object.assign([], tempData)
    }] : [{
      PageArr: Object.assign([], tempData)
    }]);
  }



}

