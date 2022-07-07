import { Card } from './card.model';

export interface DeckScore {
  total: number;
  good: Card[];
  bad: Card[];
}
