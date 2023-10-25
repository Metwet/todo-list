import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  providers: [DatePipe]
})
export class AddItemComponent {

  constructor(private itemsService: ItemsService, private datePipe: DatePipe){}

  newItem: Item = {
    title: '',
    description: '',
    deadline: '',
    created: new Date()
  }

  showMessage:boolean = false;
  message:string = 'Введите название задачи.';

  ngOnInit(): void {
    const defaultDeadline = new Date();
    defaultDeadline.setHours(defaultDeadline.getHours() + 3);
    this.newItem.deadline = this.formatDate(defaultDeadline) || '';    
  }

  addItem(){
    if(this.newItem.title){
      const newItemCopy = {
        title: this.newItem.title,
        description: this.newItem.description,
        deadline: this.newItem.deadline,
        created: this.newItem.created
      };
      this.itemsService.addItem(newItemCopy);
      this.showMessage = false;
      this.newItem.title = '';
      this.newItem.description = '';
    }else{
      this.showMessage =true;
    }
  }

  formatDate(date: Date): string | null {    
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm', 'en');
  }
}
