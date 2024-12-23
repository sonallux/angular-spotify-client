import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  host: {
    class: 'inline-flex items-center text-base/8',
  },
  standalone: true,
  imports: [MatIcon, MatIconButton],
})
export class SearchBoxComponent {
  private readonly searchDebounce = 300;
  private readonly searchSubject = new Subject<string>();

  @ViewChild('searchBox', { static: true }) searchBox!: ElementRef;
  @Output() onSearch = this.searchSubject.pipe(
    distinctUntilChanged(),
    debounceTime(this.searchDebounce),
  );
  @Output() onSearchFocus = new EventEmitter<string>();

  doSearch() {
    this.searchSubject.next(this.query);
  }

  doFocus() {
    this.onSearchFocus.emit(this.query);
  }

  private get query() {
    return this.searchBox.nativeElement.value;
  }

  private set query(value: string) {
    this.searchBox.nativeElement.value = value;
  }
}
