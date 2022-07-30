import { Injectable } from "@angular/core";
import { HttpClient,HttpParams } from "@angular/common/http";
import { Params } from "@angular/router";

@Injectable({
    providedIn:'root'
})
export class addStrategyService {
    constructor(private http:HttpClient){}
    addStrategy(strat:any)
    {
        return this.http.post("http://localhost:5000/strategy/addstrategy",{"strat":strat});
    }
}