"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
var mysql = require('mysql');
const app = express();
//initialize a simple http server
const server = http.createServer(app);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});

con.connect(function(err) {
  if (err) throw err;
  console.log(new Date(new Date().toUTCString()));
  console.log("Connected!");
});


wss.on('connection', (ws) => {
    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {
        //log the received message and send it back to the client
        console.log('received: %s', message);
		 ws.send(message);
        //const obj = JSON.parse(message);
        //var returnJson = parseJsonAsyncFunc(message);
         retunValueToServerFunc(message, function (response) {
            // Here you have access to your variable
            console.log(response);
            ws.send(response);
        }); 
    });
	
    //send immediatly a feedback to the incoming connection    
    ws.send('[2,"13119","BootNotification",{"chargePointModel":"HE517936","chargePointSerialNumber":"Z99999999999799","chargePointVendor":"Exicom","firmwareVersion":"35.15.7.83_35.10.4"}]');
});
//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log("startted");
});
function retunValueToServerFunc(jsonString, callback) {
    const recivedJson = JSON.parse(jsonString);
    var recivedCommand = recivedJson[2];
    console.log(recivedJson[2]);
    var data = "";
    if (recivedCommand == "BootNotification") {
        console.log("Test");
        let curTime = getCurDateTime();
        data = '[3,' + recivedJson[1] + ',{"status":"Accepted","currentTime":"' + curTime + '","interval":300}]';
    }
    else if (recivedCommand == "Heartbeat") {
        let curTime = getCurDateTime();
        data = '[3,' + recivedJson[1] + ',{"currentTime":"' + curTime + '"}]';
    }
    else if (recivedCommand == "StatusNotification") {
        data = '[3,' + recivedJson[1] + ',{}]';
    }
    else if (recivedCommand == "MeterValues") {
        data = '[3,' + recivedJson[1] + ',{}]';
    }
    else if (recivedCommand == "Authorize") {
        let curTime = getCurDateTime();
        data = '[3,' + recivedJson[1] + ',{"idTagInfo":{"expiryDate":"' + curTime + '","parentIdTag":"","status":"Accepted"}}]';
    }
    else if (recivedCommand == "StartTransaction") {
        let curTime = getCurDateTime();
        data = '[3,' + recivedJson[1] + ',{"idTagInfo":{"expiryDate":"' + curTime + '","parentIdTag":"","status":"Accepted"}}]';
    }
    else if (recivedCommand == "StopTransaction") {
        let curTime = getCurDateTime();
        data = '[3,' + recivedJson[1] + ',{"idTagInfo":{"expiryDate":"' + curTime + '","parentIdTag":"","status":"Accepted"}}]';
    }
    else if (recivedCommand == "RemoteStartTransaction") {
       // data = '[3,' + recivedJson[1] + ',{"status":"Accepted"}]';
	   data = jsonString;
    }
    else if (recivedCommand == "RemoteStopTransaction") {
        //data = '[3,' + recivedJson[1] + ',{"status":"Accepted"}]';
		data = jsonString;
    }
    else if (recivedCommand == "ChangeAvailability") {
        //data = '[3,' + recivedJson[1] + ',{"status":"Accepted"}]';
		data = jsonString;
    }
    else if (recivedCommand == "ClearCache") {
       // data = '[3,' + recivedJson[1] + ',{"status":"Accepted"}]';
	   data = jsonString;
    }
    else if (recivedCommand == "GetConfiguration") {
       // data = '[3,' + recivedJson[1] + ',{"configurationKey":[{"key":"HeartbeatInterval","readonly":false,"value":"10"}],"unknownKey":null}]';
	   data = jsonString;
    }
    else if (recivedCommand == "Reset") {
        //data = '[3,' + recivedJson[1] + ',{"status":"Accepted"}]';
		data = jsonString;
    }
	else if(recivedCommand == "TriggerMessage"){
		data = jsonString;
	}
	else if(recivedCommand == "UnlockConnector"){
		data = jsonString;
	}
	else if(recivedCommand == "ChangeConfiguration"){
		data = jsonString;
	}
	else if(recivedCommand == "UpdateFirmware"){
		data = jsonString;
	}
	else if(recivedCommand == "GetDiagnostics"){
		data = jsonString;
	}else if(recivedCommand == "SendLocalList"){
		data = jsonString;
	}
	else if(recivedCommand == "GetLocalListVersion")
	{
		data = jsonString;
	}
	else if(recivedCommand == "DataTransfer"){
		data = jsonString;
	}
	
    return callback(data);
}
function getCurDateTime() {
	
   /*  let date_ob = new Date();
    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours();
    // current minutes
    let minutes = date_ob.getMinutes();
    // current seconds
    let seconds = date_ob.getSeconds();
    // prints date in YYYY-MM-DD format
    console.log(year + "-" + month + "-" + date);
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
    let curdateTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds; */
    return new Date(new Date().toUTCString());
}
//# sourceMappingURL=server.js.map