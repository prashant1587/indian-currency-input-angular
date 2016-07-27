# indian-currency-angular
Angular module for indian currency input box directive and amount converted to words filters


Usage:

inject indianCurrency module in your app and you can use these directives and filters

#Directives onlyNumAddCommas
<only-num-add-commas input-name="amount" add-class="cover-input"
                                det="yourmodel" place-text="your placeholder"
                                change-values="onChange()" min-length="0"
                                max-length="12"
                                get-focus-out="onBlurFunction()"
                                is-reqd="true" />
                                

input-name: Name of the input field else keep empty
add-class: css Class to be added to input field

det: model to bind to input field

change-values: function to be called on change of model

min-length: minimum length of the input field

max-length: maximum length of the input field

get-focus-out: function to be called on blur

is-reqd:form validation required field
                                

#Filters addCommas

in html:{{100000|addCommas}}

in JS:$filter('addCommas')(100000);

output: 1,00,000.

#Filters amountToString
in html:{{100000|amountToString}}
in JS:$filter('amountToString')(100000);
output: 1Lac.
