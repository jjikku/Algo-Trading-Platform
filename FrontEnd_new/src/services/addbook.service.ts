import { Injectable } from '@angular/core';
import {HttpClient ,HttpResponse} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AddbookService {

  constructor(private http:HttpClient) { }
  addbook(book:any)
  {   
    return this.http.post("http://localhost:5000/books/addbook",{"book":book});
  }}
