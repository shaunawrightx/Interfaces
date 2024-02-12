let capture;
let capturewidth = 640;    
let captureheight = 480;

let emotions = ["neutral","happy", "sad", "angry","fearful", "disgusted","surprised"];

const neutralText = "01101000 01100101 01101100 01101100 01101111 00100000 01001001 00100000 01100011 01100001 01101110 00100000 01100110 01100101 01100101 01101100 00100000 01110111 01101001 01110100 01101000 00100000 01111001 01101111 01110101"
const happyText = "01010011 01110111 01100101 01100101 01110100 00100000 01110101 01101110 01110100 01100101 01110100 01101000 01100101 01110010 01100101 01100100 00100000 01110011 01110101 01101110 01110011 01101000 01101001 01101110 01100101 00100000 01100011 01101100 01100101 "
const sadText = "01110011 01101111 01100110 01110100 00100000 01100110 01100001 01110100 00100000 01110010 01100001 01101001 01101110 01100100 01110010 01101111 01110000 01110011 00100000 01100111 01110010 01100101 01111001 00100000 01110000 01110101 01101100 01101100 01101001 01101110 01100111"
const angryText = "01000111 01110010 01101001 01110100 00100000 01101100 01101001 01101011 01100101 00100000 01110110 01101001 01100010 01110010 01100001 01110100 01101001 01101110 01100111 00100000 01110110 01101111 01101100 01100001 01110100 01101001 01101100 01100101 00100000 01100010 01101100 01101001 01101110 01100100 00100000 01100001 01101100 01101100 00100000 01110011 01100011 01110010 01100101 01100001 01101101 01101001 01101110 01100111"
const fearfulText = "01110101 01101110 01101011 01101110 01101111 01110111 01101110 00100000 01110111 01101000 01100101 01110010 01100101 00100000 01100101 01101110 01100100 00100000 01110011 01101111 01101101 01100101 00100000 01100111 01110010 01100101 01100001 01110100 00100000 01101101 01101111 01101110 01110011 01110100 01100101 01110010"
const surprisedText = "01101000 01100001 01110010 01101011 00100000 01100101 01111000 01100011 01101100 01100001 01101101 01100001 01110100 01101001 01101111 01101110 00100000 01110000 01110101 01101110 01100011 01101000 00100000 01101110 01101111 01110100 00100000 01100100 01101001 01110011 01100001 01110000 01110000 01101111 01101001 01101110 01110100 01100101 01100100"
const disgustedText = "01010100 01101000 01100101 00100000 01101000 01100101 01101100 01101100 00100000 01110100 01101111 00100000 01101100 01101111 01101111 01101011 00100000 01110101 01110000 01101111 01101110 00100000 01100001 01101100 01101100 00100000 01100110 01100101 01100101 01101100 01101001 01101110 01100111"



let faceapi;
let detections = [];

function setup() {
  createCanvas(capturewidth, captureheight);
  
  capture = createCapture(VIDEO);
  capture.position(0,0);
  
  capture.hide();
  
  const faceOptions = {withLandmarks: true, withExpressions: true, withDescriptors: false};
  
  faceapi = ml5.faceApi(capture, faceOptions, faceReady);
  
  }

function faceReady(){
  faceapi.detect(gotFaces);
}

function gotFaces(error, result){
  if (error){
    console.log(error);
    return
  }
    detections = result;
    faceapi.detect(gotFaces);
   // console.log(detections);
}
  

function draw() {
  
  background(0);
  
  capture.loadPixels();
  
  push();
  fill('green');
      if(detections.length>0){
        for (i=0; i<detections.length; i ++){
          var points = detections[i].landmarks.positions;

          for (j=0; j<points.length; j ++){
           circle( points[j]._x,points[j]._y, 5);
            }
          
          var neutralLevel = detections[i].expressions.neutral;
          var happyLevel = detections[i].expressions.happy;
          var sadLevel = detections[i].expressions.sad;
          var angryLevel = detections[i].expressions.angry;
          var fearfulLevel = detections[i].expressions.fearful;
          var disgustedLevel = detections[i].expressions.disgusted;
          var surprisedLevel = detections[i].expressions.surprised;
          
          push();
//           console.log(detections[0].expressions);
          var biggest_emotion = "neutral";

          for (k = 0; k<emotions.length; k++) {
          
            var thisemotion = emotions[k];
            
            var thisemotionlevel= detections[i].expressions[thisemotion];
             
            //FOR PANEL SAYING LEVELS
            text(thisemotion + " value: " + thisemotionlevel,40,30 + 30 * k );
               
            rect(40, 30 + 30 * k, thisemotionlevel * 100,10 );
            
            if(thisemotionlevel > detections[i].expressions[biggest_emotion]){
              biggest_emotion = thisemotion;
            }
          }
          
          console.log('in face', i, 'biggest emotion is', biggest_emotion);
         
          }    
      if (biggest_emotion==="happy") {
        background(244,208,63);
        //fill(252,122,52);
        text(happyText,200,100,300,200);
        

      } else if (biggest_emotion==="sad") {
        background(127,150,184);
        //fill(255);
        text(sadText,300,200,300,500);

      } else if (biggest_emotion==="angry") {
        background(115,12,12);
        text(angryText,20,120,640,480);
        //fill(255,30,30);

      } else if (biggest_emotion==="surprised") {
        background(216,255,0);
        text(surprisedText,10,10,550,50);

      } else if (biggest_emotion==="fearful") {
        background(41,66,80);
        text(fearfulText,50,50,90,400);

      } else if (biggest_emotion==="disgusted") {
        background(119,18,120);
        text(disgustedText,50,300,600,480);

      } else {
        background(0);
        text(neutralText,100,100,200,200);
      }

    }}
