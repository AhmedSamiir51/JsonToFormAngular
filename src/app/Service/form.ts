export interface Form {
    id: number;
    text: string;
    texTarea: string;
    radio: string;
    checkBox: string;
    dropdownList: string;
    toggle: string;
    range: string;
}


export class PostForm {
 
    Text: any;
    Id: any;
    TexTarea: any;
    Radio: any;
    CheckBox: any;
    DropdownList: any;
    Toggle: any;
    Range: any;

    constructor(Id?: number,
        Text?: string,
        TexTarea?: string,
        Radio?: string,
        CheckBox?: string,
        DropdownList?: string,
        Toggle?: string,
        Range?: string ){}
 
}




