import { Component, OnInit, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { interval, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

//service
import { CommonService } from './data/service/common/common.service';

const source = interval(Number(environment.getAlertMsgCount));
//const source = interval(20000);
//console.log(typeof Number(environment.getAlertMsgCount));

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  
  //public appPages : any;
  public login_usr:any;
  public homecare=[];
  subscription: Subscription;  
  
  

  public appPages = [  
    {
      title: 'Dashboard',
      url: '/pages/dashboard',
      icon: 'apps'
    },
    {
      title: 'Profile',
      url: '/pages/profile',
      icon: 'heart'
    },
    // {
    //   title: 'My Stocks',
    //   url: '/pages/list/my',
    //   icon: 'bag-add'
    // }
    
  ];
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage:Storage,    
    private commonService:CommonService,
    
  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }

  ngOnInit() {
    this.initAppData();
  }

  ionViewWillEnter(){
    this.initAppData();
  }

  initAppData(){
    // const path = window.location.pathname.split('folder/')[1];
    // if (path !== undefined) {
    //   this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    // }
  
 
  }

  ngOnDestroy(){
         
  }


  
}
