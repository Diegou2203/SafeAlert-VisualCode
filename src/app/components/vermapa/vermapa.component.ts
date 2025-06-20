import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { VermapaService } from '../../services/vermapa.service';

@Component({
  selector: 'app-vermapa',
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './vermapa.component.html',
  styleUrl: './vermapa.component.css'
})
export class VermapaComponent {
  isLoading:boolean = false
  mapaUrl: string = '';
  lat: number=0
  lon: number=0


  constructor(private route: ActivatedRoute, private vuS: VermapaService){}

  ngOnInit(): void {
    const latParam = this.route.snapshot.paramMap.get('lat');
    const lonParam = this.route.snapshot.paramMap.get('lon');

    if (latParam && lonParam) {
      this.lat = parseFloat(latParam);
      this.lon = parseFloat(lonParam);
      this.getViewMapa();
    }
  }

  getViewMapa() {
    this.isLoading = true;
    this.vuS.getMapaUrl(this.lon, this.lat).subscribe(url => {
      this.mapaUrl = url;
      this.isLoading = false;
    });
  }

  
}
