public with sharing class orderControl {
    public orderControl() {}

    @AuraEnabled
    public static list<OrderItem> getItemList(string ordId) {
        // create contact list to store search result 
         list<OrderItem> odr = new list<OrderItem>();
        // query contact records
         for(OrderItem obb : [SELECT Product_Name__c,Product_Code__c,Brand__c,Id,Quantity,Stock_Quantity__c,TotalPrice,UnitPrice FROM OrderItem WHERE OrderId =:ordId]){
            odr.add(obb);
         }
         
        //If there are no records found with searchKey then, throw aura exception with a message
          if(odr.size() == 0){
             throw new AuraHandledException('No Record Found..'); 
          }
          
         return odr;
     }        
    
   
    @AuraEnabled(cacheable=true)
    public static list<PricebookEntry> getOrderList(string searchKey) {
        string sTempSearchKey = '%' + searchKey + '%';
		
       // create contact list to store search result 
        list<PricebookEntry> odr = new list<PricebookEntry>();
     
	   // query contact records
        for(PricebookEntry oCon : [Select UnitPrice,PBName__c,ID,Pricebook2Id,Product_Name__c,ProductCode,Brand__c,Stock_Quantity__C
                            From PricebookEntry
                            WHERE Product_Name__c LIKE : sTempSearchKey]){
           odr.add(oCon);
        }
		
       //If there are no records found with searchKey then, throw aura exception with a message
         if(odr.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
         
        return odr;
    }
    @AuraEnabled(cacheable=true)
    public static list<PricebookEntry> getOrder1List(string searchst) {
        string sTempKey = '%' + searchst + '%';
		
       // create contact list to store search result 
        list<PricebookEntry> od = new list<PricebookEntry>();
     
	   // query contact records
       for(PricebookEntry oCon : [Select UnitPrice,PBName__c,Id,Pricebook2Id,Product_Name__c,ProductCode,Brand__c,Stock_Quantity__C
       From PricebookEntry
       WHERE Brand__c LIKE : sTempKey]){
        od.add(oCon);
        }
		
       //If there are no records found with searchKey then, throw aura exception with a message
         if(od.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
         
        return od;
    }

    @AuraEnabled(cacheable=true)
    public static list<PricebookEntry> getMRP(Integer searchMRP) {
        list<PricebookEntry> od = new list<PricebookEntry>();
       for(PricebookEntry oCon : [Select UnitPrice,PBName__c,Id,Pricebook2Id,Product_Name__c,ProductCode,Brand__c,Stock_Quantity__C
       From PricebookEntry
       WHERE UnitPrice <= : searchMRP]){
         od.add(oCon);
        }		
       //If there are no records found with searchKey then, throw aura exception with a message
         if(od.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }  
        return od;
    }
    @AuraEnabled
    public static void confOrder(String ordId){  

     try{
        List<Order> l=[SELECT confm__c FROM Order WHERE Id =: ordId];
        Order ob=l[0];
       
        ob.confm__c='Yes';
       update ob;
     }
     catch(DmlException e) {
        
            System.debug('An unexpected error has occurred: ' + e.getMessage());
                 }
        
        
       // System.debug(ob.Submit__c);

    }
    
    @AuraEnabled(cacheable=true)
    public static List<Order> getalldata(){
        List<Order> l=[SELECT Description,OrderNumber FROM Order];
        return l;
     }


}
