import Phaser from "phaser";

let sizes = {
  width: 512,
  height: 512,
};

let config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  pixelArt: true,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let game = new Phaser.Game(config);
let gameState = { huntedScore: 0 };

function preload() {
  this.load.image("blood", "/assets/blood.png");
  this.load.image("duck", "/assets/duck.png");
  this.load.image("background", "/assets/background.png");

  this.load.audio("flapSFX", "/assets/flap.mp3");
  this.load.audio("shotSFX", "/assets/shot.mp3");
  this.load.audio("quackSFX", "/assets/quack.mp3");
}

function create() {
  gameState.flapSFX = this.sound.add("flapSFX");
  gameState.shotSFX = this.sound.add("shotSFX");
  gameState.quackSFX = this.sound.add("quackSFX");

  gameState.background = this.add.image(
    sizes.width / 2,
    sizes.height / 2,
    "background"
  );
  gameState.background.displayWidth = this.sys.canvas.width;
  gameState.background.displayHeight = this.sys.canvas.height;

  gameState.duck = this.physics.add.image(sizes.width / 2, -10, "duck");
  gameState.duck.scaleX = 1.7;
  gameState.duck.scaleY = 1.7;
  gameState.duck.setInteractive();

  gameState.duckSpeed = 100;
  gameState.flapSFX.play();
  moveDuck();

  gameState.huntedText = this.add.text(10, 10, "Hunted: 0", {
    fontSize: "35px",
    fontFamily: "arial",
    fill: "#eb564b",
  });
  gameState.huntedText.setStroke("#272736", 8);

  gameState.titleText = this.add.text(80, 400, "DuckHunt Clone", {
    fontSize: "50px",
    fontFamily: "arial",
    fill: "#ffe478",
  });
  gameState.titleText.setStroke("#272736", 8);

  gameState.emitter = this.add.particles(0, 0, "blood", {
    speed: 100,
    gravityY: 1000,
    scale: 0.5,
    duration: 100,
    emitting: false,
  });
  gameState.emitter.startFollow(
    gameState.duck,
    gameState.duck.width / 2,
    gameState.duck.height / 2,
    true
  );
}

let isPointerDown = false; // Add this line

function update() {
  gameState.duck.on("pointerdown", function (pointer) {
    if (!isPointerDown) {
      // Add this line
      gameState.duck.setVelocity(0, 500);
      gameState.duck.flipY = true;

      gameState.emitter.start();
      gameState.shotSFX.play();
      gameState.quackSFX.play();

      gameState.huntedScore += 1;
      gameState.huntedText.setText(`Hunted: ${gameState.huntedScore}`);

      isPointerDown = true; // Add this line
    }
  });

  gameState.duck.on("pointerup", function () {
    isPointerDown = false; // Add this line
  });

  if (gameState.duck.y > sizes.height + 20) {
    gameState.duck.y = -20;
    gameState.duck.flipY = false;
    gameState.duck.setVelocity(0, 0);
    gameState.flapSFX.play();
    gameState.duckSpeed = Math.min(100 * (gameState.huntedScore / 2) + 50, 500);
    moveDuck();
  }

  // Change Direction of duck after reaching destination
  if (
    Phaser.Math.Distance.Between(
      gameState.duck.x,
      gameState.duck.y,
      gameState.targetX,
      gameState.targetY
    ) < 10 &&
    gameState.duck.flipY == false
  ) {
    gameState.duck.setVelocity(0, 0);
    moveDuck();
  }
}

function moveDuck() {
  gameState.targetX = Phaser.Math.Between(0, sizes.width);
  gameState.targetY = Phaser.Math.Between(0, sizes.height / 1.5) + 5;

  if (gameState.duck.x > gameState.targetX) {
    gameState.duck.flipX = false;
  } else {
    gameState.duck.flipX = true;
  }

  const angle = Phaser.Math.Angle.Between(
    gameState.duck.x,
    gameState.duck.y,
    gameState.targetX,
    gameState.targetY
  );

  const velocityX = Math.cos(angle) * gameState.duckSpeed;
  const velocityY = Math.sin(angle) * gameState.duckSpeed;

  gameState.duck.setVelocity(velocityX, velocityY);
}
