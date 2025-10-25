import type { Quote, QuotableAPIResponse } from '@/types/quote';
import { FALLBACK_QUOTES } from '@/lib/constants/fallback-quotes';
import { hasSeenQuote, addToQuoteHistory, getHistoryCount, clearQuoteHistory } from '@/lib/quoteHistory';

const API_BASE_URL = 'https://api.quotable.io';
const TIMEOUT_MS = 5000;
const MAX_RETRY_ATTEMPTS = 10;

/**
 * Fetch a random quote from Quotable API with timeout and retry
 * Falls back to local quotes on failure
 * Ensures quotes are not repeated until all have been seen
 */
export async function fetchRandomQuote(): Promise<Quote> {
  let attempts = 0;

  while (attempts < MAX_RETRY_ATTEMPTS) {
    attempts++;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

      const response = await fetch(`${API_BASE_URL}/random`, {
        signal: controller.signal,
        cache: 'no-store',
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data: QuotableAPIResponse = await response.json();

      const quote: Quote = {
        content: data.content,
        author: data.author,
      };

      if (!hasSeenQuote(quote)) {
        addToQuoteHistory(quote);
        return quote;
      }

      if (getHistoryCount() >= 50) {
        clearQuoteHistory();
      }

      continue;
    } catch (error) {
      console.error('Failed to fetch quote from API:', error);
      break;
    }
  }

  return getRandomUnseenFallbackQuote();
}

/**
 * Get a random unseen quote from local fallback array
 */
function getRandomUnseenFallbackQuote(): Quote {
  const unseenQuotes = FALLBACK_QUOTES.filter(quote => !hasSeenQuote(quote));

  if (unseenQuotes.length === 0) {
    clearQuoteHistory();
    const quote = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
    addToQuoteHistory(quote);
    return quote;
  }

  const randomIndex = Math.floor(Math.random() * unseenQuotes.length);
  const quote = unseenQuotes[randomIndex];
  addToQuoteHistory(quote);
  return quote;
}

/**
 * Validate quote data
 */
export function isValidQuote(quote: unknown): quote is Quote {
  return (
    typeof quote === 'object' &&
    quote !== null &&
    'content' in quote &&
    'author' in quote &&
    typeof quote.content === 'string' &&
    typeof quote.author === 'string' &&
    quote.content.length > 0 &&
    quote.author.length > 0
  );
}
