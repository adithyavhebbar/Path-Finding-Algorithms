import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AstarComponent } from './algorithms/astar/astar.component';
import { VertexComponent } from './algorithms/vertex/vertex.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {path: 'non-weighted-algorithms', component: VertexComponent},
  {path: 'weighted-algorithms', component: AstarComponent},
  {path: '', component: AstarComponent},
  { path: '**', component: AstarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
