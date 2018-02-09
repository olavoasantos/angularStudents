import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
  /** Título */
  title = 'app';
  
  /** Acesso à Store */
  public window = window;
}
