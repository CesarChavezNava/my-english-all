export interface DeckConfig {
  deckId: string;
  back: Property;
  front: Property[];
}

export type Property = 'NAME' | 'TRANSLATE' | 'IMAGE' | 'MEANING' | 'EXAMPLE';
