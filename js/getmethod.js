const number_battery = 8;
const URL_battery_cell = "https://monitoringbattery-5496a-default-rtdb.asia-southeast1.firebasedatabase.app/battery_cells.json"
const URL_battery_package ="https://monitoringbattery-5496a-default-rtdb.asia-southeast1.firebasedatabase.app/battery_packages.json"
const URL_pheripheral ="https://monitoringbattery-5496a-default-rtdb.asia-southeast1.firebasedatabase.app/pheripherals.json"
const URL_voltage = "https://monitoringbattery-5496a-default-rtdb.asia-southeast1.firebasedatabase.app/voltage_cells.json"
const URL_temperature = "https://monitoringbattery-5496a-default-rtdb.asia-southeast1.firebasedatabase.app/temperature_cells.json"
const URL_current  = "https://monitoringbattery-5496a-default-rtdb.asia-southeast1.firebasedatabase.app/current_packages.json"
const URL_warning_voltage = "https://monitoringbattery-5496a-default-rtdb.asia-southeast1.firebasedatabase.app/warning_voltage_cells.json"
const URL_warning_temperature = "https://monitoringbattery-5496a-default-rtdb.asia-southeast1.firebasedatabase.app/warning_temperature_cells.json"
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
// TABLE PACKAGE
let package_column_voltage =[]
let package_column_temperature = []
let package_column_current = []
let package_column_balance = []
let package_column_connection = []
let package_column_warning =[]
// TABLE PHERIPHERAL
let pheripheral_column_status = [] 
// addition information
let voltage_cells = [];
let temperature_cells=[];
let current_packages =[];
let warning_voltage =[];
let warning_temperature=[];

var timer 
for(let i = 0; i<number_battery ;i++)
{
	cell_column_voltage.push(0);

}


console.log(cell_column_voltage);
function test_on_click(){
	console.log("Hey You click me")
}
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
function test_json(){
var  str = '{ "company":"facebook","CEO":"Mark Zuckerberg","employees":[{"name": "John","age": 25},{"name": "Anna","age": 29}]}' ;

var obj = JSON.parse(str); // đây là object javascript được tạo từ chuỗi JSON

/* truy cập vào thuộc tính JSON bằng tên thuộc tính */
console.log(obj.company) ;           // facebook
console.log(obj.CEO);
console.log(typeof obj.employees[0].name) ; // John
console.log(obj.employees[1].name) ; // Anna
}
function get_cells_infor(){
	// battery_cells
	var json_infor = httpGet(URL_battery_cell);
	var objInfor = JSON.parse(json_infor);
	// get value by key
	var size_array_infor = objInfor.CellsInformation.length;
	var cellsInfor = objInfor.CellsInformation;
	for(let i = 0; i < size_array_infor ; i++){
		cell_column_voltage[i] = cellsInfor[i].Voltage;
		cell_column_temperature[i] = cellsInfor[i].Temperature;
		cell_column_Balance[i] = cellsInfor[i].Balance;
		cell_column_warning_voltage[i] = cellsInfor[i].WarningVoltage;
		cell_column_warning_temperature[i] = cellsInfor[i].WarningTemperature;
	};
	// for(let i = 0; i < size_array_infor ; i++){
	// 	console.log(cell_column_voltage[i],
	// 				cell_column_temperature[i],
	// 				cell_column_Balance[i],
	// 				cell_column_warning_voltage[i],
	// 				cell_column_warning_temperature[i])
	// }
	// timer = setInterval(update_data_cells_infor, 5000);
}
function get_packages_infor(){
	// get packages json infor
	var json_package = httpGet(URL_battery_package);
	var objPackage = JSON.parse(json_package);
	// get value by key
	var size_array_package = objPackage.PackagesInformation.length;
	var packageInfor = objPackage.PackagesInformation;
	for(let i = 0; i < size_array_package ; i++){
		package_column_voltage[i] = packageInfor[i].Voltage;
		package_column_temperature[i] = packageInfor[i].Temperature;
		package_column_current[i] = packageInfor[i].Current;
		package_column_balance[i] = packageInfor[i].Balance;
		package_column_connection[i] = packageInfor[i].Connect;
		package_column_warning[i] = packageInfor[i].Warning;
	};
	// for(let i = 0; i < size_array_package ; i++){
	// 	console.log(package_column_voltage[i],
	// 				package_column_temperature[i],
	// 				package_column_current[i],
	// 				package_column_balance[i],
	// 				package_column_connection[i],
	// 				package_column_warning[i])
	// }
}
function get_pheripheral_infor(){
	// get pheripheral json 
	var json_pheripheral = httpGet(URL_pheripheral);
	var objPheripheral= JSON.parse(json_pheripheral);
	var array = Object.values(objPheripheral.PackagesInformation)
	var size_pheripheral = array.length
	for(let i = 0 ; i < size_pheripheral; i++){
		pheripheral_column_status[i] = array[i];
	}
	// for(let i = 0 ; i < size_pheripheral; i++){
	// 	console.log(pheripheral_column_status[i])
	// }
}
function get_cells_voltage(){
	// get pheripheral json 
	var json_voltage = httpGet(URL_voltage);
	var objVoltage= JSON.parse(json_voltage);
	var array = Object.values(objVoltage.voltages);
	var size_array = array.length;
	for(let i = 0 ;i < size_array; i++){
		voltage_cells[i] = array[i];
	}
	for(let i = 0 ;i < size_array; i++){
		console.log(voltage_cells[i]);
	}
}
function get_cells_temperature(){
	// get pheripheral json 
	var json_temperature = httpGet(URL_temperature);
	var objTemperature= JSON.parse(json_temperature);
	var array = Object.values(objTemperature.temperatures);
	var size_array = array.length;
	for(let i = 0 ;i < size_array; i++){
		temperature_cells[i] = array[i];
	}
	for(let i = 0 ;i < size_array; i++){
		console.log(temperature_cells[i]);
	}
}
function get_packages_current(){
	// get pheripheral json 
	var json_current = httpGet(URL_current);
	var objCurrent= JSON.parse(json_current);
	var array = Object.values(objCurrent.currents);
	var size_array = array.length;
	for(let i = 0 ;i < size_array; i++){
		current_packages[i] = array[i];
	}
	for(let i = 0 ;i < size_array; i++){
		console.log(current_packages[i]);
	}
}
function get_warning_voltage_infor(){
	// get pheripheral json 
	var json_warning_voltage = httpGet(URL_warning_voltage);
	var objWarningVoltage= JSON.parse(json_warning_voltage);
	var array = Object.values(objWarningVoltage.statusVoltages);
	var size_array = array.length;
	for(let i = 0 ;i < size_array; i++){
		warning_voltage[i] = array[i];
	}
	for(let i = 0 ;i < size_array; i++){
		console.log(warning_voltage[i]);
	}
}
function get_warning_temperature_infor(){
	// get pheripheral json 
	var json_warning_temperature = httpGet(URL_warning_temperature);
	var objWarningTemperature= JSON.parse(json_warning_temperature);
	var array = Object.values(objWarningTemperature.StatusTemperatures);
	var size_array = array.length;
	for(let i = 0 ;i < size_array; i++){
		warning_temperature[i] = array[i];
	}
	for(let i = 0 ;i < size_array; i++){
		console.log(warning_temperature[i]);
	}
}
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function turn_off_request(){
	clearInterval(timer);
}
function data_battery_infor(){
	document.getElementById("Bat_1_vol").innerHTML = cell_column_voltage[0].toFixed(3)
	document.getElementById("Bat_1_tem").innerHTML = cell_column_temperature[0].toFixed(3)
	document.getElementById("Bat_1_bla").innerHTML = cell_column_Balance[0]
	document.getElementById("Bat_1_wvol").innerHTML = cell_column_warning_voltage[0]
	document.getElementById("Bat_1_wtem").innerHTML = cell_column_warning_temperature[0]

	document.getElementById("Bat_2_vol").innerHTML = cell_column_voltage[1].toFixed(3)
	document.getElementById("Bat_2_tem").innerHTML = cell_column_temperature[1].toFixed(3)
	document.getElementById("Bat_2_bla").innerHTML = cell_column_Balance[1]
	document.getElementById("Bat_2_wvol").innerHTML = cell_column_warning_voltage[1]
	document.getElementById("Bat_2_wtem").innerHTML = cell_column_warning_temperature[1]

	document.getElementById("Bat_3_vol").innerHTML = cell_column_voltage[2].toFixed(3)
	document.getElementById("Bat_3_tem").innerHTML = cell_column_temperature[2].toFixed(3)
	document.getElementById("Bat_3_bla").innerHTML = cell_column_Balance[2]
	document.getElementById("Bat_3_wvol").innerHTML = cell_column_warning_voltage[2]
	document.getElementById("Bat_3_wtem").innerHTML = cell_column_warning_temperature[2]

	document.getElementById("Bat_4_vol").innerHTML = cell_column_voltage[3].toFixed(3)
	document.getElementById("Bat_4_tem").innerHTML = cell_column_temperature[3].toFixed(3)
	document.getElementById("Bat_4_bla").innerHTML = cell_column_Balance[3]
	document.getElementById("Bat_4_wvol").innerHTML = cell_column_warning_voltage[3]
	document.getElementById("Bat_4_wtem").innerHTML = cell_column_warning_temperature[3]

	document.getElementById("Bat_5_vol").innerHTML = cell_column_voltage[4].toFixed(3)
	document.getElementById("Bat_5_tem").innerHTML = cell_column_temperature[4].toFixed(3)
	document.getElementById("Bat_5_bla").innerHTML = cell_column_Balance[4]
	document.getElementById("Bat_5_wvol").innerHTML = cell_column_warning_voltage[4]
	document.getElementById("Bat_5_wtem").innerHTML = cell_column_warning_temperature[4]

	document.getElementById("Bat_6_vol").innerHTML = cell_column_voltage[5].toFixed(3)
	document.getElementById("Bat_6_tem").innerHTML = cell_column_temperature[5].toFixed(3)
	document.getElementById("Bat_6_bla").innerHTML = cell_column_Balance[5]
	document.getElementById("Bat_6_wvol").innerHTML = cell_column_warning_voltage[5]
	document.getElementById("Bat_6_wtem").innerHTML = cell_column_warning_temperature[5]

	document.getElementById("Bat_7_vol").innerHTML = cell_column_voltage[6].toFixed(3)
	document.getElementById("Bat_7_tem").innerHTML = cell_column_temperature[6].toFixed(3)
	document.getElementById("Bat_7_bla").innerHTML = cell_column_Balance[6]
	document.getElementById("Bat_7_wvol").innerHTML = cell_column_warning_voltage[6]
	document.getElementById("Bat_7_wtem").innerHTML = cell_column_warning_temperature[6]

	document.getElementById("Bat_8_vol").innerHTML = cell_column_voltage[7].toFixed(3)
	document.getElementById("Bat_8_tem").innerHTML = cell_column_temperature[7].toFixed(3)
	document.getElementById("Bat_8_bla").innerHTML = cell_column_Balance[7]
	document.getElementById("Bat_8_wvol").innerHTML = cell_column_warning_voltage[7]
	document.getElementById("Bat_8_wtem").innerHTML = cell_column_warning_temperature[7]
}
function data_packages_infor(){
	document.getElementById("pac1_capacity").innerHTML = package_column_voltage[0].toFixed(3)
	document.getElementById("pac1_temperature").innerHTML = package_column_temperature[0].toFixed(3)
	document.getElementById("pac1_curent").innerHTML =  package_column_current[0]
	document.getElementById("pac1_balance").innerHTML = package_column_warning[0]
	document.getElementById("pac1_connect").innerHTML = package_column_connection[0]
	document.getElementById("pac1_warning").innerHTML = package_column_warning[0]

	document.getElementById("pac2_capacity").innerHTML = package_column_voltage[1].toFixed(3)
	document.getElementById("pac2_temperature").innerHTML = package_column_temperature[1].toFixed(3)
	document.getElementById("pac2_curent").innerHTML =  package_column_current[1]
	document.getElementById("pac2_balance").innerHTML = package_column_warning[1]
	document.getElementById("pac2_connect").innerHTML = package_column_connection[1]
	document.getElementById("pac2_warning").innerHTML = package_column_warning[1]

	document.getElementById("pac3_capacity").innerHTML = package_column_voltage[2].toFixed(3)
	document.getElementById("pac3_temperature").innerHTML = package_column_temperature[2].toFixed(3)
	document.getElementById("pac3_curent").innerHTML =  package_column_current[2]
	document.getElementById("pac3_balance").innerHTML = package_column_warning[2]
	document.getElementById("pac3_connect").innerHTML = package_column_connection[2]
	document.getElementById("pac3_warning").innerHTML = package_column_warning[2]
}
function data_pheripheral_infor(){
	document.getElementById("replay 1").innerHTML = pheripheral_column_status[RELAY1_PACKAGE1];
	document.getElementById("replay 2").innerHTML =  pheripheral_column_status[RELAY2_PACKAGE2];
	document.getElementById("replay 3").innerHTML = pheripheral_column_status[RELAY3_FAN1];
	document.getElementById("replay 4").innerHTML = pheripheral_column_status[RELAY4_FAN2];
}
function update_table_battery_infor(){
	get_cells_infor();
	get_packages_infor();
	get_pheripheral_infor();
	get_pheripheral_infor();
	data_battery_infor();
	data_packages_infor();
	data_pheripheral_infor();
	setInterval(update_table_battery_infor,5000);
}