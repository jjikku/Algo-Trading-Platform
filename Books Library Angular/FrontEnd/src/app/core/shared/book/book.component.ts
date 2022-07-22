// Decorators
import { Component, Input, OnInit } from '@angular/core';

// Models
import { Book } from '../../models/book.model';

// Services
import { HelperService } from '../../../core/services/helper.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
  isAdmin: boolean;
  @Input('book') book: Book;

  constructor(private helperService: HelperService) { }

  ngOnInit(): void {
    this.isAdmin = this.helperService.isAdmin();
  }

}
