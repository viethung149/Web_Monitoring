const number_battery = 8;
const URL_battery_cell = "https://monitoringbattery-5496a-default-rtdb.asia-southeast1.firebasedatabase.app/battery_cells.json"
const URL_battery_package ="https://monitoringbattery-5496a-default-rtdb.asia-southeast1.firebasedatabase.app/battery_packages.json"
const URL_pheripheral ="https://monitoringbattery-5496a-default-rtdb.asia-southeast1.firebasedatabase.app/pheripherals.json"
const URL_voltage = "https://monitoringbattery-5496a-default-rtdb.asia-southeast1.firebasedatabase.app/voltage_cells.json"
const URL_temperature = "https://monitoringbattery-5496a-default-rtdb.asia-southeast1.firebasedatabase.app/temperature_cells.json"
const URL_current  = "https://monitoringbattery-5496a-default-rtdb.asia-southeast1.firebasedatabase.app/current_packages.json"
const URL_warning_voltage = "https://monitoringbattery-5496a-default-rtdb.asia-southeast1.firebasedatabase.app/warning_voltage_cells.json"
const URL_warning_temperature = "https://monitoringbattery-5496a-default-rtdb.asia-southeast1.firebasedatabase.app/warning_temperature_cells.json"
const URL_database_cell_infor ="http://116.102.225.66:8000/api/getTableCellInfo"
const URL_database_package_infor ="http://116.102.225.66:8000/api/getTablePackageInfo"
const URL_database_peripheral_infor ="http://116.102.225.66:8000/api/getTablePeripheral"
const RELAY1_PACKAGE1 =0
const RELAY2_PACKAGE2=1
const RELAY3_FAN1 =2
const RELAY4_FAN2 =3
// TABLE BATTERY
let cell_column_voltage = []; 
let cell_column_temperature = [];
let cell_column_Balance = [];
let cell_column_warning_voltage = [];
let cell_column_warning_temperature = [];
let cell_column_time;
// TABLE PACKAGE
let package_column_voltage =[];
let package_column_temperature = [];
let package_column_current = [];
let package_column_balance = [];
let package_column_connection = [];
let package_column_warning =[];
let package_time;
// TABLE PHERIPHERAL
let pheripheral_column_status = [];
let pheripheral_time; 
// addition information
let voltage_cells = [];
let temperature_cells=[];
let current_packages =[];
let warning_voltage =[];
let warning_temperature=[];


// function httpGET 
function httpGet(theUrl)
	{
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.onreadystatechange = function(){
    		if (this.readyState == 4 && this.status == 200) {
   				console.log("READY GET");
			}
	    };
	    xmlHttp.open( "GET", theUrl, false); // false for synchronous request
	    xmlHttp.send( null );
	    return xmlHttp.responseText;
	}
function render_battery_infor(){
	console.log("render cells information")
	document.getElementById("Bat_1_vol").innerHTML = cell_column_voltage[0].toFixed(3)
	document.getElementById("Bat_1_tem").innerHTML = cell_column_temperature[0].toFixed(3)
	// document.getElementById("Bat_1_bla").innerHTML = cell_column_Balance[0]
	document.getElementById("Bat_1_wvol").innerHTML = cell_column_warning_voltage[0] =="true"?"Emergency":"Normal";
	document.getElementById("Bat_1_wtem").innerHTML = cell_column_warning_temperature[0]=="true"?"Emergency":"Normal";
	document.getElementById("Bat_1_time").innerHTML = cell_column_time
    
	document.getElementById("Bat_2_vol").innerHTML = cell_column_voltage[1].toFixed(3)
	document.getElementById("Bat_2_tem").innerHTML = cell_column_temperature[1].toFixed(3)
	// document.getElementById("Bat_2_bla").innerHTML = cell_column_Balance[1]
	document.getElementById("Bat_2_wvol").innerHTML = cell_column_warning_voltage[1]=="true"?"Emergency":"Normal";
	document.getElementById("Bat_2_wtem").innerHTML = cell_column_warning_temperature[1]=="true"?"Emergency":"Normal";
	document.getElementById("Bat_2_time").innerHTML = cell_column_time


	document.getElementById("Bat_3_vol").innerHTML = cell_column_voltage[2].toFixed(3)
	document.getElementById("Bat_3_tem").innerHTML = cell_column_temperature[2].toFixed(3)
	// document.getElementById("Bat_3_bla").innerHTML = cell_column_Balance[2]
	document.getElementById("Bat_3_wvol").innerHTML = cell_column_warning_voltage[2]=="true"?"Emergency":"Normal";
	document.getElementById("Bat_3_wtem").innerHTML = cell_column_warning_temperature[2]=="true"?"Emergency":"Normal";
	document.getElementById("Bat_3_time").innerHTML = cell_column_time

	document.getElementById("Bat_4_vol").innerHTML = cell_column_voltage[3].toFixed(3)
	document.getElementById("Bat_4_tem").innerHTML = cell_column_temperature[3].toFixed(3)
	// document.getElementById("Bat_4_bla").innerHTML = cell_column_Balance[3]
	document.getElementById("Bat_4_wvol").innerHTML = cell_column_warning_voltage[3]=="true"?"Emergency":"Normal";
	document.getElementById("Bat_4_wtem").innerHTML = cell_column_warning_temperature[3]=="true"?"Emergency":"Normal";
	document.getElementById("Bat_4_time").innerHTML = cell_column_time

	document.getElementById("Bat_5_vol").innerHTML = cell_column_voltage[4].toFixed(3)
	document.getElementById("Bat_5_tem").innerHTML = cell_column_temperature[4].toFixed(3)
	// document.getElementById("Bat_5_bla").innerHTML = cell_column_Balance[4]
	document.getElementById("Bat_5_wvol").innerHTML = cell_column_warning_voltage[4]=="true"?"Emergency":"Normal";
	document.getElementById("Bat_5_wtem").innerHTML = cell_column_warning_temperature[4]=="true"?"Emergency":"Normal";
	document.getElementById("Bat_5_time").innerHTML = cell_column_time

	document.getElementById("Bat_6_vol").innerHTML = cell_column_voltage[5].toFixed(3)
	document.getElementById("Bat_6_tem").innerHTML = cell_column_temperature[5].toFixed(3)
	// document.getElementById("Bat_6_bla").innerHTML = cell_column_Balance[5]
	document.getElementById("Bat_6_wvol").innerHTML = cell_column_warning_voltage[5]=="true"?"Emergency":"Normal";
	document.getElementById("Bat_6_wtem").innerHTML = cell_column_warning_temperature[5]=="true"?"Emergency":"Normal";
	document.getElementById("Bat_6_time").innerHTML = cell_column_time

	document.getElementById("Bat_7_vol").innerHTML = cell_column_voltage[6].toFixed(3)
	document.getElementById("Bat_7_tem").innerHTML = cell_column_temperature[6].toFixed(3)
	// document.getElementById("Bat_7_bla").innerHTML = cell_column_Balance[6]
	document.getElementById("Bat_7_wvol").innerHTML = cell_column_warning_voltage[6]=="true"?"Emergency":"Normal";
	document.getElementById("Bat_7_wtem").innerHTML = cell_column_warning_temperature[6]=="true"?"Emergency":"Normal";
	document.getElementById("Bat_7_time").innerHTML = cell_column_time

	document.getElementById("Bat_8_vol").innerHTML = cell_column_voltage[7].toFixed(3)
	document.getElementById("Bat_8_tem").innerHTML = cell_column_temperature[7].toFixed(3)
	// document.getElementById("Bat_8_bla").innerHTML = cell_column_Balance[7]
	document.getElementById("Bat_8_wvol").innerHTML = cell_column_warning_voltage[7]=="true"?"Emergency":"Normal";
	document.getElementById("Bat_8_wtem").innerHTML = cell_column_warning_temperature[7]=="true"?"Emergency":"Normal";
	document.getElementById("Bat_8_time").innerHTML = cell_column_time

}
function render_packages_infor(){
	console.log("render packages information")
	document.getElementById("pac1_capacity").innerHTML = package_column_voltage[0].toFixed(3)
	document.getElementById("pac1_temperature").innerHTML = package_column_temperature[0].toFixed(3)
	document.getElementById("pac1_curent").innerHTML =  package_column_current[0].toFixed(3)
	// document.getElementById("pac1_balance").innerHTML = package_column_warning[0]
	document.getElementById("pac1_connect").innerHTML = package_column_connection[0]
	document.getElementById("pac1_warning").innerHTML = package_column_warning[0]=="true"?"Emergency":"Normal";
	document.getElementById("pac1_time").innerHTML = package_time

	document.getElementById("pac2_capacity").innerHTML = package_column_voltage[1].toFixed(3)
	document.getElementById("pac2_temperature").innerHTML = package_column_temperature[1].toFixed(3)
	document.getElementById("pac2_curent").innerHTML =  package_column_current[1].toFixed(3)
	// document.getElementById("pac2_balance").innerHTML = package_column_warning[1]
	document.getElementById("pac2_connect").innerHTML = package_column_connection[1]
	document.getElementById("pac2_warning").innerHTML = package_column_warning[1]=="true"?"Emergency":"Normal";
	document.getElementById("pac2_time").innerHTML = package_time

	// document.getElementById("pac3_capacity").innerHTML = package_column_voltage[2].toFixed(3)
	// document.getElementById("pac3_temperature").innerHTML = package_column_temperature[2].toFixed(3)
	// document.getElementById("pac3_curent").innerHTML =  package_column_current[2].toFixed(3)
	// // document.getElementById("pac3_balance").innerHTML = package_column_warning[2]
	// document.getElementById("pac3_connect").innerHTML = package_column_connection[2]
	// document.getElementById("pac3_warning").innerHTML = package_column_warning[2]
	// document.getElementById("pac3_time").innerHTML = package_time

}
function render_pheripheral_infor(){
	console.log("render pheripheral information")
	document.getElementById("replay 1").innerHTML = pheripheral_column_status[RELAY1_PACKAGE1];
	document.getElementById("relay1_time").innerHTML = pheripheral_time;

	document.getElementById("replay 2").innerHTML =  pheripheral_column_status[RELAY2_PACKAGE2];
	document.getElementById("relay2_time").innerHTML = pheripheral_time;

	document.getElementById("replay 3").innerHTML = pheripheral_column_status[RELAY3_FAN1];
	document.getElementById("relay3_time").innerHTML = pheripheral_time;

	document.getElementById("replay 4").innerHTML = pheripheral_column_status[RELAY4_FAN2];
	document.getElementById("relay4_time").innerHTML = pheripheral_time;
}


function get_infor_cells_database(){
	console.log("HTTP request for cells information from database")
	// battery_cells
	var json_infor = httpGet(URL_database_cell_infor);
	var objInfor = JSON.parse(json_infor);
	console.log(objInfor);
	// get voltage
	cell_column_voltage[0]=parseFloat(objInfor.VoltageCell_1);
	cell_column_voltage[1]=parseFloat(objInfor.VoltageCell_2);
	cell_column_voltage[2]=parseFloat(objInfor.VoltageCell_3);
	cell_column_voltage[3]=parseFloat(objInfor.VoltageCell_4);
	cell_column_voltage[4]=parseFloat(objInfor.VoltageCell_5);
	cell_column_voltage[5]=parseFloat(objInfor.VoltageCell_6);
	cell_column_voltage[6]=parseFloat(objInfor.VoltageCell_7);
	cell_column_voltage[7]=parseFloat(objInfor.VoltageCell_8);
	console.log(cell_column_voltage);
	// get temperature
	cell_column_temperature[0]=parseFloat(objInfor.TemperatureCell_1);
	cell_column_temperature[1]=parseFloat(objInfor.TemperatureCell_2);
	cell_column_temperature[2]=parseFloat(objInfor.TemperatureCell_3);
	cell_column_temperature[3]=parseFloat(objInfor.TemperatureCell_4);
	cell_column_temperature[4]=parseFloat(objInfor.TemperatureCell_5);
	cell_column_temperature[5]=parseFloat(objInfor.TemperatureCell_6);
	cell_column_temperature[6]=parseFloat(objInfor.TemperatureCell_7);
	cell_column_temperature[7]=parseFloat(objInfor.TemperatureCell_8);
	console.log(cell_column_temperature);

	//get voltage status
	cell_column_warning_voltage[0]=objInfor.VoltageStatus_1;
	cell_column_warning_voltage[1]=objInfor.VoltageStatus_2;
	cell_column_warning_voltage[2]=objInfor.VoltageStatus_3;
	cell_column_warning_voltage[3]=objInfor.VoltageStatus_4;
	cell_column_warning_voltage[4]=objInfor.VoltageStatus_5;
	cell_column_warning_voltage[5]=objInfor.VoltageStatus_6;
	cell_column_warning_voltage[6]=objInfor.VoltageStatus_7;
	cell_column_warning_voltage[7]=objInfor.VoltageStatus_8;
	console.log(cell_column_warning_voltage);
	
	//get temperature status
	cell_column_warning_temperature[0]= objInfor.TemperatureStatus_1;
	cell_column_warning_temperature[1]= objInfor.TemperatureStatus_2;
	cell_column_warning_temperature[2]= objInfor.TemperatureStatus_3;
	cell_column_warning_temperature[3]= objInfor.TemperatureStatus_4;
	cell_column_warning_temperature[4]= objInfor.TemperatureStatus_5;
	cell_column_warning_temperature[5]= objInfor.TemperatureStatus_6;
	cell_column_warning_temperature[6]= objInfor.TemperatureStatus_7;
	cell_column_warning_temperature[7]= objInfor.TemperatureStatus_8;
	console.log(cell_column_warning_temperature);

	// time 
	cell_column_time = objInfor.updated_at;
}
function get_infor_packages_database(){
	console.log("HTTP request for packages information from database")
	// get packages json infor
	var json_package = httpGet(URL_database_package_infor);
	var objPackage = JSON.parse(json_package);
	//get voltage
	package_column_voltage[0]=parseFloat(objPackage.VoltagePackage_1);
	package_column_voltage[1]=parseFloat(objPackage.VoltagePackage_2);
	package_column_voltage[2]=parseFloat(objPackage.VoltagePackage_3);
	//get temperature
	package_column_temperature[0]=parseFloat(objPackage.TemperaturePackage_1);
	package_column_temperature[1]=parseFloat(objPackage.TemperaturePackage_2);
	package_column_temperature[2]=parseFloat(objPackage.TemperaturePackage_3);
	//get current
	package_column_current[0]=parseFloat(objPackage.CurrentPackage_1);
	package_column_current[1]=parseFloat(objPackage.CurrentPackage_2);
	package_column_current[2]=parseFloat(objPackage.CurrentPackage_3);
	//get connect
	package_column_connection[0] = objPackage.ConnectPackage_1;
	package_column_connection[1] = objPackage.ConnectPackage_2;
	package_column_connection[2] = objPackage.ConnectPackage_3;
	//get status
	package_column_warning[0]=objPackage.StatusVoltagePackage_1 && objPackage.StatusTemperaturePackage_1
	package_column_warning[1]=objPackage.StatusVoltagePackage_2 && objPackage.StatusTemperaturePackage_2
	package_column_warning[2]=objPackage.StatusVoltagePackage_3 && objPackage.StatusTemperaturePackage_3
	//get time
	package_time= objPackage.updated_at;
}
function get_infor_peripheral_database(){
	console.log("HTTP request for pheripheral information from database")
	var json_pheripheral = httpGet(URL_database_peripheral_infor);
	var objPheripheral= JSON.parse(json_pheripheral);
	//get status pheripheral
	pheripheral_column_status[0] = objPheripheral.Peripheral_1?"ON":"OFF";
	pheripheral_column_status[1] = objPheripheral.Peripheral_2?"ON":"OFF";
	pheripheral_column_status[2] = objPheripheral.Peripheral_3?"ON":"OFF";
	pheripheral_column_status[3] = objPheripheral.Peripheral_4?"ON":"OFF";
    //get time
	pheripheral_time = objPheripheral.updated_at;
}


//use database to update table cells
function update_cells_database(){
	get_infor_cells_database();
	render_battery_infor();
}
//use database to update table packages
function update_packages_database(){
	get_infor_packages_database()
	render_packages_infor();
}
//use database to update table pheripheral
function update_peripheral_database(){
	get_infor_peripheral_database();
	render_pheripheral_infor();
}