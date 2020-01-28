import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerAddComponent } from './components/player-add/player-add.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: "", pathMatch: "full",redirectTo: "home"},
  {path: "home", component: HomeComponent},
  {path: "player-add", component: PlayerAddComponent},
  {path: "player-list", component: PlayerListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
