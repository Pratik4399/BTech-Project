import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from './../../../environments/environment';

//service

import { CommonService } from './../../data/service/common/common.service';
import { UsersService } from './../../data/service/users/users.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  loaded = true;
  loading = false;
  submitted = false;
  login_usr:any;
  alertForm:any;
  nd_msg= ''; 
  item:any;
  dmodal:any;
  show_upl= false;

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    public modalController:ModalController,    
    private commonService:CommonService,
    private usersService:UsersService
  ) { }

  ngOnInit() {

    this.loaded = true;
    
    this.usersService.getStoreData('details').then((dval)=>{     
      
      if(dval != 'undefined')
      {
        this.loaded = false;
        this.item = dval;

        console.log(this.item);

        this.createAlertForm();
      }

    });
  }

  get f()
  {
    return this.alertForm.controls;
  }

  //create alert form
  createAlertForm(){
    this.alertForm = this.formBuilder.group({
      target: ['', Validators.required]     
    });
  }

  //submit form
  onSubmit() {
    this.loaded = true;
    this.submitted = true;
    let tval = this.alertForm.value.target;

    if(tval != 'undefined')
    {
      this.loaded = false;
      this.loading = true;
      let res = this.commonService.sendAlert(this.item, tval);
    }
    
  }



  // get notification details
  getNotificationDetails(){
    
  }

  // get notification details
  getMedicine(){
    
  }

  // get medicine details
  getPrescriptionDetails(){
    
  }

  // get report details
  getReportDetails(){
    
  }  


}
