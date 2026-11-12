import { Component } from '@angular/core';
import { CafeModule } from './cafe/cafe.module';

@Component({
  selector: 'app-root',
  imports: [CafeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'parcial-grupo3';
}