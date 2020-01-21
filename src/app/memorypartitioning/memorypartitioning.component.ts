import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface Partition {
  size: number;
  occupied: boolean;
  occupier: number;
  color: string;
}

@Component({
  selector: 'app-memorypartitioning',
  templateUrl: './memorypartitioning.component.html',
  styleUrls: ['./memorypartitioning.component.css']
})
export class MemorypartitioningComponent implements OnInit {
  singleQueue = true;
  pages = [1,2,3,4,5, 7, 6, 8,4];
  pagesSubject: BehaviorSubject<number[]>;
  partitions: Partition[];
  partitionsSubject: BehaviorSubject<Partition[]>;
  index= 0;
  constructor() { }

  ngOnInit() {
    this.partitions = [
      {
        color: 'green', occupied: false, size: 2, occupier: 0
      },{
        color: 'blue', occupied: false, size: 4, occupier: 0
      },{
        color: 'red', occupied: false, size: 6, occupier: 0
      },{
        color: 'brown', occupied: false, size: 8, occupier: 0
      },
    ];

    this.partitionsSubject= new BehaviorSubject<Partition[]>(this.partitions);
    this.pagesSubject = new BehaviorSubject<number[]>(this.pages);
  }

  next(value: number) {
    console.log(value);
    const partition = this.partitions.find(e => e.size >= value && !e.occupied);
    if (partition !== undefined) {
      this.pages= this.pages.slice(1);
      this.pagesSubject.next(this.pages);
      this.index += 1;
      partition.occupied =true;
      partition.occupier = value;
      this.partitionsSubject.next(this.partitions);
      console.log(this.pages);
    }
    else {
      alert('peida nashod');
    }
  }

  removeOccupier(p: Partition) {
    p.occupier = 0;
    p.occupied = false;
    this.partitionsSubject.next(this.partitions);
  }

}
