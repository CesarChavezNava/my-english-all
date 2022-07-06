import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CardEditorComponent } from '@decks/components/card-editor/card-editor.component';
import { CardsService } from '@decks/services/cards.service';
import { Card } from '@shared/models/card.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  cards: Card[] = [];
  deckId: string = '';
  displayedColumns: string[] = [
    'name',
    'translate',
    'meaning',
    'example',
    'cardId',
  ];

  constructor(
    private cardsSvc: CardsService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.deckId = params?.deckId;

      this.cardsSvc.getAll(this.deckId).subscribe((_cards) => {
        this.cards = _cards;
      });
    });
  }

  onDecks(): void {
    this.router.navigate(['/decks']);
  }

  onDelete(cardId: string): void {
    const card: Card = this.cards.find((c) => c.cardId === cardId) as Card;
    this.cardsSvc.delete(this.deckId, card.cardId ?? '');
  }

  onEdit(cardId: string): void {
    const card: Card = this.cards.find((c) => c.cardId === cardId) as Card;
    const dialogRef = this.dialog.open(CardEditorComponent, {
      width: '600px',
      data: card,
    });

    dialogRef.afterClosed().subscribe((_card) => {
      this.cardsSvc.save(this.deckId, _card);
    });
  }

  onNew(): void {
    const dialogRef = this.dialog.open(CardEditorComponent, {
      width: '600px',
      data: {
        cardId: '',
        name: '',
        translate: '',
        meaning: '',
        example: '',
      },
    });

    dialogRef.afterClosed().subscribe((card) => {
      this.cardsSvc.save(this.deckId, card);
    });
  }
}
