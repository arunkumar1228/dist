import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private sharedservice:SharedService,private router:Router) { }


headerpathlist:any;
routepath :string;
toggle;

  ngOnInit(): void {
    this.getheaderpath();  
  }
  
    getheaderpath(){

      this.sharedservice.getheaderpathDetails().subscribe((res:any) => {

        if(res) {
        
          this.headerpathlist=res;
        }
        else{
          console.error("error")
        }
      });
    }

    getpath(path){
      this.headerpathlist.forEach((e:any)=>{
       if(e.headername===path){
          this.routepath=e.path;
       }
      })

      this.router.navigate([this.routepath]);
    }

   


 }


