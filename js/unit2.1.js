var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
function Particle(x,y) {this.x=x;this.y=y;}
var particle;
particle=new Particle(250,50);
ctx.fillStyle="#FFF";ctx.beginPath();ctx.arc(250,50,10,0,2*Math.PI);ctx.fill();


function run(){
    particle.x=250;
    canvas.width=canvas.width;
    var acc=Math.floor(Math.random()*3);var vel=Math.floor(Math.random()*2);vel+=acc;vel%=3;if(vel==2){vel=-1}vel*=20;acc--;acc*=4;
    document.getElementById("acc").value=acc;
    
    var theInt=setInterval(step,1000/20);
    function step() {
    document.getElementById("vel").value=vel;document.getElementById("dist").value=particle.x-250;
    particle.x+=vel;ctx.fillStyle="#FFF";ctx.beginPath();ctx.arc(particle.x,50,10,0,2*Math.PI);ctx.fill();vel+=acc;
    if(Math.abs(particle.x-250)>250){clearInterval(theInt);}
    }
    
}

//vector stuff
//select radio button/label with same name, doc.get.checked returns true/false
//hit enter to verify answer, gauge correct questions