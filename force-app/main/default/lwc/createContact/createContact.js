import { LightningElement,api,wire,track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import aName from '@salesforce/schema/Account.Name';
import aphone from '@salesforce/schema/Account.Phone';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

const fields = [aName,aphone];
export default class CreateContact extends LightningElement {
    @api recordId;
    @api objectApiName;
    @wire(getRecord, { recordId: '$recordId', fields })
    account;
    s=true;
     get nam() {
        return getFieldValue(this.account.data, aName);
    }
    get phone() {
        return getFieldValue(this.account.data, aphone);
    }
    handleSuccess(event) {
        const msg=new ShowToastEvent({
            
            message: 'Contact Created',
            variant: 'success',
            })
            this.dispatchEvent(msg);
           this.s=false;
    }
    handleError(){
    
        const msg=new ShowToastEvent({
        title: 'Error',
        message: '',
        variant: 'error',
        })
        this.dispatchEvent(msg);
}
cancel1(event)
{
    this.s=false;
}
}