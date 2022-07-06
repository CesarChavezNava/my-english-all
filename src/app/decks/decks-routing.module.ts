import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsComponent } from './pages/cards/cards.component';
import { DecksComponent } from './pages/decks/decks.component';

const routes: Routes = [
  {
    path: '',
    component: DecksComponent,
  },
  {
    path: ':deckId',
    component: CardsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DecksRoutingModule {}
