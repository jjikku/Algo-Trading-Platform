import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SinglebookService {

  constructor(private http:HttpClient) { }
  
  readmore(id:any)
  {   
    const params = new HttpParams();
    return this.http.get("http://localhost:5000/books/"+id);

  }
  editBook(book:any)
  {   
    return this.http.post<any>("http://localhost:5000/singlebook/"+book._id, {"book":book});

  }
  deleteBook(id:any)
  {   
    return this.http.delete<any>("http://localhost:5000/singlebook/"+id);

  }
}
