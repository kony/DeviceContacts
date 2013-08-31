globalAlertStatus = false;
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
						email:[{name:"Personal",id:"abc@yahoo.com"},{name:"work",id:"def@kony.com"}],
						postal:[{name:"Address",street:"Raheja",city:"hyderabad",state:"AP",zipcode:"500310"}],
						company:[{name:"work",company:"kony",title:"architect"}]
						//photorawbytes: [{personbig.rawbytes}]
				        }
		kony.contact.add(mycontact);
		kony.print("******************************************\n"+JSON.stringify(mycontact)+"\n************");
		//frmContact.lblDevContact.text = "A contact is added with firstname = 'John' and lastname = 'Steve' . Please Check the device contacts."
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
		//frmContact.lblDevContact.text = "No contact found with the first name as 'John'";
	}
	else
	{
		var len = findContacts.length;
		//frmContact.lblDevContact.text = "No. of contacts with the first name 'John' is = "+len+".";
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
		//frmContact.lblDevContact.text = "No contact found with the first name as 'John' ";
	}
	else
	{
		for (var i in findContacts )
			kony.contact.remove(findContacts[i]);
		//frmContact.lblDevContact.text = "Removed all contacts with the first name as 'John' . Please Check the device contacts.";
	}
}


/******************************************************************
*	Name    : showDetails
*	Author  : Kony
*	Purpose : To get contacts detail whose first name is "John"
*******************************************************************/

function showDetails(eventobject) {
	var array = kony.contact.find(eventobject["selectedItems"][0]["lblContact"],true);
	kony.print("*********************************************\n\n\n"+"work :"+JSON.stringify(array)+"\n*********************\n"); 
	if(array == null || array == "")
	{ 
		//frmContact.lblDevContact.text = "No contact found with the first name as 'John' ";
	}
	else {
   		for(var y in array){
		    var dict = kony.contact.details(array[y]);
		    kony.print("*********************************************\n\n\n"+"work :"+JSON.stringify(dict)+"\n*********************\n");
		    
		    if(dict["photorawbytes"] == null || dict["photorawbytes"] == undefined)
		    	var photo = "personbig.png";
		    else photo = {rawBytes: dict["photorawbytes"]};
		    frmDetail.segMain.setData([{"lblName" : dict["firstname"] + " " + dict["lastname"],
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


/******************************************************************
*	Name    : addContactFromUser
*	Author  : Kony
*	Purpose : To add contact detail to device address book 
*******************************************************************/

function addContactFromUser()
{	
	if( frmAdd.txtFirstName.text == null || frmAdd.txtFirstName.text == "")
	{
		alert("Please enter first name");
	}
	else
	{
	try
	{
		var mycontact = {
						firstname :frmAdd.txtFirstName.text ,lastname :frmAdd.txtLastName.text,
						phone:[{name:"Mobile",number:frmAdd.txtMobile.text},{name:"Home",number:"9999999999"}],
						email:[{name:"Personal",id:frmAdd.txtEmail.text},{name:"Work",id:"def@kony.com"}],
						postal:[{name:frmAdd.txtHome.text,street:"",state:"",zipcode:frmAdd.txtHomeDetail.text}],
						company:[{name:"work",company:frmAdd.txtCompany.text,title:"architect"}]
						//photorawbytes: [{personbig.rawbytes}]
				        }
		kony.contact.add(mycontact);
		kony.print("******************************************\n"+JSON.stringify(mycontact)+"\n************");
		//frmContact.lblDevContact.text = "A contact is added with firstname = 'John' and lastname = 'Steve' . Please Check the device contacts."
	}
	catch(err)
	{
		kony.print("kony.contact.add error is ::: "+err);
	}
	frmAdd.txtCompany.text = "";
	frmAdd.txtEmail.text = "";
	frmAdd.txtFirstName.text = "";
	frmAdd.txtLastName.text = "";
	frmAdd.txtMobile.text = "";
	alert("Contact has been added");
	frmAdd.txtHome.text = "";
	frmAdd.txtHomeDetail.text = "";
}
}

/******************************************************************
*	Name    : searchContact
*	Author  : Kony
*	Purpose : To search contact from device address book, input taken from textbox in form frmFindContact
*******************************************************************/

function searchContact()
{
	var findContacts = kony.contact.find(frmFindContact.txtSearch.text,true); 
	kony.print("******************************************\n"+JSON.stringify(findContacts)+"\n************")	
	var dataCollection = [];
	if (findContacts == null ||findContacts =="" )
	{	
		dataCollection = [];
		frmFindContact.segContact.setData(dataCollection);
		
	}
	else
	{
		for(var i in findContacts){
			dataCollection.push({"lblContact" : findContacts[i]["firstname"]});
		}
		frmFindContact.segContact.setData(dataCollection);
	}
}


/******************************************************************
*	Name    : deleteContactSearch
*	Author  : Kony
*	Purpose : To search contact from device address book to delete from device address book 
*******************************************************************/

function deleteContactSearch()
{
	var findContacts = kony.contact.find(frmDeleteContact.txtSearch.text,true); 
	kony.print("******************************************\n"+JSON.stringify(findContacts)+"\n************")	
	var dataCollection = [];
	if (findContacts == null ||findContacts =="" )
	{	
		dataCollection = [];
		frmDeleteContact.segContact.setData(dataCollection);	
	}
	else
	{
		for(var i in findContacts){
			dataCollection.push({"lblContact" : findContacts[i]["firstname"],
								"imgRemove" :{src:"remove.png"}});
		}
		frmDeleteContact.segContact.setData(dataCollection);
	}
}


/******************************************************************
*	Name    : deleteContactByUser
*	Author  : Kony
*	Purpose : To delete contact, input will be given by user
*******************************************************************/

function deleteContactByUser(eventobject){
		var contact = kony.contact.find(eventobject["selectedItems"][0]["lblContact"],true);
		kony.contact.remove(contact[0]);
		deleteContactSearch();
}


/******************************************************************
*	Name    : preshowFindContact
*	Author  : Kony
*	Purpose : To reset text of search textbox 
*******************************************************************/

function preshowFindContact(){
	frmFindContact.txtSearch.text = "";
}


/******************************************************************
*	Name    : preshowDeleteContact
*	Author  : Kony
*	Purpose : To reset text of search textbox 
*******************************************************************/

function preshowDeleteContact(){
	frmDeleteContact.txtSearch.text = "";
}
function showAlert(){
	kony.ui.Alert({message: "Are you sure you want to delete this contact",
                alertType: constants.ALERT_TYPE_CONFIRMATION,
                yesLabel:"Ok", noLabel: "Cancel", 
                alertHandler: alertHandlerMobile},{});
                 
}
function alertHandlerMobile(response){
	
	if(response == true)
		{
			var contact = kony.contact.find(frmDeleteContact.segContact["selectedItems"][0]["lblContact"],true);
			kony.contact.remove(contact[0]);
			deleteContactSearch();
		}

}
function onClickAddContact(){
	frmContact.hbxAddContact.setVisibility(true);
	frmContact.hbxFindContact.setVisibility(false);
	frmContact.hbxDeleteContact.setVisibility(false);
	frmContact.hbxContactDetail.setVisibility(false);
	
	frmContact.hbxHeaderAddContact.setVisibility(true);
	frmContact.hbxHeaderSearch.setVisibility(false);
	//frmContact.show();
	
}
function onclickFindContact(){
	frmContact.hbxAddContact.setVisibility(false);
	frmContact.hbxFindContact.setVisibility(true);
	frmContact.hbxDeleteContact.setVisibility(false);
	frmContact.hbxContactDetail.setVisibility(false);
	
	frmContact.hbxHeaderAddContact.setVisibility(false);
	frmContact.hbxHeaderSearch.setVisibility(true);
	//frmContact.txtSearchFind.setVisibility(true);
	//frmContact.txtSearchDelete.setVisibility(false);
	//frmContact.txtSearchFind.text = "";
	
}
function onClickRemoveContact(){
	frmContact.hbxAddContact.setVisibility(false);
	frmContact.hbxFindContact.setVisibility(false);
	frmContact.hbxDeleteContact.setVisibility(true);
	frmContact.hbxContactDetail.setVisibility(false);
	
	frmContact.hbxHeaderAddContact.setVisibility(false);
	frmContact.hbxHeaderSearch.setVisibility(true);
	//frmContact.txtSearchFind.setVisibility(false);
	//frmContact.txtSearchDelete.setVisibility(true);
	//frmContact.txtSearchDelete.text = "";
	
}


/******************************************************************
*	Name    : addContactFromUserTablet
*	Author  : Kony
*	Purpose : To add contact detail to device address book for tablet
*******************************************************************/

function addContactFromUserTablet()
{	
	if( frmContact.txtFirstName.text == null || frmContact.txtFirstName.text == "")
	{
		alert("Please enter first name");
	}
	else{
			try
			{
				var mycontact = {
								firstname :frmContact.txtFirstName.text ,lastname :frmContact.txtLastName.text,
								phone:[{name:"mobile",number:frmContact.txtMobile.text},{name:"home",number:"9999999999"}],
								email:[{name:"home",id:frmContact.txtEmail.text},{name:"work",id:"def@kony.com"}],
								postal:[{name:"home",street:frmContact.txtHome.text,city:"",state:"",zipcode:frmContact.txtHomeDetail.text}],
								company:[{name:"work",company:frmContact.txtCompany.text,title:"architect"}]
								//photorawbytes: [{personbig.rawbytes}]
						        }
				kony.contact.add(mycontact);
				kony.print("******************************************\n"+JSON.stringify(mycontact)+"\n************");
				//frmContact.lblDevContact.text = "A contact is added with firstname = 'John' and lastname = 'Steve' . Please Check the device contacts."
				alert("Contact has been added");
			}
				catch(err)
			{
				kony.print("kony.contact.add error is ::: "+err);
			}
			
	
		frmContact.txtCompany.text = "";
		frmContact.txtEmail.text = "";
		frmContact.txtFirstName.text = "";
		frmContact.txtLastName.text = "";
		frmContact.txtMobile.text = "";
		frmContact.txtHome.text = "";
		frmContact.txtHomeDetail.text = "";
	}
}

/******************************************************************
*	Name    : searchContactTablet
*	Author  : Kony
*	Purpose : To search contact from device address book, input taken from textbox in form frmFindContact
*******************************************************************/

function searchContactTablet()
{
	var findContacts = kony.contact.find(frmContact.txtSearchFind.text,true); 
	kony.print("******************************************\n"+JSON.stringify(findContacts)+"\n************")	
	var dataCollection = [];
	if (findContacts == null ||findContacts =="" )
	{	
		dataCollection = [];
		frmContact.segFindContact.setData(dataCollection);
		
	}
	else
	{
		for(var i in findContacts){
			dataCollection.push({"lblFindContact" : findContacts[i]["firstname"]});
		}
		frmContact.segFindContact.setData(dataCollection);
	}
}

/******************************************************************
*	Name    : deleteContactSearchTablet
*	Author  : Kony
*	Purpose : To search contact from device address book to delete from device address book 
*******************************************************************/

function deleteContactSearchTablet()
{
	var findContacts = kony.contact.find(frmContact.txtSearchFind.text,true); 
	kony.print("******************************************\n"+JSON.stringify(findContacts)+"\n************")	
	var dataCollection = [];
	if (findContacts == null ||findContacts =="" )
	{	
		dataCollection = [];
		frmContact.segDeleteContact.setData(dataCollection);	
	}
	else
	{
		for(var i in findContacts){
			dataCollection.push({"lblDeleteContact" : findContacts[i]["firstname"],
								"imgRemove" : "remove.png"	});
		}
		frmContact.segDeleteContact.setData(dataCollection);
	}
}
function showAlertTablet(){
	kony.ui.Alert({message: "Are you sure you want to delete this contact",
                alertType: constants.ALERT_TYPE_CONFIRMATION,
                yesLabel:"Ok", noLabel: "Cancel", 
                alertHandler: alertHandlerTablet},{});
                 
}
function alertHandlerTablet(response){
	
	if(response == true)
		{
			var contact = kony.contact.find(frmContact.segDeleteContact["selectedItems"][0]["lblDeleteContact"],true);
			kony.contact.remove(contact[0]);
			deleteContactSearchTablet();
		}

}
/******************************************************************
*	Name    : deleteContactByUserTablet
*	Author  : Kony
*	Purpose : To delete contact, input will be given by user
*******************************************************************/
/*
function deleteContactByUserTablet(eventobject){
		if(globalAlertStatus == true)
		alert("true");
		if(globalAlertStatus == true)
		{
			var contact = kony.contact.find(eventobject["selectedItems"][0]["lblDeleteContact"],true);
			kony.contact.remove(contact[0]);
			deleteContactSearchTablet();
		}
}*/
/******************************************************************
*	Name    : showDetailsTablet
*	Author  : Kony
*	Purpose : To get contacts detail whose first name is "John"
*******************************************************************/

function showDetailsTablet(eventobject) {
	var array = kony.contact.find(eventobject["selectedItems"][0]["lblFindContact"],true);
	kony.print("*********************************************\n\n\n"+"work :"+JSON.stringify(array)+"\n*********************\n"); 
	if(array == null || array == "")
	{ 
		//frmContact.lblDevContact.text = "No contact found with the first name as 'John' ";
	}
	else {
   		for(var y in array){
		    var dict = kony.contact.details(array[y]);
		    kony.print("*********************************************\n\n\n"+"work :"+JSON.stringify(dict)+"\n*********************\n");
		    
		    if(dict["photorawbytes"] == null || dict["photorawbytes"] == undefined)
		    	var photo = "personbig.png";
		    else photo = {rawBytes: dict["photorawbytes"]};
		    frmContact.segMain.setData([{"lblName" : dict["firstname"] + " " + dict["lastname"],
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
		    //frmDetail.show();
			frmContact.hbxFindContact.setVisibility(false);
			frmContact.hbxContactDetail.setVisibility(true);
    }
}


function detailAndDeleteTablet(eventobject){
		if(frmContact.hbxFindContact.isVisible == true)
		showDetailsTablet(eventobject);
	//	else if (frmContact.hbxDeleteContact.isVisible == true)
	//	deleteContactByUserTablet(eventobject);
}

function searchTablet(){
	if(frmContact.hbxFindContact.isVisible == true)
	searchContactTablet();
	else if (frmContact.hbxDeleteContact.isVisible == true)
	deleteContactSearchTablet();
}

function preShow_frmContact(){
		var menu = [{"lblMenu" : "Add Contact"},
					{"lblMenu" : "Find Contact"},
					{"lblMenu" : "Remove Contact"}];
		frmContact.segMenu.setData(menu);
		frmContact.segMenu.selectedIndex = [0,0];
		onClickAddContact();
}

function onRowClick_segMenu(){
		if(frmContact.segMenu.selectedIndex[1] == 0)
		onClickAddContact();
		else if(frmContact.segMenu.selectedIndex[1] == 1)
		onclickFindContact();
		else if (frmContact.segMenu.selectedIndex[1] == 2)
		onClickRemoveContact();
}