import React from 'react';
import { Flashcard } from '../types';
import { FlashcardDeck } from '../components/Flashcards/FlashcardDeck';

interface FlashcardsPageProps {
  cards: Flashcard[];
  showIpa: boolean;
  onReviewCard: (cardId: string, remembered: boolean) => void;
}

export const FlashcardsPage: React.FC<FlashcardsPageProps> = ({
  cards,
  showIpa,
  onReviewCard,
}) => {
  return <FlashcardDeck cards={cards} showIpa={showIpa} onReviewCard={onReviewCard} />;
};
