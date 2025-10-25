import type { Quote } from '@/types/quote';

const STORAGE_KEY = 'quote-history';

export function getQuoteHistory(): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const history = localStorage.getItem(STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
}

export function addToQuoteHistory(quote: Quote): void {
  if (typeof window === 'undefined') return;

  try {
    const history = getQuoteHistory();
    const quoteId = `${quote.content}|${quote.author}`;

    if (!history.includes(quoteId)) {
      history.push(quoteId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  } catch (error) {
    console.error('Failed to save quote history:', error);
  }
}

export function hasSeenQuote(quote: Quote): boolean {
  const history = getQuoteHistory();
  const quoteId = `${quote.content}|${quote.author}`;
  return history.includes(quoteId);
}

export function clearQuoteHistory(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear quote history:', error);
  }
}

export function getHistoryCount(): number {
  return getQuoteHistory().length;
}
