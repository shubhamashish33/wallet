import { Directive, HostListener, ElementRef } from '@angular/core';
@Directive({
  selector: '[currencyFormatter]'
})
export class CurrencyFormatterDirective {
  constructor(private el: ElementRef) {}
  @HostListener('input', ['$event'])
  onInput(event: any): void {
    let inputValue = this.el.nativeElement.value;
    inputValue = inputValue.replace(/[^\d.-]/g, '');
    const formattedValue = this.formatCurrency(inputValue);
    this.el.nativeElement.value = formattedValue;
  }
  private formatCurrency(value: string): string {
    if (!value) {
      return '';
    }
    let [integer, decimal] = value.split('.');
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimal ? `${integer}.${decimal}` : integer;
  }
  public convertToNumber(value: string): number {
    const cleanedValue = value.replace(/[^0-9.-]+/g, '');
    return parseFloat(cleanedValue);
  }
}
