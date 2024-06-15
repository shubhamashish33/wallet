import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
@Directive({
  selector: '[appCurrencyInput]'
})
export class CurrencyInputDirective {
  private el: HTMLInputElement;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.el = this.elementRef.nativeElement;
    this.el.type = 'text';
  }
  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const value = this.el.value.replace(/,/g, '');
    const formattedValue = this.formatCurrency(value);
    this.renderer.setProperty(this.el, 'value', formattedValue);
  }
  @HostListener('blur', ['$event']) onBlur(event: Event): void {
    const value = this.el.value.replace(/,/g, '');
    this.renderer.setProperty(this.el, 'value', value);
    this.renderer.setAttribute(this.el, 'type', 'number');
  }
  @HostListener('focus', ['$event']) onFocus(event: Event): void {
    this.renderer.setAttribute(this.el, 'type', 'text');
    const value = this.el.value.replace(/,/g, '');
    this.renderer.setProperty(this.el, 'value', this.formatCurrency(value));
  }
  private formatCurrency(value: string): string {
    if (!value) return '';
    let [integer, decimal] = value.split('.');
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimal ? `${integer}.${decimal}` : integer;
  }
}
