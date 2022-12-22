import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
 

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  constructor(public http:HttpClient  ) { }
  baseurl="https://localhost:44334/api";

  GetAllInvoices(){
    return this.http.get<any>( this.baseurl+"/Forms/GetAll")
  }

  addInvoice(body:any){

    var asasd = {
      "id": 0,
      "text": "string",
      "texTarea": "string",
      "radio": "string",
      "checkBox": "string",
      "dropdownList": "string",
      "toggle": "string",
      "range": "string"
    }
    return this.http.post<any>( "https://localhost:44334/api/Forms",body)
  }


}
