import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { SharedModule } from './shared/shared.module';
import { NgwWowModule } from 'ngx-wow';
import { SwaggerApiModule } from './core/helpers/swagger-api.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ApiConfiguration } from './api/qbrainx-api/api-configuration';
import { environment } from '../environments/environment';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    NgwWowModule,
    SwaggerApiModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 60000, 
      progressBar: true,
    }),
     ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private base: ApiConfiguration) {
    base.rootUrl = `${environment.apiPrefix}${environment.apiQbrainx}`;
  }
  
}
