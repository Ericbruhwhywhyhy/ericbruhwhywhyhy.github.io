var xhr = new XMLHttpRequest();
document.querySelector("button").addEventListener('click',function(){
    
    //calling api
    var elm = document.createElement("script");
    elm.src = "http://api.ipstack.com/check?access_key=72ebb579c00d8dcf6cfc5c791633a64f&callback=myDisplayFunction";
    console.log(elm);
    document.body.append(elm);
});


//callback
function myDisplayFunction(obj){
    document.querySelector("#title").innerText = "Your IP based details-"
    let disp = document.querySelector("#ip");

    //printing data
    disp.innerText="";
    disp.innerHTML += "IP :  "+obj.ip+"<br>";
    disp.innerHTML += "Type :  "+obj.type+"<br>";
    disp.innerHTML += "Country :  "+obj.country_name+"<br>";
    disp.innerHTML += "City :  "+obj.city+"<br>";
    disp.innerHTML += "Zip Code :  "+obj.zip+"<br>";
}
