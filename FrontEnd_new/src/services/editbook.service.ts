import { Injectable } from '@angular/core';
import {HttpClient ,HttpResponse} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EditbookService {

  constructor(private http:HttpClient) { }
  editbook(id:any, book:any)
  {   
    console.log("editbook service = "+id,book)
    return this.http.post("http://localhost:5000/editbook/"+id,{"book":book});
  }
}

