import Moment from 'moment';

const dateFormat = 'MMMM Do , YYYY';

export const handlebarsTemplateHelpers =  {

	mDate : function(date : string) : string {

		return Moment(date).format(dateFormat);
	} ,

  urlResolver : function(local : any) : string {

    let url : string = local.data.root.requestUrl;

    if (url[url.length - 1] != '/') { url = url + '/'; }

    return url;
  } ,

	when : function(operand1 : any, operator : string , operand2 : any , options : any) : boolean {

    let operators : { [key : string] : Function } = {                     //  {{#when <operand1> 'eq' <operand2>}}
      'eq': (l : any , r : any) => l == r,              //  {{/when}}
      'noteq': (l : any , r : any) => l != r,
      'gt': (l : any , r : any) => (+l) > (+r),                        // {{#when var1 'eq' var2}}
      'gteq': (l : any , r : any) => ((+l) > (+r)) || (l == r),        //               eq
      'lt': (l : any , r : any) => (+l) < (+r),                        // {{else when var1 'gt' var2}}
      'lteq': (l : any , r : any) => ((+l) < (+r)) || (l == r),        //               gt
      'or': (l : any , r : any) => l || r,                             // {{else}}
      'and': (l : any , r : any) => l && r,                            //               lt
      '%': (l : any , r : any) => (l % r) === 0                        // {{/when}}
    };

    let result : boolean = operators[operator](operand1 , operand2);

    if (result === true) return options.fn(this);

    return options.inverse(this);

  } ,

  whenAlg : function(operand1 : any, operator : string , operand2 : any , options : any) : boolean {

    let operators : { [key : string] : Function } = {                     //  {{#when <operand1> 'eq' <operand2>}}
      '==': (l : any , r : any) => l == r,              //  {{/when}}
      '===': (l : any , r : any) => l === r,              //  {{/when}}
      '!=': (l : any , r : any) => l != r,
      '!==': (l : any , r : any) => l !== r,
      '>': (l : any , r : any) => (+l) > (+r),                        // {{#when var1 'eq' var2}}
      '>=': (l : any , r : any) => ((+l) > (+r)) || (l == r),        //               eq
      '<': (l : any , r : any) => (+l) < (+r),                        // {{else when var1 'gt' var2}}
      '<=': (l : any , r : any) => ((+l) < (+r)) || (l == r),        //               gt
      '||': (l : any , r : any) => l || r,                             // {{else}}
      '&&': (l : any , r : any) => l && r,                            //               lt
      'mod': (l : any , r : any) => (l % r) === 0                        // {{/when}}
    };

    let result : boolean = operators[operator](operand1 , operand2);

    if (result === true) return options.fn(this);

    return options.inverse(this);

  } ,

  currentYear : function() : number {

    return new Date().getFullYear();
  } ,

  indexIncr : function(idx : number , multiple : number = 1 , options : any) : number {

    if (multiple > 1) { return idx + multiple; }

     else { return idx + 1; }     
  } ,

  entryValid : function(entryValue : any , options : any) : any {

    if (entryValue === undefined || entryValue === null) { return "N/A"; }

    else { return entryValue; }

  } ,

  entryCoverImage : function(entryValue : any , options : any) : any {

    if (entryValue === undefined || entryValue === null) { return "/images/thesis-cover-image.jpg"; }

    else { return entryValue; }

  } ,

  toAcronym : function(entryValue : string , options : any) : string {

     let acronymText = entryValue.replace(/and|of/gi , '').split(' ');

    if (acronymText.length > 1) {

       return acronymText.map((item) => {  

         if (item) {  return item[0];  }  

        else { return '';  } }).join('');  }
    
    else { return acronymText.join(''); }
  } ,

  arrToString : function(entryValue : string[] , options : any) : string {

    if (!(entryValue instanceof Array)) return "N/A";

    else { return entryValue.join(' '); }

  } ,

  jsonArrayToString : function(entryValue : any[] , key : string , options : any) : string {

    if (!(entryValue instanceof Array)) return "N/A";

    else { return entryValue.map(function(role) : string { 

      return role[key]; }).join(','); }

  } ,

  jsonArrayFlattener : function(entryValue : any[] , key : string , options : any) : string[] {

    if (!(entryValue instanceof Array)) return [];

    else { return entryValue.map(function(role) : string { 

      return role[key]; }); }

  } ,

  useIndexAsKey : function(currentItem : any , entries : any[] , index : any , options : any) : boolean {

    if (!(entries instanceof Array)) return options.inverse(this);

    if (entries == null || entries.length < 1) return options.inverse(this);

    if (entries[index] == currentItem) { return options.fn(this) }

    else { return options.inverse(this); }

  } ,

  useIndexAsKeyRole : function(currentItem : any , entries : any[] , index : any , options : any) : boolean {

    if (!(entries instanceof Array)) return options.inverse(this);

    if (entries == null || entries.length < 1) return options.inverse(this);

    else { return options.inverse(this); }

    for (let cItem of entries) {

      if (cItem == currentItem) { return options.fn(this); }

      else { return options.inverse(this); }
    }

  } ,

  canPaginate : function(index : any , entries : any[] , options : any) : boolean {

    if (entries == null || entries.length < 1) return options.inverse(this);

    if (index != entries.length - 1 && entries.length > 1 && entries.length > 10) return options.fn(this);

    else if (index == entries.length - 1) { return options.fn(this); }

    return options.inverse(this);

  }

}
