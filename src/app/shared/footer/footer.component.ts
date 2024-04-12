import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { EmailSubscription } from 'src/app/api/qbrainx-api/models/EmailSubscription';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private sharedservice:SharedService,private router:Router) { }
  emailSubscription: EmailSubscription = new EmailSubscription('');
  subscriptionResult: any; 
  sucessMessage:boolean=false;
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
  
     
      subscribe() {
        this.sucessMessage=false;
        this.sharedservice.createEmailSubscription(this.emailSubscription).subscribe(
          (response) => {
            this.sucessMessage=true;
          },
          (error) => {
            this.subscriptionResult = { success: false, message: error.error.message };
          }
        );
      }
  
}
