import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isError: boolean = false;
  public errorMessage: string = '';
  public title = 'wallet';
  public balance: number = 0;
  public expenseList: any[] = [];
  public expenseName: string = '';
  public amount: number;
  ngOnInit(): void {
    const storedBalance = localStorage.getItem('balance');
    if (storedBalance) {
      this.balance = parseFloat(storedBalance);
    }
    const storedExpenseList = localStorage.getItem('expenseList');
    if (storedExpenseList) {
      this.expenseList = JSON.parse(storedExpenseList);
    }
  }
  addExpense() {
    if (this.expenseName.length && this.expenseName != null &&
      this.amount != null && this.amount != undefined && this.amount < 100000
    )
      if (this.amount > 0) {
        {
          this.expenseList.push({
            expenseName: this.expenseName,
            amount: -this.amount
          });
          this.balance = this.balance - this.amount;
          this.isError = false;
          this.expenseName = '';
          this.amount = null;
        }
      }
      else {
        this.errorMessage = "Negative amount has been passed";
        this.isError = true;
      }
    else {
      this.errorMessage = "Incorrect parameter has been passed";
      this.isError = true;
    }
    this.saveExpenseList();
  }
  addIncome() {
    if (this.expenseName.length && this.expenseName != undefined &&
      this.amount != null && this.amount != undefined && this.amount < 100000
    )
      if (this.amount > 0) {
        {
          this.expenseList.push({
            expenseName: this.expenseName,
            amount: +this.amount
          });
          this.balance = this.balance + this.amount;
          this.isError = false;
          this.expenseName = '';
          this.amount = null;
        }
      }
      else {
        this.errorMessage = "Negative amount has been passed";
        this.isError = true;
      }
    else {
      this.errorMessage = "Incorrect parameter has been passed";
      this.isError = true;
    }
    this.saveExpenseList();
  }
  saveExpenseList() {
    localStorage.setItem('balance', this.balance.toString());
    localStorage.setItem('expenseList', JSON.stringify(this.expenseList));
  }
  clearLocalStorage() {
    localStorage.removeItem('balance');
    localStorage.removeItem('expenseList');
    this.balance = 0;
    this.expenseList = [];
  }
}
