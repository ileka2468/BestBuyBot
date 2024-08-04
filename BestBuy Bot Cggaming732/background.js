chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = "";
    var charCount = 0;
    var numCount = 0;

    for (var i = 0; i < string_length; i++) {
      if (
        (Math.floor(Math.random() * 2) == 0 && numCount < 3) ||
        charCount >= 5
      ) {
        var rnum = Math.floor(Math.random() * 10);
        randomstring += rnum;
        numCount += 1;
      } else {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
        charCount += 1;
      }
    }
    localStorage["extensionId"] = randomstring;
  }
});
if (localStorage.getItem("userEmail") === null) {
  localStorage["userEmail"] = "";
}
if (localStorage.getItem("status") === null) {
  localStorage["status"] = "default";
}
uir = true;
function babu() {
  chrome.system.cpu.getInfo(function (cpuInfo) {
    var info = btoa(
      cpuInfo.modelName +
        ":" +
        cpuInfo.archName +
        ":" +
        cpuInfo.numOfProcessors.toString() +
        ":" +
        cpuInfo.features
    );
    $.ajax({
      type: "POST",
      data: {
        key: info,
        app: localStorage["app"],
        email: localStorage["userEmail"],
      },
      url: "https://cggaming732/activation.com/",
    }).done(function (res) {
      if (res == "yes") {
        uir = true;
      } else {
        uir = true;
        //localStorage['recording']='false';
        //chrome.browserAction.setBadgeText({'text':''});
      }
      if (res == "error4") {
        localStorage["registerStatus"] =
          "Please enter your registered email to activate the bot.";
      }
      if (res == "error3") {
        localStorage["registerStatus"] =
          "Your email was not found in our database. Please contact Admin.";
      }
      if (res == "error2") {
        localStorage["registerStatus"] =
          "Please contact Admin before using another computer.";
      }
      if (res == "error1") {
        localStorage["registerStatus"] =
          "Connection error. Please contact Admin to fix it.";
      }
    });
  });
}
/*babu();
vvv = setInterval(function(){ 
	try{  
		if(localStorage['recording']=='true')
		{
			babu();
		}
	}catch(err){}
},30000); 
*/
localStorage["recording"] = "false";
var openedLinkArray = [];
var Interval = [];
var x = new Date().getTime();
function OpenSite() {
  if (localStorage["productSearch"] == "directLink") {
    window.open(localStorage["url"]);
  } else if (localStorage["productSearch"] == "keywordSearching") {
    //window.open(localStorage['curl']);

    var keys = "";
    try {
      keys = localStorage["keywords"].replace(/,|_/g, "+");
    } catch (ex) {}
    if (localStorage["site"] == "com") {
      var surl =
        "https://www.bestbuy." +
        localStorage["site"] +
        "/site/searchpage.jsp?st=" +
        keys;
      window.open(surl);
    } else {
      var surl =
        "https://www.bestbuy." +
        localStorage["site"] +
        "/en-ca/search?search=" +
        keys;
      window.open(surl);
    }
  } else if (localStorage["productSearch"] == "ProductpageSearching") {
    window.open(localStorage["purl"]);
  }
  /*if(localStorage['url'].match("http"))
	{
		window.open(localStorage['url']);
	}else
	{
		switch(localStorage['site'])			
		{
			case "bape":window.open("https://us.bape.com/collections/all");break;
			case "yeezysupply":window.open("https://yeezysupply.com");break;
			case "mondotees":window.open("https://mondotees.com");break;
			case "briarhandmade":window.open("https://briarhandmade.com");break;
			case "undefeated":window.open("https://undefeated.com/collections/new");break;
			case "bdgastore":window.open("https://shop.bdgastore.com");break;
			case "blendsus":window.open("https://www.blendsus.com");break;
			case "extrabutterny":window.open("https://shop.extrabutterny.com");break;
			case "kithync":window.open("https://kith.com");break;
			case "packershoes":window.open("https://packershoes.com/");break;
			case "cncpts":window.open("https://cncpts.com");break;
			case "thepaisleyhouse":window.open("https://thepaisleyhouse.clothing");break;
			case "featuresneakerboutique":window.open("https://www.featuresneakerboutique.com/");break;
			case "other": if(localStorage['url'].match("http")) window.open(localStorage['url']); break;
			//case "":window.open("");break;		
		}
	}*/
}
chrome.extension.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (request.action == "stopListening") {
    i1 = "";
    localStorage["recording"] = "false";
    sendResponse({ action: "recoding stoped" });
    chrome.browserAction.setBadgeText({ text: "" });
  }
  if (request.action == "startListening") {
    babu(localStorage["userEmail"]);
    localStorage["recording"] = "true";
    chrome.browserAction.setBadgeText({ text: "on" });
    sendResponse({ action: "recoding" });
    OpenSite();
  }
  if (request.action == "alert") {
    var myAudio = new Audio();
    myAudio.src = chrome.extension.getURL("alert.mp3");
    myAudio.play();
  }
  if (request.action == "isRecordingOn") {
    sendResponse({
      action: localStorage["recording"],
      url: localStorage["url"],
      size: localStorage["shoesSize"],
      size: localStorage["shoesSize"],
      low: localStorage["low"],
      high: localStorage["high"],
      soundAlert: localStorage["soundAlert"],
      warranty: localStorage["warranty"],
      warantyYear: localStorage["warantyYear"],
      site: localStorage["site"],
      timeoutMax: localStorage["timeoutMax"],
      timeOut: localStorage["timeOut"],
      KeywordsType: localStorage["KeywordsType"],
      keywords: localStorage["keywords"],
      keywords2: localStorage["keywords2"],
      quantity: localStorage["quantity"],
      preOrder: localStorage["preOrder"],
      guestCheckout: localStorage["guestCheckout"],
      storePickup: localStorage["storePickup"],
      colors: localStorage["colors"],
      autocheckoutselect: localStorage["autocheckoutselect"],
      checkoutType: localStorage["checkoutType"],
      checkoutDelay: localStorage["checkoutDelay"],
      username: localStorage["username"],
      password: localStorage["password"],
      billCountry: localStorage["billCountry"],
      billFirstName: localStorage["billFirstName"],
      billLastName: localStorage["billLastName"],
      Colonia: localStorage["Colonia"],
      billStreetAddress1: localStorage["billStreetAddress1"],
      billStreetAddress2: localStorage["billStreetAddress2"],
      billZipCode: localStorage["billZipCode"],
      billCity: localStorage["billCity"],
      billState: localStorage["billState"],
      billPhone: localStorage["billPhone"],
      billEmail: localStorage["billEmail"],

      billStateKythnyc: localStorage["billStateKythnyc"],
      billCountryKythnyc: localStorage["billCountryKythnyc"],

      shippingAddress: localStorage["shippingAddress"],
      newCountry: localStorage["newCountry"],
      newFirstName: localStorage["newFirstName"],
      newLastName: localStorage["newLastName"],
      newStreetAddress1: localStorage["newStreetAddress1"],
      newStreetAddress2: localStorage["newStreetAddress2"],
      newZipCode: localStorage["newZipCode"],
      newCity: localStorage["newCity"],
      newState: localStorage["newState"],
      newPhone: localStorage["newPhone"],
      newEmail: localStorage["newEmail"],

      billStateOptions: localStorage["billStateOptions"],

      newStateKythnyc: localStorage["newStateKythnyc"],
      newCountryKythnyc: localStorage["newCountryKythnyc"],

      paymentMethod: localStorage["paymentMethod"],
      paymentCard: localStorage["paymentCard"],
      cardNumber: localStorage["cardNumber"],
      expireMonth: localStorage["expireMonth"],
      expireYear: localStorage["expireYear"],
      cardCVV: localStorage["cardCVV"],
      paypalEmail: localStorage["paypalEmail"],
      paypalPassword: localStorage["paypalPassword"],
      cardHolderName: localStorage["cardHolderName"],
    });
  }
  if (request.action == "isUserLoged") {
    sendResponse({ action: uir });
  }
  if (request.action == "CheckUserRegistered") {
    babu(localStorage["userEmail"]);
    sendResponse({ action: "true" });
  }
});
