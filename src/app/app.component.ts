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
  public expenseAmount: number;
  public income_or_expense: any;
  ngOnInit(): void {
    const storedBalance = localStorage.getItem('balance');
    if (storedBalance) {
      this.balance = parseFloat(storedBalance);
    }
    const storedExpenseList = localStorage.getItem('expenseList');
    if (storedExpenseList && storedExpenseList.length > 0) {
      this.expenseList = JSON.parse(storedExpenseList);
    }
  }
  addTransaction(incomeOrExpense: string) {
    if (incomeOrExpense) {
      (incomeOrExpense == "expense") ? this.addExpense() : this.addIncome();
    }
    else {
      const message = "Please Select any option";
      this.showError(message);
  }
}
  showError(message: string){
    this.errorMessage = message;
      this.isError = true;
      setTimeout(() => {
        this.errorMessage = "";
        this.isError = false;
      }, 2000)
  }
  addExpense() {
    if (this.expenseName.length && this.expenseName != null &&
      this.expenseAmount != null && this.expenseAmount != undefined && this.expenseAmount < 100000
    )
      if (this.expenseAmount > 0) {
        {
          this.expenseList.push({
            expenseName: this.expenseName,
            amount: -this.expenseAmount
          });
          this.balance = this.balance - this.expenseAmount;
          this.isError = false;
          this.expenseName = '';
          this.expenseAmount = null;
        }
      }
      else {
        const message: string = "Negative amount has been passed";
        this.showError(message);
      }
    else {
      const message: string = "Incorrect parameter has been passed";
      this.showError(message);
    }
    this.saveExpenseList();
  }
  addIncome() {
    if (this.expenseName.length && this.expenseName != undefined &&
      this.expenseAmount != null && this.expenseAmount != undefined && this.expenseAmount < 100000
    )
      if (this.expenseAmount > 0) {
        {
          this.expenseList.push({
            expenseName: this.expenseName,
            amount: +this.expenseAmount
          });
          this.balance = this.balance + this.expenseAmount;
          this.isError = false;
          this.expenseName = '';
          this.expenseAmount = null;
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
  onRemoveExpense(indx: any) {
    if (indx >= 0 && indx < this.expenseList.length) {
      this.balance -= this.expenseList[indx].amount;
      this.expenseList.splice(indx, 1);
      this.saveExpenseList();
    }
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
