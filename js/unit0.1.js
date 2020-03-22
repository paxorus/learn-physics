//switch answers around,answer repeats not allowed

var question;
var anst=0;var ansx=0;var ansy=0;var ansp;var ans;
var value=0;var max=0;

function newques() {
anst=0;ansx=0;ansy=0;ansp=0;
var i=Math.floor(Math.random()*4+2);//num of num
var pf=new Array(i-1);//array of num
var type=Math.floor(Math.random()*2);
if(type<1){question="Calculate displacement for: "}else{question="Calculate distance for: "}

for(var v=0;v<i;v++) {//generate each pf[v]
    pf[v]=Math.floor(Math.random()*6+1)/10;//.1 to .6 
    anst+=pf[v];//distance
    switch(Math.floor(Math.random()*6))//omni
    {
    case 0:ansy+=pf[v];pf[v]+=" up";break;
    case 1:ansy-=pf[v];pf[v]+=" down";break;
    case 2:ansx-=pf[v];pf[v]+=" left";break;
    case 3:ansx+=pf[v];pf[v]+=" right";break;
    case 4:case 5:
        var angle=Math.floor(Math.random()*360);
        ansx+=pf[v]*Math.cos(angle*Math.PI/180);ansy+=pf[v]*Math.sin(angle*Math.PI/180);
        pf[v]+=" at "+(angle)+"&#176;";break;
    }
    if(v<i-1){pf[v]+=", "}else{pf[v]+="."}
    question+=pf[v];
    
    }
ansp=Math.sqrt(Math.pow(ansx,2)+Math.pow(ansy,2));//omni
document.getElementById("ques").innerHTML=question;

//generate four answers
var choices=new Array(4);
choices[0]=anst;
if(anst==ansp)
{choices[1]=anst+0.1;choices[2]=anst-0.1;choices[3]=ansp+0.2}//good
else
{choices[1]=ansp;
if(Math.random()<0.5){choices[2]=anst+0.1}else{choices[2]=anst-0.1}
if(Math.random()<0.5){choices[3]=ansp+0.1}else{choices[3]=ansp-0.1}
if(choices[2]==choices[3]){if(Math.random()<0.5){choices[3]=anst+0.1}else{choices[3]=ansp+0.1}}
}//next two are one off,check anst-0.1=ansp+0.1




var places=new Array(4);
//map choices to places randomly,places[3 2 4 1]corresponding to lab id
places[0]=Math.floor(4*Math.random())+1;
do{places[1]=Math.floor(4*Math.random())+1}
while(places[1]==places[0]);
do{places[2]=Math.floor(4*Math.random())+1}
while((places[2]==places[0])||(places[2]==places[1]));
places[3]=10-places[0]-places[1]-places[2];

$("#lab"+places[0]).html(choices[0].toFixed(1));//dist
$("#lab"+places[1]).html(choices[1].toFixed(1));//omni
$("#lab"+places[2]).html(choices[2].toFixed(1));
$("#lab"+places[3]).html(choices[3].toFixed(1));

if(type<1){ans=ansp}else{ans=anst}
}newques();

function check(n) {
    var prog=document.getElementById("grade");
    max++;
    if($("#lab"+n).html()==ans.toFixed(1)){
        value++;
        document.getElementById("result").style.color="green";
        document.getElementById("result").innerHTML="Correct!";
        }
    else{
        document.getElementById("result").style.color="red";
        document.getElementById("result").innerHTML="Wrong";
    }
    prog.title=value+"/"+max;
    prog.value=value/max;
    if((max>=5)&&(prog.value<=0.9)){$("#ques").html("Congratulations on your mastery of the scalar/vector concept!")}
    else
    {setTimeout(function() {newques();
    $("#"+$("#lab"+n).attr("for")).attr("checked",false);
    },1000);}
}
//Array of random size 2-->5, randomly strings (unit+direction)+calc disp/dist