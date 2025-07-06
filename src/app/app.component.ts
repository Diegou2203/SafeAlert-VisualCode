import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'SafeAlertFront';
   mostrarMenu = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const ruta = event.urlAfterRedirects;
        this.mostrarMenu = !(ruta.includes('login') || ruta.includes('lanpage'));
      }
    });
  }
}
