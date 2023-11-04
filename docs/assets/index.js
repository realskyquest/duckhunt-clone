import{P as d}from"./phaser.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))h(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&h(u)}).observe(document,{childList:!0,subtree:!0});function n(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function h(t){if(t.ep)return;t.ep=!0;const i=n(t);fetch(t.href,i)}})();let s="";window.location.href.includes("github.io")?(s="/duckhunt-clone",console.log("IN GITHUB")):console.log("IN DEV");let a={width:512,height:512},f={type:d.WEBGL,width:a.width,height:a.height,pixelArt:!0,canvas:gameCanvas,physics:{default:"arcade",arcade:{debug:!1}},scene:{preload:p,create:g,update:k}};new d.Game(f);let e={huntedScore:0};function p(){this.load.image("blood",`${s}/assets/blood.png`),this.load.image("duck",`${s}/assets/duck.png`),this.load.image("background",`${s}/assets/background.png`),this.load.audio("flapSFX",`${s}/assets/flap.mp3`),this.load.audio("shotSFX",`${s}/assets/shot.mp3`),this.load.audio("quackSFX",`${s}/assets/quack.mp3`)}function g(){e.flapSFX=this.sound.add("flapSFX"),e.shotSFX=this.sound.add("shotSFX"),e.quackSFX=this.sound.add("quackSFX"),e.background=this.add.image(a.width/2,a.height/2,"background"),e.background.displayWidth=this.sys.canvas.width,e.background.displayHeight=this.sys.canvas.height,e.duck=this.physics.add.image(a.width/2,-10,"duck"),e.duck.scaleX=1.7,e.duck.scaleY=1.7,e.duck.setInteractive(),e.duckSpeed=100,e.flapSFX.play(),l(),e.huntedText=this.add.text(10,10,"Hunted: 0",{fontSize:"35px",fontFamily:"arial",fill:"#eb564b"}),e.huntedText.setStroke("#272736",8),e.titleText=this.add.text(80,400,"DuckHunt Clone",{fontSize:"50px",fontFamily:"arial",fill:"#ffe478"}),e.titleText.setStroke("#272736",8),e.emitter=this.add.particles(0,0,"blood",{speed:100,gravityY:1e3,scale:.5,duration:100,emitting:!1}),e.emitter.startFollow(e.duck,e.duck.width/2,e.duck.height/2,!0)}let r=!1;function k(){e.duck.on("pointerdown",function(c){r||(e.duck.setVelocity(0,500),e.duck.flipY=!0,e.emitter.start(),e.shotSFX.play(),e.quackSFX.play(),e.huntedScore+=1,e.huntedText.setText(`Hunted: ${e.huntedScore}`),r=!0)}),e.duck.on("pointerup",function(){r=!1}),e.duck.y>a.height+20&&(e.duck.y=-20,e.duck.flipY=!1,e.duck.setVelocity(0,0),e.flapSFX.play(),e.duckSpeed=Math.min(100*(e.huntedScore/2)+50,500),l()),d.Math.Distance.Between(e.duck.x,e.duck.y,e.targetX,e.targetY)<10&&e.duck.flipY==!1&&(e.duck.setVelocity(0,0),l())}function l(){e.targetX=d.Math.Between(0,a.width),e.targetY=d.Math.Between(0,a.height/1.5)+5,e.duck.x>e.targetX?e.duck.flipX=!1:e.duck.flipX=!0;const c=d.Math.Angle.Between(e.duck.x,e.duck.y,e.targetX,e.targetY),o=Math.cos(c)*e.duckSpeed,n=Math.sin(c)*e.duckSpeed;e.duck.setVelocity(o,n)}
