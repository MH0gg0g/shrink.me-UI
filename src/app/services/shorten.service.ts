import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShortenUrlResponse } from '../interfaces/url-response.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShortenService {
  private readonly base = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  shorten(url: string): Observable<ShortenUrlResponse> {
    const body = { url };
    return this.http.post<ShortenUrlResponse>(`${this.base}/shorten`, body);
  }
}
