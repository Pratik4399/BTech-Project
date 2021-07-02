import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
//service
import { UsersService } from './../../data/service/users/users.service';
import { CommonService } from './../../data/service/common/common.service';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  err_msg = '';
  login_usr:any;
  //check if already logged
  public isLogged;
  public response;
  public user_id;
  // public submit = 0;
  public flag = false;
  public loaded = false;
  public loading = false;
  public ldata;
  public lopdata;
  public set_val:any;
  private alive = true;

  constructor(
    private formBuilder: FormBuilder, 
    public loginService : UsersService,
    public commonService : CommonService,
    public toast:ToastController,
    public router : Router
  ) { }

  ngOnInit() {
    this.loadFormLog();
  }

  ionViewWillEnter(){
    
    this.loadFormLog();
  }

  loadFormLog(){    

    //this.loaded = true;

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      passWord: ['', [Validators.required]],
      conf_passWord: ['', Validators.required],
      // role: ['', [Validators.required]],
    });

     
    this.loginService.getUserObj().then((val)=>{
      //this.login_usr = val;
     // this.loaded = false;
     console.log(val);

      if(val !== null)
      {        
        this.router.navigateByUrl("/pages/dashboard");
      }         
     
    });   
    
  }
  // convenience getter for easy access to form fields
  get f()
  {
    return this.registerForm.controls;
  }
  onBlur(event){
    console.log("event: ",event)
  }

  onSubmit() {
        this.loaded = true;
        this.submitted = true;
        
        let login_object = {
          "name": this.registerForm.value.name,
          "username": this.registerForm.value.userName,
          "email": this.registerForm.value.email, 
          "password": this.registerForm.value.passWord,
          "conf_passWord": this.registerForm.value.conf_passWord,
         
        };

        console.log(this.registerForm.value);

        // stop here if form is invalid

        if (this.registerForm.invalid) {

          // this.submit = 0;

          this.loaded = false;
          console.log("invalid");
            return;
        }
        else{
 
          // call login api
          this.loginService.login(login_object).subscribe((ldt)=>{
            
            this.loaded = true;
            
            console.log(ldt);
            if(ldt['status'] == 'success')
            {
              // for load dashbaord data adjustment, need to remove after dashbaord api
              let mtch = ldt['data'].filter((elm)=>{
                return elm['password'] == login_object['password'] && elm['username'] == login_object['username']
              });

              console.log(mtch);

              this.loginService.storeLogData('user_obj',mtch["0"]);
              this.showToast(environment.loginSuccess, 'success');          
              
              this.router.navigateByUrl('/pages/dashboard');
              
            }
            else{
              this.loaded = false;
              this.err_msg = environment.loginError;
              this.showToast(this.err_msg, 'danger');
            }

          });
        }

    }

    // show toast
    async showToast(msg, color){
      // const toast = await this.toast.create({
      //   message: msg,
      //   duration: 2000,
      //   color:color
      // });
      // toast.present();
      this.commonService.showToast(msg, color,0);
    }

    ngOnDestroy() {
      this.alive = false;
    }

}
