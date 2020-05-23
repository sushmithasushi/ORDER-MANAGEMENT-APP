import { LightningElement,wire,api } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Order';
//import NAME_FIELD from '@salesforce/schema/Order.Account.Name';
import NAME_FIELD from '@salesforce/schema/Order.AccountId';
import b from '@salesforce/schema/Order.EffectiveDate';
import c from '@salesforce/schema/Order.ContractId';
import d from '@salesforce/schema/Order.Type';
import e from '@salesforce/schema/Order.Status';
import f from '@salesforce/schema/Order.ShippingAddress';
import g from '@salesforce/schema/Order.Description';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import xy from '@salesforce/schema/Order.BillingCity'

export default class AccountCreator extends LightningElement {

     @api recordId;
    @api objectApiName;
    s=true;
  
    accountObject = ACCOUNT_OBJECT;
    myFields = [NAME_FIELD,xy,b,c,d,e,f,g];
  
 
    handleAccountCreated(){
        this.s=false;
        this.dispatchEvent(
            new ShowToastEvent({
            title: 'Order is created successfully',
            message: '',
            variant: 'success',
            }),
            );
    }
   
}