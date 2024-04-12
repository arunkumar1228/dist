import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor( private wowService: NgwWowService ) { }

  ngOnInit(): void {
    this.wowService.init();
  }

  reset(): void {
    this.wowService.init();
  }
  
}
