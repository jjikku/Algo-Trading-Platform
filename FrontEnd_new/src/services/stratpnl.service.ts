import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StratpnlService {

  constructor(private http:HttpClient){}
    getPnl(id:any)
    {
        return this.http.get("http://localhost:5000/deploy/"+id)
    }
    exitStrategy()
    {
      alert("exit strategy service called");

      return this.http.get("http://localhost:5000/deploy/exit");

    }
    
}
