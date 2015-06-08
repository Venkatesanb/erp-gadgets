function dateTimePick(dateField)
{
gadgets.window.adjustHeight(400);
NewCssCal(dateField,'MMddyyyy','dropdown',true,'12',true)
}
function minimize()
{
alert("inside minimize");
gadgets.window.adjustHeight(300);
}

function invokeSiebeWebservice(soapData,soapAction,soapResponse)
{
debug("Inside invokeSiebeWebservice method begin","");
debug("Inside invokeSiebeWebservice method soapData",soapData);
debug("Inside invokeSiebeWebservice method soapAction",soapAction);
debug("Inside invokeSiebeWebservice method soapResponse",soapResponse);
var SOAPparams = {};
﻿  ﻿  SOAPparams[gadgets.io.RequestParameters.AUTHORIZATION] = 'NONE';
﻿  ﻿  SOAPparams['OAUTH_ADD_EMAIL'] = 'false';
﻿  ﻿  SOAPparams['OAUTH_ENABLE_PRIVATE_NETWORK'] = 'false';
﻿  ﻿  SOAPparams[gadgets.io.RequestParameters.METHOD]=gadgets.io.MethodType.POST;
    SOAPparams[gadgets.io.RequestParameters.REFRESH_INTERVAL] = 200;

﻿  ﻿  SOAPparams[gadgets.io.RequestParameters.HEADERS]={"Content-Type" : "'text/xml;charset=UTF-8'","SOAPAction" :"'" +soapAction+"'"};
﻿  ﻿  SOAPparams[gadgets.io.RequestParameters.POST_DATA]=soapData;
﻿  ﻿  debug("Inside invokeSiebeWebservice method SOAP URL",soapURL);
﻿  ﻿  if(soapResponse=="contactResponse")
﻿  ﻿  ﻿  makeCachedRequest(soapURL, searchContactResult, SOAPparams,10);
﻿  ﻿  if(soapResponse=="employeeResponse")
﻿  ﻿  ﻿  makeCachedRequest(soapURL, searchEmployeeResult, SOAPparams,10);
﻿  ﻿  if(soapResponse=="activityResponse")
﻿  ﻿  ﻿  makeCachedRequest(soapURL, createActivityResult, SOAPparams, 100);
﻿  ﻿  if(soapResponse=="employeeLogin")
﻿  ﻿  ﻿  gadgets.io.makeRequest(soapURL, employeeLogin, SOAPparams);
﻿  ﻿  if(soapResponse=="getemployeeResponse")
﻿  ﻿  ﻿  makeCachedRequest(soapURL, getEmployeeResult, SOAPparams,10);
﻿  ﻿  if(soapResponse=="getcontactResponse")
﻿  ﻿  ﻿  makeCachedRequest(soapURL, getContactResult, SOAPparams,10);
debug("Inside invokeSiebeWebservice method End","");
}
function debug(textName,textValue)
{
﻿  if(document.getElementById('debug').value=="Debug On")
﻿  {
﻿  ﻿  alert(textName+" : "+textValue);
﻿  }
}
function deleteRow(tableID) 
{
﻿  debug("Inside deleteRow method Begin","");
    try 
﻿  {
﻿  ﻿  debug("Inside deleteRow method Table Name",tableID);
﻿  ﻿  var table = document.getElementById(tableID);
        var rowCount = table.rows.length;
﻿  ﻿  debug("Inside deleteRow method Table Length",rowCount);
        for(var i=0; i<rowCount; i++) 
﻿  ﻿  {
﻿  ﻿  ﻿  var row = table.rows[i];
            var chkbox = row.cells[0].childNodes[0];
            if(null != chkbox && true == chkbox.checked) 
﻿  ﻿  ﻿  {
﻿  ﻿  ﻿  ﻿  table.deleteRow(i);
                rowCount--;
                i--;
﻿  ﻿  ﻿  ﻿  
            }
        }
    }catch(e) 
﻿  {
﻿  ﻿  debug("Inside deleteRow method Exception",e);
    }
﻿  debug("Inside deleteRow method End","");
}
function deleteAllRow(tableID) 
{
﻿  debug("Inside deleteAllRow method Begin","");
    try 
﻿  {
﻿  ﻿  debug("Inside deleteAllRow method Table Name",tableID);
﻿  ﻿  var table = document.getElementById(tableID);
        var rowCount = table.rows.length;
﻿  ﻿  debug("Inside deleteAllRow method Table Length",rowCount);
        for(var i=0; i<rowCount; i++) 
﻿  ﻿  {
﻿  ﻿  ﻿  var row = table.rows[i];
            var chkbox = row.cells[0].childNodes[0];
            table.deleteRow(i);
            rowCount--;
            i--;
﻿  ﻿  }
    }catch(e) 
﻿  {
﻿  ﻿  debug("Inside deleteAllRow method Exception",e);
    }
﻿  debug("Inside deleteAllRow method End","");
}
function assignClass()
{
﻿  debug("Inside assignClass method Begin","");
﻿  var selIdx = document.getElementById('classval').selectedIndex;
﻿  var classValue = document.getElementById('classval').options[selIdx].text;
﻿  document.getElementById('Status').selectedIndex=0;
﻿  debug("Inside assignClass method classValue",classValue);
  // if(classValue!='Generic') // Commented by venkatesan for class lov change
   //if(classValue=='Opportunity' || classValue=='Service Request')
﻿  //﻿  {
﻿  ﻿  debug("Inside assignClass method inside if classValue",classValue);
﻿  ﻿  if(classValue=="Opportunity")
﻿  ﻿  ﻿  {
﻿  ﻿  document.getElementById('classValue').innerHTML = "<strong><font face='Garamond'>Opportunity ID &nbsp;:&nbsp; <input type='text' name='classSelected' id='classSelected' size='18'></font></strong>";
﻿  ﻿  //document.getElementById('classValue').innerHTML = "<strong><font face='Garamond'>Opportunity ID &nbsp;:&nbsp; <input type='text' name='classSelected' id='classSelected' size='15' class='fontRel'></font></strong>";
﻿  ﻿  document.getElementById('classSelected').value=document.getElementById('OppId').value;
﻿  ﻿  document.getElementById('Status').selectedIndex=0;
﻿  ﻿  document.getElementById('timeSpentValue').innerHTML = "";
﻿  ﻿  document.getElementById('externalFlag').innerHTML = "";
﻿  ﻿  document.getElementById('details').value=document.getElementById('emailBodyText').value;
﻿  ﻿  gadgets.window.adjustHeight(350);
﻿  ﻿  ﻿  }
﻿  ﻿  else if(classValue=="Service Request")
﻿  ﻿  ﻿  {
﻿  ﻿    // if(classValue=="Service Request")
﻿  ﻿  ﻿  //{
﻿  ﻿  ﻿  ﻿  gadgets.window.adjustHeight(350);
﻿  ﻿  document.getElementById('classValue').innerHTML = "<strong><font face='Garamond'>Service Request :&nbsp; <input type='text' name='classSelected' id='classSelected' size='18'></font></strong>";
﻿  ﻿  document.getElementById('timeSpentValue').innerHTML = "<strong><font face='Garamond'>Time Spent(Hr) :&nbsp; <input type='text' name='timeSpent' id='timeSpent' size='18'></font></strong>";
﻿  ﻿  document.getElementById('externalFlag').innerHTML = "<strong><font face='Garamond'>External &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; <input type='checkbox' name='extFlag' id='extFlag' size='18'></font></strong>";
﻿  ﻿  /*document.getElementById('classValue').innerHTML = "<strong><font face='Garamond'>Service Request :&nbsp; <input type='text' name='classSelected' id='classSelected' size='15' class='fontRel'></font></strong>";
﻿  ﻿  document.getElementById('timeSpentValue').innerHTML = "<strong><font face='Garamond'>Time Spent(Hr) : <input type='text' name='timeSpent' id='timeSpent' size='14' class='fontRel'></font></strong>";
﻿  ﻿  document.getElementById('externalFlag').innerHTML = "<strong><font face='Garamond'>External &nbsp; : <input type='checkbox' name='extFlag' id='extFlag' size='18' class='fontRel'></font></strong>";*/
﻿  ﻿  document.getElementById('classSelected').value=document.getElementById('ServiceRST').value;
﻿  ﻿  document.getElementById('Status').selectedIndex=3;
﻿  ﻿  document.getElementById('details').value="";
﻿  ﻿   //  }
﻿  ﻿   //  }
﻿  ﻿  }
﻿  else
﻿  ﻿  {
      //alert("Inside else Condition");
﻿  ﻿  debug("Inside assignClass method inside else classValue",classValue);
﻿  ﻿  debug("Inside assignClass method inside else classValue details value :",document.getElementById('details').value);
﻿  ﻿  debug("Inside assignClass method inside else classValue emailBodyText value",document.getElementById('emailBodyText').value);
﻿  ﻿  document.getElementById('details').value=document.getElementById('emailBodyText').value;
﻿  ﻿  document.getElementById('classValue').innerHTML = "";
﻿  ﻿  document.getElementById('timeSpentValue').innerHTML = "";
﻿  ﻿  document.getElementById('externalFlag').innerHTML = "";
﻿  ﻿  document.getElementById('classSelected').value="";
﻿  ﻿  document.getElementById('Status').selectedIndex=0;
﻿  ﻿  
﻿  ﻿  gadgets.window.adjustHeight(340);
﻿  ﻿  }
﻿  debug("Inside assignClass method End","");
}
function On_submit()
{
﻿  debug("Inside On_submit method Begin","");
﻿  if(document.getElementById('classSelected').value==null||document.getElementById('classSelected').value=="")
﻿  ﻿  {
﻿  ﻿  if(document.getElementById('classval').value=="Opportunity")
﻿  ﻿  ﻿  {
﻿  ﻿  ﻿  alert("Please enter a valid Opportunity Identifiier.");
﻿  ﻿  ﻿  }
﻿  ﻿  else if(document.getElementById('classval').value=="Service Request")
﻿  ﻿  ﻿  {
﻿  ﻿  ﻿  alert("Please enter a valid Service Request number.");
﻿  ﻿  ﻿  }
﻿  ﻿  return false;
﻿  ﻿  }
﻿  else
﻿  ﻿  return true;
﻿  debug("Inside On_submit method End","");
}
function clearFields()
{
﻿  debug("Inside clearFields method Begin","");
﻿  document.CRMActivity.reset();
﻿  document.getElementById('classValue').innerHTML = "";
﻿  document.getElementById('timeSpentValue').innerHTML = "";
﻿  document.getElementById('owner').value=prefs.getString("LoginName");
﻿  document.getElementById('content_div').innerHTML = '';
﻿  document.getElementById('startdatepicker').value=getDate();
﻿  debug("Inside clearFields method Login Name",document.getElementById('owner').value);
﻿  debug("Inside clearFields method End","");
}
function getUTCDateFormat(dateString)
{
﻿  var offset ="-4";
﻿  var currentTime = new Date(dateString);
﻿  /*var month = currentTime.getUTCMonth()+1;
﻿  var day = currentTime.getUTCDate();
﻿  var year = currentTime.getUTCFullYear();
﻿  var currentHours = currentTime.getUTCHours ( );
﻿  var currentMinutes = currentTime.getUTCMinutes ( );
﻿  var currentSeconds = currentTime.getUTCSeconds ( );
﻿  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
﻿  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
﻿  currentHours = ( currentHours < 10 ? "0" : "" ) + currentHours;
﻿  month = ( month < 10 ? "0" : "" ) + month;
﻿  day = ( day < 10 ? "0" : "" ) + day;
﻿  var currentUTCTimeString = month+"/"+day+"/"+year+" "+currentHours + ":" + currentMinutes + ":" + currentSeconds ;
﻿  return currentUTCTimeString;*/
﻿  utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
﻿     
    // create new Date object for different city
    // using supplied offset
    var changedTime = new Date(utc + (3600000*offset));
   
 var month = changedTime.getMonth()+1;
var day = changedTime.getDate();
var year = changedTime.getFullYear();
var hours = changedTime.getHours();
var minutes = changedTime.getMinutes();
var seconds = changedTime.getSeconds();
minutes = ( minutes < 10 ? "0" : "" ) + minutes;
seconds = ( seconds < 10 ? "0" : "" ) + seconds;
hours = ( hours < 10 ? "0" : "" ) + hours;
month = ( month < 10 ? "0" : "" ) + month;
day = ( day < 10 ? "0" : "" ) + day;

var changedTimeString=month + "/" + day + "/" + year+" "+hours+":"+minutes+ ":" +seconds;
return changedTimeString;
/*var currentUTCTimeString = month+"/"+day+"/"+year+" "+currentHours + ":" + currentMinutes + ":" + currentSeconds ;*/
﻿  
}
function getDate()
{
﻿  var currentTime = new Date()
﻿  var month = currentTime.getMonth()+1;
﻿  var day = currentTime.getDate();
﻿  var year = currentTime.getFullYear();
﻿  var currentHours = currentTime.getHours ( );
﻿  var currentMinutes = currentTime.getMinutes ( );
﻿  var currentSeconds = currentTime.getSeconds ( );
﻿  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
﻿  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
﻿  var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
﻿  currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
﻿  currentHours = ( currentHours == 0 ) ? 12 : currentHours;
﻿  currentHours = ( currentHours < 10 ? "0" : "" ) + currentHours;
﻿  month = ( month < 10 ? "0" : "" ) + month;
﻿  var currentTimeString = month+"/"+day+"/"+year+" "+currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
﻿  return currentTimeString;
﻿  }
function emailLoginResponse(emailRespObj) {
﻿  debug("Inside emailLoginResponse method Begin","");
﻿   var emailString=emailRespObj.text;
 
﻿  ﻿    var text=emailRespObj;
﻿       alert("RC code :"+emailRespObj.rc);
       alert("RC code :"+emailRespObj.text);
        alert("RC code :"+emailRespObj.data);
﻿  ﻿    if(emailRespObj.rc=="200" || emailRespObj.rc=="400")
﻿  ﻿    {
﻿  ﻿   // emailString = emailString.substring(emailString.indexOf("/>")+2,emailString.indexOf("</"));  -- Commented By venkatesan
        
        
    
        var opensocialEmailid=emailString.substring(emailString.indexOf("opensocial_viewer_email=")+24);
         opensocialEmailid = opensocialEmailid.substring(0,opensocialEmailid.indexOf("@"));
        
       var mydata = JSON.parse(data);
        for(var i=0;i<mydata.length;i++)
        {
        
           if(mydata[i].SiebelName==opensocialEmailid)
           {
              emailString = mydata[i].GoogleName;
           }
        }
        
        emailString  = emailString.toUpperCase();
﻿  ﻿    
﻿  ﻿   // emailString="INVALID";
﻿  ﻿    if(emailString=="INVALID")
﻿  ﻿  ﻿    {
﻿  ﻿  ﻿  //  alert("emailString inside invalid:"+emailString);
﻿  ﻿  ﻿    ﻿  hours = currentTime.getHours()+3;
﻿  ﻿  ﻿  ﻿  if(hours>24)
﻿  ﻿  ﻿  ﻿  {
﻿  ﻿  ﻿  ﻿  hours=hours-24;
﻿  ﻿  ﻿  ﻿  day = currentTime.getDate()+1;
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  sessionTime=month + "/" + day + "/" + year+":"+hours+":"+minutes;
﻿  ﻿  ﻿  ﻿  prefs.set("LoginExpire",sessionTime);
﻿  ﻿  ﻿   }
﻿  ﻿    else
﻿  ﻿  ﻿    {
﻿  ﻿  ﻿  //  alert("emailString inside valid:"+emailString);
﻿  ﻿  ﻿  ﻿  document.CRMActivity.owner.value = emailString;
﻿  ﻿  ﻿  ﻿  day = currentTime.getDate()+1;
﻿  ﻿  ﻿  ﻿  sessionTime=month + "/" + day + "/" + year+":"+hours+":"+minutes;
﻿  ﻿  ﻿  ﻿  prefs.set("LoginExpire",sessionTime);
﻿  ﻿  ﻿  ﻿  prefs.set("LoginName",emailString);
﻿  ﻿  ﻿  ﻿  $(".debugVal").show('fast');
﻿  ﻿  ﻿  ﻿  $(".msg_list").show('fast');
﻿  ﻿  ﻿  ﻿  gadgets.window.adjustHeight(60);
﻿  ﻿  ﻿    }
﻿    //  alert("emailString :"+emailString);

﻿  ﻿   // alert("emailString :"+emailString);

﻿    //   document.CRMActivity.owner.value = ret.text;
﻿  //alert("value :"+document.CRMActivity.owner.value);

﻿  ﻿  ﻿  ﻿  /*var soapMsg;
﻿  ﻿  ﻿  ﻿  soapMsg = '<?xml version="1.0" encoding="utf-8"?>';

﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cus="http://siebel.com/CustomUI" xmlns:quer="http://www.siebel.com/xml/ANS_WSEmployee/Query" xmlns:web="http://siebel.com/webservices">';
﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '<soapenv:Header><web:PasswordText>innoveer09</web:PasswordText><web:UsernameToken>SOAUSER</web:UsernameToken><web:SessionType>stateless</web:SessionType></soapenv:Header>';
﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '   <soapenv:Body>';
﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '      <cus:QueryEmployee>';
﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '         <SiebelMessageIn>';
﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '            <quer:ListOfAns_Wsemployee pagesize="100" startrownum="0" recordcountneeded="true">';
﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '               <quer:Employee>';

﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '                  <quer:LastName></quer:LastName>';
﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '                  <quer:FirstName></quer:FirstName>';
﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '                  <quer:EMailAddr>~LIKE \''+emailString+ '\'</quer:EMailAddr>';
﻿  ﻿  ﻿  ﻿  
﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '                  <quer:Id/>';
﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '                  <quer:LoginName/>';
﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '               </quer:Employee>';
﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '            </quer:ListOfAns_Wsemployee>';
﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '         </SiebelMessageIn>';
﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '         <LOVLanguageMode>LDC</LOVLanguageMode>';
﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '         <ViewMode>All</ViewMode>';
﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '      </cus:QueryEmployee>';
﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '   </soapenv:Body>';
﻿  ﻿  ﻿  ﻿  soapMsg = soapMsg + '</soapenv:Envelope>';

﻿  ﻿  ﻿  ﻿  //alert("inside response success :"+soapMsg);
﻿  ﻿  ﻿  ﻿  var SOAPAction='rpc/http://siebel.com/CustomUI:QueryEmployee';
﻿  ﻿  ﻿  ﻿  invokeSiebeWebservice(soapMsg,SOAPAction,'employeeLogin');
﻿  ﻿  ﻿  */
﻿  ﻿    }
﻿  ﻿    else
﻿  ﻿  ﻿    {
           alert("emailString data :"+emailRespObj.data);
﻿  ﻿  ﻿  //  alert("inside if");
﻿  ﻿  ﻿    var divTag = document.createElement("div");
﻿  ﻿         
﻿  ﻿          divTag.id = "div1";
﻿  ﻿             
﻿  ﻿          divTag.innerHTML = "<strong><font face='Garamond' size='4'> Error contacting the server. Please contact your System administrator for support.</font></strong>";
﻿  ﻿         
           
                   
﻿  ﻿         document.body.appendChild(divTag);
﻿  ﻿  ﻿    gadgets.window.adjustHeight(30);
            

        //  gadgets.window.adjustHeight(120);
          // $(".debugVal").show('fast');
            //                    $(".msg_list").show('fast');

﻿  ﻿  ﻿    }

﻿        };
﻿   function employeeLogin(EmployeeLoginObj){
﻿  alert("Inside employeeLogin method Begin","");
﻿  alert("Inside employeeLogin method Employee Response Code"+EmployeeLoginObj.rc);
﻿  alert("Inside employeeLogin method Employee Response Error"+EmployeeLoginObj.errors);
﻿  alert("Inside employeeLogin method Employee Response Data"+EmployeeLoginObj.data);
﻿  alert("Inside employeeLogin method Employee Response Text"+EmployeeLoginObj.text);
﻿  alert("Inside employeeLogin method Employee Response authErrorText"+EmployeeLoginObj.oauthErrorText);

﻿  var emploginName;﻿  
﻿  var text=EmployeeLoginObj.text;
﻿  alert("text"+text);
﻿  if(EmployeeLoginObj.rc=="200")
﻿  {
﻿  if (window.DOMParser)
﻿  {
﻿  ﻿  parser=new DOMParser();
﻿  ﻿  xmlDoc=parser.parseFromString(text,"text/xml");
﻿  }
﻿  else // Internet Explorer
﻿  {
﻿  ﻿  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
﻿  ﻿  xmlDoc.async="false";
﻿  ﻿  xmlDoc.loadXML(text); 
﻿  } 

﻿  ﻿  var emp = xmlDoc.getElementsByTagName('Employee');
﻿  ﻿  
﻿  ﻿  //alert("Inside searchEmployeeResult method Employee Length"+emp.length);
﻿  ﻿  if(emp.length>0)
﻿  ﻿  {

﻿  ﻿  for(j=0;j<emp.length;j++)
﻿  ﻿  {
﻿  ﻿  ﻿  var empId=xmlDoc.getElementsByTagName('LoginName');
﻿  ﻿  ﻿  
﻿  ﻿  ﻿  if(empId[j].childNodes.length>0)
﻿  ﻿  ﻿  {
﻿  ﻿  ﻿  ﻿  emploginName=empId[j].childNodes[0].nodeValue;
﻿  ﻿  ﻿  ﻿  //emploginName="EX-GFPIGANE";
﻿  ﻿  ﻿  ﻿  if(emploginName.indexOf("EX-")==0)
﻿  ﻿  ﻿  ﻿  {
﻿  ﻿  ﻿  ﻿  ﻿  day = currentTime.getDate()+1;
﻿  ﻿  ﻿  ﻿  ﻿  sessionTime=month + "/" + day + "/" + year+":"+hours+":"+minutes;
﻿  ﻿  ﻿  ﻿  ﻿  //alert("sessionTime"+sessionTime);
﻿  ﻿  ﻿  ﻿  ﻿  prefs.set("LoginExpire",sessionTime);
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  else
﻿  ﻿  ﻿  ﻿  {
﻿  ﻿  ﻿  ﻿  ﻿  document.CRMActivity.owner.value = empId[j].childNodes[0].nodeValue;
﻿  ﻿  ﻿  ﻿  ﻿  day = currentTime.getDate()+1;
﻿  ﻿  ﻿  ﻿  ﻿  sessionTime=month + "/" + day + "/" + year+":"+hours+":"+minutes;
﻿  ﻿  ﻿  ﻿  ﻿  //alert("sessionTime"+sessionTime);
﻿  ﻿  ﻿  ﻿  ﻿  prefs.set("LoginExpire",sessionTime);
﻿  ﻿  ﻿  ﻿  ﻿  prefs.set("LoginName",empId[j].childNodes[0].nodeValue);
﻿  ﻿  ﻿  ﻿  ﻿  $(".debugVal").show('fast');
﻿  ﻿  ﻿  ﻿  ﻿  $(".msg_list").show('fast');
﻿  ﻿  ﻿  ﻿  ﻿  gadgets.window.adjustHeight(60);
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  else
﻿  ﻿  ﻿  ﻿  {
﻿  ﻿  ﻿  ﻿  //alert("inside else cond");
﻿  ﻿  ﻿  ﻿  hours = currentTime.getHours()+4;
﻿  ﻿  ﻿  ﻿  if(hours>24)
﻿  ﻿  ﻿  ﻿  {
﻿  ﻿  ﻿  ﻿  hours=hours-24;
﻿  ﻿  ﻿  ﻿  day = currentTime.getDate()+1;
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  sessionTime=month + "/" + day + "/" + year+":"+hours+":"+minutes;
﻿  ﻿  ﻿  ﻿  //alert("inside else cond sessionTime :"+sessionTime);
﻿  ﻿  ﻿  ﻿  prefs.set("LoginExpire",sessionTime);
﻿  ﻿  ﻿  ﻿  //alert("Session Expire"+prefs.getString("LoginExpire"));
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  }
﻿  ﻿  }
﻿  ﻿  else
﻿  ﻿  {
﻿  ﻿  //alert("inside else cond");
﻿  ﻿  ﻿  ﻿  hours = currentTime.getHours()+4;
﻿  ﻿  ﻿  ﻿  if(hours>24)
﻿  ﻿  ﻿  ﻿  {
﻿  ﻿  ﻿  ﻿  hours=hours-24;
﻿  ﻿  ﻿  ﻿  day = currentTime.getDate()+1;
﻿  ﻿  ﻿  ﻿  }
﻿  ﻿  ﻿  ﻿  sessionTime=month + "/" + day + "/" + year+":"+hours+":"+minutes;
﻿  ﻿  ﻿  ﻿  //alert("inside else cond sessionTime :"+sessionTime);
﻿  ﻿  ﻿  ﻿  prefs.set("LoginExpire",sessionTime);
﻿  ﻿  ﻿  ﻿  //alert("Session Expire"+prefs.getString("LoginExpire"));
﻿  ﻿  }
﻿  ﻿  ﻿  
﻿  }
﻿  }
function emailLoginrequest() {
 /* alert("inside login request");
   alert("inside login request Login Name :"+prefs.getString("LoginName"));
   alert("inside login request Session Expire time :"+prefs.getString("LoginExpire"));
   alert("inside login request System Time:"+sessionTime);
  alert("authURL :"+authURL);*/
﻿  var str1=prefs.getString("LoginExpire");
﻿  var str2=sessionTime;
﻿  var monthval=str1.substring(0,str1.indexOf("/"));
﻿  str1=str1.substring(str1.indexOf("/")+1)
﻿  var dateval=str1.substring(0,str1.indexOf("/"));
﻿  str1=str1.substring(str1.indexOf("/")+1)
﻿  var yearval=str1.substring(0,str1.indexOf(":"));
﻿  str1=str1.substring(str1.indexOf(":")+1)
﻿  var hourval=str1.substring(0,str1.indexOf(":"));
﻿  str1=str1.substring(str1.indexOf(":")+1)
﻿  var minuteval=str1.substring(0);
﻿  var monthval1=str2.substring(0,str2.indexOf("/"));
﻿  str2=str2.substring(str2.indexOf("/")+1)
﻿  var dateval1=str2.substring(0,str2.indexOf("/"));
﻿  str2=str2.substring(str2.indexOf("/")+1)
﻿  var yearval1=str2.substring(0,str2.indexOf(":"));
﻿  str2=str2.substring(str2.indexOf(":")+1)
﻿  var hourval1=str2.substring(0,str2.indexOf(":"));
﻿  str2=str2.substring(str2.indexOf(":")+1)
﻿  var minuteval1=str2.substring(0);
﻿  
﻿  var date1 = new Date(yearval, monthval, dateval,hourval,minuteval);
    var date2 = new Date(yearval1, monthval1, dateval1,hourval1,minuteval1);
//alert("date1:"+date1);
//alert("date2:"+date2);
prefs.set("LoginExpire",null);
﻿      ﻿    if(date2>date1||prefs.getString("LoginExpire")==null||prefs.getString("LoginExpire")=="")
﻿      ﻿  ﻿    {
    ﻿     // alert("inside login request if condition System Time:"+sessionTime);

﻿      ﻿  ﻿    ﻿  $(".debugVal").hide('fast');
﻿      ﻿  ﻿    ﻿  $(".msg_list").hide('fast');
﻿      ﻿  ﻿    ﻿  gadgets.window.adjustHeight(0);
﻿      ﻿  ﻿   // ﻿  alert("inside request method");
             //    alert("inside request method url :"+authURL);
﻿      ﻿  ﻿    ﻿  var params = {};
﻿      ﻿  ﻿      // params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.TEXT;  -- Commented By Venkatesan
                 params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.JSON  // Added By Venkatesan
﻿      ﻿  ﻿    ﻿  params['AUTHORIZATION'] = 'SIGNED';
﻿      ﻿  ﻿    ﻿  params['OAUTH_ADD_EMAIL'] = 'true';
﻿      ﻿  ﻿    ﻿  params['OAUTH_ENABLE_PRIVATE_NETWORK'] = 'false';
﻿      ﻿  ﻿    //﻿  gadgets.io.makeRequest(url,emailLoginResponse,params);  -- Commented By Venkatesan
                gadgets.io.makeRequest(authURL,emailLoginResponse,params);  // Added By Venkatesan
               
﻿      ﻿  ﻿    }
﻿      ﻿    else
﻿      ﻿  ﻿    {
﻿  ﻿  ﻿  ﻿  //﻿  alert("inside login request else condition Loginname:"+prefs.getString("LoginName"));
﻿      ﻿  ﻿   if(prefs.getString("LoginName")==null||prefs.getString("LoginName")=="")
﻿      ﻿  ﻿  ﻿  ﻿    {}
﻿  ﻿  ﻿  ﻿  ﻿  ﻿    else
﻿  ﻿  ﻿  ﻿  ﻿  ﻿    {
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  //  alert("inside login request else if condition Loginname:"+prefs.getString("LoginName"));
﻿      ﻿  ﻿   ﻿  ﻿    document.getElementById('owner').value=prefs.getString("LoginName");
﻿  ﻿      ﻿  ﻿    ﻿  gadgets.window.adjustHeight(60);
﻿      ﻿  ﻿  ﻿    }
﻿      ﻿  ﻿  ﻿  ﻿    
﻿      ﻿  ﻿    }
﻿        };
function limitText(limitField, limitNum)
{
   if (limitField.value.length > limitNum) 
   {
       limitField.value = limitField.value.substring(0, limitNum);
   } 
   }
function makeCachedRequest(url, callback, params, refreshInterval)
{   
debug("Inside clemakeCachedRequesthod Begin","");
debug("SOAPURL",url);
debug("Referesh Interval",refreshInterval);



var ts = new Date().getTime();   var sep = "?";   
if (refreshInterval && refreshInterval > 0) 
{     ts = Math.floor(ts / (refreshInterval * 1000));   }  
if (url.indexOf("?") > -1) {     sep = "&";   }   
url = [ url, sep, "nocache=", ts ].join(""); 
gadgets.io.makeRequest(url, callback, params);
debug("Inside clemakeCachedRequesthod End","");

} 


