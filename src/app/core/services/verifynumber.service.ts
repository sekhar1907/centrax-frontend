import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VerifynumberService {
  smsverify = "https://dmc.dentaloptimizer.com/api/sms/verify_phone_number"

  constructor( private http:HttpClient
  ) { }

  smsverifyfun(smsverify:any) {
    console.log("smsverify display number",smsverify)
    return  this.http.post(this.smsverify,smsverify)
   }
}
