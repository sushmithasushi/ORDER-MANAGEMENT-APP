import { LightningElement,track,api,wire } from 'lwc';
import getData from '@salesforce/apex/orderControl.getalldata'
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';
import { deleteRecord } from 'lightning/uiRecordApi';
import a from '@salesforce/schema/OrderItem.Quantity';

import b from '@salesforce/schema/PricebookEntry.Product2Id';
import c from '@salesforce/schema/PricebookEntry.UnitPrice';
//import d from '@salesforce/schema/PricebookEntry.ProductName';
import PBID_FIELD from '@salesforce/schema/OrderItem.PricebookEntryId';
import getOrderList from '@salesforce/apex/orderControl.getOrderList';
import getOrder1List from '@salesforce/apex/orderControl.getOrder1List';
import getMRP from '@salesforce/apex/orderControl.getMRP';
import getItem from '@salesforce/apex/orderControl.getItemList';

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
   
    open

    //quan
    uni
   
    ordId;
  
    myFields = [a,b,c,PBID_FIELD];
 
  
    
     
    // update sVal var when input field value change
    edit(event)
    {
        this.ind=event.target.value;
       // alert(this.ind);
        this.open=true;
        
       this.id=this.order[this.ind].Id;
       this.up=this.order[this.ind].UnitPrice;
       //alert(this.id+" "+this.up);
     
     
    }
    cancel(event){
        this.open=false;
  
        location.reload;
    }

    clear(event){
        this.sVal='';
        this.sVal1='';
        this.sVal2='';
        this.order=null;
    }
    


    updateSeachKey(event) {
        this.sVal = event.target.value;

        
    }
    updateSeach(event) {
        
        this.sVal1=event.target.value;
  
    }
 
    updateMRP(event) {
        
        this.sVal2=event.target.value;
        
    }

    handleSuccess(event) {

        this.open=false;
        const msg=new ShowToastEvent({
            
            message: 'Item added to cart',
            variant: 'success',
            })
            this.dispatchEvent(msg);
       
    }

    handleError(){
    
            const msg=new ShowToastEvent({
            title: 'Error',
            message: 'Product is out of Stock',
            variant: 'error',
            })
            this.dispatchEvent(msg);
    }



 

       

    // call apex method on button click 
    handleSearch() {
        // if search input value is not blank then call apex method, else display error msg 
        if (this.sVal !== '') {
           
            //alert("this is sval"+this.sVal);
            getOrderList({
                    searchKey: this.sVal
                })
                .then(result => {
                  
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
           // alert(this.sVal1);
            getOrder1List({
                    searchst: this.sVal1
                })
                .then(result => {
                     
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
        else if (this.sVal2 !== '') {
           // alert(this.sVal2);
            getMRP({
                searchMRP: this.sVal2
                })
                .then(result => {
                   
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
                alert(searchMRP);
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

