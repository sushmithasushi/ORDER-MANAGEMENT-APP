import { LightningElement,wire,api,track } from 'lwc';
import oppObj from '@salesforce/schema/Opportunity';

import Amount from '@salesforce/schema/Opportunity.Amount'; 
import cd from '@salesforce/schema/Opportunity.CloseDate';
import conid from '@salesforce/schema/Opportunity.ContractId'; 
import nam from '@salesforce/schema/Opportunity.Name';
import stage from '@salesforce/schema/Opportunity.StageName'; 
import typ from '@salesforce/schema/Opportunity.Type';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import g from '@salesforce/schema/User.Geography__c';
import USER_ID from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/User.Name';



export default class CreateOpptny extends NavigationMixin(LightningElement) {
    @api recordId;
    @api objectApiName;
    @api oppId;
    @api aId;
    @track acntid;
    @track error ;
     f;
     hk=false;
     cad=false;
     mex=false;
     india=false;
     s=true;
     oppId="";
     opp=oppObj;
     j = false;   
    @track geo;
    @wire(getRecord, {
        recordId: USER_ID,
        fields: [NAME_FIELD,g]
    }) wireuser({
        error,
        data
    }) {
        if (error) {
           this.error = error ; 
        } else if (data) {
            this.geo = data.fields.Geography__c.value;
        } 
        if(this.geo=="HongKong")
        {
           this.hk=true;
        }
        else if(this.geo=="Canada")
        {
            this.cad=true;
        }
        else if(this.geo=="Mexico")
        {
            this.mex=true;
        }
        else if(this.geo=="India")
        {
            this.india=true;
        }
    
    }
    handleOppCreated(event){
        this.oppId = event.detail.id;
        this.s=false;
        this.j=true;
        
        this.dispatchEvent(
            new ShowToastEvent({
            title: 'Opportunity is created successfully',
            message: '',
            variant: 'success',
            }),
            );  
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: this.oppid,
                        objectApiName: 'Opportunity',
                        actionName: 'view'
                    }
                })
    }
   
    cancel1(event){
        this.s=false;
    }

}