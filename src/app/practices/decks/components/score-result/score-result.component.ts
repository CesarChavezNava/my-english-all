import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeckScore } from '@shared/models/deck-score.model';

@Component({
  selector: 'app-score-result',
  templateUrl: './score-result.component.html',
  styleUrls: ['./score-result.component.scss'],
})
export class ScoreResultComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ScoreResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeckScore,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onFinish(): void {
    localStorage.removeItem('SETTINGS');

    this.dialogRef.close();
    this.router.navigate(['/decks']);
  }
}
