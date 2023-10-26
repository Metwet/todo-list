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

  updateItemStatus(item: Item): void {
    const items = this.getItemsSync();
    const updatedItems = items.map(existingItem => {
      if (existingItem === item) {
        existingItem.done = !existingItem.done;
      }
      return existingItem;
    });
    this.saveItems(updatedItems);
    this.itemsSubject.next(updatedItems);
  }

  removeItem(item: Item) {
    const items = this.getItemsSync();
    const index = items.indexOf(item);
    if (index !== -1) {
      items.splice(index, 1);
      this.saveItems(items);
      this.itemsSubject.next(items);
    }
  }

  updateItem(item: Item, newItem: Item) {
    const items = this.getItemsSync();
    const updatedItems = items.map(existingItem => {
      if (existingItem === item) {
        existingItem.title = newItem.title;
        existingItem.description = newItem.description;
        existingItem.deadline = newItem.deadline;
      }
      return existingItem;
    });
    this.saveItems(updatedItems);
    this.itemsSubject.next(updatedItems);
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
