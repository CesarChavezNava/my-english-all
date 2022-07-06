import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { DeckConfigComponent } from '@decks/components/deck-config/deck-config.component';
import { DeckEditorComponent } from '@decks/components/deck-editor/deck-editor.component';
import { DecksService } from '@decks/services/decks.service';
import { Deck } from '@shared/models/deck.model';
import { User } from 'firebase';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
})
export class DeckComponent implements OnInit {
  @Input() deck: Deck = {} as Deck;
  user: User = {} as User;

  constructor(
    private authSvc: AuthService,
    private decksSvc: DecksService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authSvc.getCurrentUser().subscribe((_user) => {
      this.user = _user as User;
    });
  }

  onDelete(): void {
    this.decksSvc.delete(this.user.uid, this.deck.deckId ?? '');
  }

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

      this.decksSvc.save(this.user.uid, this.deck);
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
