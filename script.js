class State{
    constructor(seconds, minutes, hours){
        this.seconds = seconds;
        this.minutes = minutes;
        this.hours = hours;
    }

    static now(){
        const now = new Date();
        const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
        const minutes = now.getMinutes() + seconds / 60;
        const hours = now.getHours() + minutes / 60;
        return new State(seconds, minutes, hours);
    }
}

class Clock{
    constructor(state){
        this.state = state;
        this.tick = this.tick.bind(this);
        requestAnimationFrame(this.tick);
    }

    tick(){
        this.setState(State.now());
        requestAnimationFrame(this.tick);
    }

    setState(newState){
        this.state = { ...this.state, ...newState}
        this.render();
    }

    render(){
        const {seconds, minutes, hours} = this.state;

        //render second hand
        document.querySelector(".second-hand").style.transform
        = `rotate(${Math.floor(seconds) /60 * 360}deg)`;

        //render minute hand 
        document.querySelector(".minute-hand").style.transform
        = `rotate(${minutes /60 * 360}deg)`;
    
        //render hour hand 
        document.querySelector(".hour-hand").style.transform
        = `rotate(${hours /12 * 360}deg)`;

    }
}

const CLOCK = new Clock();


//overdag geel, savonds zwart
var today = new Date().getHours();

if (today >= 7 && today <= 20) {
    document.body.style.background = "#f3f355";
} else {
    document.body.style.background = "black";
}

//digitale klok
function runClock() {
    var dt = new Date();
    function n(nr) { return (nr < 10 ? '0' : '') + nr;};
    document.getElementById('digClock').innerHTML = n(dt.getHours()) + ':' + n(dt.getMinutes()) + '\'' + n(dt.getSeconds());
    };
   
function startClock() {
    setInterval('runClock()',1000);
    };
   
window.onload = startClock;

//datum
var d = new Date();
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
document.getElementById("datum").innerHTML = d.getDate() + " " + months[d.getMonth()] + " " +  d.getFullYear();