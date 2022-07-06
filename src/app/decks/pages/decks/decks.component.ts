import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@auth/services/auth.service';
import { DeckEditorComponent } from '@decks/components/deck-editor/deck-editor.component';
import { DecksService } from '@decks/services/decks.service';
import { Deck } from '@shared/models/deck.model';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss'],
})
export class DecksComponent implements OnInit {
  decks: Deck[] = [];
  user: User = {} as User;

  constructor(
    private authSvc: AuthService,
    private decksSvc: DecksService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.authSvc.getCurrentUser().subscribe((_user) => {
      this.user = _user;

      this.decksSvc.getAll(this.user.uid).subscribe((_decks) => {
        this.decks = _decks;
      });
    });
  }

  onNew(): void {
    const dialogRef = this.dialog.open(DeckEditorComponent, {
      width: '400px',
      data: {
        deckId: '',
        name: '',
        description: '',
      },
    });

    dialogRef.afterClosed().subscribe((deck) => {
      this.decksSvc.save(this.user.uid, deck);
    });
  }
}
