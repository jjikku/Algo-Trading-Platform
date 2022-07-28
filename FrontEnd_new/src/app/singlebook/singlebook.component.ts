import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SinglebookService } from 'src/services/singlebook.service';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
import { HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-singlebook',
  templateUrl: './singlebook.component.html',
  styleUrls: ['./singlebook.component.css']
})
export class SinglebookComponent implements OnInit {

  constructor( private _ActivatedRoute:ActivatedRoute, private singlebookservice: SinglebookService, private router: Router) { }
  book = [
    {
      _id:Number,
      bookname:String,
      authorname: String,
      image: String,
      about:String
    }
  ]
  public params:any  
  ngOnInit(): void {
    this.params = this._ActivatedRoute.snapshot.paramMap.get("id");
    console.log("Params Activated Route = " + this.params);
  
    
      console.log("read more Service Called");    
        this.singlebookservice.readmore(this.params)
        .subscribe((data) => {
          if(data)
          {
            console.log("Single book Component data fetch")
            //console.log(data);
            this.book = JSON.parse(JSON.stringify(data));
            console.log(this.book);
          }
          //this.router.navigate(['/l']);
    
          
    });
    
    
  }
  editBook(id:any){
    this.router.navigate(['/editbook/'+id]);

}
deleteBook(id:any){
  this.singlebookservice.deleteBook(id)
  .subscribe((data) => {
    console.log("book deleted");
    console.log(data);
    alert("Book Deleted");
    this.router.navigate(['/books']);
  });
  
}

}