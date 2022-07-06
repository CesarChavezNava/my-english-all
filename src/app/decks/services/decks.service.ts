import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Deck } from '@shared/models/deck.model';

@Injectable({
  providedIn: 'root',
})
export class DecksService {
  constructor(private db: AngularFirestore) {}

  getAll(uid: string): Observable<Deck[]> {
    return this.db
      .collection('decks')
      .doc(uid)
      .collection('decks')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map(
            (c) =>
              ({
                deckId: c.payload.doc.id,
                ...c.payload.doc.data(),
              } as Deck)
          )
        )
      );
  }

  save(uid: string, deck: Deck) {
    const obj = { name: deck.name, description: deck.description };

    if (deck.deckId) {
      const decksRef = this.db
        .collection('decks')
        .doc(uid)
        .collection('decks')
        .doc(deck.deckId);
      decksRef.set({ ...obj });
    } else {
      const decksRef = this.db.collection('decks').doc(uid).collection('decks');
      decksRef.add({ ...obj });
    }
  }
}
