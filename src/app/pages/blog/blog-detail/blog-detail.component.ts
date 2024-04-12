
import { BlogService } from 'src/app/api/qbrainx-api/services/PageServices/blog-service.service';

import { BlogCommentDto } from 'src/app/api/qbrainx-api/models/BlogCommentDto';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],

})
export class BlogDetailComponent implements OnInit {

  id: any;
  blogResult = [];
  blogData = [];
  blogDatas=[];
  blogArray = [];
  blogdetail = [];
  blogsearch: string;
  blogSearchData;
  search: boolean = false;
  categoryList=[];
  filteredBlogArray: any[] = [];
  category: string;
  sucessMessage:boolean=false;
  pathName: string;
  blog: any;
  image;
  blogComment: BlogCommentDto = {
    fullName: '',
    emailId: '',
    comments: '',
    website: ''
  };
  tagDescription;

  tagTitle; 
  commentResult: any;
  currentUrl: string;
  constructor(private blogService: BlogService,
    private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) {
      this.metaService.addTags([
        // { name: 'description', content: this.tagDescription },
        { property: 'og:title', content: this.tagTitle },
        // { property: 'og:description', content:  this.tagDescription  },
        { property: 'og:url', content: this.currentUrl },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: window.location.href }, // Assuming you want the URL of the current page
        { property: 'og:image', content: this.image } 
       
      ]);

      
    this.metaService.addTag({ name: 'twitter:card', content: 'summary' });
    this.metaService.addTag({ name: 'twitter:site', content: '@YourTwitterHandle' }); // Replace with your Twitter handle

  }

  ngOnInit(): void {
    this.recentblog();
    this.pathName = this.extractPathName(this.router.url);
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
  private extractPathName(url: string): string {
   const urlSegments = url.split('/');
  const pathName = urlSegments[2];
  return pathName.replace(/-/g, ' ');
  }

  blogList() {
    // Assuming `this.pathName` contains the path or identifier for fetching the blog posts
    this.blogService.getBlogByFormattedTitle(this.pathName).subscribe((res: any) => {
        this.blog = res;

        res.forEach((e, index) => {
          
            let extension = e.fileName.split('.');
            this.blogData.push({
              image: e.data,
              extension: extension[1],
              text: e.text,
              subTitle: e.subTitle,
              title: e.title,
              date: e.date,
              tagTitle:e.tagTitle,
              tagDescription:e.tagTitle,
              id: e.id
            });
            if (res.length > 0) {
          
                const firstBlogPost = res[0];
                const truncatedtagTitle = firstBlogPost.tagTitle.substring(0, 70);
                const truncatedDescription = firstBlogPost.tagDescription.substring(0, 300);
                this.titleService.setTitle(`${truncatedtagTitle} - QBrainX`);
                this.metaService.addTag({ name: 'description', content: truncatedDescription });
              
            }
          }
          
        );
      }
    );
  }
  
  searchBlogs() {
    if (this.blogsearch) {
      this.blogService.getBlogSearchDetails(this.blogsearch)
        .subscribe(response => {
          this.blogSearchData = response;
          this.search = true;
        });
    } else {
      this.search = false;
    }
  }


  recentblog() {
    this.blogService.getBlogDetails().subscribe((res: any) => {
      if (res) {
        let count = 0; // Counter to track the number of processed blog entries
  
        res.forEach((e, index) => {
          if (count < 5) { // Process only the first 5 entries
            let extension = e.fileName.split('.');
            this.blogDatas.push({
              image: e.data,
              extension: extension[1],
              text: e.text,
              subTitle: e.subTitle,
              title: e.title,
              date: e.date,
              id: e.id
            });
  
            count++; 
          }
        });
      }
    });
  }
  
  handleBlogClick(blog: any) {
    const selectedBlog = this.blogDatas.find((b) => b.subTitle === blog.subTitle);
    this.blogData = [selectedBlog];
  
    this.router.navigate(['/blog', blog.subTitle.replace(/ /g, '-')]);
  }
  
  
 categorycheck(checkval) {
    this.category = checkval;
    // Filter blogArray based on the selected category
    this.filteredBlogArray = this.blogArray.filter(blog => blog.title === this.category);
  }

  blogcomment(){
    this.sucessMessage=true
  }

  getCurrentUrl(): string {
    return window.location.href;
    // return 'https://www.qbrainx.com/blog/'+this.blogData[0].subTitle.replace(/ /g, '-')
  }

  createComment() {
    this.sucessMessage=false;
    this.blogService.createBlogComment(this.blogComment).subscribe(
      (response) => {
        this.sucessMessage=true;
        
       
      },
      (error) => {
        this.commentResult = { success: false, message: 'Error creating comment.' };
      }
    );
  }

}
