import { Component } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  constructor(private itemsService: ItemsService){}

  items: Item[] = [];

  ngOnInit():void {
    this.itemsService.getItems().subscribe((items)=>{
      this.items = items;
    });
  }

}
