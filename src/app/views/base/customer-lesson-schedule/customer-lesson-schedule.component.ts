import { Component, OnInit } from '@angular/core';
import { AgendaService, DayService, EventSettingsModel, MonthAgendaService, MonthService, TimelineMonthService, TimelineViewsService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { LessonEducatorService } from 'src/app/shared/services/lesson-educator.service';

@Component({
  selector: 'app-customer-lesson-schedule',
  templateUrl: './customer-lesson-schedule.component.html',
  styleUrls: ['./customer-lesson-schedule.component.css'],
  providers:[DayService, WeekService, WorkWeekService, MonthService,
    AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService
    ]
})
export class CustomerLessonScheduleComponent implements OnInit {
  public selectedDate: Date = new Date();
  public eventSettings: EventSettingsModel;
  public customerName: string;
  constructor(private service: LessonEducatorService) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    const data = this.service.selectedCustomerLessons.filter(i=>i.customerId == this.service.selectedCustomerId);
    this.customerName = data[0].name+' '+data[0].surname;

    this.eventSettings ={
      dataSource: data,
      fields:{
        id: 'id',
        subject: { name: 'artPackageName' },
        startTime: { name: 'startDate'},
        endTime: { name: 'finishDate'}
      },
      allowAdding: false,
      allowDeleting: false,
      allowEditing: false
    }
  }

}
