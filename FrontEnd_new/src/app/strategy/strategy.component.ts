import { Component, OnInit,Input } from '@angular/core';
import { StrategyService } from 'src/services/strategy.service';
import { Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.css']
})
export class StrategyComponent implements OnInit {
  strategy = [{
    _id:Number,
    stratname:String,
    strategy:String
  }
  ]

  constructor(private strategyservice:StrategyService,private router:Router) { }

  ngOnInit(): void {
    this.strategyservice.getstrategys()
    .subscribe((data) =>{
      if(data instanceof HttpErrorResponse)
      {
        if(data.status === 401)
        {
          this.router.navigate(["/login"])
        }
        
      }
      else{
        this.router.navigate(["/strategy"])
      }
      console.log(data)

      console.log("Get Service")
      this.strategy=JSON.parse(JSON.stringify(data))
    });
  }

}