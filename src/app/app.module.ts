import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NodeComponent } from './node/node.component';
import { AlgorithmsComponent } from './algorithms/algorithms.component';
import { VertexComponent } from "./algorithms/vertex/vertex.component";
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    AlgorithmsComponent,
    VertexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
