import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StratpnlService } from "src/services/stratpnl.service";
import { Router } from "@angular/router";
import { Observable, interval, startWith } from "rxjs";

@Component({
  selector: "app-stratpnl",
  templateUrl: "./stratpnl.component.html",
  styleUrls: ["./stratpnl.component.css"],
})
export class StratpnlComponent implements OnInit {
  pnl: any;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private stratPnlService: StratpnlService,
    private router: Router
  ) {}
  inst = [
    {
      index: Number,
      strike: String,
      type: String,
      expiry: String,
      entryPrice: Number,
      LTP: Number,
      qty: Number,
      pnl: Number
    },
  ];
  
  total = 0;

  public params: any;
  public position_detail: any;

  ngOnInit(): void {
    this.params = this._ActivatedRoute.snapshot.paramMap.get("id");
    console.log("Params Strategy PNL Route = " + this.params);
    this.getPositions();
    setInterval(() => {
      this.findSum(); 
    }, 1000);

  }

  getPositions() {
    getServerSentEvent(
      "http://localhost:5000/deploy/" + this.params,
      this.inst
    );

    function getServerSentEvent(url: string, inst: any) {
      console.log("inside sse service");
      const eventSource = getEventSource(url);
      console.log("event source = ", eventSource);
      eventSource.onopen = function () {
        console.log("connection to stream has been opened");
      };
      eventSource.onerror = function (error) {
        console.log("An error has occurred while receiving stream", error);
      };
      eventSource.addEventListener("LTP", function (stream) {
        //console.log('received stream', stream.data);
        const position_detail = JSON.parse(stream.data);
        //console.log(position_detail.inst);
        const index = parseInt(position_detail.inst.split(":")[0]);
        const strike = position_detail.inst.split(":")[1];
        const type = position_detail.inst.split(":")[2];
        const expiry = position_detail.inst.split(":")[3];
        const entryPrice = parseFloat(position_detail.inst.split(":")[4]);
        const LTP = parseFloat(position_detail.inst.split(":")[5]);
        const qty_in = parseInt(position_detail.inst.split(":")[6]) * 25;
        const buy_sell = position_detail.inst.split(":")[7];
        const exit_flag = parseInt(position_detail.inst.split(":")[8]);
        const exit_price = parseFloat(position_detail.inst.split(":")[9]);

        const pnl_o =
          exit_flag == 1
            ? buy_sell == "b"
              ? (entryPrice - exit_price) * qty_in
              : (exit_price - entryPrice) * qty_in
            : buy_sell == "s"
            ? (entryPrice - LTP) * qty_in
            : (LTP - entryPrice) * qty_in;
        const qty = buy_sell == "s" ? (exit_flag == 1 ? 0 : qty_in) * -1 : (exit_flag == 1 ? 0 : qty_in);
        const pnl = pnl_o.toFixed(2);

        console.log("qty = " + qty);
        console.log("pnl = " + pnl);
        console.log("exit = " + exit_price + "flag = "+ exit_flag);
        console.log(index, strike, type, expiry, entryPrice,exit_price,exit_flag, LTP, qty, pnl);
        inst[index] = {
          index,
          strike,
          type,
          expiry,
          entryPrice,
          LTP,
          qty,
          pnl
        };
        // inst[index].strike = strike;
        // inst[index].type = type;
        // inst[index].expiry = expiry;
        // inst[index].entryPrice = entryPrice;
        // inst[index].LTP = LTP;
        //console.log(inst[index]);
      });
    }
    function getEventSource(url: string): EventSource {
      console.log("inside sse URL = " + url);

      return new EventSource(url);
    }
  }

getColor(value:any) {
  this.findSum();
  console.log('value =' + value)
  if (value >= 0) {
    console.log("green");
    return 'green';
  } else {
    console.log("red");
    return 'red';
  }
}
findSum() {
  let sum = 0;
  console.log('inside findsum =');
    this.inst.forEach(element => {
      const pnl = (element.pnl).toString(); 
      console.log('inside findsum pnl =' + pnl);

      sum = parseInt(pnl) + sum;
    });
    this.total = sum;
    console.log("total = " + this.total);

  }

  exitStrategy() {
    alert("exit strategy called");
    this.stratPnlService.exitStrategy();
  }
}


