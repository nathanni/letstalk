/**
 * Created by Nathan on 11/24/2015.
 */
angular.module('letstalk').directive('receiverMsg',function(){
    return {
        restrict: 'AE',
        templateUrl : 'views/chat/receiverMsg.html',
        scope:{
            message:'@message',
            Id:'@id'
        },
        link: function (scope, iElement, iAttrs) {

        }
    }
});