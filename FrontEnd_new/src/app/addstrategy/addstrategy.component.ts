import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';
import { addStrategyService } from 'src/services/addStrategy.service';
@Component({
  selector: 'app-addstrategy',
  templateUrl: './addstrategy.component.html',
  styleUrls: ['./addstrategy.component.css']
})
export class AddstrategyComponent implements OnInit {

  constructor(private _addStrategyForm:FormBuilder,private addstrategyservice:addStrategyService,private router:Router) { }

  addStrategyForm = this._addStrategyForm.group({
    stratname:[""],
    strategy:[""]
    

  });
  ngOnInit(): void {
  }
  addStrategy()
    { 
      console.log("called");
      const stratname=this.addStrategyForm.controls['stratname'].value;
      const strategy=this.addStrategyForm.controls['strategy'].value;
      const strats ={
        stratname,
        strategy
      }
      this.addstrategyservice.addStrategy(strats)
      .subscribe((data) =>{
        console.log(data)
        console.log("add strategy called");
        console.log(data);
        this.router.navigate(['/strategy']);
      });
      
      
        
    }
  

}
