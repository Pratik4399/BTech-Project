import { Component, OnInit,OnChanges, Output, EventEmitter, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, AlertController, NavParams} from '@ionic/angular';

import { Subscription, Observable, timer } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';

import { Storage } from '@ionic/storage';

//service
import { CommonService } from './../../data/service/common/common.service';
import { UsersService } from './../../data/service/users/users.service';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss']
})
export class ListviewComponent implements OnInit {

  ldata: any;
  login_usr:any;
  public err_msg:string;
  public fdata = {};
  selected_data=[];
  show_selected = false;
  sdata:any;
  // refresh timer 
  refresh_dt: Observable<number> = timer(0, 120000);

  private subscription: Subscription;  
  
  @Input() showModal = false;
  @Output() emitService = new EventEmitter();
  loaded = false;
  nloaded=false;

  title:string;
 
  today = Date.now();
  yest_day = new Date().getUTCDay();
  
  constructor(
     
     private router:Router,
     public storage:Storage,
     private route:ActivatedRoute,
     private alrtCtrl:AlertController,
     private modalController: ModalController,
     private usersService: UsersService,
     private commonService:CommonService,
     public loginService : UsersService
     
     ) {
       
       
     }

  mgOnChanges(){
   
  }

  ngOnInit() {
  

    this.storage.get('user_obj').then((val)=>{
    
    this.login_usr = val;

    if(this.login_usr != 'undefined')
    {   
      this.getStocks();
      this.getSelected();
      this.pullData();
    }
 
    });
    
    
  }

  //get stocks data
  getStocks(){    
    this.nloaded = true;
    this.commonService.getStocks().subscribe((stck)=>{
    this.sdata = stck['data'];
    console.log(this.sdata)
    if(this.sdata.length > 0 && this.selected_data.length > 0)
    {
      let match = [];
      this.selected_data.forEach((val,i)=>{
        match = this.sdata.filter((eml)=>{
          return eml.index_nm == val.index_nm && eml.value > val.value;
          //return eml.index_nm == val.index_nm;
        })
      });

      console.log(match);
      
    }
    this.nloaded = false;
    });
     
  }

  //pull data function
  pullData(){
    this.subscription = this.refresh_dt.subscribe((dt)=>{
      console.log(dt);
      this.getStocks();
    });
  }

  //filter serach bar data
  filterData(ev){
    
    let fdata = this.sdata;
    console.log(fdata);
    let temp = [];
    let qry = ev.target.value;
    
    requestAnimationFrame(() => {      
      
      fdata.forEach((item) => {
        
        let shouldShow = item['index_nm'].toLowerCase().indexOf(qry)>-1;
        
        if(shouldShow)
        {          
         //this.fdata[item.id] = item.id;
         temp.push(item);
        }
        
      });
     
      // if(temp.length == 0){
      //   this.sdata = this.fdata;
      // }
      // else{
      //   this.sdata = temp;
      // }     
           
      
    });
  }


  //show msg
  showErrorMsg(){       
      this.commonService.showToast(this.err_msg,'warning');
  }


  // book appointment  
  async presentAlertConfirm(val, add = true) {
      const alert = await this.alrtCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
        message: (add== true) ?'Do you Want to select stock '+val.name+' for prediction ?':
        'Do you Want to Remove stock '+val.name+' From selection list ?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Confirm',
            handler: () => {

              let i = this.selected_data.findIndex(el=>el.index_nm == val.index_nm);
             
              if(add == true && i == -1)
              {
                this.selected_data.push(val);
                this.loginService.storeLogData('selected_stocks',this.selected_data);
                this.showToast("Stock added in a Selection list", 'success');  
              }
              else if(add == false){
                this.selected_data.splice(i ,1);
                this.loginService.storeLogData('selected_stocks',this.selected_data);
                this.showToast("Stock removed from Selection list", 'success');  
                
              }
              else{
                this.showToast("Stock already added in Selection list", 'warning');                
              }
              
              this.getSelected();
              this.dismissModal();
            
            }
          }
        ]
      });
  
      await alert.present();
    }

    //get selected stock
    getSelected(){
      console.log(this.selected_data.length);
      if(this.selected_data.length == 0)
      {
        this.loginService.getStoreData('selected_stocks').then((dt)=>{
          
          if(dt != null)
          {
            this.selected_data = dt;
            console.log(this.selected_data)
          }
          
        })
        this.show_selected = true;
      }
        
    }

    // modal function
    async dismissModal() {
      
      await this.modalController.dismiss();      
    }
  
    // open user details
    openDetails(val){

      this.loginService.storeLogData('details',val);
      
      this.router.navigateByUrl('/pages/details');
      
    }

    // show toast
    async showToast(msg, color){
      
      this.commonService.showToast(msg, color,0);
    }

    ngOnDestroy(){
      this.subscription.unsubscribe();
    }
}
