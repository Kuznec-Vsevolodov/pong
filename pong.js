const INITIAL_BALL_SPEED = 10;
const BALL_RADIUS = 20;

const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 100;

var player1Position, player2Position;
var player1Velocity, player2Velocity;
var player1Score, player2Score;
var currentVelocity;
var ball, ballVelocity;

let newFont;

function setup() {

  createCanvas(900, 600);

  player1Position = player2Position = height / 2 - 50; // initialize player position to mid screen

  player1Velocity = player2Velocity = 0;
  player1Score = player2Score = 0;

  ball = createVector(width / 2, height / 2); // initialize ball in the middle
  ballVelocity = createVector(random(-1, 1), random(-1, 1)); // give the ball a random trajectory
  currentVelocity = ballVelocity;
  ballVelocity.setMag(INITIAL_BALL_SPEED); // set the speed to 3
  newFont = loadFont('PressStart2P-Regular.ttf');
  textAlign(CENTER);
  textSize(30);
  
  // borderTop(20, 'solid', '#fff');
  fill(255);
}

function draw() {

  background(000);
  stroke('white');

  /* draw paddles */
  rect(PADDLE_WIDTH * 2, player1Position, PADDLE_WIDTH, PADDLE_HEIGHT);
  rect(width - (PADDLE_WIDTH * 3), player2Position, PADDLE_WIDTH, PADDLE_HEIGHT);

  /* draw ball */
  rect(ball.x, ball.y, 20, 20);
  
  /* draw scoreboard */
  textFont(newFont);
  text(player1Score + "      " + player2Score, width / 2, 50);

  handlePaddles();

  handleBall();
}

function handleBall() {

  ball.x += ballVelocity.x;
  ball.y += ballVelocity.y;

  /* top & bottom collisions */
  if (ball.y > height || ball.y < 0)
    ballVelocity.y *= -1; // reverse y-velocity

  /* paddle collisions */
  if (ball.x <= PADDLE_WIDTH * 3) { // within range on the left side

    if (ball.x <= PADDLE_WIDTH) { // out of bounds

      if (++player2Score >= 10){
        player2Score = 10;
        ballVelocity.setMag(0);
        ball.width = 0;
        document.img.src = 'images/winner.png';
      }else{
        reset();
        return;
      }
      
      
    }

    // check collision on left paddle
    if (ball.y > player1Position && ball.y < player1Position + PADDLE_HEIGHT) {

      if (ballVelocity.x < 0) { // prevent the ball from getting stuck inside paddle

        ballVelocity.x *= -1;
        ballVelocity.mult(random(1, 1.1));
      }
    }

  } else if (ball.x >= width - (PADDLE_WIDTH * 3)) { // right paddle

    if (ball.x >= width - PADDLE_WIDTH) { // out of bounds

      if (++player1Score >= 10){
        player1Score = 10;
        ballVelocity.setMag(0);
        document.img.src = 'images/winner.png';
      }else{
        reset();
        return;
        
      }
    }

    // check collision on right paddle
    if (ball.y > player2Position && ball.y < player2Position + PADDLE_HEIGHT) {

      if (ballVelocity.x > 0) { // prevent the ball from getting stuck inside paddle

        ballVelocity.x *= -1;
        ballVelocity.mult(random(1, 1.5));
      }
    }

  }

}

function reset() {

  ballVelocity.setMag(INITIAL_BALL_SPEED); // set to default speed
  ball = createVector(width / 2, height / 2); // center
}

function handlePaddles() {
  if(keyIsDown(27)){
    ballVelocity.setMag(0.000000000001);
  }

  if(keyIsDown(32)){
    ballVelocity.setMag(INITIAL_BALL_SPEED);
  }

  /* player one controls */
  if (keyIsDown(87)) {
    /* move up */

    player1Velocity -= 15;
  } else if (keyIsDown(83)) {
    /* move down */

    player1Velocity += 15;
  }

  /* player two controls */
  if (keyIsDown(UP_ARROW)) {
    /* move up */

    player2Velocity -= 15;
  } else if (keyIsDown(DOWN_ARROW)) {
    /* move down */

    player2Velocity += 15;
  }

	/* change position */
  player1Position += player1Velocity;
  player2Position += player2Velocity;

  /* friction */
  player1Velocity *= 0.4;
  player2Velocity *= 0.4;

  /* constrain paddles */
  player1Position = constrain(player1Position, 0, height - PADDLE_HEIGHT);
  player2Position = constrain(player2Position, 0, height - PADDLE_HEIGHT);
}