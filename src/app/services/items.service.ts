import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() {
    this.loadItems();
  }

  private itemsKey = 'items';
  private itemsSubject = new BehaviorSubject<Item[]>([]);

  getItems(): Observable<Item[]> {
    return this.itemsSubject.asObservable();
  }

  addItem(item: Item): void {
    const items = this.getItemsSync();
    items.push(item);
    this.saveItems(items);
    this.itemsSubject.next(items);
  }

  private loadItems(): void {
    const storedItems = localStorage.getItem(this.itemsKey);
    const items = storedItems ? JSON.parse(storedItems) : [];
    this.itemsSubject.next(items);
  }

  private saveItems(items: Item[]): void {
    localStorage.setItem(this.itemsKey, JSON.stringify(items));
    this.itemsSubject.next(items);
  }

  private getItemsSync(): Item[] {
    return this.itemsSubject.getValue();
  }

}
