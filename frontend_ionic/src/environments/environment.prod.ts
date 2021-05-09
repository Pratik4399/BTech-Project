// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  rcpApi:"http://13.82.31.106:6809/remote_care/test",
  zoom_secret:"HZKFOwY28NHhnt2wreywVDFk2EI9AfhUMSCM",
  zoom_sdk_key:"Xx7nh6UwYn3pwL2qsv2fJkNE4FUB8LCsGaUI",


  loginAction:"login",
  loadProfile:"loadprofile",
  getAppointmentHistoryAction:"listappointments",
  getPastAppointmentList:"getPastAppointmentList",
  getPastAppointmentData:"getPastAppointmentData",
  getAvailAppointmentAction:"checkappointment",
  dashbaordAction:"",
  getPatients:"AppointedPatient",
  createAppointmentAction:"bookappointment",
  getPatientsAlerts:"patientalert",
  getPatientsLimitAlerts:"patientlimitedalert",
  getMedicinRemind:"medicationreminder",
  getPatientProfileAction:"patientwithmrn",
  homecareAction:"HomecarePatient",
  recordsAction:"",
  uploadDocAction:"uploadreport",
  getReports:"getreportlist",
  notificationAction:"",
  alertAction:"listmedications",
  medicinNotificationAction:"listmedications",
  zoomCallApi:"",
  priscriptionAction:"uploadtreatment",
  uploadNotesAction:"uploadnotes",
  //iot_timeseries:"http://rcpsimulatorvm.eastus.cloudapp.azure.com:8083/Cassandra-rest-api/sensor/getTimeseriesData?assetId=10000001&sensorNames=Thermometer&limit=5000",
  iot_timeseries:"http://rcpsimulatorvm.eastus.cloudapp.azure.com:8083/Cassandra-rest-api/sensor/getTimeseriesData",

  loginError:"Invalid Credentials, Please Check",
  loginSuccess:"Login Successful",
  uploadSuccess:"Uploaded File Successfull",
  uploadFail:"Unable to Upload. Please try .pdf file.",
  app_created:"Appointment Created Successfully",
  error_appt_create:"Not Able To Create Appointment, Connection Error",
  error_no_data:"No Data Found",
  rcp_dir:"rcp",

  refresh_iot_data:"50000",
  refresh_observe_data:"360000",
  getAlertMsgCount:"120000",
  general_toast:4000,
  iod_sensors : ['Thermometer','Oximeter','Pulse','BP Monitor', 'Blood Glucose'],
  

  userApi:"/assets/json_data/docters.json"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
