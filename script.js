let player;
let circles = [];
let score = 0;
let gameOver = false;
let spawnTimer = 0;
let spawnRate = 60; 

function setup() {
  createCanvas(1000, 800);
  player = new Player();
}

function draw() {
  background(51); 

  if (!gameOver) {
    score++;

   
    spawnTimer++;
    if (spawnTimer >= spawnRate) {
      circles.push(new FallingCircle());
      spawnTimer = 0;
     
      if (score % 300 === 0 && spawnRate > 25) {
        spawnRate -= 5;
      }
    }

  
    for (let i = circles.length - 1; i >= 0; i--) {
      circles[i].update();
      circles[i].draw();

     
      if (circles[i].y > height + 50) {
        circles.splice(i, 1);
        continue;
      }

      
      let d = dist(player.x, player.y, circles[i].x, circles[i].y);
      if (d < player.r + circles[i].r) {
        gameOver = true;
      }
    }

  
    player.update();
    player.draw();

    
    fill(200);
    noStroke();
    textSize(20);
    textAlign(LEFT);
    text("Score: " + score, 20, 35);
    text("Dodge the circles!", 20, 60);

  } else {
    
    fill(51);
    rect(0, 0, width, height);

    fill(255, 80, 80);
    textAlign(CENTER);
    textSize(60);
    text("GAME OVER", width / 2, height / 2 - 40);

    fill(220);
    textSize(28);
    text("Score: " + score, width / 2, height / 2 + 20);

    fill(150);
    textSize(20);
    text("Click to play again", width / 2, height / 2 + 65);
  }
}

function mousePressed() {
  if (gameOver) {
    
    gameOver = false;
    score = 0;
    circles = [];
    spawnTimer = 0;
    spawnRate = 60;
    player = new Player();
  }
}


class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 60;
    this.r = 18;
  }

  update() {
    
    this.x = lerp(this.x, mouseX, 0.2);
    this.y = lerp(this.y, mouseY, 0.2);

   
    this.x = constrain(this.x, this.r, width - this.r);
    this.y = constrain(this.y, this.r, height - this.r);
  }

  draw() {
    
    noStroke();
    fill(100, 220, 255, 60);
    ellipse(this.x, this.y, (this.r + 10) * 2);

    fill(100, 220, 255);
    ellipse(this.x, this.y, this.r * 2);

    fill(255);
    ellipse(this.x - 5, this.y - 5, 6);
  }
}

class FallingCircle {
  constructor() {
    this.x = random(30, width - 30);
    this.y = -30;
    this.r = random(15, 35);
    this.speed = random(2, 4) + score / 1000; 
    this.col = color(random(150, 255), random(80, 160), random(180, 255), 200);
  }

  update() {
    this.y += this.speed;
  }

  draw() {
    noStroke();
    fill(red(this.col), green(this.col), blue(this.col), 60);
    ellipse(this.x, this.y, (this.r + 8) * 2); 

    fill(this.col);
    ellipse(this.x, this.y, this.r * 2);
  }
}
