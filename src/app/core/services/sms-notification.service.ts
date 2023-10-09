import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SmsNotificationService {

  baseUrl = "https://dmc.dentaloptimizer.com/api/sms/send_verification_code"
  private mobileNumber: string;

  constructor(private http:HttpClient)
   { }

   numberverify(data:any) {
    console.log("number verify",data)
    return  this.http.post(this.baseUrl,data)
   }

   set number(number: string) {
    this.mobileNumber = number
   }

   get number() {
    return this.mobileNumber;
   }
}
