import { LightningElement,track,wire,api } from 'lwc';
import getItem from '@salesforce/apex/orderControl.getItemList';
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';
import o from '@salesforce/schema/Order.OrderNumber';
import s from '@salesforce/schema/Order.Submit_for_Approval__c';
import Ordconfirm from '@salesforce/apex/orderControl.confOrder';

import { deleteRecord } from 'lightning/uiRecordApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SummaryDetail extends LightningElement {
    @api recordId;
    @track ordId;
    a=false;
    aa=true;
    ab=false;
    b=false;
    @track searchOrder;
    view(event)
    {
        getItem({
            ordId: this.recordId
        })
        .then(result => {
         
            this.searchOrder = result;
        })
        this.a=true;
    }
    confirm(event)
    {
        this.b=true;
    }
    cancel(event)
    {
        this.a=false;
        this.b=false;
    }
    show(event)
    {
        this.b=false;
        this.dispatchEvent(
            new ShowToastEvent({
            title: 'Your Order is placed',
            message: '',
            variant: 'success',
            }),
            );
    }

    updSuc(event){
        this.aa=true;
        this.ab=false;
       }
       upd(event){
        this.aa=false;
        this.ab=true;
       }
       del(event) {
        this.delIn=event.target.value;
        const orderItemId = event.target.dataset.recordid;
        this.searchOrder.splice(this.delIn,1);
        console.log('delete item'+ this.searchOrder.otid);
        
        console.log('delete item' + orderItemId);
     
        deleteRecord(orderItemId)
        .then(() => {
        this.dispatchEvent(
        new ShowToastEvent({
        title: 'Success',
        message: 'Record Is Deleted',
        variant: 'success',
        }),
        );
        })
        .catch(error => {
        this.dispatchEvent(
        new ShowToastEvent({
        title: 'Error While Deleting record',
        message: error.message,
        variant: 'error',
        }),
        );
        });

        this.a=false;
        this.a=true;
        }
        confOrder(event){
            this.ordId=this.recordId;
            Ordconfirm({
                ordId:this.ordId
            })
            this.show(event);
            location.reload();
            
        }
}