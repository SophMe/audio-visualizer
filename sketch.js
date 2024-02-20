let song;
let fft;
let audioContext;

function preload() {
  song = loadSound('Islands.mp3');
}

function setup() {
  createCanvas(600, 600);
  fft = new p5.FFT();
  createAudioContext();
}

function createAudioContext() {
  audioContext = getAudioContext();
}

function draw() {
  background(0);
  stroke(255);
  noFill();

  let wave = fft.waveform();                                    

  beginShape();

  for (let i = 0; i < width; i++) {                           // iterate over each horizontal pixel position
    let index = floor(map(i, 0, width, 0, wave.length));      // map current position to and index
    let x = i;                                                // define horizontal position
    let y = wave[index] * 300 + height / 2;                   // calculate vertical position of the waveform
    vertex(x, y);
    // console.log('log', x, y)
  }

  endShape();
}

function mousePressed() {
  if (song.isPlaying()) {
    song.stop();
    noLoop();
  } else {
    song.play();
    loop();
  }
}
