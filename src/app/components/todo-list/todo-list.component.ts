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
  sortByCreated = false;
  sortByDeadline = false;

  ngOnInit():void {
    this.itemsService.getItems().subscribe((items)=>{
      this.items = items;
      console.log(items);
      
    });
  }

  sortItemsByCreated() {
    this.sortByCreated = true;
    this.sortByDeadline = false;    
    this.items.sort((a, b) => Date.parse(a.created) - Date.parse(b.created));
  }

  sortItemsByDeadline() {
    this.sortByCreated = false;
    this.sortByDeadline = true;
    this.items.sort((a, b) => Date.parse(a.deadline) - Date.parse(b.deadline));
  }

}
