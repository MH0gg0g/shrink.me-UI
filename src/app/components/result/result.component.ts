import { Component, Input, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenUrlResponse } from '../../interfaces/url-response.interface';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  @Input() result: ShortenUrlResponse | null = null;
  copied = signal(false);

  copy() {
    if (!this.result) return;
    navigator.clipboard?.writeText(this.result.shortUrl).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    });
  }
}
