import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginperformedService {
   loginPerformed = false;

  constructor(private http: HttpClient) { }
  login(item:any)
  {    

      return this.http.post<any>("http://localhost:5000/login",{"login":item})

  }

  
}

