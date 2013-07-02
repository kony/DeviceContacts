
/******************************************************************
*	Name    : addContact
*	Author  : Kony
*	Purpose : To add contacts to the device.In the below scenario,We are adding "John Steve" contact to the device.
*******************************************************************/

function addContact()
{
	try
	{
		var mycontact = {
						firstname :"John",lastname :"Steve",
						phone:[{name:"mobile",number:"9999999999"},{name:"home",number:"9999999999"}],
						email:[{name:"home",id:"abc@yahoo.com"},{name:"work",id:"def@kony.com"}],
						postal:[{name:"home",street:"Raheja",city:"hyderabad",state:"AP",zipcode:"500310"}],
						company:[{name:"work",company:"kony",title:"architect"}]
						//photorawbytes: [{personbig.rawbytes}]
				        }
		kony.contact.add(mycontact);
		kony.print("******************************************\n"+JSON.stringify(mycontact)+"\n************");
		frmContact.lblDevContact.text = "A contact is added with firstname = 'John' and lastname = 'Steve' . Please Check the device contacts."
	}
	catch(err)
	{
		kony.print("kony.contact.add error is ::: "+err);
	}
}

/******************************************************************
*	Name    : findContact
*	Author  : Kony
*	Purpose : To find the no of contacts in the device with first name of the contact.Here in the below scenario,We are finding the contacts with the first name "John"
*******************************************************************/

function findContact()
{
	var findContacts = kony.contact.find("John",true); 
	kony.print("******************************************\n"+JSON.stringify(findContacts)+"\n************")	
	if (findContacts == null ||findContacts =="" )
	{
		frmContact.lblDevContact.text = "No contact found with the first name as 'John'";
	}
	else
	{
		var len = findContacts.length;
		frmContact.lblDevContact.text = "No. of contacts with the first name 'John' is = "+len+".";
	}
}

/******************************************************************
*	Name    : removeContact
*	Author  : Kony
*	Purpose : To remove all the contacts whose first name is "John"
*******************************************************************/

function removeContact()
{
	var findContacts = kony.contact.find("John"); 
	if (findContacts == null || findContacts == "" )
	{
		frmContact.lblDevContact.text = "No contact found with the first name as 'John' ";
	}
	else
	{
		for (var i in findContacts )
			kony.contact.remove(findContacts[i]);
		frmContact.lblDevContact.text = "Removed all contacts with the first name as 'John' . Please Check the device contacts.";
	}
}

/******************************************************************
*	Name    : showDetails
*	Author  : Kony
*	Purpose : To get contacts detail whose first name is "John"
*******************************************************************/

function showDetails(eventobject) {
   // var flag = 0;
	var array = kony.contact.find("John",true);
	kony.print("*********************************************\n\n\n"+"work :"+JSON.stringify(array)+"\n*********************\n"); 
	if(array == null || array == "")
	{ 
	//	flag = 0;
		frmContact.lblDevContact.text = "No contact found with the first name as 'John' ";
	}
	else {
   		for(var y in array){
		    var dict = kony.contact.details(array[y]);
		    //kony.print(dict);
		    //frmHome.imgDetails.rawBytes = dict["photorawbytes"];
		    kony.print("*********************************************\n\n\n"+"work :"+JSON.stringify(dict)+"\n*********************\n");
		    
		    if(dict["photorawbytes"] == null || dict["photorawbytes"] == undefined)
		    	var photo = "personbig.png";
		    else photo = {rawBytes: dict["photorawbytes"]};
		    frmDetail.segMain.addAll([{"lblName" : dict["firstname"] + " " + dict["lastname"],
		    						   "lblJobTitle" 	: dict["company"][0]["title"],
		    						   "lblCompany" 	: dict["company"][0]["company"],
		    						   "lblMobileName1" : dict["phone"][0]["name"],
		    						   "lblMobileName2" : dict["phone"][1]["name"],
		    						   "lblMobileNo1"   : dict["phone"][0]["number"],
		    						   "lblMobileNo2"   : dict["phone"][1]["number"],
		    						   "lblEmailName1"  : dict["email"][0]["name"],
		    						   "lblEmailName2"  : dict["email"][1]["name"],
		    						   "lblEmailId1"    : dict["email"][0]["id"],
		    						   "lblEmailId2"    : dict["email"][1]["id"],
		    						   "lblAddName"     : dict["postal"][0]["name"],
		    						   "lblStreet"      : dict["postal"][0]["street"],
		    						   "lblCityState"	: dict["postal"][0]["city"]+ " " + dict["postal"]["0"]["state"],
		    						   "lblZipCode"		: dict["postal"][0]["zipcode"],
		    						   "imgPhoto" 		: photo
		    }]);
		    }
		    frmDetail.show();
    }
}