import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/api/qbrainx-api/services/PageServices/blog-service.service';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogArray = [];
  blogArrayList = [];
  lastpage;
  loader;
  currentPage: number = 1;
  itemsPerPage: number = 9;
  title: string[] = [];
  activeCategory: string | null = null;
  tagDescription;

  tagTitle;
  currentUrl: string; 
  constructor(private blogService:BlogService, private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) {
    this.titleService.setTitle('Blog Page - QBrainX');
    this.metaService.addTag({ name: 'description', content:"We update our blogs regularly. Follow this page to keep up with fascinating blog posts."});
    
    this.metaService.addTags([
      { name: 'description', content: this.tagDescription },
      { property: 'og:title', content: this.tagTitle },
      { property: 'og:description', content:  this.tagDescription  },
      { property: 'og:url', content: this.currentUrl },
      { property: 'og:type', content: 'website' },
    ]);
    
    this.metaService.addTag({ name: 'twitter:card', content: 'summary' });
    this.metaService.addTag({ name: 'twitter:site', content: '@YourTwitterHandle' }); // Replace with your Twitter handle

   }
  

  ngOnInit(): void {
    this.loader=true;
    this.blogList();
    // Subscribe to the Router events
this.router.events.subscribe((event) => {
  if (event instanceof NavigationEnd) {
    // Trigger a window reload when the route changes
    window.location.reload();
  }
});

// Set the current URL and canonical URL
this.currentUrl = window.location.origin + this.location.path();
const link: HTMLLinkElement = this.renderer.createElement('link');
link.rel = 'canonical';
link.href = this.currentUrl;
this.renderer.appendChild(document.head, link);

  }


  blogList(){
    this.blogService.getBlogDetails().subscribe((res:any) => {
      if(res) {
        res.forEach((e,index) => {
         let extension = e.fileName.split('.');
         this.blogArray.push({
              image: e.data,
              extension: extension[1],
              text: e.text,
              subTitle: e.subTitle,
              title: e.title,
              date:e.date,
              tagTitle:e.tagTitle,
              tagDescription:e.tagDescription,
              id:e.id
            })
            if (!this.title.includes(e.title)) {
              this.title.push(e.title);
            }
        });
        this.lastpage=Math.ceil(this.blogArray.length / this.itemsPerPage)
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
      this.blogArrayList= this.blogArray.slice(startIndex, endIndex);
      this.loader=false;
    }
    });
  }
   
  changePreviousPage() {
    this.loader=true;
    this.currentPage = this.currentPage - 1;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
  this.blogArrayList= this.blogArray.slice(startIndex, endIndex);
  this.loader=false;
  }

  changeNextpage(){
    this.loader=true;
    this.currentPage=this.currentPage + 1; 
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
  this.blogArrayList= this.blogArray.slice(startIndex, endIndex);
  this.loader=false;
  }

  blogdetails(data){
    this.blogService.setBlogObject(data);
    this.router.navigate(['/blog/',data.subTitle.replace(/ /g, '-')]); 
  }
  filterByCategory(title: string): void {
    this.activeCategory = title;
    if (title === 'All Blogs') {
      this.activeCategory = null;
      this.blogArrayList = this.blogArray
    } else {
      this.currentPage = 1; // Reset current page to 1 when filtering by category
      this.blogArrayList = this.blogArray.filter(blog => blog.title === title);
    }
  }
  
  showAllBlogs(): void {
    this.activeCategory = null;
    this.filterByCategory('All Blogs');
  } 

}


