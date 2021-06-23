function initValue(){
    document.getElementById("h_from").value =0;
    document.getElementById("m_from").value =0;
    document.getElementById("h_to").value =23;
    document.getElementById("m_to").value =0;
    var todayTime = new Date();
    document.getElementById("date").value =convertDate(todayTime);
}
function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [d.getFullYear(), pad(d.getMonth()+1),pad(d.getDate())].join('-')
}