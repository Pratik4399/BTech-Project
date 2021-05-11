import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';
//components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListviewComponent } from './listview/listview.component';
import { DetailsComponent } from './details/details.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: PagesPage,
    children:[
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'list/:type',
        component: ListviewComponent
      },
      {
        path: 'details',
        component: DetailsComponent
      },
      {
        path:'profile',
        component:ProfileComponent

      },

      {
        path: '',
        redirectTo:'dashboard',
        pathMatch: 'full'
      }
      
    ]
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
