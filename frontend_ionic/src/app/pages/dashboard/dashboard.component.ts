import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController, AlertController, NavParams} from '@ionic/angular';
import { interval, Subscription} from 'rxjs';
import { environment } from 'src/environments/environment';
//component 
import { ListviewComponent } from './../listview/listview.component';
import { DetailsComponent } from './../details/details.component';
//service
import { UsersService } from './../../data/service/users/users.service';

const source = interval(Number(environment.refresh_iot_data));

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {

  private obmodal:any;
  public login_usr:any;
  public profile_img = './../../../assets/icon/patient.png';
  loaded = false;
  
  name:string;
    
  public profile;

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    private modalController:ModalController,
    public router:Router,
    public usersService:UsersService,
     
    ) {
      //this.getDashData();
  }

  ngOnDestroy(){
    
  }

  ngOnInit() {
    //this.loaded = true;
    this.getDashData();
  }
  ngAfterViewInit(){
  //this.getDashData(); 
    
  }
  
  ionViewWillEnter(){
    
    this.getDashData();
  }
  // init view for each page load
  getDashData(){

    this.loaded = true;
    this.usersService.getUserObj().then((val)=>{
      this.login_usr = val;

     console.log(this.login_usr);    
       
      if(this.login_usr == null)
      {
        this.loaded = false;
        this.router.navigate(["/authuser/login"]);
      }
      else{      

          this.getProfileData();
          
      }    
    });
    
  }

  //logout user
  logout(){
            
    let lg = this.usersService.logout();
    lg.then((val)=>{
      console.log('in logout');
      if(val == undefined)
      {
        //this.stopHomecareToast();
        this.navCtrl.navigateRoot(['/pages/dashboard']);
        this.router.navigate(['/authuser/login']);
      }
    });    
    
  }



  // get profile 
  getProfileData(){

    this.loaded = false;   
    this.profile = this.login_usr;
  }
 

  

  openView(vname){
    console.log(vname);
    let lnk = '';

    switch(vname){

      
      case 'details': lnk = '/pages/details';
                      this.openLink(lnk);
                      break;      
      
      case 'profile': this.profileView();                      
                      break;
    
    }
    
  }

  // open profile view
  profileView(){
    this.router.navigate(['/pages/profile'],{queryParams:{mrn:this.login_usr.userid}});
  }


  // open observe modal
  async openDetails(){
    this.obmodal = await this.modalController.create({
      component: DetailsComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'user_obj': this.login_usr,
        'uid': this.login_usr.userid,
        'showModal':'true'
      }
    });

   this.obmodal.onWillDismiss().then((dataReturned) => {
    if (dataReturned !== null) {
      // this.sel_sdata = dataReturned.data;
      // this.show_appt = true;
      // //alert('Modal Sent Data :'+ dataReturned);
       console.log(dataReturned);
    }
    });    

    return await this.obmodal.present();

  }

  // redirect to link
  openLink(val){
    console.log(val);
    this.router.navigate([val]);
  }

}
