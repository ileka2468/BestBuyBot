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
chrome.extension.sendMessage({action: "isRecordingOn"}, function(response) {
	if(response.action == 'true'){
		var	size = response.size;
		var	size2 = response.size2;
		var	url= response.url;
		var	keywords = response.keywords;
        var refreshInterval = response.timeOut;      
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
        var expireMonth = response.expireMonth;
        var expireYear = response.expireYear;
        var cardCVV = response.cardCVV;
        var paypalEmail = response.paypalEmail;
        var paypalPassword = response.paypalPassword;
        var nameOnCard = response.cardHolderName;
        expireYear = "20".concat(expireYear);
        
		$(function(){
            var refresh=true;  
            try{
				keywords=keywords.trim();
				keywords=keywords.split(",");
			}catch(err){}	
			
			v0 = setInterval(function(){	
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
			},100);
			
			vc2 = setInterval(function(){
				try{
					if($(".add-to-cart-button").is(":visible")){
						clearInterval(vc2);
						var p = document.getElementsByClassName("add-to-cart-button")[0];
						if(p.textContent.match("Coming Soon")||p.textContent.match("Sold Out")||$("strong:contains('Store Pickup Only')").is(":visible")||$(".fulfillment-fulfillment-summary:contains('Unavailable for')").is(":visible")){													
							setTimeout(function(){
								location.reload();
							}, refreshInterval)						
						}else{
							p.click();							
						}					
					}
				}catch(err){}				
            }, 100);
			
			vv = setInterval(function(){
				try{	
					if($(".success-text").is(":visible")){						
						clearInterval(vv);
						setTimeout(function(){
							location.href="/cart";
						}, 200)
					}
				}catch(err){};					
            }, 100); 
			vv1 = setInterval(function(){
				try{	
					if($(".c-alert-content:contains('Sorry about that! You still might be able to get it if you check nearby stores for availability')").is(":visible")){
						clearInterval(vv1);	
						location.href=url;						
					}
				}catch(err){};					
            }, 100); 
			vv2 = setInterval(function(){
				try{	
					if($(".c-alert-content:contains('is currently out of stock.')").is(":visible")){
						clearInterval(vv2);	
						location.href=url;						
					}
				}catch(err){};					
            }, 100); 
			
            if(autocheckoutselect==="yes"){					                
                v2 = setInterval(function(){
					try{
						if($(".cart-listing__items").is(":visible")){
							clearInterval(v2);
							document.getElementsByClassName("listing-header__button")[0].getElementsByTagName("button")[0].click();							
						}
					}catch(err){}
                }, 100); 
                
                v3 = setInterval(function(){ 
					try{
						if($(".cia-guest-content__continue").is(":visible")){
							document.getElementsByClassName("cia-guest-content__continue")[0].click();
							clearInterval(v3);
						}
					}catch(err){}					
                }, 100);     
				
				v04 = setInterval(function(){ 
					try{
						if($(".button--continue").is(":visible")){
							clearInterval(v04);	
							$("#user\\.emailAddress").val(shipEmail);
							document.getElementById("user.emailAddress").dispatchEvent(new Event('change', { bubbles: true }));
							$("#user\\.phone").val(billPhone);
							document.getElementById("user.phone").dispatchEvent(new Event('change', { bubbles: true }));
							document.getElementsByClassName("btn btn-lg btn-block btn-secondary")[0].click();
						}
					}catch(err){}					
                }, 100);  
                
                v5 = setInterval(function(){ 
                    try{
						if($("#consolidatedAddresses\\.ui_address_2\\.firstName").is(":visible")){							
							clearInterval(v5);
							$("#consolidatedAddresses\\.ui_address_2\\.firstName").val(shipFirstName);
							document.getElementById("consolidatedAddresses.ui_address_2.firstName").dispatchEvent(new Event('change', { bubbles: true }));
							$("#consolidatedAddresses\\.ui_address_2\\.lastName").val(shipLastName);
							document.getElementById("consolidatedAddresses.ui_address_2.lastName").dispatchEvent(new Event('change', { bubbles: true }));
							$("#consolidatedAddresses\\.ui_address_2\\.street").val(shipStreetAddress1);
							document.getElementById("consolidatedAddresses.ui_address_2.street").dispatchEvent(new Event('change', { bubbles: true }));
							$("#consolidatedAddresses\\.ui_address_2\\.street2").val(shipStreetAddress2);
							document.getElementById("consolidatedAddresses.ui_address_2.street2").dispatchEvent(new Event('change', { bubbles: true }));	
							$("#consolidatedAddresses\\.ui_address_2\\.city").val(shipCity);
							document.getElementById("consolidatedAddresses.ui_address_2.city").dispatchEvent(new Event('change', { bubbles: true }));
							$("#consolidatedAddresses\\.ui_address_2\\.state").val(shipState);
							document.getElementById("consolidatedAddresses.ui_address_2.state").dispatchEvent(new Event('change', { bubbles: true }));
							$("#consolidatedAddresses\\.ui_address_2\\.zipcode").val(shipZipCode);
							document.getElementById("consolidatedAddresses.ui_address_2.zipcode").dispatchEvent(new Event('change', { bubbles: true }));							
							$("#user\\.emailAddress").val(shipEmail);
							document.getElementById("user.emailAddress").dispatchEvent(new Event('change', { bubbles: true }));							
							$("#user\\.phone").val(shipPhone);
							document.getElementById("user.phone").dispatchEvent(new Event('change', { bubbles: true }));	
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
							$("save-for-billing-address-ui_address_2").click();
							setTimeout(function(){
								document.getElementsByClassName("button--continue")[0].getElementsByTagName("button")[0].click();
							}, 500);
                        }
                    }catch(err){}
                },1000); 
				
                v6 = setInterval(function(){ 
					try{
						if($(".autocomplete").is(":visible")){
							var p =document.getElementsByClassName("autocomplete")[0];
							for(var i =0;i<p.length; i++)
							{
								if(p[i].textContent.match(shipState))
								{									
									break;
								}
							}
							clearInterval(v6);
						}
					}catch(err){}					
                }, 100);
				
			    v66 = setInterval(function(){ 
					try{
						if($(".modal-content").is(":visible")){
							if(document.getElementsByClassName("autocomplete")[0].textContent.match("Keep Address as Entered"))
							{
								document.getElementsByClassName("btn btn-secondary btn-block")[0].click();
								clearInterval(v66);
							}							
						}
					}catch(err){}					
                }, 100);  
			    				
                v7 = setInterval(function(){ 
                    try{  
                        if($("#optimized-cc-card-number").is(":visible")){ 
							clearInterval(v7);
							if(paymentMethod === "creditCard"){								
								$("#optimized-cc-card-number").sendkeys(cardNumber);
								$("#optimized-cc-card-number").val(cardNumber);
								$("#payment\\.billingAddress\\.firstName").val(shipFirstName);
								document.getElementById("payment.billingAddress.firstName").dispatchEvent(new Event("change", { bubbles: true }));
								$("#payment\\.billingAddress\\.lastName").val(shipLastName);
								document.getElementById("payment.billingAddress.lastName").dispatchEvent(new Event("change", { bubbles: true }));
								$("#payment\\.billingAddress\\.street").val(billStreetAddress1);
								document.getElementById("payment.billingAddress.street").dispatchEvent(new Event("change", { bubbles: true }));
								$("#payment\\.billingAddress\\.street2").val(billStreetAddress2);
								document.getElementById("payment.billingAddress.street2").dispatchEvent(new Event("change", { bubbles: true }));
								$("#payment\\.billingAddress\\.city").val(billCity);
								document.getElementById("payment.billingAddress.city").dispatchEvent(new Event("change", { bubbles: true }));
								$("#payment\\.billingAddress\\.state").val(billState);
								document.getElementById("payment.billingAddress.state").dispatchEvent(new Event("change", { bubbles: true }));
								$("#payment\\.billingAddress\\.zipcode").val(billZipCode);
								document.getElementById("payment.billingAddress.zipcode").dispatchEvent(new Event("change", { bubbles: true }));
							}                                                            
                            else{
								document.getElementsByClassName("payment")[0].getElementsByTagName("a")[0].click();
								document.getElementsByClassName("payment__paypal-button")[0].click();
							}
                        }
                    }catch(err){}
                },100); 
			
                v8 = setInterval(function(){ 
                    try{  
                        if($("#credit-card-cvv").is(":visible")){ 							
							clearInterval(v8); 						
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
							if (cardexpiryYear !== null) {
								try{
									for(var jj=0; jj<cardexpiryYear.options.length; jj++){
										if(cardexpiryYear.options[jj].value === expireYear){
											cardexpiryYear.options[jj].selected = true;
											cardexpiryYear.dispatchEvent(new Event("change", { bubbles: true }));
											break;
										}
									}
								
								}catch(err){}
							}
							$("#credit-card-cvv").sendkeys(cardCVV);
							$("#credit-card-cvv").val(cardCVV); 							
							setTimeout(function(){
							if($(".button--place-order").is(":visible")){
									$("[data-track='Place your Order - Contact Card']").click();					
								}
							},500);
                        }
                    }catch(err){}
                },100);
		
            }
		});
	}
});