import { Component } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor (private wowService: NgwWowService,private router:Router) {
    this.wowService.init();
  }

  title = 'QbrainX-UI';
}
