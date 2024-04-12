// src/app/seo.service.ts

import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private currentUrl: string;
  private renderer: Renderer2;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private location: Location,
    private router: Router,
    private http: HttpClient,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  initializeSEO(): void {
    this.currentUrl = window.location.origin + this.location.path();

    this.titleService.setTitle("We're QBrainX Let's learn, collaborate and create");

    const description = "QBrainX is a company with an energetic community of Enterprise Architects, solution consultants, Technologists & project/program management experts.";

    this.metaService.addTags([
      { name: 'description', content: description },
      { property: 'og:title', content: "We're QBrainX Let's learn, collaborate and create" },
      { property: 'og:description', content: description },
      { property: 'og:url', content: this.currentUrl },
      { property: 'og:type', content: 'website' },
    ]);

    this.metaService.addTag({ name: 'twitter:card', content: 'summary' });
    this.metaService.addTag({ name: 'twitter:site', content: '@YourTwitterHandle' }); // Replace with your Twitter handle

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.location.reload();
      }
    });

    const link: HTMLLinkElement = this.renderer.createElement('link');
    link.rel = 'canonical';
    link.href = this.currentUrl;
    this.renderer.appendChild(document.head, link);

    this.addSchemaOrgMarkup();
  }

  private addSchemaOrgMarkup(): void {
    const script: HTMLScriptElement = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = `
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "QBrainX",
        "description": "QBrainX is a company with an energetic community of Enterprise Architects, solution consultants, Technologists & project/program management experts.",
        "url": "${this.currentUrl}"
      }
    `;
    this.renderer.appendChild(document.head, script);
  }

  initializeSEOHome(){
    this.currentUrl = window.location.origin + this.location.path();

    this.titleService.setTitle("QBrainX - Digital Transformation &amp; ServiceNow Implementation Specialist");

    const description = "We’re on a mission to empower and strengthen businesses across various domains and make them the best in business. Our Services include Service Now, Digital Transformation, DevOps, Testing Services, Artificial Intelligence, Cloud Services and RPA";

    this.metaService.addTags([
      { name: 'description', content: description },
      { property: 'og:title', content: "QBrainX - Digital Transformation &amp; ServiceNow Implementation Specialist" },
      { property: 'og:description', content: description },
      { property: 'og:url', content: this.currentUrl },
      { property: 'og:type', content: 'website' },
    ]);

    this.metaService.addTag({ name: 'twitter:card', content: 'summary' });
    this.metaService.addTag({ name: 'twitter:site', content: '@YourTwitterHandle' }); // Replace with your Twitter handle

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.location.reload();
      }
    });

    const link: HTMLLinkElement = this.renderer.createElement('link');
    link.rel = 'canonical';
    link.href = this.currentUrl;
    this.renderer.appendChild(document.head, link);

    this.addSchemaOrgMarkupHome();
  }

  private addSchemaOrgMarkupHome(): void {
    const script: HTMLScriptElement = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = `
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "QBrainX",
        "description": "We’re on a mission to empower and strengthen businesses across various domains and make them the best in business. Our Services include Service Now, Digital Transformation, DevOps, Testing Services, Artificial Intelligence, Cloud Services and RPA",
        "url": "${this.currentUrl}"
      }
    `;
    this.renderer.appendChild(document.head, script);
  }

}
