import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, AlertController, NavParams} from '@ionic/angular';
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
  sdata:any;
  
  
  @Input() showModal = false;
  @Output() emitService = new EventEmitter();
  loaded = false;

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
       console.log(this.yest_day);
     }

  ngOnInit() {

    this.storage.get('user_obj').then((val)=>{
    
    this.login_usr = val;

    if(this.login_usr != 'undefined')
    {     
      this.loginService.getStoreData('selected_stocks').then((lst)=>{
       
        console.log(lst);

        if(lst != null){
          this.selected_data = lst;
        }       
        
      });

      this.getStocks();
    }
 
    });
    
    
  }

  //get stocks data
  getStocks(){
    this.commonService.getStocks().subscribe((stck)=>{
      this.sdata = stck['data'];
      console.log(stck)
    });
  }

  //filter serach bar data
  filterData(ev){
    this.fdata = {};
    let fdata = this.sdata;
    
    let qry = ev.target.value;
    requestAnimationFrame(() => {
      fdata.forEach((item,index) => {
        
        let shouldShow = item['name'].toLowerCase().indexOf(qry)>-1;
     
        if(shouldShow == false)
        {
         this.fdata[item.id] = item.id; 
        }
        
      });
      
    });
  }


  //show msg
  showErrorMsg(){       
      this.commonService.showToast(this.err_msg,'warning');
  }


  // book appointment  
  async presentAlertConfirm(val) {
      const alert = await this.alrtCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Confirm!',
        message: 'Do you Want to Set Alert For'+val.name,
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
              this.selected_data.push(val);
              this.loginService.storeLogData('selected_stocks',this.selected_data);
              this.showToast("Stock added in alert list", 'success');  
              
              this.dismissModal();
            
            }
          }
        ]
      });
  
      await alert.present();
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
}
