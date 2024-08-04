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
function keysFoundOr(keywords, data,atc)
{
	for(i=0; i<keywords.length; i++)
	{
		if(data.match(new RegExp(keywords[i].replace(/\s{2,}/g, ' '), "i")) && atc.match("Add to Cart"))
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
		var	keywords = response.keywords;
		var	keywords2 = response.keywords2;
		var	KeywordsType = response.KeywordsType;
		var	warantyYear = response.warantyYear;
		var	quantity = response.quantity;
		var	soundAlert = response.soundAlert;
		var	warranty = response.warranty;
		var	preOrder = response.preOrder;
		var	username = response.username;
		var	password = response.password;		
		var	guestCheckout = response.guestCheckout;
        var timeoutMin = Number(response.timeOut);    
        var timeoutMax = Number(response.timeoutMax);      
        var autocheckoutselect = response.autocheckoutselect;
        var checkoutType = response.checkoutType;
        var storePickup = response.storePickup;
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
			try{
				keywords2= keywords2.trim();
				keywords2=keywords2.split(",");
			}catch(err){}
              
			 try{
				low=Number(low);		
				high=Number(high);
			}catch(err){}			
			v0 = setInterval(function(){	
				if($(".grid-uniform").is(":visible") && !$("#AddToCart").is(":visible")){
					try{
						clearInterval(v0);
						var a = $(".grid-item");                       
						for(var i=0; i<a.length ; i++){
							for(var i=0; i<a.length ; i++){
								var b = a[i].textContent.replace(/\s{2,}/g, ' ');
								if(KeywordsType=="and"){
									if((keysFoundAnd(keywords, b)) &&(b.match('Add to Cart')) &&(!findNegativeKeys(keywords2,b))){
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
			v01 = setInterval(function(){	
				if($(".sku-item-list").is(":visible") && !$("#AddToCart").is(":visible")){
					try{
						clearInterval(v01);
						var a = document.getElementsByClassName("sku-item-list")[0].getElementsByClassName("sku-item");
						for(var i=0; i<a.length ; i++){
							for(var i=0; i<a.length ; i++){
								var b = a[i].getElementsByClassName("sku-header")[0].textContent.replace(/\s{2,}/g, ' ');
								var atc =a[i].getElementsByClassName('add-to-cart-button')[0].textContent;
								try{var pr=a[i].getElementsByClassName("priceView-hero-price")[0].getElementsByTagName("span")[0].textContent.trim()}catch(tyu){}
									var prc=pr.replace("$","");
									if (prc.match(",")){ 
										prc=prc.replace(",","");
									}
								if(KeywordsType=="and"){
									if(keysFoundAnd(keywords, b) && (atc.match('Add to Cart')) &&(!findNegativeKeys(keywords2,b))){
										if((low<=Number(prc) && high>=Number(prc)) || (low==0 && high==0)){		
											a[i].getElementsByClassName('add-to-cart-button')[0].click();
											return;
										}
									}						
								}else{
									if((keysFoundOr(keywords, b, atc))&&(!findNegativeKeys(keywords2,b))){
										if((low<=Number(prc) && high>=Number(prc)) || (low==0 && high==0)){		
											 a[i].getElementsByClassName('add-to-cart-button')[0].click();	
											return;
										}
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
				if($(".add-to-cart-button").is(":visible") && !$(".order-summary").is(":visible") && !$(".sku-item-list").is(":visible") && !$(".add-to-cart-button:contains('Sold Out')").is(":visible")){
					//clearInterval(v1);
					try{
						if($(".warranty-list").is(":visible")){
							if(warranty=='yes'){								
								try{
									if(warantyYear=="1"){
										document.getElementsByClassName('warranty-list')[0].getElementsByClassName("c-checkbox-custom-input")[0].getElementsByTagName("input")[0].click();										
									}else if(warantyYear=="2"){
										document.getElementsByClassName('warranty-list')[0].getElementsByClassName("c-checkbox-custom-input")[1].getElementsByTagName("input")[0].click();
									}else if(warantyYear=="3"){
										document.getElementsByClassName('warranty-list')[0].getElementsByClassName("c-checkbox-custom-input")[2].getElementsByTagName("input")[0].click();
									}
								}catch(err){}
							}
						}
						try{var pr=document.getElementsByClassName("priceView-hero-price")[0].getElementsByTagName("span")[0].textContent.trim()}catch(tyu){}
						var prc=pr.replace("$","");
						if(prc.match(",")){ 
							prc=prc.replace(",","");
						}						
						var p = document.getElementsByClassName("add-to-cart-button")[0];
						try{var q=document.getElementsByClassName("fulfillment-fulfillment-summary")[0].getElementsByTagName("span")[0].textContent;}catch(err){}
						try{var Unavl=document.getElementsByClassName("fulfillment-fulfillment-summary")[0].getElementsByTagName("strong")[0].textContent;}catch(err){}
						if(p.textContent.match("Coming Soon") || p.textContent.trim()=="Unavailable Nearby" ||Unavl.match("Unavailable") ){
							setTimeout(function(){
								clearInterval(v1);
								location.reload(true);
							},getRndRefreshRange(timeoutMin, timeoutMax)); 				
						}else{							
							if((low<=Number(prc) && high>=Number(prc)) || (low==0 && high==0)){		
								if(storePickup=="yes"){
									if(p.textContent.match('Pre-Order')){
										if(preOrder=="yes"){
											p.click();
										clearInterval(v1);
										}else{
											setTimeout(function(){
												clearInterval(v1);
												location.reload(true);
											},getRndRefreshRange(timeoutMin, timeoutMax)); 
										}
									}else{
										p.click();
										if(p.textContent.match("Adding"))
										{
											clearInterval(v1);
										}
									}								
								}else{
									if(q.match('Unavailable for')){
										setTimeout(function(){
											clearInterval(v1);
											location.reload(true);
										},getRndRefreshRange(timeoutMin, timeoutMax)); 
									}else{
										if(p.textContent.match('Pre-Order')){
											if(preOrder=="yes"){
												clearInterval(v1);
												p.click();	
											}else{
												setTimeout(function(){
													clearInterval(v1);
													location.reload(true);
												},getRndRefreshRange(timeoutMin, timeoutMax)); 	
											}
										}else{
											p.click();
											if(p.textContent.match("Adding"))
											{
												clearInterval(v1);
											}										
										}	
									}
								}								
							}else{
								setTimeout(function(){
									clearInterval(v1);
									location.reload(true);
								},getRndRefreshRange(timeoutMin, timeoutMax)); 	
							}
						}
						
					}catch(err){}							
				}			
            }, 500);
			
			v2 = setInterval(function(){					
				if($(".add-to-cart-button:contains('Sold Out')").is(":visible")){
					clearInterval(v2);	
					setTimeout(function(){
						location.reload(true);
					},getRndRefreshRange(timeoutMin, timeoutMax)); 	
				}								
            }, 50);
			v02 = setInterval(function(){					
				if($(".c-alert-content").is(":visible") || Number($(".cart-link").text().trim()>0)){
					try{
						if(document.getElementsByClassName("c-alert-content")[0].textContent.match("This item is limited to")){
							clearInterval(v02);							
							location.href="/cart";
						}
					}catch(err){};	
				}								
            }, 50);
			v21 = setInterval(function(){					
				if(($(".sku-item-list").is(":visible") && !$("#AddToCart").is(":visible")) && Number($(".cart-link >.dot").text().trim())>0){												
					try{
						clearInterval(v21);							
						location.href="/cart";
					}catch(err){};		
				}							
            }, 50);
			v22 = setInterval(function(){				
				if($("p:contains('There was a problem adding your product to cart.')").is(":visible")){
					clearInterval(v22);
					setTimeout(function(){
						location.reload(true);
					},getRndRefreshRange(timeoutMin, timeoutMax)); 
				}									
            }, 50);
			
			v23 = setInterval(function(){				
				if($("div:contains('Your cart is empty')").is(":visible")){
					try{	
						clearInterval(v23);
						location.href=response.url;
					}catch(err){};		
				}							
            }, 50); 
			v24 = setInterval(function(){				
				if($("div:contains('Due to high demand. we\\'re having everyone go through one more step before it can be added. Please try again.')").is(":visible")||$("span:contains('Due to high demand. we\\'re having everyone go through one more step before it can be added. Please try again.')").is(":visible")){
					try{	
						clearInterval(v24);
						setTimeout(function(){
							location.reload(true);
						},getRndRefreshRange(timeoutMin, timeoutMax)); 
					}catch(err){};		
				}							
            }, 50); 
			v3 = setInterval(function(){					
				if($(".success-text").is(":visible") || $(".go-to-cart-button").is(":visible") ){
					try{
						clearInterval(v3);
						if(soundAlert=="yes"){
							chrome.extension.sendMessage({action: "alert"}, function(response) {});
						}
						setTimeout(function(){
							location.href="/cart";
						}, 100)
					}catch(err){};	
				}								
            }, 50);
			v33 = setInterval(function(){					
				if($(".unactivated-device__button").is(":visible")){
					try{
						clearInterval(v33);
						document.getElementsByClassName("unactivated-device__button")[0].click();
					}catch(err){}
				}								
            }, 50); 
						
            if(autocheckoutselect==="yes"){
				v4 = setInterval(function(){					
					if($("[data-track='Checkout - Top']").is(":visible")){
						try{	
							clearInterval(v4);
							if(soundAlert=="yes"){
								chrome.extension.sendMessage({action: "alert"}, function(response) {});
							}
							if($("[name='availability-selection']").is(":visible")){
								if(storePickup=="yes"){
									try{document.getElementsByName("availability-selection")[0].click();}catch(err){}	
									v45=setInterval(function(){
										if($("[data-track='Checkout - Top']").is(":visible")&& document.getElementsByName("availability-selection")[0].checked==true){
											document.getElementsByClassName("checkout-buttons__checkout")[0].getElementsByTagName("button")[0].click();	
											clearInterval(v45);		
										}
									},100);	
								}else{							
									try{document.getElementsByName("availability-selection")[1].click();}catch(err){}
									v46=setInterval(function(){
										if($("[data-track='Checkout - Top']").is(":visible") && document.getElementsByName("availability-selection")[1].checked==true){	
											document.getElementsByClassName("checkout-buttons__checkout")[0].getElementsByTagName("button")[0].click();	
											clearInterval(v46);		
										}
									},100);
								}
							}else{
								document.getElementsByClassName("checkout-buttons__checkout")[0].getElementsByTagName("button")[0].click();	
							}
							/*var q = document.getElementsByClassName("fluid-item__quantity")[0];
							for(var i=0; i<q.length; i++){
								if(q.options[i].value==quantity){
									q.options[i].selected=true;
									try{q.dispatchEvent(new Event('change', { bubbles: true }));}catch(err){}
									v45=setInterval(function(){
										if($("[data-track='Checkout - Top']").is(":visible")){											
											document.getElementsByClassName("checkout-buttons__checkout")[0].getElementsByTagName("button")[0].click();	
											clearInterval(v45);		
										}
									},1000);									
								}else{
									if(q.length<quantity){
										q[q.length-2].selected=true;
										q.dispatchEvent(new Event('change', { bubbles: true }));
										v44=setInterval(function(){
											if($("[data-track='Checkout - Top']").is(":visible")){												
												document.getElementsByClassName("checkout-buttons__checkout")[0].getElementsByTagName("button")[0].click();
												clearInterval(v44);
											}
										},100);
									}
								}
								//return;
							}	
							*/	
						}catch(err){};	
					}									
				}, 100); 
               
                v5= setInterval(function(){ 					
					if($(".prequal-offer-modal__btn").is(":visible")){
						try{
							document.getElementsByClassName("prequal-offer-modal__btn")[0].click();
							clearInterval(v5);
						}catch(err){}	
					}									
                }, 100); 
				v55= setInterval(function(){ 					
					if($(".age-verification__button").is(":visible")){
						try{
							document.getElementsByClassName("age-verification__button")[0].click();
							clearInterval(v55);
						}catch(err){}
					}										
                }, 100); 	
				
                v6 = setInterval(function(){ 
					if(($("#fld-e").is(":visible") || $("#fld-p1").is(":visible")) && $(".cia-guest-content__continue").is(":visible")){
						try{
							clearInterval(v6);
							if(guestCheckout=="yes"){
								document.getElementsByClassName("cia-guest-content__continue")[0].click();
							}else{
								try{
								$("#fld-e").val(username);
								document.getElementById("fld-e").dispatchEvent(new Event('change', { bubbles: true }));}catch(err){}
								$("#fld-p1").val(password);
								document.getElementById("fld-p1").dispatchEvent(new Event('change', { bubbles: true }));
								document.getElementsByClassName("cia-form__controls__submit")[0].click();
							}
						}catch(err){}
					}				
                }, 100);     
				v66 = setInterval(function(){ 
					if(($("#fld-e").is(":visible") || $("#fld-p1").is(":visible")) && !$(".cia-guest-content__continue").is(":visible")){
						try{
							clearInterval(v66);
							try{$("#fld-e").val(username);
							document.getElementById("fld-e").dispatchEvent(new Event('change', { bubbles: true }));}catch(err){}
							$("#fld-p1").val(password);
							document.getElementById("fld-p1").dispatchEvent(new Event('change', { bubbles: true }));
							document.getElementsByClassName("cia-form__controls__submit")[0].click();
						}catch(err){}
					}				
                }, 100);    
				v7 = setInterval(function(){ 					
					if($("button:contains('Continue to Payment Information')").is(":visible")||$("button:contains('Continue to Schedule Delivery')").is(":visible")){
						try{
							clearInterval(v7);	
							try{$("#user\\.emailAddress").val(shipEmail);}catch(err){}
							try{document.getElementById("user.emailAddress").dispatchEvent(new Event('change', { bubbles: true }));}catch(err){}
							$("#user\\.phone").val(billPhone);
							document.getElementById("user.phone").dispatchEvent(new Event('change', { bubbles: true }));
							document.getElementsByClassName("btn btn-lg btn-block btn-secondary")[0].click();
						}catch(err){}	
					}									
                }, 100);   
                	
                v9 = setInterval(function(){ 					
					if($(".autocomplete").is(":visible")){
						try{
							var p =document.getElementsByClassName("autocomplete")[0];
							for(var i =0;i<p.length; i++)
							{
								if(p[i].textContent.match(shipState))
								{									
									break;
								}
							}
							clearInterval(v9);
						}catch(err){}	
					}									
                }, 100);
				
			    v10 = setInterval(function(){ 
					if($("button:contains('Keep Address as Entered')").is(":visible")){
						$("button:contains('Keep Address as Entered')").click();
						clearInterval(v10);						
					}				
                }, 500);  
			    							
				v11 = setInterval(function(){                      
				 if($("#optimized-cc-card-number").is(":visible") && $("#credit-card-cvv").is(":visible") ){
					if(paymentMethod=='creditCard'){														
						 try{
							$("#optimized-cc-card-number").val(cardNumber);
							document.getElementById("optimized-cc-card-number").dispatchEvent(new Event('change', { bubbles: true }));
								//$("#optimized-cc-card-number").sendkeys(cardNumber);
								var cardexpiryMonth = document.querySelector('select[name^="expiration-month"]');
								if (cardexpiryMonth !== null) {
									try{
										for(var jj=0; jj<cardexpiryMonth.options.length; jj++){
											if(cardexpiryMonth.options[jj].value === expireMonth){
												cardexpiryMonth.options[jj].selected = true;
												cardexpiryMonth.dispatchEvent(new Event("change", { bubbles: true }));
												break;
											}
										}								
									}catch(err){}
								}
								var cardexpiryYear = document.querySelector('select[name^="expiration-year"]');
									try{
										for(var jj=0; jj<cardexpiryYear.options.length; jj++){
											if(cardexpiryYear.options[jj].value === expireYear){
												console.log(expireYear)
												cardexpiryYear.options[jj].selected = true;
												cardexpiryYear.dispatchEvent(new Event("change", { bubbles: true }));
												break;
											}
										}
									
									}catch(err){}
									$("#credit-card-cvv").val(cardCVV); 
									document.getElementById("credit-card-cvv").dispatchEvent(new Event('change', { bubbles: true }));
															
								setTimeout(function(){
									document.getElementsByClassName("btn-primary")[0].click();					
								},1000);
								clearInterval(v11);
							}catch(err){}
						}else{
							try{
								document.getElementsByClassName("payment__other-payment-methods")[0].getElementsByTagName("a")[0].click();
								v111=setInterval(function(){
									if($(".payment__paypal-button").is(":visible")){
										document.getElementsByClassName("payment__paypal-button")[0].click();
										clearInterval(v111);
									}										
								})
								clearInterval(v11);
							}catch(err){}
						}
					}							
                },100);
				
			    v12 = setInterval(function(){ 					
					if($(".credit-card-summary__body").is(":visible")&& $("#credit-card-cvv").is(":visible")){
						try{
							clearInterval(v12);	
							$("#credit-card-cvv").val(cardCVV); 
							document.getElementById("credit-card-cvv").dispatchEvent(new Event('change', { bubbles: true }));
							document.getElementsByClassName("button--place-order")[0].getElementsByClassName("+btn btn-lg btn-block btn-primary")[0].click();								
						}catch(err){}	
					}									
                }, 100); 
				v122 = setInterval(function(){ 
					if($("#optimized-cc-card-number").is(":visible") && !$("#credit-card-cvv").is(":visible") ){
						try{
							clearInterval(v122);
							$("#optimized-cc-card-number").val(cardNumber);
							document.getElementById("optimized-cc-card-number").dispatchEvent(new Event('change', { bubbles: true }));
						}catch(err){}							
					}				
                }, 100);
				  v13 = setInterval(function(){ 
					if($("#consolidatedAddresses\\.ui_address_2\\.firstName").is(":visible")){
						try{
							clearInterval(v13);
							$("#consolidatedAddresses\\.ui_address_2\\.firstName").focus();
							$("#consolidatedAddresses\\.ui_address_2\\.firstName").val(shipFirstName);
							document.getElementById("consolidatedAddresses.ui_address_2.firstName").dispatchEvent(new Event("change",{'bubbles': true}));
							
							$("#consolidatedAddresses\\.ui_address_2\\.lastName").focus();
							$("#consolidatedAddresses\\.ui_address_2\\.lastName").val(shipLastName);
							document.getElementById("consolidatedAddresses.ui_address_2.lastName").dispatchEvent(new Event("change",{'bubbles': true}));
							
							
							$("#consolidatedAddresses.ui_address_2.street").focus();
							document.getElementById("consolidatedAddresses.ui_address_2.street").value=shipStreetAddress1;
							document.getElementById("consolidatedAddresses.ui_address_2.street").dispatchEvent(new Event("input", { bubbles: true,'cancelable': true}));
							document.getElementById("consolidatedAddresses.ui_address_2.street").dispatchEvent(new Event("change", { bubbles: true,'cancelable': true}));
							$("#consolidatedAddresses\\.ui_address_2\\.city").focus();
							document.getElementById("consolidatedAddresses.ui_address_2.city").value=shipCity;
							document.getElementById("consolidatedAddresses.ui_address_2.city").dispatchEvent(new Event('change', { bubbles: true }));
							$("#consolidatedAddresses\\.ui_address_2\\.zipcode").focus();
							document.getElementById("consolidatedAddresses.ui_address_2.zipcode").value=shipZipCode;
							document.getElementById("consolidatedAddresses.ui_address_2.zipcode").dispatchEvent(new Event('change', { bubbles: true }));
														
							var p = document.getElementsByName("state")[0];
							for(var i =0 ;i<p.length; i++)
							{
								if(p.options[i].value==shipState)
								{
									p.options[i].selected=true;									
									simulateClick(p);
									break;
								}
							}
							if(shippingAddress=="new"){
								$("#save-for-billing-address-ui_address_2").click();
							}
							setTimeout(function(){
								document.getElementsByClassName("button--continue")[0].getElementsByTagName("button")[0].click();
							}, 200);
						}catch(err){}
					}				
				},500);
				 v131 = setInterval(function(){ 
					if($("#consolidatedAddresses\\.ui_address_3\\.firstName").is(":visible")){
						try{
							clearInterval(v131);
							$("#consolidatedAddresses\\.ui_address_3\\.firstName").focus();
							$("#consolidatedAddresses\\.ui_address_3\\.firstName").val(shipFirstName);
							document.getElementById("consolidatedAddresses.ui_address_3.firstName").dispatchEvent(new Event("change",{'bubbles': true}));
							
							$("#consolidatedAddresses\\.ui_address_3\\.lastName").focus();
							$("#consolidatedAddresses\\.ui_address_3\\.lastName").val(shipLastName);
							document.getElementById("consolidatedAddresses.ui_address_3.lastName").dispatchEvent(new Event("change",{'bubbles': true}));							
							
							$("#consolidatedAddresses.ui_address_3.street").focus();
							document.getElementById("consolidatedAddresses.ui_address_3.street").value=shipStreetAddress1;
							document.getElementById("consolidatedAddresses.ui_address_3.street").dispatchEvent(new Event("input", { bubbles: true,'cancelable': true}));
							document.getElementById("consolidatedAddresses.ui_address_3.street").dispatchEvent(new Event("change", { bubbles: true,'cancelable': true}));
							$("#consolidatedAddresses\\.ui_address_3\\.city").focus();
							document.getElementById("consolidatedAddresses.ui_address_3.city").value=shipCity;
							document.getElementById("consolidatedAddresses.ui_address_3.city").dispatchEvent(new Event('change', { bubbles: true }));
							$("#consolidatedAddresses\\.ui_address_3\\.zipcode").focus();
							document.getElementById("consolidatedAddresses.ui_address_3.zipcode").value=shipZipCode;
							document.getElementById("consolidatedAddresses.ui_address_3.zipcode").dispatchEvent(new Event('change', { bubbles: true }));
														
							var p = document.getElementsByName("state")[0];
							for(var i =0 ;i<p.length; i++)
							{
								if(p.options[i].value==shipState)
								{
									p.options[i].selected=true;									
									simulateClick(p);
									break;
								}
							}
							if(shippingAddress=="new"){
								$("#save-for-billing-address-ui_address_3").click();
							}
							setTimeout(function(){
								document.getElementsByClassName("button--continue")[0].getElementsByTagName("button")[0].click();
							}, 200);
						}catch(err){}
					}				
				},500);
				v132= setInterval(function(){ 
					if($("#consolidatedAddresses\\.ui_address_4\\.firstName").is(":visible")){
						try{
							clearInterval(v132);
							$("#consolidatedAddresses\\.ui_address_4\\.firstName").focus();
							$("#consolidatedAddresses\\.ui_address_4\\.firstName").val(shipFirstName);
							document.getElementById("consolidatedAddresses.ui_address_4.firstName").dispatchEvent(new Event("change",{'bubbles': true}));
							
							$("#consolidatedAddresses\\.ui_address_4\\.lastName").focus();
							$("#consolidatedAddresses\\.ui_address_4\\.lastName").val(shipLastName);
							document.getElementById("consolidatedAddresses.ui_address_4.lastName").dispatchEvent(new Event("change",{'bubbles': true}));
														
							$("#consolidatedAddresses.ui_address_4.street").focus();
							document.getElementById("consolidatedAddresses.ui_address_4.street").value=shipStreetAddress1;
							document.getElementById("consolidatedAddresses.ui_address_4.street").dispatchEvent(new Event("input", { bubbles: true,'cancelable': true}));
							document.getElementById("consolidatedAddresses.ui_address_4.street").dispatchEvent(new Event("change", { bubbles: true,'cancelable': true}));
							$("#consolidatedAddresses\\.ui_address_4\\.city").focus();
							document.getElementById("consolidatedAddresses.ui_address_4.city").value=shipCity;
							document.getElementById("consolidatedAddresses.ui_address_4.city").dispatchEvent(new Event('change', { bubbles: true }));
							$("#consolidatedAddresses\\.ui_address_4\\.zipcode").focus();
							document.getElementById("consolidatedAddresses.ui_address_4.zipcode").value=shipZipCode;
							document.getElementById("consolidatedAddresses.ui_address_4.zipcode").dispatchEvent(new Event('change', { bubbles: true }));
														
							var p = document.getElementsByName("state")[0];
							for(var i =0 ;i<p.length; i++)
							{
								if(p.options[i].value==shipState)
								{
									p.options[i].selected=true;									
									simulateClick(p);
									break;
								}
							}
							if(shippingAddress=="new"){
								$("save-for-billing-address-ui_address_4").click();
							}
							setTimeout(function(){
								document.getElementsByClassName("button--continue")[0].getElementsByTagName("button")[0].click();
							}, 200);
						}catch(err){}
					}				
				},500);
				 v14 = setInterval(function(){ 
					if($("#payment\\.billingAddress\\.firstName").is(":visible")){
						try{							
							clearInterval(v14);
							$("#payment\\.billingAddress\\.firstName").val(billFirstName);
							document.getElementById("payment.billingAddress.firstName").dispatchEvent(new Event('change', { bubbles: true }));
							$("#payment\\.billingAddress\\.lastName").val(billLastName);
							document.getElementById("payment.billingAddress.lastName").dispatchEvent(new Event('change', { bubbles: true }));
							$("#payment\\.billingAddress\\.street").val(billStreetAddress1);
							document.getElementById("payment.billingAddress.street").dispatchEvent(new Event('change', { bubbles: true }));
							//$("#consolidatedAddresses\\.ui_address_2\\.street2").val(shipStreetAddress2);
							//document.getElementById("consolidatedAddresses.ui_address_2.street2").dispatchEvent(new Event('change', { bubbles: true }));
							
							$("#payment\\.billingAddress\\.city").val(billCity);
							document.getElementById("payment.billingAddress.city").dispatchEvent(new Event('change', { bubbles: true }));
							$("#payment\\.billingAddress\\.state").val(billState);
							document.getElementById("payment.billingAddress.state").dispatchEvent(new Event('change', { bubbles: true }));
							$("#payment\\.billingAddress\\.zipcode").val(billZipCode);
							document.getElementById("payment.billingAddress.zipcode").dispatchEvent(new Event('change', { bubbles: true }));							
							//$("#user\\.emailAddress").val(shipEmail);
							//document.getElementById("user.emailAddress").dispatchEvent(new Event('change', { bubbles: true }));	
							//$("#user\\.phone").val(shipPhone);
							//document.getElementById("user.phone").dispatchEvent(new Event('change', { bubbles: true }));	
							var p = document.getElementsByName("state")[0];
							for(var i =0 ;i<p.length; i++)
							{
								if(p.options[i].value==billState)
								{
									p.options[i].selected=true;									
									simulateClick(p);
									break;
								}
							}
							if(shippingAddress=="new"){
								$("save-for-billing-address-ui_address_1").click();
							}

							setTimeout(function(){
								try{document.getElementsByClassName("button--continue")[0].getElementsByTagName("button")[0].click();}catch(er){}
							}, 200);
						}catch(err){}
					}
                },500); 
				v15 = setInterval(function(){ 
					if($("button:contains('Place Your Order')").is(":visible")){
						$("button:contains('Place Your Order')").click();
						clearInterval(v15);
					}											
                }, 100);
				v16 = setInterval(function(){ 					
					if($("span:contains('Heads up! Your shipping options have changed based on your address. Take a look and confirm how you want to get your order.')").is(":visible")){
						try{
							$("button:contains('Continue to Payment Information')").click();
							clearInterval(v16);
						}catch(err){}	
					}																
                }, 100); 
				v24 = setInterval(function(){				
					if($("div:contains('We\\'re sorry, something went wrong')").is(":visible")||$("div:contains('Sorry, it\\'s crowded in here')").is(":visible")){
						try{	
							clearInterval(v24);
							setTimeout(function(){
								location.reload(true);
							},getRndRefreshRange(timeoutMin, timeoutMax)); 
						}catch(err){};		
					}							
				}, 50); 
            }
		});
	}
});