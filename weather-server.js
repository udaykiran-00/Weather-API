var express=require("express");
var app=express();
var https=require("https");
var bodyParser=require("body-parser");
const exp = require("constants");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view-engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));
const cors = require("cors");
app.use(cors());

app.listen(3200,function(){
    console.log("server has started");
});
app.get("/",function(req,res){
    res.render("list1.ejs",{location:"",temp:"",search:"",img_url:""});
    // res.send("hello1");
//var url='https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
//var url1="https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=17.3753&lon=78.4744&zoom=12";
//var url2="https://openweathermap.org/find?q=hyderabad"; 
// var url3="https://api.openweathermap.org/data/2.5/weather?q=hyderabad&appid=e8209abe592ccb6b4da1974d75304343&units=metric";//metric=celsius   
// https.get(url3,function(resp){
//     // console.log(resp);
//     //res.send(""+resp.statusCode);//note:response must be a string
//     //res.sendStatus(resp);  //note response(o/p on the browsr) should be a string bt we got json->obj from api,so we've to parse..
//     console.log(resp.statusCode);
//     resp.on("data",function(data){
//         // console.log((data));
//         var js_obj=JSON.parse(data);
//         console.log(js_obj);
//         res.write("<h1>temperature in "+js_obj.name+" is "+js_obj.main.temp+"<super>.</super>degrees</h1>");
//         var js_imgcode=js_obj.weather[0].icon;
//         js_imgcode=js_imgcode.substring(0,2);//basically we're tryng to covrt night pic into day pic(ex:"02n"-->"02d")d=day,n=night
//         var img_url="http://openweathermap.org/img/wn/"+(js_imgcode+'d')+"@2x.png";
//         res.write("<img src="+img_url+" >");
//         res.send();
//         // console.log(JSON.stringify(JSON.parse(data)));
//         // console.log(JSON.text(data));
//         // res.send(""+data.date);
//     })
    // console.log(JSON.parse(resp));
// });

});
    
// https.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",function(requ,resp){
//     console.log(resp);
//     res.send(resp);
// });
app.post("/weather",function(req,res){
    // console.log(req);
    var location=req.body.search;
    var url="https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=e8209abe592ccb6b4da1974d75304343&units=metric";//metric=celsius 
    https.get(url,function(resp){
        resp.on("data",function(data){
            var js_obj=JSON.parse(data);
            var temperature,img_code,img_url,location1;
            if(js_obj.cod==404)
            {
                //res.send("<h1>Can't find "+location+"'s temperature</h1>");
                location1="Can't find "+location+"'s temperature";
                temperature="";
                res.render("list1.ejs",{img_url:img_url,location:location1,temp:temperature,search:location});
            }
            else if(js_obj.cod==400)
            {
                //res.send("<h1>Nothing to geocode..plz Enter the city name</h1>");
                location1="Can't find "+location+"'s temperature";
                temperature="";
                res.render("list1.ejs",{img_url:img_url,location:location1,temp:temperature,search:location});
            }
            else
            {

            
            
             temperature=js_obj.main.temp+"°C";
             img_code=js_obj.weather[0].icon;
            //img_code=img_code.substring(0,2);//02n-->02d converting night pic to day pic by appending 'd' nd rmvng 'n'
             img_url="http://openweathermap.org/img/wn/"+img_code+"@2x.png";
            // res.write("<h1>"+location+"   "+temperature+"<super>'</super>"+" Celsius</h1>");
            // res.write("<img src="+img_url+">");
            // res.send();
            res.render("list1.ejs",{img_url:img_url,location:location,temp:temperature,search:location});
            }
            console.log(js_obj);
            // console.log(JSON.stringify(data));
        });
        
    });
});
////note see hyper console after exctng this to know abt java script object(which we got by converting json objct using JSON.parse() method)
//note:if u hv any doubt then smply paste the abv url("api.openweathermap.....") into the new tab and chck the rspons frm api