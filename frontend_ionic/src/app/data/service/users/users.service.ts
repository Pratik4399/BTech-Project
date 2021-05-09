import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpEventType } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { environment } from '../../../../environments/environment';

const userApi = environment.userApi;
const LoginApiUrl = environment.LoginApiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  glb_obj={};
  
  constructor(
    private router:Router,
    private http:HttpClient,
    private storage: Storage) { 
      
    }

  
  // login user
  login(lval){
    var payload = {
     
      "userid":lval.username,
      "pwd": lval.password,
    };
  console.log(typeof payload);
    let headers = new HttpHeaders()
    .set("Content-Type","application/json");
     //return this.http.post(LoginApiUrl,JSON.stringify(payload),{headers}); 
     return this.http.get(LoginApiUrl,{headers}); 
  }

  //logout user
  logout(){
    return this.storage.clear();
  }

  // load dashboard data
  loadProfile(lval){

    let payload = {};

  
    let headers = new HttpHeaders()
    .set("Accept",'application/json')
    .set("Content-Type","application/json");    

     return this.http.get(LoginApiUrl,{headers:headers});

  }

  // store user data
  storeLogData(key,uob){
    this.storage.set(key, uob);    
  }
  //get storage data
  getStoreData(key){
    return this.storage.get(key);
  }

  // get user obj
  getUserObj(){
    
    return this.storage.ready().then(()=>this.storage.get('user_obj'));    
  }  


  
  //load users data
  getUsers(){
  
    //let lobj = JSON.parse(localStorage.getItem('proj_obj'));

    var payload = {
   
    };
  
    var headers = new HttpHeaders()
  
    .set("Content-Type","application/json");
  
     return this.http.get(userApi,{headers});        
  
    }
}
