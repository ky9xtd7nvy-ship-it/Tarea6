import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecera } from './components/cabecera/cabecera';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Cabecera],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {}
