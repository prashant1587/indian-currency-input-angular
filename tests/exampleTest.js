describe('Indian Currency Module', function() {
		var filter,service;
		beforeEach(function () {
		    module('indianCurrency');

		    inject(function (_$filter_,_currencyService_) {
		      filter = _$filter_;
		      service = _currencyService_;
		    });
		});
		describe('Add commas filter', function() {	  	  
	  	  it('check for thousand',function(){
	  		  var value = '10000',result;
	  		  result = filter('addCommas')(value);
	  		  expect(result).toEqual('10,000');
	  	  });
	  	  it('check for lac',function(){
	  		  var value = '100000',res;
	  		  res = filter('addCommas')(value);
	  		  expect(res).toEqual('1,00,000');
	  	  });
	  	  it('check for crore',function(){
	  		  var value = '10000000',res;
	  		  res = filter('addCommas')(value);
	  		  expect(res).toEqual('1,00,00,000');
	  	  });
	  	});

	  	describe('amount to string filter', function() {	  	  
	  	  it('check for thousand',function(){
	  		  var value = '10000',result;
	  		  result = filter('amountToString')(value);
	  		  expect(result).toEqual('10 K');
	  	  });
	  	  it('check for lac',function(){
	  		  var value = '100000',res;
	  		  res = filter('amountToString')(value);
	  		  expect(res).toEqual('1 Lac');
	  	  });
	  	  it('check for crore',function(){
	  		  var value = 10000000,res;
	  		  res = filter('amountToString')(value);
	  		  expect(res).toEqual('1 Cr');
	  	  });
	  	  it('check for empty string',function(){
	  		  var value = '',res;
	  		  res = filter('amountToString')(value);
	  		  expect(res).toEqual('0 ');
	  	  });
	  	  it('check for null',function(){
	  		  var value = null,res;
	  		  res = filter('amountToString')(value);
	  		  expect(res).toEqual('');
	  	  });
	  	  it('check for zero',function(){
	  		  var value = 0,res;
	  		  res = filter('amountToString')(value);
	  		  expect(res).toEqual('0 ');
	  	  });
	  	});

	  	describe('indianCurrency Service', function() {
	  		describe('wacky round', function() {	  	  
		  	  it('check for round',function(){
		  		  var value = 10.3486,result;
		  		  result = service.wacky_round(value,2);
		  		  expect(result).toEqual(10.34);
		  	  });
		  	  it('check for null value',function(){
		  		  var value = null,result;
		  		  result = service.wacky_round(value,2);
		  		  expect(result).toEqual(0);
		  	  });
		  	  it('check for empty value',function(){
		  		  var value = null,result;
		  		  result = service.wacky_round(value,2);
		  		  expect(result).toEqual(0);
		  	  });
		  	  it('check for round 2',function(){
		  		  var value = 100.44,result;
		  		  result = service.wacky_round(value,2);
		  		  expect(result).toEqual(100.44);
		  	  });
		  	  it('check for round 3',function(){
		  		  var value = 100.7688888888,result;
		  		  result = service.wacky_round(value,2);
		  		  expect(result).toEqual(100.76);
		  	  });
	  		});
	  		describe('remove commas', function() {	  	  
		  	  it('remove commas first check',function(){
		  		  var value = '10,24',result;
		  		  result = service.removeCommas(value);
		  		  expect(result).toEqual('1024');
		  	  });
		  	  it('remove commas on null value',function(){
		  		  var value = null,result;
		  		  result = service.removeCommas(value,2);
		  		  expect(result).toEqual(0);
		  	  });
		  	  it('remove commas on undefined value',function(){
		  		  var value = 10,result;
		  		  result = service.removeCommas();
		  		  expect(result).toEqual(0);
		  	  });
		  	});
		  	describe('amount to words', function() {	  	  
		  	  it('amount to words first check',function(){
		  		  var value = '10,24',result;
		  		  result = service.convertAmountToWords(value);
		  		  expect(result).toEqual('1.02 K');
		  	  });
		  	  it('amount to words lac value check',function(){
		  		  var value = '1000000',result;
		  		  result = service.convertAmountToWords(value);
		  		  expect(result).toEqual('10 Lac');
		  	  });
		  	  it('amount to words crore value check',function(){
		  		  var value = 10000000,result;
		  		  result = service.convertAmountToWords(value);
		  		  expect(result).toEqual('1 Cr');
		  	  });
		  	  it('amount to words undefined check',function(){
		  		  var result;
		  		  result = service.convertAmountToWords();
		  		  expect(result).toEqual("");
		  	  });
		  	});
	  	});
	});
