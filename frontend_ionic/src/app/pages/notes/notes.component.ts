import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ModalController, AlertController } from '@ionic/angular';
import { ListviewComponent } from './../listview/listview.component';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../environments/environment';

//service
import { CommonService } from './../../data/service/common/common.service';
import { UsersService } from './../../data/service/users/users.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {

  loaded = true;
  login_usr:any;
  app_dt:any;
  today :any =  Date.now();
  noteForm: FormGroup;
  saved_resp:any;
  filled_form = {};
        
  @Input() past_data : {};
  @Input() showModal = false;

  constructor(
    private route:Router,
    private formBuilder:FormBuilder,
    private alertController:AlertController,
    private modalController:ModalController,
    private commonService:CommonService,   
    private usersService:UsersService
  ) { 

     

  }

  ngOnInit() {

    this.loaded = true;
    
    //added for execute notes as seperate view
    // get stored data
    this.usersService.getUserObj().then((val)=>{
      this.login_usr = val; 
      if(this.login_usr != null)
      {
        
      }
      else{
        this.commonService.showToast("User not logged In",'warning');
        this.route.navigateByUrl("/authuser/login");
      }     
    });

   
       
          
  }

  
  // modal function
  async dismissModal() {
    //const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(this.saved_resp);
    
  }

}
