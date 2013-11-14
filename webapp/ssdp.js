// Thanks to https://github.com/naoyuki-sato/SSDPDiscovery
console.debug = function() {};

var output = null;
var ssdpData = "";
var rokuIP = "";



/*
 * This function will be called when this js is loaded.
 */
window.addEventListener("load", function()
{
    console.log("SSDP multicast app starts");
    var connect = document.getElementById("start");
    connect.onclick = ssdpStart;
    var play = document.getElementById("play");
    play.onclick = rokuControl.play;
    var select = document.getElementById("select");
    select.onclick = rokuControl.select;
    var down = document.getElementById("down");
    down.onclick = rokuControl.down;
    var up = document.getElementById("up");
    up.onclick = rokuControl.up;
    var left = document.getElementById("left");
    left.onclick = rokuControl.left;
    var right = document.getElementById("right");
    right.onclick = rokuControl.right;
/*    var  = document.getElementById("");
    .onclick = rokuControl.;
*/
    var back = document.getElementById("back");
    back.onclick = rokuControl.back;
    output = document.getElementById("output");
});


/*
 * translate text string to arryed buffer
 */
function t2ab(str /* String */)
{
    var buffer = new ArrayBuffer(str.length);
    var view = new DataView(buffer);
    for(var i = 0, l = str.length; i < l; i++)
    {
        view.setInt8(i, str.charAt(i).charCodeAt());
    }
    return buffer;
}

/*
 * translate arrayed buffer to text string
 */
function ab2t(buffer /* ArrayBuffer */)
{
    var arr = new Int8Array(buffer);
    var str = "";
    for(var i = 0, l = arr.length; i < l; i++)
    {
        str += String.fromCharCode.call(this, arr[i]);
    }
    return str;
}

/*
 * This function will be called when upd packet is recieved
 */
var recieveData = function(socket, sid)
{
    socket.recvFrom(sid, function(recv)
    {
        var data = ab2t(recv.data);

        var dt = new Date();
        var tmp = data.replace(/"\r\n"/g, "<br>") + "<br><br>";
        
        var ValidIpAddressRegex = /(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):[0-9]+/;
        
        //var patt = new RegExp("e");
        //var res = patt.exec(str);
        console.log(tmp.match(ValidIpAddressRegex));
        output.innerHTML = ValidIpAddressRegex.exec(data)[0];
        rokuIP =ValidIpAddressRegex.exec(data)[0];

        //console.log(tmp);
        //output.innerHTML = tmp;
        //ssdpData = tmp;

        recieveData(socket, sid);
    });
};


/*
 * This function will be called when "SSDP Start" button is pushed.
 */
var ssdpStart = function()
{
    // M-Search packed w/ "ssdp:all"
    var MSearchAll = "M-SEARCH * HTTP/1.1\r\n" +
        "ST: roku:ecp\r\n" +
        "MAN: \"ssdp:discover\"\r\n" +
        "HOST: 239.255.255.250:1900\r\n" +
        "MX: 2\r\n\r\n";
    // chrome socket
    var socket = chrome.socket || chrome.experimental.socket;
    // SSDP multicast address
    var SSDPMulticastAddress = "239.255.255.250";
    // SSDP multicast port
    var SSDPMulticastPort = 1900;
    // socket id
    var sid;

    // create udp socket
    socket.create('udp', {}, function(socketInfo)
    {
        sid = socketInfo.socketId;
        console.log("socket id: " + sid);
        socket.bind(sid, "0.0.0.0", 0, function(res)
        {
            if(res !== 0) {
                throw('cannot bind socket');
                return -1;
            }

            // recieve data
            recieveData(socket, sid);

            // Send SSDP Search x 2
            var buffer = t2ab(MSearchAll);
            for(var i = 0; i < 2; i++)
            {
                socket.sendTo(sid, buffer, SSDPMulticastAddress, SSDPMulticastPort, function(e)
                {
                    if(e.bytesWritten < 0) {
                        throw("an Error occured while sending M-SEARCH : "+e.bytesWritten);
                    }
                });
            }
        });
    });
};
/*
var roku = function(doThis)
{
var xmlhttp = new XMLHttpRequest();
   xmlhttp.open("POST","http://" + rokuIP + "/keypress/" + doThis,true);   
   xmlhttp.send();
};
*/
