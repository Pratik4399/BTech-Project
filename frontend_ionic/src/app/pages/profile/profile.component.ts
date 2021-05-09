import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ModalController, AlertController, NavParams} from '@ionic/angular';

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
    this.mrn = this.route.snapshot.queryParamMap.get('mrn');
    console.log(this.mrn);

    this.usersService.getUserObj().then((val)=>{
      this.login_usr = val;
      this.getProfileData();
    });

    
  }

  // get profile 
  getProfileData(){
    this.loaded = true;
    this.usersService.loadProfile(this.login_usr).subscribe((pdt)=>{
      console.log(pdt);
      if(pdt['status'] == 'success' || pdt['profile'].status == 'success')
      {
            if(this.login_usr['role'] == 'patient')
          {

            this.profile = pdt['data'][0];

          }
          else{

            this.profile = (pdt['profile'].status == 'success')?pdt['profile'].data[0]:undefined;

          }
      }
      else{

        this.showMsg("Profile Data Not Found","warning");

      }
         
      // this.appointment = (pdt['appointment'].status == 'success')?pdt['appointment']:undefined;
      console.log(this.profile);
      this.loaded = false;     
      
    });
  }

  //show toast msg
  showMsg(msg,type)
  {
    this.commonService.showToast(msg,type);
  }

}
