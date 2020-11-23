import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SpecsComponent } from './specs/specs.component';
import { BuildComponent } from './build/build.component';
import { PreOrderComponent } from './pre-order/pre-order.component';
import { BlogComponent } from './blog/blog.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ThreeloaderComponent } from './build/threeloader/threeloader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BuyComponent } from './buy/buy.component';
import { CareerApplicationComponent } from './career-application/career-application.component';

import { WriteService } from '../app/service/write.service';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SpecsComponent,
    BuildComponent,
    PreOrderComponent,
    BlogComponent,
    ContactUsComponent,
    NavigationComponent,
    ThreeloaderComponent,
    BuyComponent,
    CareerApplicationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [WriteService],
  bootstrap: [AppComponent],
})
export class AppModule {
  
}
