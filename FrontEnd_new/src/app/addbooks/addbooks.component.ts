import { Component, OnInit } from '@angular/core';
import { AddbookService } from 'src/services/addbook.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addbooks',
  templateUrl: './addbooks.component.html',
  styleUrls: ['./addbooks.component.css']
})
export class AddbooksComponent implements OnInit {
  


  constructor(private _addBookForm: FormBuilder, private addbookservice:AddbookService, private router:Router) { }

  
  addBookForm = this._addBookForm.group({
    title: [""],
    author: [""],
    image:[""],
    about:[""]
  });

  ngOnInit(): void {
  }
  
  

  addBook()
  {    
    const title = this.addBookForm.controls['title'].value;
    const author = this.addBookForm.controls['author'].value;
    const image = this.addBookForm.controls['image'].value;
    
    const about = this.addBookForm.controls['about'].value;

    const book = {
      title,
      author,
      image,
      about
    }

    this.addbookservice.addbook(book)
    .subscribe((data) => {
      console.log(data)

    console.log("Add book Service Called");    
    console.log(data);
    this.router.navigate(['/books']);
  });
}
}
