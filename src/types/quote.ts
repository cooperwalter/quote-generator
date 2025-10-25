/**
 * Core quote interface used throughout the application
 */
export interface Quote {
  content: string;
  author: string;
}

/**
 * API response type for Quotable API
 * Used internally in API service
 */
export interface QuotableAPIResponse {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}
