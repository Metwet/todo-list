import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  deadlineNotifications(items: Item[], hoursBeforeDeadline: number) {
    const interval = setInterval(() => {      
      const currentTime = new Date().getTime();
  
      items.forEach(item => {
        if (!item.done) {
          const deadlineTime = new Date(item.deadline).getTime();
          const timeDiff = deadlineTime - currentTime;
    
          if (timeDiff > 0 && timeDiff <= hoursBeforeDeadline * 60 * 60 * 1000) {
            if (Notification.permission === 'granted') {
              new Notification('Приближается дедлайн!', {
                body: `Дедлайн задачи "${item.title}" истекает в ${item.deadline}`,
              });
            }
          }
        }
      });
    }, 5 * 60 * 1000);
  }
  
}
