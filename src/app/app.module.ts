import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BankersComponent } from './bankers/bankers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// angular material
import {MatButtonModule} from '@angular/material/button';
import { LruComponent } from './lru/lru.component';
import { MemorypartitioningComponent } from './memorypartitioning/memorypartitioning.component';
import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
  declarations: [
    AppComponent,
    BankersComponent,
    LruComponent,
    MemorypartitioningComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
