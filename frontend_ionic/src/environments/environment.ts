// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  loginError:"Invalid Credentials, Please Check",
  loginSuccess:"Login Successful",
  uploadSuccess:"Uploaded File Successfull",
  uploadFail:"Unable to Upload. Please try .pdf file.",
  alert_save:"Alert Created Successfully",
  error_alert_create:"Not Able To Create Alert, Connection Error",
  error_no_data:"No Data Found",


  refresh_iot_data:"120000",
  refresh_observe_data:"360000",
  getAlertMsgCount:"60000",
  general_toast:4000,
   
  LoginApiUrl:"/assets/json_data/users.json",
  userApi:"/assets/json_data/docters.json",
  //getStocksApi:"http://52.142.2.226:8000/stock_data_api/real_time_data",
  getStocksApi:"./assets/json_data/stocks.json",

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
