var canvas=document.getElementById("canvas");var ctx=canvas.getContext("2d");
function Particle(x,y,velx,vely,accx,accy) {
    this.x=x;this.y=y;
    this.disx;this.disy;
    this.velx=velx;this.vely=vely;
    this.accx=accx;this.accy=accy;
    }
ctx.fillStyle="#FFF";ctx.beginPath();ctx.arc(250,250,10,0,2*Math.PI);ctx.fill();
var particle=new Particle(250,250,0,0,0,0);
var velp;
var clix;var cliy;var theta=0;var mouseup=true;
var k=0;var fric;

function up(){mouseup=true;}
function down(event){
    mouseup=false;
    clix=event.pageX-$("canvas").offset().left;
    cliy=event.pageY-$("canvas").offset().top;
}
function move(event){
    if(!mouseup)
    {clix=event.pageX-$("canvas").offset().left;
    cliy=event.pageY-$("canvas").offset().top;}
}

function step() {
    //get g,k,fric
    g=$("#g").val();
    if(!mouseup){theta=Math.atan2(cliy-particle.y,clix-particle.x);
    if((cliy==particle.y)&&(clix==particle.x)){k=0}}
    if(mouseup){k=0}else{k=$("#k").val()}
    if(particle.velx*particle.vely===0){fric=g*$("#micros").val()}
    else{fric=g*$("#microk").val()}
    //k calculation
    particle.velx+=k*Math.cos(theta);particle.vely+=k*Math.sin(theta);
    //f calculation
    velp=Math.sqrt(Math.pow(particle.velx,2)+Math.pow(particle.vely,2));
    if(velp!==0){
        particle.velx*=Math.max((velp-fric)/velp,0);
        particle.vely*=Math.max((velp-fric)/velp,0);
    }

    //redraw,DOM output
    particle.x+=particle.velx;particle.y+=particle.vely;
    if(particle.x>500){particle.x=1000-particle.x;particle.velx*=-1}
    if(particle.x<0){particle.x*=-1;particle.velx*=-1}
    if(particle.y>500){particle.y=1000-particle.y;particle.vely*=-1}
    if(particle.y<0){particle.y*=-1;particle.vely*=-1}
    canvas.width=canvas.width;
    ctx.font="36px Verdana";ctx.fillStyle="#0AF";
    particle.disx=particle.x-250;particle.disy=particle.y-250;
    ctx.fillText("Disp: "+particle.disx.toFixed(1)+", "+particle.disy.toFixed(1),75,225);
    ctx.fillText("Vel: "+particle.velx.toFixed(1)+", "+particle.vely.toFixed(1),125,300);
    ctx.fillStyle="#FFF";ctx.beginPath();ctx.arc(particle.x,particle.y,10,0,2*Math.PI);ctx.fill();
    //freeze if out of bounds
    setTimeout(function() {window.webkitRequestAnimationFrame(step)},20);
}
document.body.onload=step;