import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VEducatorCost } from 'src/app/shared/model/v-educator-cost';
import { ActualCustomerLessonService } from 'src/app/shared/services/actual-customer-lesson.service';
import { EducatorCostService } from 'src/app/shared/services/educator-cost.service';

@Component({
  selector: 'app-educator-price-list',
  templateUrl: './educator-price-list.component.html',
  styleUrls: ['./educator-price-list.component.css']
})
export class EducatorPriceListComponent implements OnInit {

  costList: VEducatorCost[] =[];
  costDisplayColums: string[] = ['name', 'cost', 'lessonName', 'cashBoxName', 'createdAt', 'description', 'id'];
  costDataSource: MatTableDataSource<VEducatorCost>;

  @ViewChild('paginatorCosts') paginator: MatPaginator;
  @ViewChild('costSort') sort: MatSort;

  totalCost: number = 0;

  constructor(private service: ActualCustomerLessonService, private educatorCostService: EducatorCostService) { }

  ngOnInit() {
    this.educatorCostService.getList().subscribe((data)=>{
      if(data.success){
        this.costList = data.dynamicClass as VEducatorCost[];
        this.costList.forEach(element => {
          this.totalCost += element.cost;
        });
        this.costDataSource = new MatTableDataSource(this.costList);
        this.costDataSource.paginator = this.paginator;
        this.costDataSource.sort = this.sort;
      }
    })
  }

  applyFilterCosts(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.costDataSource.filter = filterValue.trim().toLowerCase();
    this.totalCost = 0;
    this.costDataSource.filteredData.forEach(element => {
      this.totalCost += element.cost;
    });
    console.log(this.totalCost);
    if (this.costDataSource.paginator) {
      this.costDataSource.paginator.firstPage();
    }
  }

}
