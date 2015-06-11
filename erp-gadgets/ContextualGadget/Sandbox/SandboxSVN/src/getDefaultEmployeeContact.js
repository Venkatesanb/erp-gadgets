function getEmployee(){
debug("Inside getEmployee method Begin","");
try
{
	var emptable = document.getElementById("employeeSelected");
	debug("Employee table length ",emptable.rows.length);
	if(emptable.rows.length==0)
	{
		debug("Employee table length inside if:",emptable.rows.length);
	var soapMsg;
	soapMsg = '<?xml version="1.0" encoding="utf-8"?>';
	soapMsg = soapMsg + '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cus="http://siebel.com/CustomUI" xmlns:quer="http://www.siebel.com/xml/ANS_WSEmployee/Query" xmlns:web="http://siebel.com/webservices">';
	soapMsg = soapMsg + '<soapenv:Header><web:PasswordText>innoveer09</web:PasswordText><web:UsernameToken>SOAUSER</web:UsernameToken><web:SessionType>stateless</web:SessionType></soapenv:Header>';
	soapMsg = soapMsg + '   <soapenv:Body>';
	soapMsg = soapMsg + '      <cus:QueryEmployee>';
	soapMsg = soapMsg + '         <SiebelMessageIn>';
	soapMsg = soapMsg + '            <quer:ListOfAns_Wsemployee pagesize="100" startrownum="0" recordcountneeded="true">';
	var Mail=document.getElementsByTagName('input');
    for(var i=0; i<Mail.length;i++)
    	{
		if(Mail[i].name=="userToCC")
			{
						soapMsg = soapMsg + '               <quer:Employee>';
						soapMsg = soapMsg + '                  <quer:LastName></quer:LastName>';
						soapMsg = soapMsg + '                  <quer:FirstName></quer:FirstName>';
						soapMsg = soapMsg + '                  <quer:EMailAddr>~LIKE \''+Mail[i].value+ '\'</quer:EMailAddr>';
						soapMsg = soapMsg + '                  <quer:Id/>';
						soapMsg = soapMsg + '                  <quer:LoginName/>';
						soapMsg = soapMsg + '               </quer:Employee>';
					
			}
		}
	    	soapMsg = soapMsg + '            </quer:ListOfAns_Wsemployee>';
			soapMsg = soapMsg + '         </SiebelMessageIn>';
			soapMsg = soapMsg + '         <LOVLanguageMode>LDC</LOVLanguageMode>';
			soapMsg = soapMsg + '         <ViewMode>All</ViewMode>';
			soapMsg = soapMsg + '      </cus:QueryEmployee>';
			soapMsg = soapMsg + '   </soapenv:Body>';
			soapMsg = soapMsg + '</soapenv:Envelope>';

			debug("Inside getEmployee method Before send Employee Data to siebel .",soapMsg);
		
			var SOAPAction='rpc/http://siebel.com/CustomUI:QueryEmployee';
			employeeData =soapMsg;
			employeeSOAPAction =SOAPAction;
			employeeSaveCount=0;
			invokeSiebeWebservice(soapMsg,SOAPAction,'getemployeeResponse');
	}
}
catch (e)
{
debug("Inside getEmployee method Exception",e);
}
debug("Inside getEmployee method End","");
}

function getEmployeeResult(searchEmployeeResultObj){
debug("Inside getEmployeeResult method Begin","");
debug("Inside getEmployeeResult method Employee Response Code",searchEmployeeResultObj.rc);
debug("Inside getEmployeeResult method Employee Response Error",searchEmployeeResultObj.errors);
debug("Inside getEmployeeResult method Employee Response Data",searchEmployeeResultObj.data);
debug("Inside getEmployeeResult method Employee Response Text",searchEmployeeResultObj.text);
debug("Inside getEmployeeResult method Employee Response authErrorText",searchEmployeeResultObj.oauthErrorText);


var searchEmployeeResultObjText = searchEmployeeResultObj.text;
if(searchEmployeeResultObj.rc=="200")
{
	employeeSaveCount=3;
var table = document.getElementById("employeeSelected");
var text=searchEmployeeResultObjText;
if (window.DOMParser)
{
	parser=new DOMParser();
	xmlDoc=parser.parseFromString(text,"text/xml");
}
else // Internet Explorer
{
	xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc.async="false";
	xmlDoc.loadXML(text); 
} 
try
{
	var emp = xmlDoc.getElementsByTagName('Employee');
	debug("Inside getEmployeeResult method Employee Length",emp.length);
	for(j=0;j<emp.length;j++)
	{
		var rowCount = table.rows.length;

		var row = table.insertRow(rowCount);
		var empId=xmlDoc.getElementsByTagName('LoginName');
		
			var cell1 = document.createElement("td");
			cell1.width="20px";
			var element1 = document.createElement("input");
			element1.type = "checkbox";
			element1.name = "empId";
			element1.id = "empId";
			if(empId[j].childNodes.length>0)
			{
			element1.value = empId[j].childNodes[0].nodeValue;
			debug("Inside getEmployeeResult method Employee Login name", empId[j].childNodes[0].nodeValue);
			}
			cell1.appendChild(element1);
			row.appendChild(cell1);
					
		var lstName=xmlDoc.getElementsByTagName('LastName');
		var lastName;
			var cell2 = document.createElement("td");
			cell2.style.width="80px";
			cell2.className="wrapText";
			if(lstName[j].childNodes.length>0)
			{
				cell2.innerHTML="<font face='Garamond'>"+lstName[j].childNodes[0].nodeValue+"</font>";
			}
			else
			{
			cell2.innerHTML="<font face='Garamond'>&nbsp;</font>";
			}
			row.appendChild(cell2);
			var element2 = document.createElement("input");
			element2.type = "hidden";
			element2.name = "empLastName";
			element2.id = "empLastName";
			if(lstName[j].childNodes.length>0)
			{
			element2.value = lstName[j].childNodes[0].nodeValue;
			debug("Inside getEmployeeResult method Employee Last name", lstName[j].childNodes[0].nodeValue);
			}
			cell2.appendChild(element2);
			row.appendChild(cell2);
				
			var fstName=xmlDoc.getElementsByTagName('FirstName');
		
			var cell3 = document.createElement("td");
			cell3.style.width="80px";
			cell3.className="wrapText";
			var firstName;
			if(fstName[j].childNodes.length>0)
			{
				cell3.innerHTML="<font face='Garamond'>"+fstName[j].childNodes[0].nodeValue+"</font>";
				
			}
			else
			{
			cell3.innerHTML="<font face='Garamond'>&nbsp;</font>";
			}
			row.appendChild(cell3);
			var element3 = document.createElement("input");
			element3.type = "hidden";
			element3.name = "empFirstName";
			element3.id = "empFirstName";
			if(fstName[j].childNodes.length>0)
			{
			element3.value = fstName[j].childNodes[0].nodeValue;
			debug("Inside getEmployeeResult method Employee First name", fstName[j].childNodes[0].nodeValue);
			}
			cell3.appendChild(element3);
			row.appendChild(cell3);
			var emailAddrss=xmlDoc.getElementsByTagName('EMailAddr');
		
			var cell4 = document.createElement("td");
			cell4.style.width="135";
			cell4.className="wrapText";
			if(emailAddrss[j].childNodes.length>0)
			{ 
			cell4.innerHTML="<font face='Garamond'>"+emailAddrss[j].childNodes[0].nodeValue+"</font>";
			}
			else
			{
			cell4.innerHTML="<font face='Garamond'>&nbsp;</font>";
			}
			row.appendChild(cell4);
			
			var element4 = document.createElement("input");
			element4.type = "hidden";
			element4.name = "empEmailAddr";
			element4.id = "empEmailAddr";
			if(emailAddrss[j].childNodes.length>0)
			{ 
			element4.value = emailAddrss[j].childNodes[0].nodeValue;
			debug("Inside getEmployeeResult method Employee Email Address", emailAddrss[j].childNodes[0].nodeValue);
			}
			cell4.appendChild(element4);
			row.appendChild(cell4);
			

	}
}
catch (e)
{
debug("Inside getEmployeeResult method Exception",e);
}
}
else
{
	//employeeSaveCount=3;
	if(employeeSaveCount!=3 && (searchEmployeeResultObj.text==null||searchEmployeeResultObj.text=="")) 
	{
		setTimeout(function(){employeeSaveCount=employeeSaveCount+1;invokeSiebeWebservice(employeeData,employeeSOAPAction,'getemployeeResponse')}, 1000);
		
	}
	else
	{
	document.getElementById('content_div').innerHTML = 'Employee Query Failed. Error contacting the server. Please contact your System administrator for support. ';
	
	}
}
if(employeeSaveCount==3)
			{
				getConact();
			}
}
function getConact(){
debug("Inside getConact method Begin", "");
try
{
	var contacttable = document.getElementById("contactSelected");
	debug("contacttable table length :",contacttable.rows.length);
	if(contacttable.rows.length==0)
		{
		debug("contact table length :",contacttable.rows.length);
			var soapMsg;
				soapMsg = '<?xml version="1.0" encoding="utf-8"?>';


				soapMsg = soapMsg + '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cus="http://siebel.com/CustomUI" xmlns:quer="http://www.siebel.com/xml/ANS_WSContact/Query" xmlns:web="http://siebel.com/webservices">';
				soapMsg = soapMsg + '   <soapenv:Header>';
				soapMsg = soapMsg + '      <web:PasswordText>innoveer09</web:PasswordText>';
				soapMsg = soapMsg + '      <web:UsernameToken>SOAUSER</web:UsernameToken>';
				soapMsg = soapMsg + '      <web:SessionType>stateless</web:SessionType>';
				soapMsg = soapMsg + '    </soapenv:Header>';
				soapMsg = soapMsg + '   <soapenv:Body>';
				soapMsg = soapMsg + '      <cus:ANSQueryPageCustomUI>';
				soapMsg = soapMsg + '         <SiebelMessageIn>';
				soapMsg = soapMsg + '            <quer:ListOfAns_Wscontact pagesize="100" startrownum="0" recordcountneeded="true">';
				var Mail=document.getElementsByTagName('input');
	        for(var i=0; i<Mail.length;i++)
				{
					if(Mail[i].name=="userToCC")
					{
						
						soapMsg = soapMsg + '            <quer:Contact>';
						soapMsg = soapMsg + '<quer:ANSContactNumber></quer:ANSContactNumber>';
						soapMsg = soapMsg + '                  <quer:LastName></quer:LastName>';
						soapMsg = soapMsg + '                  <quer:FirstName></quer:FirstName>';
						soapMsg = soapMsg + '                  <quer:EmailAddress>~LIKE \''+Mail[i].value+'\'</quer:EmailAddress>';
						var empFlag='N';
						soapMsg = soapMsg + '<quer:EmployeeFlag sortorder="" sortsequence="">=\''+empFlag+'\'</quer:EmployeeFlag>';
						soapMsg = soapMsg + '            </quer:Contact>';
						
					}
				}
	        soapMsg = soapMsg + '         </quer:ListOfAns_Wscontact>';
				soapMsg = soapMsg + '      </SiebelMessageIn>';
				soapMsg = soapMsg + ' <LOVLanguageMode>LDC</LOVLanguageMode>';
				soapMsg = soapMsg + ' <ViewMode>All</ViewMode>';

				soapMsg = soapMsg + '      </cus:ANSQueryPageCustomUI>';

				soapMsg = soapMsg + '   </soapenv:Body>';
				soapMsg = soapMsg + '</soapenv:Envelope>';

				
				debug("Inside searchConact method  Before send soapData to siebel", soapMsg);
				var SOAPAction='rpc/http://siebel.com/CustomUI:ANSQueryPageCustomUI';
				contactData =soapMsg;
				contactSOAPAction=SOAPAction;
				contactSaveCount=0;
				invokeSiebeWebservice(soapMsg,SOAPAction,'getcontactResponse');
		}		
	}
catch (e)
{
debug("Inside searchConact method Exception",e);
}
	debug("Inside searchConact method End","");
}

function getContactResult(searchContactResultObj){
debug("Inside getContactResult method Begin","");
debug("Inside getContactResult method Response Code",searchContactResultObj.rc);
debug("Inside getContactResult method Response Error",searchContactResultObj.errors);
debug("Inside getContactResult method Response Data",searchContactResultObj.data);
debug("Inside getContactResult method Response Text",searchContactResultObj.text);
debug("Inside getContactResult method Response authErrorText",searchContactResultObj.oauthErrorText);

var searchContactResultObjText = searchContactResultObj.text;

if(searchContactResultObj.rc=="200")
{
	contactSaveCount=3;
var table = document.getElementById("contactSelected");
var text=searchContactResultObjText;
	
if (window.DOMParser)
{
	parser=new DOMParser();
	xmlDoc=parser.parseFromString(text,"text/xml");
}
else // Internet Explorer
{
	xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc.async="false";
	xmlDoc.loadXML(text); 
} 
try
{
	var contact = xmlDoc.getElementsByTagName('Contact');
	
	debug("Inside getContactResult method contact length",contact.length);
	for(j=0;j<contact.length;j++)
	{
		var k=0;
		var rowCount = table.rows.length;
		debug("Inside getContactResult method Table Row length",rowCount);
		var row = table.insertRow(rowCount);
		var contactId=xmlDoc.getElementsByTagName('ANSContactNumber');
		debug("Inside getContactResult method J value",j);
		debug("Inside getContactResult method Child Node Length value",contactId[j].childNodes.length);
		
		var cell1 = document.createElement("td");
		cell1.width="20px";
		var element1 = document.createElement("input");
		element1.type = "checkbox";
		element1.name = "ANSContactNumber";
		element1.id = "ANSContactNumber";
		if(contactId[j].childNodes.length>0)
		{
			element1.value = contactId[j].childNodes[0].nodeValue;
			debug("Inside getContactResult method ANSContactNumber",contactId[j].childNodes[0].nodeValue);
		}
		cell1.appendChild(element1);
		row.appendChild(cell1);
		k++;
		var lstName=xmlDoc.getElementsByTagName('LastName');
		debug("Inside getContactResult method LastName Node Length value",lstName[j].childNodes.length);
		var lastName;
		var cell2 = document.createElement("td");
		cell2.style.width="80px";
		cell2.className="wrapText";
		if(lstName[j].childNodes.length>0)
		{
			cell2.innerHTML="<font face='Garamond'>"+lstName[j].childNodes[0].nodeValue+"</font>";
			//cell2.innerHTML=lastName;
			
			debug("Inside getContactResult method LastName",lstName[j].childNodes[0].nodeValue);
		}
		else
		{
		cell2.innerHTML="<font face='Garamond'>&nbsp;</font>";
		}
		row.appendChild(cell2);
		var element2 = document.createElement("input");
		element2.type = "hidden";
		element2.name = "contactLastName";
		element2.id = "contactLastName";
		if(lstName[j].childNodes.length>0)
		{
			element2.value = lstName[j].childNodes[0].nodeValue;
		}
		cell2.appendChild(element2);
		row.appendChild(cell2);
		k++;
		
		var fstName=xmlDoc.getElementsByTagName('FirstName');
		debug("Inside getContactResult method FirstName Node Length value",fstName[j].childNodes.length);
		var firstName;
		var cell3 = document.createElement("td");
		cell3.style.width="80px";
		cell3.className="wrapText";
		if(fstName[j].childNodes.length>0)
		{
			cell3.innerHTML="<font face='Garamond'>"+fstName[j].childNodes[0].nodeValue+"</font>";
			
			debug("Inside getContactResult method FirstName",fstName[j].childNodes[0].nodeValue);
		}
		else
		{
		cell3.innerHTML="<font face='Garamond'>&nbsp;</font>";
		}
		row.appendChild(cell3);
		var element3 = document.createElement("input");
		element3.type = "hidden";
		element3.name = "contactFirstName";
		element3.id = "contactFirstName";
		if(fstName[j].childNodes.length>0)
		{
			element3.value = fstName[j].childNodes[0].nodeValue;
		}
		cell3.appendChild(element3);
		row.appendChild(cell3);
		k++;
		var emailAddrss=xmlDoc.getElementsByTagName('EmailAddress');
		debug("Inside getContactResult method emailAddrss Node Length value",emailAddrss[j].childNodes.length);
		
		var cell4 = document.createElement("td");
		cell4.style.width="135px";
		cell4.className="wrapText";
		if(emailAddrss[j].childNodes.length>0)
		{ 
			cell4.innerHTML="<font face='Garamond'>"+emailAddrss[j].childNodes[0].nodeValue+"</font>";
			
			debug("Inside getContactResult method EmailAddress",emailAddrss[j].childNodes[0].nodeValue);
		}
		else
			{
			cell4.innerHTML="<font face='Garamond'>&nbsp;</font>";
			}
		row.appendChild(cell4);
		var element4 = document.createElement("input");
		element4.type = "hidden";
		element4.name = "contactEmailAddr";
		element4.id = "contactEmailAddr";
		if(emailAddrss[j].childNodes.length>0)
		{ 
			element4.value = emailAddrss[j].childNodes[0].nodeValue;
		}
		cell4.appendChild(element4);
		row.appendChild(cell4);
		k++;
		

	}
}
catch (e)
{
debug("Inside getContactResult method Exception",e);
}
}

else
{
	//contactSaveCount=3;
	if(contactSaveCount !=3 && (searchContactResultObj.text==null||searchContactResultObj.text==""))
  {
  	setTimeout(function(){contactSaveCount =contactSaveCount+1;invokeSiebeWebservice(contactData,contactSOAPAction,'getcontactResponse')}, 1000);
  	
  }
  else
  {
	document.getElementById('content_div').innerHTML = 'Contact Query Failed. Error contacting the server. Please contact your System administrator for support. ';
 }
}

debug("Inside getContactResult method End","");
}
