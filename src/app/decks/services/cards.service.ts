import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Card } from '@shared/models/card.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private db: AngularFirestore) {}

  getAll(deckId: string): Observable<Card[]> {
    return this.db
      .collection('cards')
      .doc(deckId)
      .collection('cards')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map(
            (c) =>
              ({
                cardId: c.payload.doc.id,
                ...c.payload.doc.data(),
              } as Card)
          )
        )
      );
  }

  save(deckId: string, card: Card) {
    const obj = {
      example: card.example,
      meaning: card.meaning,
      name: card.name,
      translate: card.translate,
    };

    if (card.cardId) {
      const decksRef = this.db
        .collection('cards')
        .doc(deckId)
        .collection('cards')
        .doc(card.cardId);
      decksRef.set({ ...obj });
    } else {
      const decksRef = this.db
        .collection('cards')
        .doc(deckId)
        .collection('cards');
      decksRef.add({ ...obj });
    }
  }
}
