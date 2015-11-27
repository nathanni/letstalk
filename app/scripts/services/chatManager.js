angular.module('letstalk').factory('chatManager', function () {
    var chatScope = {};

    var storeScope = function(scope_Id,scope){
        chatScope[scope_Id]=scope;
    };

    var getScope = function(scope_Id){
        return chatScope[scope_Id];
    };

    var msgQs = {flash:[ { 
                          _id:'flash',
                          _msgBody:'hi this flash',
                          _time:''
                          }
                        ],
                  superman:[
                            
                        ],
                  john:[
                            
                        ],
                  daiana:[
                        
                        ],
                  greenLantern:[
                        
                        ] 
                    };

    return {
           msgQs:msgQs,
           storeScope:storeScope,
           getScope:getScope
    };
});
