function createActivity()
 {
   debug("Inside createActivity method Begin","");
  document.getElementById('activityLoading').style.display = 'inline';
  document.getElementById('activityLoading').style.visibility = 'visible';
 document.getElementById('activityLoading').innerHTML = 'Saving activity ...';
  document.getElementById('content_div').innerHTML = '';
  var saveActivity=true;
  transactionID=Math.random();
  gadgets.window.adjustHeight(360);
  try
  {
  if(document.getElementById('activtySave').value=='no')
  {
      if(document.getElementById('classval').value!='Select One')
      {
   saveActivity=true;
      }
      else
      {
         alert("Please Select Class Value");
        saveActivity=false;
       document.getElementById('activityLoading').innerHTML = '';
       document.getElementById('activityLoading').style.display = 'none';
  document.getElementById('activityLoading').style.visibility = 'invisible';
      }
  }
  else
  {
  var r=confirm("Do your really want to create an activity with no description or details ?");
  if (r==true)
   {
        if(document.getElementById('classval').value!='Select One')
          {
                 saveActivity=true;
            }
            else
            {
              alert("Please Select Class Value");
              saveActivity=false;
                document.getElementById('activityLoading').innerHTML = '';
                document.getElementById('activityLoading').style.display = 'none';
                document.getElementById('activityLoading').style.visibility = 'invisible';
            }
   }
  else
   {
  saveActivity=false;
   document.getElementById('activityLoading').innerHTML = '';
   document.getElementById('activityLoading').style.display = 'none';
   document.getElementById('activityLoading').style.visibility = 'invisible';
    }
  }
  if(saveActivity)
  {
  var data;
  data = '<?xml version="1.0" encoding="utf-8"?>';
  data = data + '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://siebel.com/webservices" xmlns:asi="http://siebel.com/asi/" xmlns:ans="http://www.siebel.com/xml/ANSAction3">';
  data = data + '<soapenv:Header>';
  data = data + '<web:PasswordText>innoveer09</web:PasswordText>';
  data = data + '<web:UsernameToken>SOAUSER</web:UsernameToken>';
  data=  data + '<web:SessionType>stateless</web:SessionType>';
  data=  data + '</soapenv:Header>';
  
  data = data + '<soapenv:Body>';
  data = data + '<asi:ANSActiviytInsertOrUpdateASI>';
 
  
  data = data + '<SiebelMessage>';
  data = data + '<ans:ListOfAnsaction3>';
  data = data + '<ans:Action operation="insert">';
//  data = data + '<ans:IntegrationID>'+transactionID+'</ans:IntegrationID>';
data = data + '<ans:Id>999999</ans:Id>';
  data = data + '<ans:Class>'+document.getElementById('classval').value+'</ans:Class>';
  data = data + '<ans:Type>'+document.getElementById('type').value+'</ans:Type>';
  data = data + '<ans:PrimaryOwnedBy>'+document.getElementById('owner').value+'</ans:PrimaryOwnedBy>';
  data = data + '<ans:Status>'+document.getElementById('Status').value+'</ans:Status>';
  if(document.getElementById('duedatepicker').value!=null&&document.getElementById('duedatepicker').value!="")
  {
  debug("Inside createActivity method Begin due date not null",document.getElementById('duedatepicker').value);
  data = data + '<ans:Due>'+getUTCDateFormat(document.getElementById('duedatepicker').value)+'</ans:Due>'; 
  }
  else
  {
  debug("Inside createActivity method Begin due date  null",document.getElementById('duedatepicker').value);
  data = data + '<ans:Due>'+document.getElementById('duedatepicker').value+'</ans:Due>'; 
  }
  //data = data + '<ans:Description>'+document.getElementById('description').value.replace(/[^a-zA-Z 0-9]+/g,'')+'</ans:Description>';
  //data = data + '<ans:Description>'+document.getElementById('description').value.replace(/</g,'').replace(/>/g,'')+'</ans:Description>';
  data = data + '<ans:Description><![CDATA['+document.getElementById('description').value+']]></ans:Description>';
  data = data + '<ans:Priority>'+document.getElementById('priority').value+'</ans:Priority>';
  if(document.getElementById('startdatepicker').value!=null&&document.getElementById('startdatepicker').value!="")
  {
  debug("Inside createActivity method Begin Start date not null",document.getElementById('startdatepicker').value);
  data = data + '<ans:Planned>'+getUTCDateFormat(document.getElementById('startdatepicker').value)+'</ans:Planned>';
 }
 else
 {
debug("Inside createActivity method Begin Start date null",document.getElementById('startdatepicker').value);
  data = data + '<ans:Planned>'+document.getElementById('startdatepicker').value+'</ans:Planned>';
  }
  if(document.getElementById('enddatepicker').value!=null&&document.getElementById('enddatepicker').value!="")
  {
   debug("Inside createActivity method Begin endDate date not null",document.getElementById('enddatepicker').value);
        data = data + '<ans:PlannedCompletion>'+getUTCDateFormat(document.getElementById('enddatepicker').value)+'</ans:PlannedCompletion>';
  }
  else
   {
   debug("Inside createActivity method Begin endDate date  null",document.getElementById('enddatepicker').value);
   data = data + '<ans:PlannedCompletion>'+document.getElementById('enddatepicker').value+'</ans:PlannedCompletion>';
   }
        if(document.getElementById('classval').value=="Opportunity")
         if(On_submit())
   {
    
          data = data + '<ans:OpportunityId>'+document.getElementById('classSelected').value+'</ans:OpportunityId>'; 
   }
   else
   {
    
    document.getElementById('activityLoading').innerHTML = '';
    document.getElementById('activityLoading').style.display = 'none';
    document.getElementById('activityLoading').style.visibility = 'invisible';
    return true;
   }
        else if(document.getElementById('classval').value=="Service Request")
         if(On_submit())
   {
          data = data + '<ans:SRNumber>'+document.getElementById('classSelected').value+'</ans:SRNumber>'; 
          if(document.getElementById('extFlag').checked)
           data = data + '<ans:ANSExternalFlag>Y</ans:ANSExternalFlag>';
          else
           data = data + '<ans:ANSExternalFlag>N</ans:ANSExternalFlag>';
          data = data + '<ans:DurationHours>'+document.getElementById('timeSpent').value+'</ans:DurationHours>';

   }
   else
   {
    
    document.getElementById('activityLoading').innerHTML = '';
    document.getElementById('activityLoading').style.display = 'none';
    document.getElementById('activityLoading').style.visibility = 'invisible';
    return true;
   }
  data = data + '<ans:ANSActivityDetails><![CDATA['+document.getElementById('details').value+']]></ans:ANSActivityDetails>';
  data = data + '<ans:ListOfAction_Contact>';
  var flag="false";
  var closeTag ="false";
  var contactList=document.getElementById('contactSelected').getElementsByTagName('input');
  debug("Inside createActivity method contact length",contactList.length);
  debug("Inside createActivity method Flag value",flag);
  debug("Inside createActivity method cloase tag value",closeTag);
  for(var i=0; i<contactList.length;i++)
  {
   if(contactList[i].name=="ANSContactNumber")
   {
    /*if(document.getElementById('contactSelected').getElementsByTagName('input')[i].checked)
    {*/
    //if(contactList[i].value)
     data = data + '<ans:Action_Contact>';
     flag ="true";
     
     // alert("Selected Contact Id value :"+document.getElementById('contactAvailable').getElementsByTagName('input')[i].value);
     debug("Inside createActivity method Ansys contact number ",document.getElementById('contactSelected').getElementsByTagName('input')[i].value);
     data = data + '<ans:ANSContactNumber>'+document.getElementById('contactSelected').getElementsByTagName('input')[i].value+'</ans:ANSContactNumber>';
    /*}
    else
    {
     flag ="false";
    }*/
   }
   else if(contactList[i].name=="contactFirstName" && flag=="true")
   {
    //alert("Selected First Name value :"+document.getElementById('contactAvailable').getElementsByTagName('input')[i].value);
    debug("Inside createActivity method Ansys contact First Name ",document.getElementById('contactSelected').getElementsByTagName('input')[i].value);
    data = data + '<ans:ContactFirstName>'+document.getElementById('contactSelected').getElementsByTagName('input')[i].value+'</ans:ContactFirstName>';
    closeTag ="true";
   }
   else if(contactList[i].name=="contactLastName" && flag=="true")
   {
    debug("Inside createActivity method Ansys contact Last Name ",document.getElementById('contactSelected').getElementsByTagName('input')[i].value);
    //alert("Selected Last Name value :"+document.getElementById('contactAvailable').getElementsByTagName('input')[i].value);
    data = data + '<ans:ContactLastName>'+document.getElementById('contactSelected').getElementsByTagName('input')[i].value+'</ans:ContactLastName>';
   }
    
   if(closeTag=="true")
   {
    debug("Inside createActivity method inside closetag ","");
    data = data + '</ans:Action_Contact>'; 
    closeTag="false";
   }
  }
  data = data + '</ans:ListOfAction_Contact>';
  data = data + '<ans:ListOfAction_Employee>';
  var empList=document.getElementById('employeeSelected').getElementsByTagName('input');
  debug("Inside createActivity method Employee length",empList.length);
  for(var i=0; i<empList.length;i++)
  {
   if(empList[i].name=='empId')
    {
   /*if(document.getElementById('employeeSelected').getElementsByTagName('input')[i].checked)
   {*/
    debug("Inside createActivity method Ansys Employee Login ",document.getElementById('employeeSelected').getElementsByTagName('input')[i].value);
    //alert("Selected Emp Id value :"+document.getElementById('employeeAvailable').getElementsByTagName('input')[i].value);
    data = data + '<ans:Action_Employee>'; 
    data = data + '<ans:EmployeeLogin>'+document.getElementById('employeeSelected').getElementsByTagName('input')[i].value+'</ans:EmployeeLogin>';
    data = data + '</ans:Action_Employee>';  
   //}
    }

  }
  data = data + '</ans:ListOfAction_Employee>';
  data = data + '</ans:Action>';
  data = data + '</ans:ListOfAnsaction3>';
  data = data + '</SiebelMessage>'; 
  data = data + '<StatusObject/>'; 
   
  data = data + '</asi:ANSActiviytInsertOrUpdateASI>';
  data = data + '</soapenv:Body>';
  data = data + '</soapenv:Envelope>';
  debug("Inside createActivity method Before send to siebel Activity data",data);
  //  alert("Before send to siebel data :"+data);
  var SOAPAction='rpc/http://siebel.com/asi/:ANSActiviytInsertOrUpdateASI';
  activityData = data;
  activitySOAPAction = SOAPAction;
  activitySaveCount=0;
  invokeSiebeWebservice(data,SOAPAction,'activityResponse');

  //alert('Do you want to track this activity to Siebel?');
  debug("Do you want to track this activity to Siebel?","");
  }
 }
 catch (e)
 {
 debug("Inside createActivity method Exception ",e);
 }
 debug("Inside createActivity method End","");
}

function createActivityResult(obj){
debug("Inside createActivityResult method Begin",""); 
debug("Inside createActivityResult method Activity Response Code",obj.rc);
debug("Inside createActivityResult method Activity Response Error",obj.errors);
debug("Inside createActivityResult method Activity Response Data",obj.data);
debug("Inside createActivityResult method Activity Response Text",obj.text);
debug("Inside createActivityResult method Activity Response authErrorText",obj.oauthErrorText);
var querydata;
  querydata = '<?xml version="1.0" encoding="utf-8"?>';
  querydata = querydata + '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://siebel.com/webservices" xmlns:asi="http://siebel.com/asi/" xmlns:cus="http://siebel.com/CustomUI" xmlns:quer="http://www.siebel.com/xml/ANSActionThin/Query"';
  querydata = querydata + '<soapenv:Header>';
  querydata = querydata + '<web:PasswordText>innoveer09</web:PasswordText>';
  querydata = querydata + '<web:UsernameToken>SOAUSER</web:UsernameToken>';
  querydata=  querydata + '<web:SessionType>stateless</web:SessionType>';
  querydata=  querydata + '</soapenv:Header>';
  
  querydata = querydata + '<soapenv:Body>';
  querydata = querydata + '<cus:ANSActivityThinCustomUIQueryPage_Input>';
 
  
  querydata = querydata + '<quer:ListOfANSActionThin pagesize="100" startrownum="0" recordcountneeded="true">';
  querydata = querydata + '<quer:ActionThin>';
  querydata = querydata + '<quer:IntegrationID>='+transactionID+'</quer:IntegrationID>';
  querydata = querydata + '<quer:Type/>';
  querydata = querydata + '<quer:Id/>';
  querydata = querydata + '<quer:ListOfAction_Contact pagesize="5" startrownum="0" recordcountneeded="false"/>';
  querydata = querydata + '</quer:ActionThin>';
  querydata = querydata + '</quer:ListOfANSActionThin>';
  querydata = querydata + '<cus:LOVLanguageMode>LDC</cus:LOVLanguageMode>';
  querydata = querydata + '<cus:ViewMode>All</cus:ViewMode>'; 	  
  querydata = querydata + '</cus:ANSActivityThinCustomUIQueryPage_Input>';
  querydata = querydata + '</soapenv:Body>';
  querydata = querydata + '</soapenv:Envelope>';
try
{
 var createActivityResultObjText = obj.text;
 if(obj.rc=="200")
 {
  
  var text=createActivityResultObjText;
  
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

  debug("Inside createActivityResult method Activity success","");
  var table = document.getElementById("employeeAvailable");
  var rowCount = table.rows.length;
  debug("Inside createActivityResult method employeeAvailable table length",rowCount);
  for(var i=0; i<rowCount; i++)
  {
   table.deleteRow(i);
   rowCount--;
   i--;
  }
  var table1 = document.getElementById("employeeSelected");
  var rowCount1 = table1.rows.length;
  debug("Inside createActivityResult method employeeSelected table length",rowCount1);
  for(var j=0; j<rowCount1; j++)
  {
   table1.deleteRow(j);
   rowCount1--;
   j--;
  }
  var table2 = document.getElementById("contactAvailable");
  var rowCount2 = table2.rows.length;
  debug("Inside createActivityResult method contactAvailable table length",rowCount2);
  for(var k=0; k<rowCount2; k++) 
  {
   table2.deleteRow(k);
   rowCount2--;
   k--;
  }
  var table3 = document.getElementById("contactSelected");
  var rowCount3 = table3.rows.length;
  debug("Inside createActivityResult method contactSelected table length",rowCount3);
  for(var m=0; m<rowCount3; m++) 
  {
   table3.deleteRow(m);
   rowCount3--;
   m--;
  }
  //document.CRMActivity.reset(); -- Comented by venkatesan
    //  alert("After reset");
    document.getElementById('classValue').innerHTML = ""; 
  document.getElementById('activtySave').value="yes";
  document.getElementById('timeSpentValue').innerHTML = "";
  document.getElementById('externalFlag').innerHTML = "";
  document.CRMActivity.owner.value=prefs.getString("LoginName");
  document.CRMActivity.startdatepicker.value=getDate();
  document.getElementById('content_div').innerHTML = 'Activity Saved.(Activity ID:'+xmlDoc.getElementsByTagName("Id")[0].childNodes[0].nodeValue+')';
  document.getElementById('activityLoading').style.display = 'inline';
  document.getElementById('activityLoading').style.visibility = 'visible';
  activitySaveCount=5;
 }
 else
 {
 //	activitySaveCount=5;
  if(activitySaveCount!=5 && (obj.text==null||obj.text==""))
  {
    activitySaveCount =activitySaveCount+1;
    activitySOAPAction='rpc/http://siebel.com/CustomUI:ANSActivityThinCustomUIQueryPage';
      alert("activitySaveCount :"+activitySaveCount);
    setTimeout(function(){invokeSiebeWebservice(querydata,activitySOAPAction,'activityResponse')}, 15000);
  
  }
  else
  {
      debug("Inside createActivityResult method Activity Failure");
     if(obj.text==null||obj.text=="")
  {
    activitySaveCount =5;
       debug("Inside createActivityResult method Activity Failure with empty text");
        document.getElementById('content_div').innerHTML = 'Error contacting the server. Please contact your System administrator for support.';
  }
      else
       {
        activitySaveCount =5;
     var text=obj.text;
  
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
  //alert("XML Root Tag Name: " + xmlDoc.documentElement.tagName);
  //alert("Child node length: " + xmlDoc.documentElement.childNodes[1].firstChild.length);
  //alert("First Child: " + xmlDoc.documentElement.childNodes[1].firstChild.tagName);
  //alert("First Child: " + xmlDoc.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
  
  //Using lastChild Properties
  //Output average
  //alert("Last Child: " + xmlDoc.documentElement.childNodes[1].lastChild.tagName);
  
  

  document.getElementById('content_div').innerHTML = 'Activity created Failure : '+xmlDoc.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue;
  }
  }
 }
}
catch (e)
{
debug("Inside createActivityResult method Exception",e);
alert("Exception activitySaveCount :"+activitySaveCount);
}
alert("activitySaveCount :"+activitySaveCount);
if(activitySaveCount==5)
{
document.getElementById('activityLoading').innerHTML = '';
document.getElementById('activityLoading').style.display = 'none';
document.getElementById('activityLoading').style.visibility = 'invisible';
}
debug("Inside createActivityResult method End","");
}
