import { Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SeoService } from '../seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
selected:any="1";
fieldSelected:number=0;
Address:any;
LifeAtQbTitle: any;
LifeAtQbSubTitle : any;
Established:number=0;
clients:number=0;
projects:number=0;
activeButton:number=1;
phone:any;
whatWeOffer:any;
bannerArray: Array<any> = [];
fieldArray: Array<any> = [];
whoweareinfoArray: Array<any> = [];
whowearemainArray: Array<any> = [];
testimonialArray: Array<any> = [];
clientFeedbackArray: Array<any> = [];
loader=true;
currentSlide = 0;
currentUrl: string;
clientfeedbackdetail={clientName:'',clientPosition:'',feedback:''};


  AddressArray: any[] = [
  { imgSrc: "assets/images/location-usa.png", 
  country: "usa" ,
  address:[{city:"MICHIGAN",Address:"100 W. Big Beaver Road Suite 200, Troy, MI 48084"},
  {city:"ARKANSAS",Address:"1116 S Walton Blvd, #216, Bentonville, AR 72712"}],
  phone:["+1 248-606-7880"],Email:""},

  { imgSrc: "assets/images/location-india.png", country: "india" ,address:[{city:"COIMBATORE-SOUTH",Address:"Hanudev Infopark, Nava India RdCoimbatore, Tamil Nadu – 641028"},
  {city:"COIMBATORE-NORTH",Address:"Shiv Chambers, 247, Alagesan Rd,Saibaba Colony, Coimbatore,Tamil Nadu – 641011"},
  {city:"VISAKHAPATNAM",Address:"2-147/4,Plot no -MIG 678 Midhilapuri Vuda Colony, Near kushi super market, Madhurawada, Visakhapatnam, Andhra Pradesh- 530041"}],
  phone:["0422-427-3782", "0422-350-8152"]},
  
  { imgSrc: "assets/images/location-dubai.png", country: "dubai",address:[{city:"dubai",Address:"Dubai Silicon Oasis, DDP, Building A1, Dubai, United Arab Emirates"}],phone:[" +180 486 969 04"]},
  ]
  image: string | ArrayBuffer | null | undefined;
 

  constructor(private httpClient : HttpClient,private router:Router,private seoService: SeoService ) {
   
  }

  ngOnInit(): void {
    this.autoPlayForCoreServices()
    this.autoPlayWhatWeOffers()
    this.phone=this.AddressArray[ this.activeButton ].phone
    this.Address=this.AddressArray[ this.activeButton ].address
    this.allBannerList()
    this.whoWeareList()
    // this.lifeAtQb()
    this.weoffers()
    this.allTestimonialList()
    this.allClientFeedbackList()
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.loader = false;
  }, 3000);
this.seoService.initializeSEOHome();
  }

  allBannerList(){
    this.httpClient
    .get<any[]>('https://qbrainx.com/qbrainx-web/v1/banner/getAllBanners',  {
      responseType: 'json'
    })
    .subscribe(data => {
      data.forEach(e => {
        let extension = e.fileName ? e.fileName.split('.') : []; // Add null check for e.fileName
        let ext = extension.length > 1 ? extension[1] : null; // Get the extension or null
        
        // Push image or video data based on the extension
        if (ext !== null && (ext === 'jpg' || ext === 'png')) {
          this.bannerArray.push({
            image: e.data,
            extension: ext,
            title: e.bannerTitle,
            description: e.bannerSubTitle,
            buttonName: e.bannerCallOfAction,
            buttonlink: e.link
          });
        } 
          this.bannerArray.push({
            image: '../../../assets/video/Digitalization.mp4',
            extension: 'mp4',
            loop: true
          });
        
      });
    });
  }
  

  whoWeareList(){
    this.httpClient
    .get<any[]>('https://qbrainx.com/qbrainx-web/v1/whoWeAre/getAll',  {
      responseType: 'json'
    })
    .subscribe(data => {
      data.forEach((e,index) => {
       let extension = e.fileName.split('.');
       this.whoweareinfoArray.push({
            image: e.data,
            extension: extension[1],
            description: e.description,
            link: e.link
          })
      });
  });
}
lifeAtQb(){
  this.httpClient
  .get<any[]>('https://qbrainx.com/qbrainx-web/v1/lifeAtQb/getAllText',  {
    responseType: 'json'
  })
  .subscribe(data => {
    this.LifeAtQbTitle = data[0].textTitle
    this.LifeAtQbSubTitle = data[0].textSubTitle
    this.Established = data[0].established
    this.clients = data[0].client
    this.projects = data[0].project
});
}
weoffers(){
  this.httpClient
  .get<any[]>('https://qbrainx.com/qbrainx-web/v1/weOffers/getAll',  {
    responseType: 'json'
  })
  .subscribe(items => {
    items.forEach((e) => {
      let extension = e.imageName.split('.');
      this.fieldArray.push({
        image: e.data,
        extension: extension[1],
        description: e.description,
        heading: e.title
      })
  });
});
}


  allTestimonialList() {

    this.httpClient
      .get('https://qbrainx.com/qbrainx-web/v1/Testimonial/getAll', {
        responseType: 'text' as 'json'
      })
      .subscribe((data: any) => {
       JSON.parse(data).forEach((e: any) => {  
          let extension = e.fileName.split('.');
          this.testimonialArray.push({
            image: e.data,
            extension: extension[1],
            title: e.title,
            subTitle: e.subTitle,
            id: e.id,
            text: e.text,
            fileName: e.fileName
          })
        });
      });



  }  
  allClientFeedbackList(){
    this.httpClient
    .get('https://qbrainx.com/qbrainx-web/v1/Client/getAll', {
      responseType: 'text' as 'json'
    })
    .subscribe((data: any) => {
     JSON.parse(data).forEach((e: any) => {     
        let clientImage = e.clientFileName.split('.');
        let clientLog = e.clientLogName.split('.');

        this.clientFeedbackArray.push({
          clientImage: e.clientImage,
          clientLogImage: e.clientLog,

          extensionLog: clientLog[1],
          extensionClient:clientImage[1],
          clientName: e.clientName,
          clientPosition: e.clientPosition,
          clientId: e.clientId,
          feedback: e.feedback,
          clientImagefileName: e.clientFileName,
          clientLogfileName:e.clientLogName
        })
      });
    });
  }
  changeSlide(index: number): void {
    this.currentSlide = index;
  }



// Auto Number counter
  @ViewChild('testDiv', {static: false}) private testDiv!: ElementRef<HTMLDivElement>;
  
 started:any = false; // Function Started ? No

 @HostListener('window:scroll', ['$event']) 
  onScroll()
  {
    if (this.testDiv){
      const rect = this.testDiv.nativeElement.getBoundingClientRect();
    if (window.scrollY >= (rect.top+500) ){
      if(!this.started){
        this.reset();
        this.startCount();
      }
      this.started=true
    }
  }
  }
 
 startCount() {
   const EstablishedCountStop=setInterval(()=>{ 
    this.Established=this.Established;
    if(this.Established>=2015)
    {
      clearInterval(EstablishedCountStop)
    }
  },10)

  const clientCountStop=setInterval(()=>{ 
  this.clients++;
  if(this.clients>=100)
  {
    clearInterval(clientCountStop)
  }
},4)

  const projectCountStop=setInterval(()=>{ 
  this.projects++;
  if(this.projects>=150)
  {
    clearInterval(projectCountStop)
  }
},3)
this.started=false
}
  
reset()
{
  this.Established=0;
  this.clients=0;
  this.projects=0;
  this.started=false
}


//our core services function
coreservices:any;
autoPlayForCoreServices()
{
  this.coreservices=setInterval(() =>{
    this.selected++;
    if(this.selected == 6) {
      this.selected=1;
    }
   this.selected=this.selected.toString()
 
  }, 5000);
}

showimg()
{
  clearInterval(this.coreservices)
  this.autoPlayForCoreServices();

}
previousFn()
{
  this.selected--;
  if(this.selected<1)
  {
    this.selected=6
  }
  this.selected=this.selected.toString()
  clearInterval(this.coreservices)
  this.autoPlayForCoreServices();
}
nextFn()
{
  this.selected++;
  if(this.selected>=6)
  {
    this.selected=1
  }
  this.selected=this.selected.toString()
  clearInterval(this.coreservices)
  this.autoPlayForCoreServices();
}
//WHAT WE OFFER Function
autoPlayWhatWeOffers()
{
this.whatWeOffer=setInterval(() =>{
    this.fieldSelected++;
    if(this.fieldSelected == 11) {
      this.fieldSelected=0;
    }
  }, 5000);
}

previous()
{
  this.fieldSelected--;
  if(this.fieldSelected<0)
  {
    this.fieldSelected=2
  }
  clearInterval(this.whatWeOffer)
  this.autoPlayWhatWeOffers();
}

next()
{
  this.fieldSelected++;
  if(this.fieldSelected>=11)
  {
    this.fieldSelected=0
  }
  clearInterval(this.whatWeOffer);
  this.autoPlayWhatWeOffers();
  
}

//Reach us
setActive (buttonName:number){
  this.activeButton = buttonName;
  this.phone=this.AddressArray[ this.activeButton ].phone
  this.Address=this.AddressArray[ this.activeButton ].address
}

clientdetail(clientdetails){
  this.clientfeedbackdetail=clientdetails;
}

redirectpage(){
  let path;
if(this.selected==1){
path='/services/servicenow';
}
else if(this.selected==2){
  path='/services/salesforce';
}
else if(this.selected==3){
  path='/services/digitaltransformation';
}

else if(this.selected==5){
  path='/services/sap';
}
else if(this.selected==6){
  path='/services/data-and-ai';

}
  this.router.navigate([path]);
}


}


