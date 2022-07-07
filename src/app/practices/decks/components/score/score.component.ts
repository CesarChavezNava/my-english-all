import { Component, Input, OnInit } from '@angular/core';
import { DeckScore } from '@shared/models/deck-score.model';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  @Input() score: DeckScore = { total: 0, good: [], bad: [] } as DeckScore;

  constructor() {}

  ngOnInit(): void {}
}
