import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecksRoutingModule } from './decks-routing.module';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';

import { DecksComponent } from './pages/decks/decks.component';
import { DeckComponent } from './pages/deck/deck.component';
import { CardsComponent } from './pages/cards/cards.component';
import { CardComponent } from './pages/card/card.component';
import { DeckEditorComponent } from './components/deck-editor/deck-editor.component';
import { CardEditorComponent } from './components/card-editor/card-editor.component';
import { DeckConfigComponent } from './components/deck-config/deck-config.component';

@NgModule({
  declarations: [
    DecksComponent,
    DeckComponent,
    CardsComponent,
    CardComponent,
    DeckConfigComponent,
    DeckEditorComponent,
    CardEditorComponent,
  ],
  imports: [
    CommonModule,
    DecksRoutingModule,
    FormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class DecksModule {}
