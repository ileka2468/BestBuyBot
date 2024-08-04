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
		var	keywords = response.keywords;
		var	quantity = response.quantity;
		var	preOrder = response.preOrder;
		var	username = response.username;
		var	password = response.password;		
		var	guestCheckout = response.guestCheckout;
		var	KeywordsType = response.KeywordsType;
        var timeoutMin = Number(response.timeOut);    
        var timeoutMax = Number(response.timeoutMax);    
        var autocheckoutselect = response.autocheckoutselect;
        var checkoutType = response.checkoutType;
        var storePickup = response.storePickup;
        var checkoutDelay = response.checkoutDelay;       
        var billCountry = response.billCountry;
        var billFirstName = response.billFirstName;
        var Colonia = response.Colonia;
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
        var expireMonth = response.expireMonth;
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
			
		/*	v0 = setInterval(function(){	
				if($(".grid-uniform").is(":visible") && !$("#AddToCart").is(":visible")){
					try{
						clearInterval(v0);
						var a = $(".grid-item");                       
						for(var i=0; i<a.length ; i++){
							var b = a[i].textContent;
							for(var j=0; j<keywords.length; j++){
								if(b.match(new RegExp(keywords[j], "i"))){					
									a[i].getElementsByTagName('a')[0].click();
									return;
								}
							}
						}
					}catch(err){}
					setTimeout(function(){	
						location.reload();
					},refreshInterval);
				}
			},50);
			*/
			v1 = setInterval(function(){				
				if($(".shop-add-to-cart").is(":visible")){
					try{					
						clearInterval(v1);
						if(!document.getElementsByClassName('shop-add-to-cart')[0].getElementsByTagName("button")[0].disabled){
							document.getElementsByClassName("shop-add-to-cart")[0].getElementsByTagName('button')[0].click();
							return;
						}
					}catch(err){}	
					setTimeout(function(){
						location.reload();
					},getRndRefreshRange(timeoutMin, timeoutMax)); 
				}
            }, 50);
			
			v2 = setInterval(function(){
				try{	
					if($(".c-alert-content").is(":visible")){												
						if(document.getElementsByClassName("c-alert-content")[0].textContent.match("This item is limited to")){
							clearInterval(v2);
							location.href="/cart";
						}
					}
				}catch(err){};					
            }, 50); 
			
			
			v3= setInterval(function(){
				try{	
					if($(".atc-warranty-tile-no-thanks").is(":visible")){						
						clearInterval(v3);
						document.getElementsByClassName("atc-warranty-tile-no-thanks")[0].click();
						document.getElementsByClassName("add-to-cart")[0].click();
					}
				}catch(err){};					
            }, 50); 
						
            if(autocheckoutselect==="yes"){
				v4 = setInterval(function(){
					try{	
						if($(".go-to-cart").is(":visible")){
							clearInterval(v4);
							if(soundAlert=="yes"){
								chrome.extension.sendMessage({action: "alert"}, function(response) {});
							}	
							location.href=document.getElementsByClassName('go-to-cart')[0];
						}
					}catch(err){};					
				}, 50); 
               
                v5= setInterval(function(){ 
					try{
						if($(".prequal-offer-modal__btn").is(":visible")){
							document.getElementsByClassName("prequal-offer-modal__btn")[0].click();
							clearInterval(v5);
						}
					}catch(err){}					
                }, 100); 	
				           
                v6 = setInterval(function(){ 
					try{
						if($("#email").is(":visible") && $("#guest").is(":visible")){
							try{
								clearInterval(v6);
								if(guestCheckout=="yes"){
									document.getElementById("guest")[0].click();									
								}else{
									$("#email").val(username);
									document.getElementById("email").dispatchEvent(new Event('change', { bubbles: true }));
									$("#password").val(password);
									document.getElementById("password").dispatchEvent(new Event('change', { bubbles: true }));
									document.getElementsByClassName("signin-button")[0].click();
								}
							}catch(err){}
						}
					}catch(err){}					
                }, 100);     
				v7 = setInterval(function(){ 
					if($("#email").is(":visible") && !$("#guest").is(":visible")){
						try{
							clearInterval(v7);
							$("#email").val(username);
							document.getElementById("email").dispatchEvent(new Event('change', { bubbles: true }));
							$("#password").val(password);
							document.getElementById("password").dispatchEvent(new Event('change', { bubbles: true }));
							document.getElementsByClassName("signin-button")[0].click();
						}catch(err){}
					}					
                }, 100); 
				v8 = setInterval(function(){ 
					if($("#shipping-options-group").is(":visible")){
						try{
							clearInterval(v8);
							if(storePickup=="yes"){
								$("#store-pickup-option").click();
								document.getElementsByClassName('fulfillment-submit')[0].click();
							}else{
								$("#ship-option").click();
								//document.getElementsByClassName('fulfillment-submit')[0].click();	
							}
							v88= setInterval(function(){ 
								if($("#street").is(":visible")){
									try{																				
										$("#street").val(billStreetAddress1);
										document.getElementById("street").dispatchEvent(new Event('change', { bubbles: true }));
										
										$("#street-number").val(shipStreetAddress2);
										document.getElementById("street-number").dispatchEvent(new Event('change', { bubbles: true }));
																				
										$("#postal-code").val(billZipCode);
										document.getElementById("postal-code").dispatchEvent(new Event('change', { bubbles: true }));
										v69= setInterval(function(){ 
											if($("#suburb").is(":visible")){
												clearInterval(v69);
												$("#suburb").val(Colonia).change();
												document.getElementById("suburb").dispatchEvent(new Event('change', { bubbles: true }));
											}
										},50);
										//$("#user\\.emailAddress").val(shipEmail);
										//document.getElementById("user.emailAddress").dispatchEvent(new Event('change', { bubbles: true }));	
										$("#phone").val(shipPhone);
										document.getElementById("phone").dispatchEvent(new Event('change', { bubbles: true }));
										if($("#suburb").val(Colonia)){
											setTimeout(function(){
												document.getElementsByClassName('fulfillment-submit')[0].click();
											},500);
										}
										clearInterval(v88);
									}catch(err){}
								}
							},100); 	
						}catch(err){}
					}					
                }, 100);
				v89 = setInterval(function(){                      
					if($("li:contains('La Ciudad es requerida')").is(":visible")){
						 clearInterval(v89);
						location.reload();
					}						
				},100);
				v9 = setInterval(function(){                      
					if($("#payment-options-group").is(":visible")){
						 clearInterval(v9);
						if(paymentMethod=='creditCard'){														
							try{
								$("#credit-card-option").click();		
							}catch(err){}
						}else{
							try{
								$("#paypal-v2-option").click();		
							}catch(err){}
						}
					}						
				},100);
				v10 = setInterval(function(){ 
						if($("#givenName-field").is(":visible")){
							try{															
								$("#givenName-field").val(billFirstName);
								document.getElementById("givenName-field").dispatchEvent(new Event('change', { bubbles: true }));
								
								$("#familyName-field").val(shipStreetAddress2);
								document.getElementById("familyName-field").dispatchEvent(new Event('change', { bubbles: true }));
								if($("#suburb").val(Colonia)){
									console.log("hii");
									document.getElementsByClassName('fulfillment-submit')[0].click();
									//clearInterval(10);	
								}
							}catch(err){}
						}
					},100); 	   				
                v11 = setInterval(function(){ 
                    //try{  
                        if($("#encryptedCardNumber").is(":visible")){
																				
							$("#encryptedCardNumber").focus();
							
							document.getElementById("encryptedCardNumber").dispatchEvent(new Event('focus', { bubbles: true }));
							document.getElementById("encryptedCardNumber").className==" ";
							//$("#encryptedCardNumber").blur();
							//$("#encryptedCardNumber").sendkeys(" ");
							//$("#encryptedCardNumber").val(cardNumber);
							//$("#encryptedCardNumber").attr("value");
							document.getElementById("encryptedCardNumber").value=cardNumber;
							//document.getElementById("encryptedCardNumber").value=" ";
							//$("#encryptedCardNumber").sendkeys(cardNumber);
							$("#encryptedCardNumber").keypress();
							//document.getElementById("encryptedCardNumber").dispatchEvent(new Event('input', { bubbles: true }));							
							//document.getElementById("encryptedCardNumber").dispatchEvent(new Event('blur', { bubbles: true }));							
							document.getElementById("encryptedCardNumber").dispatchEvent(new Event('change', { bubbles: true }));							
							document.getElementById("encryptedCardNumber").dispatchEvent(new Event('click', { bubbles: true }));
							clearInterval(v11);								
						}
                    //}catch(err){}
                }, 50);
				 v12 = setInterval(function(){ 
                    try{ 
						 if($("#encryptedExpiryMonth").is(":visible")){
							clearInterval(v12);
							$("#encryptedExpiryMonth").val(expireMonth);					
							//$("#encryptedExpiryMonth").sendkeys(expireMonth);
							document.getElementById("encryptedExpiryMonth").dispatchEvent(new Event('change', { bubbles: true }));
							document.getElementById("encryptedExpiryMonth").dispatchEvent(new Event('click', { bubbles: true }));
						 }
                    }catch(err){}
                }, 50);
				
				v13 = setInterval(function(){ 
					if($("#encryptedExpiryYear").is(":visible")){
						try{
							clearInterval(v13);
							$("#encryptedExpiryYear").val("");
							$("#encryptedExpiryYear").sendkeys(expireYear);
							document.getElementById("encryptedExpiryMonth").dispatchEvent(new Event('change', { bubbles: true }));
							document.getElementById("encryptedExpiryMonth").dispatchEvent(new Event('click', { bubbles: true }));
							
						}catch(err){}
					}
                }, 50);
				v14 = setInterval(function(){ 
					if($("#encryptedSecurityCode").is(":visible")){
						try{
							clearInterval(v14);
							$("#encryptedSecurityCode").sendkeys(" ");
							$("#encryptedSecurityCode").val(cardCVV);
							document.getElementById("encryptedSecurityCode").dispatchEvent(new Event('change', { bubbles: true }));	
							document.getElementById("encryptedSecurityCode").dispatchEvent(new Event('click', { bubbles: true }));	
						}catch(err){}
					}
                }, 50);						
				
				 v15 = setInterval(function(){ 
					try{
						if($("button:contains('Place Your Order')").is(":visible")){
							$("button:contains('Place Your Order')").click();
							clearInterval(v15);
						}							
					}catch(err){}					
                }, 100);  
            }
		});
	}
});