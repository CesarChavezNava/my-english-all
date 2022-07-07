import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CardsService } from '@decks/services/cards.service';
import { ScoreResultComponent } from '@practices/decks/components/score-result/score-result.component';
import { Card } from '@shared/models/card.model';
import { DeckConfig } from '@shared/models/deck-config.model';
import { DeckScore } from '@shared/models/deck-score.model';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss'],
})
export class DecksComponent implements OnInit {
  settings = this.formBuilder.group({
    name: false,
    translate: false,
    meaning: false,
    example: false,
    image: false,
  });

  answer: string = '';
  cards: Card[] = [];
  card: Card = {} as Card;
  config: DeckConfig = {} as DeckConfig;
  score: DeckScore = { total: 0, good: [], bad: [] } as DeckScore;

  constructor(
    private cardsSvc: CardsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const deckId: string = params?.deckId;
      this.loadSettings();

      this.cardsSvc.getAll(deckId).subscribe((_cards) => {
        this.cards = _cards;
        this.card = _cards[0];
        this.score.total = this.cards.length - 1;
      });
    });
  }

  loadForm() {}

  onCancel(): void {
    this.router.navigate(['/decks']);
  }

  onNext(): void {
    if (this.answer.toLowerCase() === this.card.name.toLowerCase()) {
      this.snackBar.open('Correct!!', 'X', {
        duration: 1000,
        verticalPosition: 'top',
        panelClass: ['success-snackbar'],
      });

      this.score.good.push(this.card);
    } else {
      this.snackBar.open(`Incorrect, the answer is ${this.card.name}`, 'X', {
        duration: 1000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      });

      this.score.bad.push(this.card);
    }

    this.answer = '';
    const index: number = this.cards.indexOf(this.card);
    if (index === this.score.total) {
      this.dialog.open(ScoreResultComponent, {
        width: '400px',
        data: this.score,
      });
    }

    if (index < this.cards.length - 1) {
      this.card = this.cards[index + 1];
    }
  }

  private loadSettings() {
    this.config = JSON.parse(
      localStorage.getItem('SETTINGS') || '{}'
    ) as DeckConfig;

    this.settings = this.formBuilder.group({
      name: this.config.front.includes('NAME'),
      translate: this.config.front.includes('TRANSLATE'),
      meaning: this.config.front.includes('MEANING'),
      example: this.config.front.includes('EXAMPLE'),
      image: this.config.front.includes('IMAGE'),
    });
  }
}
