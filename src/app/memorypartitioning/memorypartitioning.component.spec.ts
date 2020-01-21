import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorypartitioningComponent } from './memorypartitioning.component';

describe('MemorypartitioningComponent', () => {
  let component: MemorypartitioningComponent;
  let fixture: ComponentFixture<MemorypartitioningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorypartitioningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorypartitioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
