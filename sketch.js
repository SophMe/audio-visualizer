let song;
let fft;
let audioContext;
let particles = []

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
  translate(width/2, height/2);

  let wave = fft.waveform();                                    

  for (let t = -1; t<= 1; t += 2) {
    beginShape();

    for (let i = 0; i <= 360; i += 0.5) {                             // iterate over each horizontal pixel position
      let index = floor(map(i, 0, 360, 0, wave.length -1));      // map current position to an index
      let r = map(wave[index], -1, 1, 150, 350);
      let x = r * -sin(radians(i)) * t;                          // define horizontal position
      let y = r * cos(radians(i));                               // calculate vertical position of the waveform
      vertex(x, y);
      // if (r == 50) {
      //   y = 0;
      // }
      // console.log('log', x, y)
    }
  }
  endShape();

  let particle = new Particle();
  particles.push(particle);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
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

class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(250);
    this.vel = createVector(0, 0);
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001));

    this.width = random(3, 5);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
  show() {
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.width);
  }

}

