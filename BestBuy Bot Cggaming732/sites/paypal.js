chrome.extension.sendMessage({action: "isRecordingOn"}, function(response) {
	if(response.action == 'true'){
        var autocheckoutselect = response.autocheckoutselect;
        var checkoutType = response.checkoutType;
        var checkoutDelay = response.checkoutDelay;     
        var paymentMethod = response.paymentMethod;
        var paymentCard = response.paymentCard;
        var cardNumber = response.cardNumber;
        var expireMonth = response.expireMonth;
        var expireYear = response.expireYear;
        var cardCVV = response.cardCVV;
        var paypalEmail = response.paypalEmail;
        var paypalPassword = response.paypalPassword;
                
		$(function(){ 
            v = setInterval(function(){ 
                try{  
                    if($("#email").is(":visible")){
                        clearInterval(v);						
                        $("#email").val(paypalEmail);
                        $("#password").val(paypalPassword);
                        var timeout = window.setTimeout(function() {
                            $("#btnLogin").click();                            
                        }, 100);
                    }
                }catch(err){}
            },500);  
			v1 = setInterval(function(){ 
                try{  
                    if($("#password").is(":visible")){
                        clearInterval(v1);						
                        $("#password").val(paypalPassword);
                        var timeout = window.setTimeout(function() {
                            $("#btnLogin").click();                            
                        }, 100);
                    }
                }catch(err){}
            },500);  

            //v2 = setInterval(function(){ 
                try{  
                    if($("#continue_abovefold").is(":visible")){ 
                        var timeout = window.setTimeout(function() {
                            $("#continue_abovefold").click();
                            //clearInterval(v2);
                        }, 1000);
                    }
                }catch(err){}
            //},2000);                  
		});
	}
});                    