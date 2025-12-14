import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatsService } from '../../services/stats.service';
import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  private _key = signal('');
  key = this._key;
  loading = signal(false);
  result = signal<any | null>(null);
  error = signal<string | null>(null);

  constructor(private statsService: StatsService) {}

  get keyValue() { return this.key(); }
  set keyValue(v: string) { this.key.set(v); }

  getStats() {
    this.error.set(null);
    this.result.set(null);
    const k = this.key();
    if (!k) {
      this.error.set('Please enter a short key');
      return;
    }
    this.loading.set(true);
    this.statsService.getStats(k).pipe(
      tap((res) => this.result.set(res)),
      catchError((err: any) => {
        this.error.set(err?.message || (typeof err === 'string' ? err : 'Not found'));
        return of(null);
      }),
      finalize(() => this.loading.set(false))
    ).subscribe();
  }
}
