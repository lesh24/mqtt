console.log("main.js");

var client = mqtt.connect('wss://mqtt.eclipseprojects.io:443/mqtt');

var pubDate = new Date()
var pubTime = (pubDate.toDateString() + " " + pubDate.toLocaleTimeString())

var topic = $('.pubTopic').val();
var message = $('.pubPayload').val();



$("#connect").on('click', function() {
    $("#status").val("Connecting..")
    client.on('connect', function() {
        $("#status").val("Connected Successfully")
        console.log("Connected Succesfully!")
    })
    client.on('message', function(topic, message) {

        if (topic == $('#subTopics').val()) {
            $("#messageTable").prepend(
                "<tr><td>" +
                topic +
                "</td><td>" +
                message +
                "</td><td>" +
                pubTime +
                "</td><td>"
            );
        }
    });

});



$(".publishBtn").click(function() {
    client.publish($('.pubTopic').val(), $('.pubPayload').val());

    $(".pubTable").prepend(
        "<tr><td>" +
        $('.pubTopic').val() +
        "</td><td>" +
        $('.pubPayload').val() +
        "</td><td>" +
        pubTime +
        "</td></tr>"
    );

});

$("#subButton").click(function() {

    client.subscribe($('#subTopics').val());

    $("#subTables").prepend(
        "<tr><td>" +
        $('#subTopics').val() +
        "</td><td>" +
        pubTime +
        "</td></tr>"
    );

});


function deleteRowSub(r) {
    var i = r.parentNode.rowIndex;
    document.getElementById("subTables").deleteRow(i);

}

function deleteRowPub(r) {
    var i = r.parentNode.rowIndex;
    document.getElementById("pubTables").deleteRow(i);

}

function deleteRowMsg(r) {
    var i = r.parentNode.rowIndex;
    document.getElementById("messageTable").deleteRow(i);

}