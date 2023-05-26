import { LightningElement, api, wire  } from 'lwc';
import Name from '@salesforce/schema/reddit_items__c.Name';
import Author from '@salesforce/schema/reddit_items__c.author_fullname__c';
import Thumbnail from '@salesforce/schema/reddit_items__c.thumbnail__c';
import Selftext from '@salesforce/schema/reddit_items__c.selftext__c';
import Fecha from '@salesforce/schema/reddit_items__c.fecha_reddit__c';
import IdRe from '@salesforce/schema/reddit_items__c.Id';
import valoresReddit from '@salesforce/apex/tablaReddite_Cotroller.valoresReddit';
import eliminarItem from '@salesforce/apex/tablaReddite_Cotroller.eliminarRegistro';
import llamarServicio from '@salesforce/apex/consumoServicio.consumoServicioMetodo';
const columns = [
    { label: 'title', fieldName: Name.fieldApiName },
    { label: 'author_fullname', fieldName: Author.fieldApiName},
    { label: 'thumbnail', fieldName: Thumbnail.fieldApiName},
    { label: 'selftext', fieldName: Selftext.fieldApiName},
    { label: 'fecha', fieldName: Fecha.fieldApiName, type: 'datetime', sortable: true},
    { type: 'button', typeAttributes: {
        label: 'Eliminar',
        title: 'Eliminar',
        name: 'Eliminar',
        value: IdRe.fieldApiName,
        variant: 'brand',
        class: 'scaled-down'
    }},
];


export default class DemoApp extends LightningElement {
    columns = columns;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;

    @wire(valoresReddit)
    itemsReddit;

    // Used to sort the 'Age' column
    sortBy(field, reverse, primer) {
        const key = primer
            ? function (x) {
                  return primer(x[field]);
              }
            : function (x) {
                  return x[field];
              };

        return function (a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }

    onHandleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        const cloneData = [this.data];

        cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
        this.data = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }

    async onHandleDelete(event){ 
    const row = event.detail.row;
    try{
        await eliminarItem({value: row.Id})
    } catch (e) {
        
    }
        
    }
    handle_llamarWs(event){
        llamarServicio({})
    }
}
