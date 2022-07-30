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
        return this.http.get("http://localhost:5000/strategy"+id);
    }
}