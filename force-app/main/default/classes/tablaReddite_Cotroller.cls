public with sharing class tablaReddite_Cotroller {
    @AuraEnabled(cacheable=true)
    public static List<reddit_items__c> valoresReddit() {
        return [SELECT Id, Name, fecha_reddit__c, author_fullname__c, selftext__c, thumbnail__c
                FROM reddit_items__c ORDER BY fecha_reddit__c desc];
    }
    @AuraEnabled(cacheable=false)
    public static void eliminarRegistro(Id value) {
        delete [SELECT Id FROM reddit_items__c WHERE Id =: value LIMIT 1];
    }
}