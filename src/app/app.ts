import { Component, signal } from '@angular/core';
import { ShortenComponent } from './components/shorten/shorten.component';
import { StatsComponent } from './components/stats/stats.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShortenComponent, StatsComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  readonly title = signal('Shrink.me');
}
