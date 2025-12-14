export interface ShortenUrlResponse {
  Url: string;
  shortUrl: string;
  CreatedAt: string;
}

export interface ShortenUrlRequest {
  url: string;
}
