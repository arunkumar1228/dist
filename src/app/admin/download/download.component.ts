
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/qbrainx-api/services/AdminServices/api.service';
import * as XLSX from 'xlsx';
import { BlogCommentDto } from 'src/app/api/qbrainx-api/models/BlogCommentDto';
import { CareersRegister } from 'src/app/api/qbrainx-api/models/CareerRegister';
import { LetsTalk } from 'src/app/api/qbrainx-api/models/LetsTalk';
import { PersonalDetails } from 'src/app/api/qbrainx-api/models/PersonalDetails';
import { WebinarRegister } from 'src/app/api/qbrainx-api/models/WebinarRegister';
import { EmailSubscription } from 'src/app/api/qbrainx-api/models/EmailSubscription';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent {
  blogComments: BlogCommentDto[] = [];
  careerRegisters: CareersRegister[] = [];
  letsTalkData: LetsTalk[] = [];
  persons: PersonalDetails[] = [];
  webinarRegisters: WebinarRegister[] = [];
  emailSubscriptions: EmailSubscription[] = [];
  register;
  constructor(private apiService: ApiService) {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.apiService.getAllDates().subscribe((data: BlogCommentDto[]) => {
      this.blogComments = data;
    });

    this.apiService.getAllLetsTalk().subscribe((data: LetsTalk[]) => {
      this.letsTalkData = data;
    });

    this.apiService.getAllPerson().subscribe((data: PersonalDetails[]) => {
      this.persons = data;
    });

    this.apiService.getAllWebinarRegister().subscribe((data: WebinarRegister[]) => {
      this.webinarRegisters = data;
    });

    this.apiService.getAllSubscription().subscribe((data: EmailSubscription[]) => {
      this.emailSubscriptions = data;
    });
  }
  downloadExcel(data: any[], fileName: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }




generatePdf() {
  this.apiService.getAllCareers().subscribe((data) => {
    const pdfContent = this.createPdfContent(data);
    const documentDefinition = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      content: pdfContent,
    };
    pdfMake.createPdf(documentDefinition).download('career_register.pdf');
  });
}


createPdfContent(data: any[]) {
  const tableBody = [
    [
      'Full Name',
      'Phone Number',
      'Email',
      'Position',
      
    ]
  ];
  const emailSet = new Set();
  data.forEach(item => {
    if (!emailSet.has(item.emailId)) {
      tableBody.push([
        item.fullName,
        item.phoneNumber,
        item.emailId,
        item.position,
      ]);
      emailSet.add(item.emailId); 
    }
  });

  return [
    {
      table: {
        headerRows: 1,
        body: tableBody
      }
    }
  ];
}

}
