import { Component, OnInit } from '@angular/core';
import { SeoService } from '../seo.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {

    this.seoService.initializeSEO();
}  
  
}
