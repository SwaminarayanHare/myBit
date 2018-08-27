import { Component, OnInit } from '@angular/core';
import { Stock } from '../../../_models';
import { AlertService, PricingService, StockService } from '../../../_services';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  stocks: Stock[] = [];
  selectedCoin: Stock;
  showModal:Boolean = false;
  model: any = {};
  coinlist: any = [];
  temp: any = {};
  updatestockmodel : any = {};
  loading = false;
  coinloading = false;
  capitalStocks: Stock[] = [];
  liquidStocks: Stock[] = [];
  constructor(private alertService: AlertService, private pricingService: PricingService, private stockService: StockService) {
   
  }
  ngOnInit() {
    this.getCoinList();
    this.loadAllStock();
  }
    private getCoinList(){
      this.coinloading=true;
       this.pricingService.getCoinList().subscribe(x=>{
         this.temp = x;
         this.coinlist = this.temp.data.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
         this.coinloading = false;
          });
  }
  private loadAllStock(){
    this.stockService.getAll().subscribe(stock => { this.stocks = stock.sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0)
      this.capitalStocks=[];
      this.liquidStocks=[];
       this.stocks.forEach(ele=>{
       if(ele.iscapital==true && ele.ismanual==false){
           this.capitalStocks.push(ele);
       }
       else if(ele.isliquid==true && ele.ismanual==false){
         this.liquidStocks.push(ele);
       }
   });
   });
  }
  addStock(){
    this.loading = true;
    this.model.ismanual = false;
    this.model.date = new Date();
    this.model.price = 0;
    if(this.model.fundtype == "capital"){
        this.model.iscapital = true;
        this.model.isliquid = false;
    }
    else{
      this.model.isliquid = true;
      this.model.iscapital = false;
    }
    this.stockService.create(this.model)
    .subscribe(
      data => {
          this.alertService.success('Coin Added successfully', true);
          this.loadAllStock();
          this.loading = false;
          this.model.quantity = 0;
      },
      error => {
          this.alertService.error(error);
          this.loading = false;
      });
  }
  selectCoin(coin){
    this.selectedCoin=coin;
    this.showModal=true;
    this.model.quantity = 0;
    this.updatestockmodel.quantity = 0;
  }
  updateStock(){
    this.updatestockmodel._id = this.selectedCoin._id;
    this.updatestockmodel.date = new Date();
    this.updatestockmodel.price = 0;
    this.loading = true;
    
    this.stockService.update(this.updatestockmodel)
        .subscribe(
            data => {
                this.loading = false;
                this.showModal=false;
                this.loadAllStock();
                this.alertService.success('Quantity updated successfully', true);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }
  closeModal(){
    this.showModal=false;
  }
  deleteCoin(coin){
    this.loading = true;
    this.stockService.delete(coin._id)
    .subscribe(
      data => {
          this.alertService.success('Coin deleted successfully', true);
          this.loadAllStock();
          this.loading = false;
      },
      error => {
          this.alertService.error(error);
          this.loading = false;
      });
  }
}
