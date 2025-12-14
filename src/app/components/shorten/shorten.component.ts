import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShortenService } from '../../services/shorten.service';
import { ResultComponent } from '../result/result.component';
import { ShortenUrlResponse } from '../../interfaces/url-response.interface';
import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-shorten',
  standalone: true,
  imports: [CommonModule, FormsModule, ResultComponent],
  templateUrl: './shorten.component.html',
  styleUrls: ['./shorten.component.css']
})
export class ShortenComponent {
  private _url = signal('');
  url = this._url;
  loading = signal(false);
  result = signal<ShortenUrlResponse | null>(null);
  error = signal<string | null>(null);

  constructor(private shortenService: ShortenService) {}

  get urlValue() {
    return this.url();
  }
  set urlValue(v: string) {
    this.url.set(v);
  }

  shorten() {
    this.error.set(null);
    this.result.set(null);
    const val = this.url();
    if (!val) {
      this.error.set('Please Enter a URL');
      return;
    }
    this.loading.set(true);
    this.shortenService.shorten(val).pipe(
      tap((res) => this.result.set(res)),
      catchError((err: any) => {
        this.error.set(err?.message || (typeof err === 'string' ? err : 'Unknown error'));
        return of(null);
      }),
      finalize(() => this.loading.set(false))
    ).subscribe();
  }

  clear() {
    this.url.set('');
    this.error.set(null);
    this.result.set(null);
  }
}
