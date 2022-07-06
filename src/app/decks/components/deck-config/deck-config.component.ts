import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeckConfig } from '@shared/models/deck-config.model';

@Component({
  selector: 'app-deck-config',
  templateUrl: './deck-config.component.html',
  styleUrls: ['./deck-config.component.scss'],
})
export class DeckConfigComponent implements OnInit {
  settings = this.formBuilder.group({
    name: false,
    translate: true,
    meaning: false,
    example: false,
    image: false,
    options: ['NAME'],
  });

  constructor(
    public dialogRef: MatDialogRef<DeckConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeckConfig,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onStart(): void {
    let selected: boolean = this.settings.get('name')?.value;
    if (selected) this.data.front.push('NAME');

    selected = this.settings.get('translate')?.value;
    if (selected) this.data.front.push('TRANSLATE');

    selected = this.settings.get('meaning')?.value;
    if (selected) this.data.front.push('MEANING');

    selected = this.settings.get('example')?.value;
    if (selected) this.data.front.push('EXAMPLE');

    selected = this.settings.get('image')?.value;
    if (selected) this.data.front.push('IMAGE');

    this.data.back = this.settings.get('options')?.value;

    localStorage.setItem('SETTINGS', JSON.stringify(this.data));

    this.dialogRef.close();
    this.router.navigate([`/practices/decks/${this.data.deckId}`]);
  }
}
