import { NgModule } from '@angular/core';
import { ApiModule as QbrainxModule } from 'src/app/api/qbrainx-api/api.module';
import { environment } from 'src/environments/environment';

@NgModule({
    imports: [
       QbrainxModule.forRoot({
            rootUrl: `${environment.apiPrefix}${environment.apiQbrainx}`
        }),
    ]
})
export class SwaggerApiModule { }