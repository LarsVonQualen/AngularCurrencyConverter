"use strict";angular.module("angularCurrencyConverterApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","angularMoment","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controllerAs:"vm",controller:"MainController"}).when("/about",{templateUrl:"views/about.html",controllerAs:"vm",controller:"AboutController"}).otherwise({redirectTo:"/"})}]),angular.module("angularCurrencyConverterApp").controller("MainController",["$scope","OpenExchangeRatesService","amMoment","EnviromentConstants",function(a,b,c,d){var e=this;e.latestRates=[],e.currencies=[],e.leftCurrency=null,e.rightCurrency=null,e.loadingCurrencies=!0,e.leftInput="",e.rightInput="",b.getLatest().then(function(a){e.latestRates=a}),b.getCurrencies().then(function(a){e.currencies=a,e.leftCurrency=_.findWhere(e.currencies,{label:d.DefaultLeftCurrency}),e.rightCurrency=_.findWhere(e.currencies,{label:d.DefaultRightCurrency}),e.loadingCurrencies=!1},function(){e.loadingCurrencies=!1})}]),angular.module("angularCurrencyConverterApp").controller("AboutController",function(){}),angular.module("angularCurrencyConverterApp").service("OpenExchangeRatesService",["$http","$q","EnviromentConstants","$filter",function(a,b,c,d){var e={latest:null,currencies:null},f=function(a){return[c.OpenExchangeRatesBaseUrl,a,".json?app_id=",c.OpenExchangeRatesAppId].join("")};this.getLatest=function(){return b(function(b,c){null===e.latest?a.get(f("latest")).success(function(a){var c=[];_.forIn(a.rates,function(a,b){c.push({label:b,rate:a})}),a.rates=c,e.latest=a,b(e.latest)}).error(c):b(e.latest)})},this.getCurrencies=function(){return b(function(b,c){null===e.currencies?a.get(f("currencies")).success(function(a){var c=[];_.forIn(a,function(a,b){c.push({label:b,text:a})}),e.currencies=c,b(e.currencies)}).error(c):b(e.currencies)})},this.convert=function(a,b,c){var f=_.findWhere(e.latest.rates,{label:b.label}),g=_.findWhere(e.latest.rates,{label:c.label}),h=a/f.rate;return d("currency")(h*g.rate,"",2)}}]),angular.module("angularCurrencyConverterApp").constant("EnviromentConstants",{OpenExchangeRatesBaseUrl:"http://openexchangerates.org/api/",OpenExchangeRatesAppId:"ce5c79a030494d33a89c3c9b5e969078",DefaultLeftCurrency:"DKK",DefaultRightCurrency:"EUR"}),angular.module("angularCurrencyConverterApp").directive("currencyConverter",function(){return{templateUrl:"views/directives/currencyconverter.html",scope:{currencies:"=",leftCurrency:"=",leftInput:"=",rightCurrency:"=",rightInput:"="},restrict:"E"}}),angular.module("angularCurrencyConverterApp").directive("currencyConverterInput",function(){return{templateUrl:"views/directives/currencyconverterinput.html",restrict:"E",scope:{currencies:"=",currency:"=",targetCurrency:"=",input:"=",output:"=",tabIndex:"="},controllerAs:"vm",controller:["$scope","$filter",function(a,b){var c=this,d=!1;c.query="",c.currenciesSearchResult=[],c.takeFocus=function(){d=!0},c.releaseFocus=function(){d=!1},c.selectNewCurrency=function(c){a.currency=c,a.output.length&&(a.input=b("convertCurrency")(a.output,a.targetCurrency,a.currency))},c.queryPredicate=function(a){if(c.query.length>1){var b=c.query.toLowerCase().split(" "),d=b.filter(function(b){return a.label.toLowerCase().indexOf(b)>-1||a.text.toLowerCase().indexOf(b)>-1});return 0!==d.length}},a.$watch("input",function(c){c&&d?a.output=b("convertCurrency")(c,a.currency,a.targetCurrency):!c&&d&&(a.output="")}),a.$watch(function(){return c.query},function(d){c.currenciesSearchResult=b("filter")(a.currencies,c.queryPredicate)})}],link:function(a,b){b.find(".dropdown-menu input").on("click",function(a){a.stopPropagation()})}}}),angular.module("angularCurrencyConverterApp").filter("convertCurrency",["OpenExchangeRatesService",function(a){return function(b,c,d){return a.convert(b,c,d)}}]),angular.module("angularCurrencyConverterApp").filter("herpDerp",function(){return function(a){return"herpDerp filter: "+a}}),angular.module("angularCurrencyConverterApp").directive("derpyDerp",function(){return{template:"<div></div>",restrict:"E",link:function(a,b,c){b.text("this is the derpyDerp directive")}}});