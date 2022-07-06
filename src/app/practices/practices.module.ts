import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecksComponent } from './decks/pages/decks/decks.component';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { PracticesRoutingModule } from './practices-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DecksComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    PracticesRoutingModule,
    SharedModule,
  ],
})
export class PracticesModule {}
