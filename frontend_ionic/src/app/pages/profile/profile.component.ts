import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ModalController, AlertController, NavParams} from '@ionic/angular';
import { Storage } from '@ionic/storage';

//service
import { UsersService } from './../../data/service/users/users.service';
import { CommonService } from './../../data/service/common/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  login_usr:any;
  loaded = true;
  mrn = '';

  public profile;

  constructor(
    private router:Router,
    public storage:Storage,
    private route:ActivatedRoute,
    private location:Location,
    public usersService:UsersService,
    public commonService:CommonService
  ) { }

  //go back page
   gotoBack() {
    //this.location.back();
    this.router.navigateByUrl('/pages/dashboard');
  }

  ngOnInit() {
    
    this.storage.get('user_obj').then((val)=>{
    
      this.login_usr = val;
  
      if(this.login_usr != 'undefined')
      {     
        this.profile = this.login_usr;
        console.log(this.profile)
        this.loaded = false;
      }
   
      });
    
  }


  //show toast msg
  showMsg(msg,type)
  {
    this.commonService.showToast(msg,type);
  }

}
