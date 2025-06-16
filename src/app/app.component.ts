import { Component } from '@angular/core';
import { Safealert } from './components/safealert/safealert.component';

@Component({
  selector: 'app-root',
  imports: [Safealert],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SafeAlertFront';
}
