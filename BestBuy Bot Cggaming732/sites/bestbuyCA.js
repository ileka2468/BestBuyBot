function simulateClick(item) {
  item.dispatchEvent(new PointerEvent('pointerdown', {bubbles: true}));
  item.dispatchEvent(new MouseEvent('mousedown', {bubbles: true}));
  item.dispatchEvent(new PointerEvent('pointerup', {bubbles: true}));
  item.dispatchEvent(new MouseEvent('mouseup', {bubbles: true}));
  item.dispatchEvent(new MouseEvent('mouseout', {bubbles: true}));
  item.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  item.dispatchEvent(new Event('change', {bubbles: true}));

  return true;
}
function triggerEvent(el, type)
{
   if ('createEvent' in document) {
		var e = document.createEvent('MouseEvents');
		e.initEvent(type, false, true);
		el.dispatchEvent(e);
	} else {
		// IE 8
		var e = document.createEventObject();
		e.eventType = type;
		el.fireEvent('on'+e.eventType, e);
	}
}
function keysFoundAnd(keywords, data)
{
	for(i=0; i<keywords.length; i++)
	{
		if(!data.match(new RegExp(keywords[i].replace(/\s{2,}/g, ' '), "i")))
		{
			return false;
		}
	}
	return true;
}
function keysFoundOr(keywords, data)
{
	for(i=0; i<keywords.length; i++)
	{
		if(data.match(new RegExp(keywords[i].replace(/\s{2,}/g, ' '), "i")))
		{
			return true;
		}
	}
	return false;
}
function findNegativeKeys(keywords2,data)
{
	if(keywords2[0]=="")
	{
	return false
	}
	for(i=0; i<keywords2.length; i++)
	{
		if(data.match(new RegExp(keywords2[i], "i")))
		{
			
			return true;
		}
	}
	return false;
}	
function getRndRefreshRange(min, max) {
	var rt = 1000;
	try{ 
		rt = Math.floor(Math.random() * (max - min + 1) ) + min;
	}catch(exc){}
	return rt;
}
chrome.extension.sendMessage({action: "isRecordingOn"}, function(response) {
	if(response.action == 'true'){
		var	size = response.size;
		var	size2 = response.size2;
		var	low = Number(response.low);
		var	high = Number(response.high);
		var	username = response.username;
		var	password = response.password;
		var	keywords = response.keywords;
		var	keywords2 = response.keywords2;
		var	KeywordsType = response.KeywordsType;
        var timeoutMin = Number(response.timeOut);    
        var timeoutMax = Number(response.timeoutMax);   
        var soundAlert = response.soundAlert;   
		var storePickup = response.storePickup;	
		var	guestCheckout = response.guestCheckout;
        var autocheckoutselect = response.autocheckoutselect;
        var checkoutType = response.checkoutType;
        var checkoutDelay = response.checkoutDelay;       
        var billCountry = response.billCountry;
        var billFirstName = response.billFirstName;
        var billLastName = response.billLastName;
        var billStreetAddress1 = response.billStreetAddress1;
        var billStreetAddress2 = response.billStreetAddress2;
        var billZipCode = response.billZipCode;
        var billCity = response.billCity;
        var billState = response.billState;
        var billPhone = response.billPhone;
        var billEmail = response.billEmail;
        var billStateKythnyc = response.billStateKythnyc;
        var shipStateKythnyc = response.newStateKythnyc; 
        var shippingAddress = response.shippingAddress;
        var shipCountry = response.newCountry;
        var shipFirstName = response.newFirstName;
        var shipLastName = response.newLastName;
        var shipStreetAddress1 = response.newStreetAddress1;
        var shipStreetAddress2 = response.newStreetAddress2;
        var shipZipCode = response.newZipCode;
        var shipCity = response.newCity;
        var shipState = response.newState;
        var shipPhone = response.newPhone;
        var shipEmail = response.newEmail;        
        var paymentMethod = response.paymentMethod;
        var paymentCard = response.paymentCard;
        var cardNumber = response.cardNumber;
        var expireMonth = parseInt(response.expireMonth, 10);
        var expireYear = response.expireYear;
        var cardCVV = response.cardCVV;
        var paypalEmail = response.paypalEmail;
        var paypalPassword = response.paypalPassword;
        var nameOnCard = response.cardHolderName;
        expireYear = "20".concat(expireYear);
		$(function(){
            try{
				keywords=keywords.trim();
				keywords=keywords.split(",");
			}catch(err){}	
			try{
				keywords2= keywords2.trim();
				keywords2=keywords2.split(",");
			}catch(err){}
			try{
				low=Number(low);		
				high=Number(high);
			}catch(err){}
			v0 = setInterval(function(){	
				if($(".x-productListItem").is(":visible") && !$("#AddToCart").is(":visible")){
					try{
						clearInterval(v0);
						var a = $(".x-productListItem");                       
						for(var i=0; i<a.length ; i++){
							for(var i=0; i<a.length ; i++){
								var b = a[i].textContent.replace(/\s{2,}/g, ' ');	
								if(KeywordsType=="and"){
									if((keysFoundAnd(keywords, b))&&(!findNegativeKeys(keywords2,b))){
										a[i].getElementsByTagName('a')[0].click();		
										return;
									}						
								}else{
									if((keysFoundOr(keywords, b))&&(!findNegativeKeys(keywords2,b))){
										 a[i].getElementsByTagName('a')[0].click();	
										return;
									}									
								}
							}							
						}
					}catch(err){}
					setTimeout(function(){	
						location.reload(true);
					},getRndRefreshRange(timeoutMin, timeoutMax)); 
				}
			},100);	
			v1 = setInterval(function(){				
				if($(".addToCartButton").is(":visible") && !$("[data-automation='view-cart-confirmation']").is(":visible")){
					clearInterval(v1);
					try{
						var p=$("[data-automation='product-price']>span").eq(0).text();
						var prc=p.replace("$","");
						if((low<=Number(prc) && high>=Number(prc)) || (low==0 && high==0)){		
							if(storePickup=="yes"){
								if($(".x-reserveInStoreButton").is(":visible")){
									v01=setInterval(function(){
										if(!$(".x-reserveInStoreButton").is(":disabled")){
											clearInterval(v01);
											setTimeout(function(){
												document.getElementsByClassName("x-reserveInStoreButton")[0].click();
											},100);
											return;
										}										
									},300);	
								}else{
									if(!$(".addToCartButton").is(":disabled")){
										document.getElementsByClassName("addToCartButton")[0].click();
										return;
									}
								}
							}else{
								var p = document.getElementsByClassName("addToCartButton")[0];
								if(!p.disabled){
									p.click();
									return;
								}
							}
						}
					}catch(err){}
					setTimeout(function(){
						location.reload(true);
					},getRndRefreshRange(timeoutMin, timeoutMax)); 				
				}								
            }, 50);
			
			v2 = setInterval(function(){	
				if($("[data-automation='view-cart-confirmation']").is(":visible")){						
					clearInterval(v2);
					try{
						if(soundAlert=="yes"){
							chrome.extension.sendMessage({action: "alert"}, function(response) {});
						}
						$("[data-automation='view-cart-confirmation']").click();
					}catch(err){}
				}				
            }, 50);
			
            if(autocheckoutselect==="yes"){					                
				v3 = setInterval(function(){	
					if($("span:contains('Continue to Checkout')").is(":visible")){						
						clearInterval(v3);
						$("span:contains('Continue to Checkout')").click();
					}
				}, 50);
				v31= setInterval(function(){ 				
					if($("h1:contains('Are you 17 or older?')").is(":visible")){
						try{document.getElementsByClassName("confirm")[1].click();}catch(err){}
						clearInterval(v31);
					}										
                }, 100); 	
            
				v33 = setInterval(function(){	
					if($("[data-automation='continue-to-review']").is(":visible")){
						if(!$("[data-automation='continue-to-review']").is(":disabled")){
							clearInterval(v33);
							$("[data-automation='continue-to-review']").click();
						}
					}
				}, 50);
				v4 = setInterval(function(){	
					if($(".guest-continue-link").is(":visible") || $("#username").is(":visible")){						
						clearInterval(v4);
						try{
							if(guestCheckout=="yes"){
								document.getElementsByClassName("guest-continue-link")[0].click();
							}else{
								$("#username").val(username);
								document.getElementById("username").dispatchEvent(new Event('change', { bubbles: true }));
								$("#password").val(password);
								document.getElementById("password").dispatchEvent(new Event('change', { bubbles: true }));
								document.getElementsByClassName("signin-form-button-wrapper")[0].getElementsByTagName("button")[0].click();
							}
						}catch(err){}
					}
				}, 50);	
				v44 = setInterval(function(){	
					if($(".store-search-input-container").is(":visible")){						
						clearInterval(v44);
						try{
							$("#postalCode").val(shipZipCode);
							document.getElementById("postalCode").dispatchEvent(new Event('change', { bubbles: true }));
							document.getElementsByClassName("search-input-btn")[0].click();
						}catch(err){}
					}
				}, 50);	
                v5 = setInterval(function(){                   
					if($("#firstName").is(":visible") && ($("#email").is(":visible")||$(".block-title"))){
						try{
							clearInterval(v5);
							try{$("#email").val(shipEmail);
							document.getElementById("email").dispatchEvent(new Event('change', { bubbles: true }));}catch(er){}
							$("#firstName").val(shipFirstName);
							document.getElementById("firstName").dispatchEvent(new Event('change', { bubbles: true }));
							$("#lastName").val(shipLastName);
							document.getElementById("lastName").dispatchEvent(new Event('change', { bubbles: true }));
							$("#addressLine").val(shipStreetAddress1);
							document.getElementById("addressLine").dispatchEvent(new Event('change', { bubbles: true }));
							$("#city").val(shipCity);
							document.getElementById("city").dispatchEvent(new Event('change', { bubbles: true }));
							$("#regionCode").val(shipState);
							document.getElementById("regionCode").dispatchEvent(new Event('change', { bubbles: true }));
							$("#postalCode").val(shipZipCode);
							document.getElementById("postalCode").dispatchEvent(new Event('change', { bubbles: true }));
							$("#phone").val(shipPhone);
							document.getElementById("phone").dispatchEvent(new Event('change', { bubbles: true }));	
							$("[data-automation='continue-to-payment']").click();
						}catch(err){}
					}                  
                },50);
								
				v7 = setInterval(function(){ 						
					if($("#shownCardNumber").is(":visible")){
						try{  
							clearInterval(v7);
							if(paymentMethod === "creditCard"){								
								$("#shownCardNumber").val(cardNumber);
								document.getElementById("shownCardNumber").dispatchEvent(new Event("change", { bubbles: true }));
								$("#expirationMonth").val(expireMonth);
								document.getElementById("expirationMonth").dispatchEvent(new Event("change", { bubbles: true }));
								$("#expirationYear").val(expireYear);
								document.getElementById("expirationYear").dispatchEvent(new Event("change", { bubbles: true }));
								$("#cvv").val(cardCVV);
								document.getElementById("cvv").dispatchEvent(new Event("change", { bubbles: true }));
								//$("span:contains('Continue')").click();
								
							}                                                           
							else{
								document.getElementsByName("paymentType")[1].click();
								document.getElementsByClassName("paypalButton")[0].click();
							}
						}catch(err){}
					}						
				},50); 
				if(shippingAddress=="new"){
					v81 = setInterval(function(){
						if($("label:contains('New Address')").is(":visible")){
							clearInterval(v81);
							$("label:contains('New Address')").click();
						}
					},100);
					v82 = setInterval(function(){
						if($("#firstName").is(":visible") && !$("#email").is(":visible")){
							try{
								clearInterval(v82);							
								$("#firstName").val(billFirstName);
								document.getElementById("firstName").dispatchEvent(new Event('change', { bubbles: true }));
								$("#lastName").val(billLastName);
								document.getElementById("lastName").dispatchEvent(new Event('change', { bubbles: true }));
								$("#addressLine").val(billStreetAddress1);
								document.getElementById("addressLine").dispatchEvent(new Event('change', { bubbles: true }));
								$("#city").val(shipCity);
								document.getElementById("city").dispatchEvent(new Event('change', { bubbles: true }));
								$("#regionCode").val(billState);
								document.getElementById("regionCode").dispatchEvent(new Event('change', { bubbles: true }));
								$("#postalCode").val(billZipCode);
								document.getElementById("postalCode").dispatchEvent(new Event('change', { bubbles: true }));
								$("#phone").val(billPhone);
								document.getElementById("phone").dispatchEvent(new Event('change', { bubbles: true }));	
								$("span:contains('Continue')").click();
							}catch(err){}
                        }
					},100);
				}
				if(shippingAddress=="bill"){
					v8 = setInterval(function(){	
						if($("[data-automation='selectable-address-card']").is(":visible")){						
							clearInterval(v8);
							$("span:contains('Continue')").click();
						}				
					}, 50); 
				}
				v88 = setInterval(function(){
					if($(".card-details").is(":visible") && !$("#shownCardNumber").is(":visible")){
						clearInterval(v88);
						try{
							$("#cvv").val(cardCVV);						
							document.getElementById("cvv").dispatchEvent(new Event("change", { bubbles: true }));
							$("[name='address']").click();
						}catch(err){}
					}				
				}, 50); 	
				v9 = setInterval(function(){
					if($("span:contains('Place Order')").is(":visible") && $(".shipment-details").is(":visible")){
						if(!document.getElementsByClassName("order-now")[0].disabled){
							clearInterval(v9);
							setTimeout(function(){
								$("span:contains('Place Order')").click();
							},500);
						}
					}				
				}, 50); 				
            }
		});
	}
});