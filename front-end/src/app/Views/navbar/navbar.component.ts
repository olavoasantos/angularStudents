import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  /** Acesso à Store */
  public window = window;

  /**
   * goTo
   * ---
   * Acessa a rota.
   * @param route Nome da rota
   */
  goTo(route) {
    this.window['$store'].setRoute(route);
  }

}
