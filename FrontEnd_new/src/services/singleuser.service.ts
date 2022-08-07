import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SingleuserService {

  constructor(private http:HttpClient) { }
  readmore(id:any)
  {   
    const params = new HttpParams();
    return this.http.get("http://localhost:5000/singleuser/"+id);

  }
  editUser(user:any)
  {   
    return this.http.post<any>("http://localhost:5000/singleuser/"+user._id, {"user":user});

  }
  deleteUser(id:any)
  {   
    return this.http.delete<any>("http://localhost:5000/singleuser/"+id);

  }
}




