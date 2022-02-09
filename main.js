video="";
status_model="";
object=[];

function preload(){
    video=createVideo('video.mp4');
}

function setup(){
    canvas=createCanvas(480, 360);
    canvas.center();
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model is Loaded");
    status_model = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw(){
    image(video ,0 ,0 ,480 ,360);

    if(status_model != ""){
        objectDetector.detect(video, gotResults)
        
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects are - "+object.length;
            fill("#FF0000");
            percent = floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%", object[i].x+15, object[i].y+15);
            noFill()
            stroke("blue");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function gotResults(error, results){
    if(error){
        console.error(error);

    }
    else{
        console.log(results);
        object=results;
    }
}