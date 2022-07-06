import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeckConfigComponent } from '@decks/components/deck-config/deck-config.component';
import { DeckEditorComponent } from '@decks/components/deck-editor/deck-editor.component';
import { DecksService } from '@decks/services/decks.service';
import { Deck } from '@shared/models/deck.model';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
})
export class DeckComponent implements OnInit {
  @Input() deck: Deck = {} as Deck;

  constructor(
    private decksSvc: DecksService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onEdit(): void {
    const dialogRef = this.dialog.open(DeckEditorComponent, {
      width: '400px',
      data: {
        deckId: this.deck.deckId,
        name: this.deck.name,
        description: this.deck.description,
      },
    });

    dialogRef.afterClosed().subscribe((_deck) => {
      this.deck = _deck;

      this.decksSvc.save('EkfykDVnnPeOHYY3n7jfqleqdQG2', this.deck);
    });
  }

  onPractice(): void {
    const dialogRef = this.dialog.open(DeckConfigComponent, {
      width: '600px',
      data: {
        deckId: this.deck.deckId,
        back: 'NAME',
        front: [],
      },
    });

    dialogRef.afterClosed().subscribe((_config) => {});
  }

  onView(): void {
    this.router.navigate([`/decks/${this.deck.deckId}`]);
  }
}
