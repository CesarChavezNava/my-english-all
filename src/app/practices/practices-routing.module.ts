import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecksComponent } from './decks/pages/decks/decks.component';

const routes: Routes = [
  {
    path: 'decks/:deckId',
    component: DecksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PracticesRoutingModule {}
