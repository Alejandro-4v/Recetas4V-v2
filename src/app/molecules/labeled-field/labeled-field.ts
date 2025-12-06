import { Component, input, output, HostBinding } from '@angular/core';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-labeled-field',
  imports: [NgClass],
  templateUrl: './labeled-field.html',
  styleUrl: './labeled-field.scss',
})
export class LabeledField {

  id = input.required<string>();

  classList = input<Array<string> | string>();
  inputClassList = input<Array<string> | string>();
  labelClassList = input<Array<string> | string>();

  @HostBinding('class') get finalClassList() {
    return this.classList();
  }

  labelText = input<string>();
  value = input<string | number>();
  placeholder = input<string>();

  type = input<string>('text');
  required = input<boolean>(false);

  valueChange = output<string>();
  enter = output<void>();

  onInput(event: Event) {
    this.valueChange.emit((event.target as HTMLInputElement).value);
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.enter.emit();
    }
  }
}
