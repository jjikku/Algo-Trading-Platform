import { Component, Input, OnInit } from '@angular/core';
import { BookService } from 'src/services/book.service';
import { SinglebookService } from 'src/services/singlebook.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  
  books = [
    {
      _id:Number,
      bookname:String,
      authorname: String,
      image: String
    }
  ]
  constructor(private bookservice: BookService, private router:Router) { }
  ngOnInit(): void {
  
    this.bookservice.getbooks()
    .subscribe((data) => {
      if(data instanceof HttpErrorResponse)
      {
        if(data.status === 401)
        {
          this.router.navigate(["/login"])
        }
      }
      console.log(data)

    console.log("Get book Service Called");    
    console.log(data);
    this.books = JSON.parse(JSON.stringify(data));
  });
}

}

// getBook(_id: any) {
//   console.log("get bookcollection id works")
//   console.log(_id);

//   this.router.navigate(['/books/details'], { queryParams: { id: _id } });

// }

