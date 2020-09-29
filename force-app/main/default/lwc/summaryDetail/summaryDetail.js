import { LightningElement,track,wire, api } from 'lwc';
import getItem from '@salesforce/apex/orderControl.getItemList';
import Ordconfirm from '@salesforce/apex/orderControl.confOrder1';
import { deleteRecord ,updateRecord} from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class summaryDetail extends LightningElement {
    a=true;
    b=false;
    sm=false;
    @track ordId;
    aa=true;
    ab=false;
    @track searchOrder;
    @api recordId;
    sb=false;
    summary(event){
        getItem({
            ordId: this.recordId
        })
        .then(result => {
         
            this.searchOrder = result;
        })
        this.sm=true;
    }

    cancel(event){
        this.sm=false;
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
        //alert("delte called")
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
        this.sm=false;
        this.sm=true;
        }
        confirm(event)
        {
            this.b=true;
        }
            confOrder(event){
                this.ordId=this.recordId;
                Ordconfirm({
                    ordId:this.ordId
                })
                this.show(event);
                location.reload();
                
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
        

}