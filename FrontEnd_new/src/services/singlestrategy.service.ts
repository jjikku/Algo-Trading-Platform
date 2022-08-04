import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SinglestrategyService {

  constructor(private http:HttpClient) { }
  
  readmore(id:any)
  {   
    const params = new HttpParams();
    return this.http.get("http://localhost:5000/singlestrategy/"+id);

  }
  editStrategy(strategy:any)
  {   
    return this.http.post<any>("http://localhost:5000/singlestrategy/"+strategy._id, {"strategy":strategy});

  }
  deleteStrategy(id:any)
  {   
    return this.http.delete<any>("http://localhost:5000/singlestrategy/"+id);

  }
}
