/*
    Indian Currency module 

*/

angular.module('indianCurrency',[]);


angular.module('indianCurrency').service('currencyService',function(){
	
    // Round to places
    this.wacky_round = function(number, places){
		var multiplier = Math.pow(10, places+2); 
	    var fixed = Math.round(number*multiplier);             
	    fixed = Math.floor(fixed/100);
	    return fixed/Math.pow(10, places);
	};

    // Remove commas from a number
    this.removeCommas = function(x){
        var returnedAmount = 0;
        if(x!==undefined && x !==null){
            x = x.toString();
        }
        if(x!==undefined && x !==null && x.match(/\d+/g)!=null){
            returnedAmount = isNaN(x)?x.replace(/,/g, ''):x;
        }
        return returnedAmount;
    };

    // Convert number to abbrv words
    this.convertAmountToWords = function(val){
        if(val!==undefined && val!==null) {
            var num = this.removeCommas(val);
            num = parseInt(num, 10); 
            num = num.toString();
            var numLength = num.length,
                displayNum = '',
                suffix = '';
            if(numLength == 4 || numLength == 5){
                displayNum = num/1000;
                displayNum = this.wacky_round(displayNum, 2)*1000;
            }else if(numLength == 6 || numLength == 7){
                displayNum = num/100000;
                displayNum = this.wacky_round(displayNum, 2)*100000;
            }else if(numLength == 8 || numLength == 9 || numLength == 10){
                displayNum = num/10000000;
                displayNum = this.wacky_round(displayNum, 2)*10000000;
            }else{
                displayNum = num;
            }
            displayNum = parseInt(displayNum, 10).toString();
            numLength = displayNum.length,
            suffix = '';
            if(numLength == 4 || numLength == 5){
                displayNum = displayNum/1000;
                suffix = (displayNum > 1) ? "K" : "K";
            }else if(numLength == 6 || numLength == 7){
                displayNum = displayNum/100000;
                suffix = (displayNum > 1) ? "Lac" : "Lac";
            }else if(numLength == 8 || numLength == 9 || numLength == 10){
                displayNum = displayNum/10000000;
                suffix = (displayNum > 1) ? "Cr" : "Cr";
            }else{
                displayNum = num;
            }
            return displayNum + " " + suffix;
        } else {
            return "";
        }
    }

	return this;
});

// Enter only number and commas would be added 
angular.module('indianCurrency').directive('onlyNumAddCommas', ["$filter", function($filter) {
    var keyCode = [8, 9, 37, 39, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
	return {
        restrict: 'E',
        scope: {
            det: '=',
            addClass: '@',
            minLength:'@',
            maxLength:'@',
            changeValues:'&',
            getFocusOut:'&',
            placeText:'@',
            inputName:'@',
            inputId:'@'
        },
        link: function (scope, element, attrs) {
            element.bind("keydown keyup", function (event) {
                if(keyCode.indexOf(event.which)==-1 || event.shiftKey){
                    event.preventDefault();
                }else {
                    scope.$apply(function(){
                        scope.det =  $filter('addCommas')(scope.det);
                    });
                }
            });        
        },

        template:'<input id="{{inputId}}" type="tel" class="{{addClass}}" name="{{inputName}}" minlength="{{minLength}}" maxlength="{{maxLength}}" placeholder="{{placeText}}" ng-model="det"  ng-change="changeValues()" ng-blur="getFocusOut()"/>'
    };
}]);


// Add Commas to number
angular.module('indianCurrency').filter('addCommas', function () {
    return function (value) {
        if(value!==undefined && value!==null) {
            if (value.toString().indexOf(',') != -1) {
                value = value.replace(/,/g, '');
            }
            
                value = value.toString().replace(/,/g, '');
                value += '';
                var x = value.split('.');
                var x1 = x[0];
                var x2 = x.length > 1 ? '.' + x[1] : '';
                var lastThree = x1.substring(x1.length - 3);

                var otherNumbers = x1.substring(0, x1.length - 3);
                if (otherNumbers !== ''){
                    lastThree = ',' + lastThree;
                }
                var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
                return res + x2;
        }else{
            return "";
        }

    };
});

// filter to convert amount to string
angular.module('indianCurrency').filter('amountToString', ['currencyService',function (currencyService) {
    return function (value) {
	   return currencyService.convertAmountToWords(value);
    }
}]);