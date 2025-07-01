import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
    CommonModule 
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  isHidden = true;
  private hideTimeout: any;
  private isMouseOverMenu = false;
  private isMouseOverSubmenu = false;

  // Mostrar el menú
  showMenu() {
    this.isHidden = false;
    this.clearHideTimeout();
  }

  // Cuando el mouse entra en el menú principal
  onMouseEnterMenu() {
    this.isMouseOverMenu = true;
    this.clearHideTimeout();
    this.isHidden = false;
  }

  // Cuando el mouse sale del menú principal
  onMouseLeaveMenu(event: MouseEvent) {
    this.isMouseOverMenu = false;
    const relatedTarget = event.relatedTarget as HTMLElement;
    
    // Verificar si el mouse va a un submenú
    if (relatedTarget?.closest('.mat-menu-panel')) {
      this.isMouseOverSubmenu = true;
      return;
    }

    this.scheduleHide();
  }

  // Cuando el mouse entra en un submenú
  onSubmenuOpened() {
    this.isMouseOverSubmenu = true;
    this.clearHideTimeout();
  }

  // Cuando el mouse sale de un submenú
  onSubmenuClosed() {
    this.isMouseOverSubmenu = false;
    if (!this.isMouseOverMenu) {
      this.scheduleHide();
    }
  }

  // Programar ocultación con retraso
  private scheduleHide() {
    this.clearHideTimeout();
    this.hideTimeout = setTimeout(() => {
      if (!this.isMouseOverMenu && !this.isMouseOverSubmenu) {
        this.isHidden = true;
      }
    }, 300);
  }

  // Alternar manualmente
  toggleMenu() {
    this.isHidden = !this.isHidden;
    this.clearHideTimeout();
    if (!this.isHidden) {
      this.isMouseOverMenu = true;
    }
  }

  // Cancelar el tiempo de ocultación
  clearHideTimeout() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  // Ocultar al hacer clic fuera
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.sidebar-container') && 
        !target.closest('.hover-trigger') && 
        !target.closest('.mat-menu-panel') &&
        !target.closest('.menu-button')) {
      this.isHidden = true;
      this.isMouseOverMenu = false;
      this.isMouseOverSubmenu = false;
    }
  }


  role: string = '';
  constructor(private loginService: LoginService) {}
  cerrar() {
    
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  isDeveloper() {
    return this.role === 'DEVELOPER';
  }

  isTester() {
    return this.role === 'TESTER';
  }
}