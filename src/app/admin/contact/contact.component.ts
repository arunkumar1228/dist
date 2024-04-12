import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent  {
  menuForm: FormGroup;
  constructor(private httpClient: HttpClient) { 
    // Initialize the form controls
    this.menuForm = new FormGroup({
      id: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      mainLatitude: new FormControl(''),
      mainLongitude: new FormControl(''),
      contacts: new FormArray([
        this.initContact() // Initialize at least one contact by default
      ])
    });
  }

  

  bannerImage!: File | null;
  // Initialize a sub-menu FormGroup
  initContact() {
    return new FormGroup({
      id: new FormControl(''),
      cityDivision: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      postalCode: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      address: new FormControl('')
    });
  }

  addContact() {
    const contactsArray = this.menuForm.get('contacts') as FormArray;
    contactsArray.push(this.initContact());
  }
  get contacts() {
    return this.menuForm.get('contacts') as FormArray;
  }

  // Remove a contact from the FormArray
  removeContact(index: number) {
    const contactsArray = this.menuForm.get('contacts') as FormArray;
    contactsArray.removeAt(index);
  }

  banImage(event: any) {
    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg'
    ) {
      this.bannerImage = event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }


  // Submit the form to create a menu

  submitContactForm() {
    const formData = new FormData();
    formData.append('file', this.bannerImage);
    formData.append('mainContactDto', JSON.stringify(this.menuForm.value));
  
    // Send formData to your server using HttpClient
    this.httpClient.post('https://qbrainx.com/qbrainx-web/v1/Contact/create', formData)
      .subscribe(
        (response) => {
          // Optionally, you can reset the form after a successful submission
          this.menuForm.reset();
        },
        (error) => {
          console.error('Error', error);
        }
      );

}
}