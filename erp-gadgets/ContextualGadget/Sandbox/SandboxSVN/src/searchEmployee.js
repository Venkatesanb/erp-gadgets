
function searchEmployee(){
debug("Inside searchEmployee method Begin","");
try
{
	document.getElementById('Employeeloading').style.display = 'inline';
	document.getElementById('Employeeloading').style.visibility = 'visible';
	document.getElementById('Employeeloading').innerHTML = 'Loading ...';
	document.getElementById('Employee_div').innerHTML = '';
	//gadgets.window.adjustHeight(320);

	var LastName = null;
	var FirstName = null;
	var EMailAddr = null;
	if(document.getElementById('empfind').value=='empLastName')
	   LastName=document.getElementById('employeestarting').value;
	if(document.getElementById('empfind').value=='empFirstName')
	   FirstName=document.getElementById('employeestarting').value;
	if(document.getElementById('empfind').value=='empEmail')
	   EMailAddr=document.getElementById('employeestarting').value;
	  
	if(document.getElementById('employeestarting').value=='*')
	{
		//alert("Please enter a valid search criteria. Wild card search such as this is not permitted.");
		debug("Please enter a valid search criteria. Wild card search such as this is not permitted.","");
		document.getElementById('Employeeloading').innerHTML = '';
		document.getElementById('Employeeloading').style.display = 'none';
		document.getElementById('Employeeloading').style.visibility = 'invisible';
	}
	else
	{
		if(document.getElementById('employeestarting').value!="")
		{
			debug("Inside searchEmployee method Employee Last Name.",LastName);
			debug("Inside searchEmployee method Employee First Name.",FirstName);
			debug("Inside searchEmployee method Employee Email Address.",EMailAddr);
			var soapMsg;
			soapMsg = '<?xml version="1.0" encoding="utf-8"?>';

			soapMsg = soapMsg + '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cus="http://siebel.com/CustomUI" xmlns:quer="http://www.siebel.com/xml/ANS_WSEmployee/Query" xmlns:web="http://siebel.com/webservices">';
			soapMsg = soapMsg + '<soapenv:Header><web:PasswordText>innoveer09</web:PasswordText><web:UsernameToken>SOAUSER</web:UsernameToken><web:SessionType>stateless</web:SessionType></soapenv:Header>';
			soapMsg = soapMsg + '   <soapenv:Body>';
			soapMsg = soapMsg + '      <cus:QueryEmployee>';
			soapMsg = soapMsg + '         <SiebelMessageIn>';
			soapMsg = soapMsg + '            <quer:ListOfAns_Wsemployee pagesize="100" startrownum="0" recordcountneeded="true">';
			soapMsg = soapMsg + '               <quer:Employee>';

			if (LastName != null)
			{
				soapMsg = soapMsg + '                  <quer:LastName>~LIKE \''+LastName+ '\'</quer:LastName>';
			}
			else
			{
				soapMsg = soapMsg + '                  <quer:LastName></quer:LastName>';
			}
			if (FirstName != null)
			{
				soapMsg = soapMsg + '                  <quer:FirstName>~LIKE \''+FirstName+ '\'</quer:FirstName>';
			}
			else
			{
				soapMsg = soapMsg + '                  <quer:FirstName></quer:FirstName>';
			}

			if (EMailAddr != null)
			{
				soapMsg = soapMsg + '                  <quer:EMailAddr>~LIKE \''+EMailAddr+ '\'</quer:EMailAddr>';
			}
			else
			{
				soapMsg = soapMsg + '                  <quer:EMailAddr></quer:EMailAddr>';
			}

			soapMsg = soapMsg + '                  <quer:Id/>';
			soapMsg = soapMsg + '                  <quer:LoginName/>';
			soapMsg = soapMsg + '               </quer:Employee>';
			soapMsg = soapMsg + '            </quer:ListOfAns_Wsemployee>';
			soapMsg = soapMsg + '         </SiebelMessageIn>';
			soapMsg = soapMsg + '         <LOVLanguageMode>LDC</LOVLanguageMode>';
			soapMsg = soapMsg + '         <ViewMode>All</ViewMode>';
			soapMsg = soapMsg + '      </cus:QueryEmployee>';
			soapMsg = soapMsg + '   </soapenv:Body>';
			soapMsg = soapMsg + '</soapenv:Envelope>';

			debug("Inside searchEmployee method Before send Employee Data to siebel .",soapMsg);

			var SOAPAction='rpc/http://siebel.com/CustomUI:QueryEmployee';
			employeeData =soapMsg;
			employeeSOAPAction =SOAPAction;
			employeeSaveCount=0;
			invokeSiebeWebservice(soapMsg,SOAPAction,'employeeResponse');
		}
		else
		{
			document.getElementById('Employeeloading').innerHTML = '';
			document.getElementById('Employeeloading').style.display = 'none';
			document.getElementById('Employeeloading').style.visibility = 'invisible';
		}
	}
	
}
catch (e)
{
debug("Inside searchEmployee method Exception",e);
}
debug("Inside searchEmployee method End","");
}

function searchEmployeeResult(searchEmployeeResultObj){
debug("Inside searchEmployeeResult method Begin","");
debug("Inside searchEmployeeResult method Employee Response Code",searchEmployeeResultObj.rc);
debug("Inside searchEmployeeResult method Employee Response Error",searchEmployeeResultObj.errors);
debug("Inside searchEmployeeResult method Employee Response Data",searchEmployeeResultObj.data);
debug("Inside searchEmployeeResult method Employee Response Text",searchEmployeeResultObj.text);
debug("Inside searchEmployeeResult method Employee Response authErrorText",searchEmployeeResultObj.oauthErrorText);

	
var searchEmployeeResultObjText = searchEmployeeResultObj.text;
if(searchEmployeeResultObj.rc=="200")
{
	employeeSaveCount=3;
deleteAllRow("employeeAvailable");
var table = document.getElementById("employeeAvailable");
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
	debug("Inside searchEmployeeResult method Employee Length",emp.length);
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
			debug("Inside searchEmployeeResult method Employee Login name", empId[j].childNodes[0].nodeValue);
			}
			cell1.appendChild(element1);
			row.appendChild(cell1);
					
		var lstName=xmlDoc.getElementsByTagName('LastName');
		var lastName;
			var cell2 = document.createElement("td");
			cell2.style.width="75px";
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
			debug("Inside searchEmployeeResult method Employee Last name", lstName[j].childNodes[0].nodeValue);
			}
			cell2.appendChild(element2);
			row.appendChild(cell2);
				
			var fstName=xmlDoc.getElementsByTagName('FirstName');
		
			var cell3 = document.createElement("td");
			cell3.style.width="75px";
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
			debug("Inside searchEmployeeResult method Employee First name", fstName[j].childNodes[0].nodeValue);
			}
			cell3.appendChild(element3);
			row.appendChild(cell3);
			var emailAddrss=xmlDoc.getElementsByTagName('EMailAddr');
		
			var cell4 = document.createElement("td");
			cell4.style.width="136";
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
			debug("Inside searchEmployeeResult method Employee Email Address", emailAddrss[j].childNodes[0].nodeValue);
			}
			cell4.appendChild(element4);
			row.appendChild(cell4);
			

	}
}
catch (e)
{
debug("Inside searchEmployeeResult method Exception",e);
}
}
else
	{
	gadgets.window.adjustHeight(300);
//	employeeSaveCount=3;
	debug("Inside searchEmployeeResult method Employee Query Failure");
	debug("Inside searchEmployeeResult method Employee Query Failure employeeSaveCount:"+employeeSaveCount);
	if((searchEmployeeResultObj.text==null||searchEmployeeResultObj.text=="")&&employeeSaveCount!=3)
		{
	debug("Inside searchEmployeeResult method Employee Query Failure with empty text");
	setTimeout(function(){employeeSaveCount=employeeSaveCount+1;invokeSiebeWebservice(employeeData,employeeSOAPAction,'employeeResponse')}, 15000);
		
		}
	else if(searchEmployeeResultObj.text!=null||searchEmployeeResultObj.text!="")
		{
			employeeSaveCount=3;
		document.getElementById('Employee_div').innerHTML = 'Employee Query Failure : '+searchEmployeeResultObj.text;
		}
	else
	{
		employeeSaveCount=3;
	document.getElementById('Employee_div').innerHTML = 'Error contacting the server. Please contact your System administrator for support.';
		}
	
	}
if(employeeSaveCount==3)
{
document.getElementById('Employeeloading').innerHTML = '';
document.getElementById('Employeeloading').style.display = 'none';
document.getElementById('Employeeloading').style.visibility = 'invisible';
}
}
