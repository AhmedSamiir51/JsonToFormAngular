import { Component } from '@angular/core';
import {OnChanges,Input,ChangeDetectionStrategy,SimpleChanges,} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { PostForm } from '../Service/form';
import { FormServiceService } from '../Service/form-service.service';
 
interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}

interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}

interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  options?: JsonFormControlOptions;
  required: boolean;
  validators: JsonFormValidators;
}

export interface JsonFormData {
  controls: JsonFormControls[];
}
@Component({
  selector: 'app-json-to-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './json-to-form.component.html',
  styleUrls: ['./json-to-form.component.sass'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
}]
})
export class JsonToFormComponent implements OnChanges {
  @Input() jsonFormData: any;
  isChecked:boolean=false
  public myForm: FormGroup = this.fb.group({});
 
  constructor(private  Route: Router, private fb: FormBuilder, private service:FormServiceService) {}

  ngOnChanges(changes: SimpleChanges ) {
     if ( changes['jsonFormData'].firstChange) {
       this.createForm(this.jsonFormData.form);
     }
  }
  listCheced:string[]=[]
  radioSelected(row :any): void {
    console.log(row.checked);
    if (row.checked) {
      this.listCheced.push(row.value)
    } else {
      let index =this.listCheced.findIndex(x => x === row.value);
      this.listCheced.splice(index,1)
    }
    
  }
 

  createForm(controls: JsonFormControls[]) {
     for (const control of controls) {
      const validatorsToAdd = [];

      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }

      this.myForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsToAdd)
      );
    }
  }
  submitForm = new PostForm()
  onSubmit() {
    console.log('Form valid: ', this.myForm.valid);
    console.log('Form values: ', this.myForm.value);
    console.log('Form values: ', this.myForm.value.text);
    console.log('Form listCheced: ', this.listCheced);
    if (this.myForm.valid) {
      this.submitForm.Text=  this.myForm.value?.text  
        this.submitForm.TexTarea=this.myForm.value?.textarea  
        this.submitForm.Radio=this.myForm.value?.radio  
        this.submitForm.CheckBox=this.listCheced.join(',') 
        this.submitForm.DropdownList=this.myForm.value?.dropdownlist  
        this.submitForm.Toggle=  String (this.myForm.value?.toggle ) 
        this.submitForm.Range= String (this.myForm.value?.range )
        this.submitForm.Id=0
console.log( this.submitForm)
       this.service.addInvoice(this.submitForm).subscribe(e=>{this.Route.navigateByUrl("");},er=>{console.log(er)});
    }
  }
}
