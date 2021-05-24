import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesPageRoutingModule } from './pages-routing.module';
//import { Zoom } from '@ionic-native/zoom/ngx';

import { PagesPage } from './pages.page';
import { DatePipe } from '@angular/common';
import { FileSelectDirective, FileDropDirective, FileUploadModule } from 'ng2-file-upload';
// component
import { DashboardComponent } from './dashboard/dashboard.component';

import { ListviewComponent } from './listview/listview.component';
import { DetailsComponent } from './details/details.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    FileUploadModule,
    PagesPageRoutingModule
  ],
  declarations: [
    PagesPage,
    DashboardComponent,
    ListviewComponent,
    DetailsComponent,
    ProfileComponent

  ],
  providers:[DatePipe]
})
export class PagesPageModule {}
