import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }
  getbooks()
  {   
    
    return this.http.get("http://localhost:5000/books")

  }

  getbook(id:any)
  {   
    return this.http.get("http://localhost:5000/books/"+id);
  }
}
