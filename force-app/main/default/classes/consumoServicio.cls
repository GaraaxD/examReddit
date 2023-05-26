public with sharing class consumoServicio {
    @AuraEnabled
    public static void consumoServicioMetodo() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://www.reddit.com/r/subreddit/new.json?sort=new');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        if(response.getStatusCode() == 200) {
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            Map<String, Object> data = (Map<String, Object>)results.get('data');
            List<Map<String, Object>> children = new List<Map<String, Object>>(); 
            Integer i = 0;
            Map<String, Object> dataChildren;
            List<Map<String, Object>> listChildren = new List<Map<String, Object>>();
            List<reddit_items__c> lstRedditItems = new List<reddit_items__c>();

            for (Object instance : (List<Object>)data.get('children')){
                children.add((Map<String, Object>)instance);  
            }
            for(Object oBj: children ){
                reddit_items__c oReddit = new reddit_items__c();
                dataChildren = (Map<String, Object>)children[i].get('data');        
                oReddit.Name = String.valueOf(dataChildren.get('title'));
                oReddit.thumbnail__c = String.valueOf(dataChildren.get('thumbnail'));
                oReddit.selftext__c = String.valueOf(dataChildren.get('selftext'));
                oReddit.author_fullname__c = String.valueOf(dataChildren.get('author_fullname'));
                oReddit.fecha_reddit__c = Datetime.newInstance(Long.valueOf(String.valueOf(dataChildren.get('created_utc'))));
                lstRedditItems.add(oReddit);
                i++;
            }

            if(!lstRedditItems.isEmpty()) {
                Database.insert(lstRedditItems, false);
            }
        }   
    }
}