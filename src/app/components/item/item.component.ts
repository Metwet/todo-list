import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() item!: Item;

  constructor(private itemService: ItemsService) {};

  isEditing: boolean = false;
  editedItem!: Item;

  toggleStatus() {
    this.itemService.updateItemStatus(this.item);
  }

  deleteItem() {
    this.itemService.removeItem(this.item);
  }

  startEditing() {
    this.isEditing = true;
    this.editedItem = { ...this.item };
  }
  
  finishEditing(change: boolean) {
    this.isEditing = false;
    if(change){
      this.itemService.updateItem(this.item, this.editedItem);
    }
  }
  
}
