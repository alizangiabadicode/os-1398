import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface Partition {
  size: number;
  occupied: boolean;
  occupier: number;
  color: string;
  queueSize: number;
}

@Component({
  selector: 'app-memorypartitioning',
  templateUrl: './memorypartitioning.component.html',
  styleUrls: ['./memorypartitioning.component.css']
})
export class MemorypartitioningComponent implements OnInit {
  singleQueue = false;
  pages = [1,2,3,4,5, 7, 6, 8,4];
  pagesSubject: BehaviorSubject<number[]>;
  partitions: Partition[];
  partitionsSubject: BehaviorSubject<Partition[]>;
  index= 0;
  partitionQueues: number[][];
  partitionQueuesSubject: BehaviorSubject<number[][]>;
  constructor() { }

  ngOnInit() {
    this.partitions = [
      {
        color: 'green', occupied: false, size: 2, occupier: 0, queueSize: 4
      },{
        color: 'blue', occupied: false, size: 4, occupier: 0, queueSize: 4
      },{
        color: 'red', occupied: false, size: 6, occupier: 0, queueSize: 4
      },{
        color: 'brown', occupied: false, size: 8, occupier: 0, queueSize: 4
      },
    ];
    this.partitionQueues = [
      [],[],[],[]
    ];
    this.partitionQueuesSubject = new BehaviorSubject<number[][]>(this.partitionQueues);
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

  removeOccupierMulti(p: Partition) {
    p.occupier = 0;
    p.occupied = false;
    this.partitionsSubject.next(this.partitions);
    const index = this.partitions.findIndex(e => e === p);
    if (this.partitionQueues[index].length > 0) {
      this.partitions[index].occupied = true;
      this.partitions[index].occupier = this.partitionQueues[index][0];
      this.partitionQueues[index] = this.partitionQueues[index].slice(1);
      this.partitionQueuesSubject.next(this.partitionQueues);
      this.partitionsSubject.next(this.partitions);
    }
  }

  nextMultiQueue(value: number) {
    const partition = this.partitions.findIndex(e => e.size >= value);
    if (partition !== -1) {
      if (this.partitions[partition].occupied) {
        if (this.partitionQueues[partition].length <= this.partitions[partition].queueSize) {
          this.partitionQueues[partition].push(value);
          this.pages = this.pages.slice(1);
          this.pagesSubject.next(this.pages);
          this.partitionQueuesSubject.next(this.partitionQueues);
        }
        else {
          alert('partition is full;');
        }

      } else {
        this.pages = this.pages.slice(1);
        this.pagesSubject.next(this.pages);
        this.partitions[partition].occupied = true;
        this.partitions[partition].occupier = value;
        this.partitionsSubject.next(this.partitions);
        // this.partitions[partition].queueSize = 4;
      }
    }
    else {
      alert("peida nashod");
    }
  }

}
