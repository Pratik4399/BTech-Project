import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpEventType } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { formatDate } from '@angular/common';
import { ToastController } from '@ionic/angular';

//for file transfer
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
// import { FileOpener } from '@ionic-native/file-opener/ngx';
// import { File } from '@ionic-native/file';
import { environment } from '../../../../environments/environment';

//fcm
import { FCM } from '@ionic-native/fcm/ngx';


const userApi = environment.userApi;
const getStocksApi = environment.getStocksApi;

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  
  constructor(    
    private http:HttpClient,
    private storage: Storage,
    private router:Router,
    // private transfer: FileTransfer,
    // private file:File,
    private toast: ToastController,
    private fcm: FCM,
  ) {
    
  }

  //get stocks
  getStocks(){
    
    let headers = new HttpHeaders()
    .set("Content-Type","application/json");
     //return this.http.post(LoginApiUrl,JSON.stringify(payload),{headers}); 
     return this.http.get(getStocksApi,{headers}); 
  }

  
  //set alerts 
  setStocks(slist){

    var payload = {
     
      "userid":slist.username,
      "pwd": slist.password,
    };
  console.log(typeof payload);
    let headers = new HttpHeaders()
    .set("Content-Type","application/json");
     //return this.http.post(LoginApiUrl,JSON.stringify(payload),{headers}); 
     return this.http.get(getStocksApi,{headers}); 
    
  }

  //set alerts 
  sendAlert(obj, tval){

  //   var payload = {
     
  //     "userid":lval.username,
  //     "pwd": lval.password,
  //   };
  // console.log(typeof payload);
  //   let headers = new HttpHeaders()
  //   .set("Content-Type","application/json");
  //    //return this.http.post(LoginApiUrl,JSON.stringify(payload),{headers}); 
  //    return this.http.get(getStocksApi,{headers}); 

  this.showToast(environment.alert_save,'success');
  return true;
    
  }

 


       
  // show toast
  async showToast(msg, color, mrn=0, duration = environment.general_toast, show_btn=false){
    
    const toast = await this.toast.create({
      message: msg,
      duration: duration,
      color:color,
      buttons:(show_btn == true)?
      [{
        side:'end',
        text:'view',
        handler:()=>{
            if(mrn){
              console.log(mrn);
              this.router.navigate(['/pages/notifications',mrn]);
            }
        }
      }]:[]
    });     
    
    toast.present();
  }

  // send notification
  sendPushNotification(){

  }

  

      
}
