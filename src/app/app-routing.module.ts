import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AstarComponent } from './algorithms/astar/astar.component';
import { VertexComponent } from './algorithms/vertex/vertex.component';


const routes: Routes = [
  {path: 'non-weighted-algorithms', component: VertexComponent},
  {path: 'weighted-algorithms', component: AstarComponent},
  { path: '', redirectTo: '/weighted-algorithms', pathMatch: 'full'},
  { path: '**', redirectTo: '/weighted-algorithms', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
