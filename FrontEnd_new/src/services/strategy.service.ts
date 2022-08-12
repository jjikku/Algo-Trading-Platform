import { HttpClient ,HttpParams} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
@Injectable({
    providedIn:'root'
})
export class StrategyService{
    constructor(private http:HttpClient){}
    getstrategys()
    {
        return this.http.get("http://localhost:5000/strategy")
    }
    getstrategy(id:any)
    {
             return this.http.get("http://localhost:5000/strategy/"+id);
    }
    deletestrategy(id:any)
    {   
        console.log("H")
      return this.http.delete<any>("http://localhost:5000/strategy/"+id);
  
    }
    editStrategy(id:any, strategy:any)
    {   
        console.log("editstrategy service = "+id,strategy)
        return this.http.post("http://localhost:5000/strategy/edit/"+id,{"strategy":strategy});
    }
    getstrategybyUserId(id:any, isAdmin:any)
    {
        return this.http.get("http://localhost:5000/strategy/ByUserId/"+id+"&"+isAdmin);
    }
}