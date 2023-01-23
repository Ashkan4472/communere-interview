import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { BaseInputComponent } from "../base-input.component";

@Component({
  imports: [
    CommonModule,
    BaseInputComponent,
  ],
  standalone: true,
  selector: 'app-drop-down-input',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})
export class DropDownComponent implements OnInit {
  @Input() id!: string;
  @Input() title: string = "Location type:";
  @Input() options: string[] = [];
  @Input() value?: string;
  @Output() valueChange = new EventEmitter<string>();

  currentIndex = -1;
  dropdownOpen: boolean = false;

  @ViewChild('dropDownList') dropDownElement?: ElementRef;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    if (!this.value) {
      this.value = this.options[0];
    }
  }

  handleKeyboardEvents($event: KeyboardEvent) {
    if (this.dropdownOpen) {
      $event.preventDefault();
    } else {
      return;
    }

    if ($event.code === 'ArrowUp') {
      this.arrowUp();
    } else if ($event.code === 'ArrowDown') {
      this.arrowDown()
    } else if (($event.code === 'Enter' || $event.code === 'NumpadEnter') && this.currentIndex >= 0) {
      this.select(this.options[this.currentIndex]);
    } else if ($event.code === 'Escape') {
      this.closeDropdown();
    }
  }

  select(value: string) {
    this.closeDropdown();
    this.value = value;
    this.valueChange.emit(this.value);
  }

  closeDropdown() {
    this.currentIndex = -1;
    this.dropdownOpen = false;
    this.dropDownElement
      ?.nativeElement
      .setAttribute('aria-expanded', "false");
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.dropDownElement
      ?.nativeElement
      .setAttribute('aria-expanded', this.dropdownOpen.toString());
  }

  private arrowUp() {
    if (this.currentIndex < 0) {
      this.currentIndex = 0;
    } else if (this.currentIndex > 0) {
      this.currentIndex--;
    }

    this.elementRef
      .nativeElement
      .querySelectorAll('li')
      .item(this.currentIndex)
      .focus();
  }

  private arrowDown() {
    if (this.currentIndex < 0) {
      this.currentIndex = 0;
    } else if (this.currentIndex < this.options.length - 1) {
      this.currentIndex++;
    }

    this.elementRef
      .nativeElement
      .querySelectorAll('li')
      .item(this.currentIndex)
      .focus();
  }
}
