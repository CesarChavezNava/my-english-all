import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Deck } from '@shared/models/deck.model';

@Component({
  selector: 'app-deck-editor',
  templateUrl: './deck-editor.component.html',
  styleUrls: ['./deck-editor.component.scss'],
})
export class DeckEditorComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeckEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Deck
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
