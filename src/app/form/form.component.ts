import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JsonFormData } from '../json-to-form/json-to-form.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  public formData: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
   var ahmed = JSON.parse(localStorage.getItem('dataSource') ||'')
   console.log(ahmed)
      this.formData = ahmed
  }
}
