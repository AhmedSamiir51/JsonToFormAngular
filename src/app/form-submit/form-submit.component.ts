import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormServiceService } from '../Service/form-service.service';

@Component({
  selector: 'app-form-submit',
  templateUrl: './form-submit.component.html',
  styleUrls: ['./form-submit.component.sass']
})
export class FormSubmitComponent implements OnInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  Datasource: any =new MatTableDataSource
  displayedColumns: string[] = ['checkBox','dropdownList','radio','range','texTarea', 'text' ,'toggle']

  constructor(  public dialog: MatDialog , private service:FormServiceService ) { }
 
  ngOnInit(): void {
    this.getAllInvoice()
  }
  getAllInvoice(){
    this.service.GetAllInvoices().subscribe(e => {
      console.log(e)
      this.Datasource = new MatTableDataSource(e) ;
      this.Datasource.paginator = this.paginator;
    },er=>{console.log(er)})
  }
}
