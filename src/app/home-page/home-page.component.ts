import { Component } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(public ss:ServiceService){}

}
