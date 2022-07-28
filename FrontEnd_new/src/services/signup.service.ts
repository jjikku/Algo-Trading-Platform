import { Injectable } from '@angular/core';
import { HttpClient ,HttpBackend, HttpResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  signUp(item:any)
  {   
    console.log(item);
    return this.http.post<any>("http://localhost:5000/signup",{"signup":item})
  }

}
