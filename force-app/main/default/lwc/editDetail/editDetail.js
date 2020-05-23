import { LightningElement,wire,api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';

//  import ord from '@salesforce/schema/Order';
import NAME_FIELD from '@salesforce/schema/Order.Account.Name';
 import account from '@salesforce/schema/Order.AccountId';
 import b from '@salesforce/schema/Order.EffectiveDate';
 import c from '@salesforce/schema/Order.ContractId';
 import d from '@salesforce/schema/Order.Type';
 import e from '@salesforce/schema/Order.Status';
 import f from '@salesforce/schema/Order.ShippingAddress';
 import g from '@salesforce/schema/Order.Description';
 import h from '@salesforce/schema/Order.OrderNumber';
 

 import xy from '@salesforce/schema/Order.BillingCity'

 export default class EditDetail extends LightningElement {
    @track account;
    @track b;
    @track c;
    @track d;
    @track e;
    @track f;
    @track g;
    @api recordId;
     myFields=[account,b,c,d,e,f,g,h,xy];
      
     //ordd = ord;
    a="Apr 18, 2020";
    
     @wire(getRecord, { recordId: 'recordId', fields: [account,xy,b,c,d,e,f,g,h]  })
    order;
     get effective ()
     {     
         return getFieldValue(this.order.data,  b);
    }
    get ordernum (){
        return getFieldValue(this.order.data, h);
    }
    get accountid ()
    {
        return getFieldValue(this.order.data, account);
    }
    get contract ()
    {
        return getFieldValue(this.order.data, c);
    }
    get type ()
    {
        return getFieldValue(this.order.data, d);
    }
    get status ()
    {
        return getFieldValue(this.order.data, e);
    }
    get shipping ()
    {
        return getFieldValue(this.order.data, f);
    }

    handleSuccess(){
        this.dispatchEvent(
            new ShowToastEvent({
            title: 'Order Details are edited successfully',
            message: '',
            variant: 'success',
            }),
            );
    }
}
    
        
        

