import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { EditbookService } from 'src/services/editbook.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BookService } from 'src/services/book.service';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {

  constructor(private bookservice: BookService, private http: HttpClient, private _ActivatedRoute:ActivatedRoute, private _editBookForm: FormBuilder,private editbookservice:EditbookService, private router:Router) { }
  editBookForm = this._editBookForm.group({
    title: [""],
    author: [""],
    image:[""], 
    about:[""]
  });

  book= {
    title:String,
    author:String,
    image:String,
    about:String    
  }
  
  public params:any  
  ngOnInit(): void {
    this.params = this._ActivatedRoute.snapshot.paramMap.get("id");
    console.log("Params Activated Route = " + this.params);

    this.bookservice.getbook(this.params)
        .subscribe(data => {
        this.book.title = JSON.parse(JSON.stringify(data)).bookname;
        this.book.author = JSON.parse(JSON.stringify(data)).authorname;
        this.book.image = JSON.parse(JSON.stringify(data)).image;
        this.book.about = JSON.parse(JSON.stringify(data)).about;

        console.log("edit book on init= " + JSON.parse(JSON.stringify(data)))
      });
    }
  

    editBook() {

      const bookname = this.editBookForm.controls['title'].value;
      const authorname = this.editBookForm.controls['author'].value;
      const about = this.editBookForm.controls['about'].value;
      const image = this.editBookForm.controls['image'].value;
    
      const book = {
        bookname,
        authorname,
        image,
        about
      }
        this.editbookservice.editbook(this.params,book)
        .subscribe((data) => {
          if(data)
          {
            console.log("Single book Component data fetch")
            console.log(data);
            this.book = JSON.parse(JSON.stringify(data));
            console.log(this.book);
          }
          this.router.navigate(['/books']);
    
        });
      
    }




}
