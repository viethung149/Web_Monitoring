var myChart;
const URL_CELL_INFOR = "http://115.74.22.232:8000/api/InforCell/id/"
const URL_PACKAGE_INFOR = "http://115.74.22.232:8000/api/InforPackage/id/"
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
        console.log(xmlHttp);
        console.log(xmlHttp.responseText);
        json = xmlHttp.responseText;
        console.log(json);
        if(json != ""){
            obj = JSON.parse(json);
            console.log(obj);
            var data = setDataChart(isVoltage,isTemperature,isCurrent,obj);
            drawChart(data);
        }
        else{
            alert("No data in this time");
        }
	    return xmlHttp.responseText;
	}
function getSubmid() {
    var cellInfor = document.getElementById("select_cell").value;
    var packageInfor = document.getElementById("select_package").value;
    var isVoltage = document.getElementById("isVoltage").checked;
    var isTemperature = document.getElementById("isTemperature").checked;
    var isCurrent = document.getElementById("isCurrent").checked;
    var date = document.getElementById("date").value;
    var hour_from = document.getElementById("h_from").value;
    var minute_from = document.getElementById("m_from").value;
    var hour_to = document.getElementById("h_to").value;
    var minute_to = document.getElementById("m_to").value;
    // console.log(typeof (date));
    // console.log(typeof (cellInfor));
     console.log(isVoltage, isTemperature, isCurrent);
    // console.log(hour_from, minute_from, hour_to, minute_to);
    var from_time = date + " " + hour_from + ":" + minute_from;
    var to_time = date + " " + hour_to + ":" + minute_to;
    if (cellInfor == "0" && packageInfor == "0") {
        alert("Please choose the object to monitor");
    }
    else if(isVoltage ==false && isTemperature ==false && isCurrent ==false){
        alert("Plear to value to monitor of the object");
    }
    else if (cellInfor != "0") {
        var URL =setURLCellInfor(cellInfor, isVoltage, isTemperature, from_time, to_time);
        httpGet(URL);
    }
    else if (packageInfor != "0") {
        var URL = setURLPackageInfor(packageInfor, isVoltage, isTemperature, isCurrent, from_time, to_time);
        httpGet(URL);
    }   
    console.log(from_time, to_time);
}
// function make_link_get
document.querySelectorAll('input[type=number]')
    .forEach(e => e.oninput = () => {
        // Always 2 digits
        if (e.value.length >= 2) e.value = e.value.slice(0, 2);
        // 0 on the left (doesn't work on FF)
        if (e.value.length === 1) e.value = '0' + e.value;
        // Avoiding letters on FF
        if (!e.value) e.value = '00';
    });

function changingCellSelect() {
    var cellInfor = document.getElementById("select_cell").value;

    if (cellInfor != "0") {
        console.log("in here");
        document.getElementById("select_package").value = 0;
        var isCurrent = document.getElementById("isCurrent");
        isCurrent.checked = false;
        isCurrent.disabled = true;
        
    }

}
function changingPackageSelect() {
    var packageInfor = document.getElementById("select_package").value;
    if (packageInfor != "0") {
        document.getElementById("select_cell").value = 0;
        var isCurrent = document.getElementById("isCurrent");
        isCurrent.disabled = false;
    }
}
function setURLCellInfor(id, isVoltage, isTemperature, from, to) {
    var result = URL_CELL_INFOR + id + "/isVoltage/" + isVoltage + "/isTemperature/" + isTemperature +
        "/from/" + from + "/to/" + to;
    console.log(result);
    return result;
}
function setURLPackageInfor(id, isVoltage, isTemperature, isCurrent, from, to) {
    var result = URL_PACKAGE_INFOR + id + "/isVoltage/" + isVoltage + "/isTemperature/" + isTemperature +
        "/isCurrent/" + isCurrent + "/from/" + from + "/to/" + to;
    console.log(result);
    return result;
}

function setDataChart(isVoltage, isTemperature, isCurrent, obj){
    var arrayData=[];
    if(isVoltage){
        var voltage_line = {
            data: obj.voltage,
            label: "Voltage",
            borderColor: "#3e95cd",
            fill: false
        }
        arrayData.push(voltage_line);
    }
    if(isTemperature){
        var temperature_line = {
            data: obj.temperature,
            label: "Temperature",
            borderColor: "#8e5ea2",
            fill: false
        }
        arrayData.push(temperature_line);
    }
    if(isCurrent){
        var current_line = {
            data: obj.current,
            label: "Current",
            borderColor: "#3cba9f",
            fill: false
        }
        arrayData.push(current_line);
    }
    return  raw_data ={
        labels:obj.time,
        datasets: arrayData
    };
}
function drawChart(raw_data){
    var ctx=  document.getElementById("myChart"); 
    if(myChart != null){
       myChart.destroy();
    }
    myChart = new Chart(ctx,{
        type: 'line',
        data: raw_data,
        options: {
            title: {
                display: true,
                text: 'Monitor Battery'
            }
        }
    });
    
}