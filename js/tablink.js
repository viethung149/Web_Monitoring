var timer_cells ;
var timer_packages;
var timer_pheripheral;
function changeTable(evt, tableName) {
  var i, tabcontent, tablinks;
  // hida all tabcontent
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  // active all topic battery package peripheral and data
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  // show element tableName
  document.getElementById(tableName).style.display = "block";
  if(tableName == "battery"){
    update_cells_database()
    timer_cells = setInterval(update_cells_database,5000);
    clearInterval(window.timer_packages)
    clearInterval(window.timer_pheripheral)
  }
  else if(tableName =="package"){
    update_packages_database()
    timer_packages = setInterval(update_packages_database,5000);
    clearInterval(window.timer_cells)
    clearInterval(window.timer_pheripheral)
  }
  else if(tableName == "peripheral"){
    update_peripheral_database()
    timer_pheripheral = setInterval(update_peripheral_database,5000);
    clearInterval(window.timer_cells)
    clearInterval(window.timer_packages)
  }
  else{
    clearInterval(window.timer_cells)
    clearInterval(window.timer_packages)
    clearInterval(window.timer_pheripheral)
  }
  // console.log(evt.currentTarget)
  // console.log(evt.currentTarget.className)
  // // active tablink
  // evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click(); 