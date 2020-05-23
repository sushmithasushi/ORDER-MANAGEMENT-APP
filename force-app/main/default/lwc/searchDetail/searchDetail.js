import { LightningElement,track,api,wire } from 'lwc';
import getData from '@salesforce/apex/orderControl.getalldata'
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';
import a from '@salesforce/schema/OrderItem.Quantity';
import o from '@salesforce/schema/Order.OrderNumber';
import b from '@salesforce/schema/PricebookEntry.Product2Id';
import PBID_FIELD from '@salesforce/schema/OrderItem.PricebookEntryId';
import getOrderList from '@salesforce/apex/orderControl.getOrderList';
import getOrder1List from '@salesforce/apex/orderControl.getOrder1List';
import getMRP from '@salesforce/apex/orderControl.getMRP';
import getItem from '@salesforce/apex/orderControl.getItemList';
//import confOrd from '@salesforce/apex/orderControl.confOrder';

//  import getItem from '@salesforce/apex/orderControl.addOrder';
// import standard toast event 
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class SearchDetail extends LightningElement {
   @api OrderId
    @api pricebookId
    @track order   
  
                 
    conf
    ind
    id
    up
    sVal = '';
    sVal1 = '';
    sval2='';
    ad=false;
    open
    //quan
    uni
    ordId;
    sm;
    aa=true;
    ab=false;
    myFields = [a,b,c,PBID_FIELD];
    cost;
    @track orderItemId;
   
   
    // update sVal var when input field value change
  add(event)
    {
        this.ind=event.target.value;
        this.open=true;
       this.id=this.order[this.ind].Id;
       this.up=this.order[this.ind].UnitPrice;
    }  
    cancel(event){
        this.open=false;  
    }

    clear(event){
        this.sVal='';
        this.sVal1='';
        this.sVal2='';
        this.order=null;
    }
  

    upd(event){
    this.aa=false;
    this.ab=true;
   }

   updSuc(event){
    this.aa=true;
    this.ab=false;
   }
    updateSeachKey(event) {
        this.sVal = event.target.value;   
    }
    handleError(event)
    {
        this.dispatchEvent(
            new ShowToastEvent({
            title: 'Order cant be placed',
            message: 'Quantity should be less than Stock Quantity',
            variant: 'error',
            }),
            );
    }
    updateSeach(event) {
        
        this.sVal1=event.target.value;
       // alert(this.sVal1);
    }
 
    updateMRP(event) {
        
        this.sVal2=event.target.value;
        
    }

    handleSuccess(event) {
        this.open=false;
        this.sVal='';
        this.sVal1='';
        this.sVal2='';
        this.order=null;
       
        this.dispatchEvent(
            new ShowToastEvent({
            title: 'Item added to cart',
            message: '',
            variant: 'success',
            }),
            );
    }





    // call apex method on button click 
    handleSearch() {
        // if search input value is not blank then call apex method, else display error msg 
        if (this.sVal !== '') {
         
            getOrderList({
                    searchKey: this.sVal
                })
                .then(result => {
                    // set @track contacts variable with return contact list from server  
                    this.order = result;
                })
                .catch(error => {
                    // display server exception in toast msg 
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    // reset contacts var with null   
                    this.order = null;
                });
        }

       else if (this.sVal1 !== '') {
        
            getOrder1List({
                
                    searchst: this.sVal1
                })
                .then(result => {
                    // set @track contacts variable with return contact list from server  
                    this.order = result;
                })
                .catch(error => {
                    // display server exception in toast msg 
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    // reset contacts var with null   
                    this.order = null;
                });
        }
       else  if (this.sVal2 !== '') {
            getMRP({
                searchMRP: this.sVal2
                })
                .then(result => {
                    // set @track contacts variable with return contact list from server  
                    this.order = result;
                })
                .catch(error => {
                    // display server exception in toast msg 
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    // reset contacts var with null   
                    this.order = null;
                });
            
        }
        else {
            // fire toast event if input field is blank
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);
        }
    }
}

