Monster.prototype.run = function(){
  var s = Math.min(speed,maxSpeed);
  this.runningCycle += delta * s * .7;
  this.runningCycle = this.runningCycle % (Math.PI*2);
  var t = this.runningCycle;

  this.pawFR.rotation.x = Math.sin(t)*Math.PI/4;
  this.pawFR.position.y = -5.5 - Math.sin(t);
  this.pawFR.position.z = 7.5 + Math.cos(t);

  this.pawFL.rotation.x = Math.sin(t+.4)*Math.PI/4;
  this.pawFL.position.y = -5.5 - Math.sin(t+.4);
  this.pawFL.position.z = 7.5 + Math.cos(t+.4);

  this.pawBL.rotation.x = Math.sin(t+2)*Math.PI/4;
  this.pawBL.position.y = -5.5 - Math.sin(t+3.8);
  this.pawBL.position.z = -7.5 + Math.cos(t+3.8);

  this.pawBR.rotation.x = Math.sin(t+2.4)*Math.PI/4;
  this.pawBR.position.y = -5.5 - Math.sin(t+3.4);
  this.pawBR.position.z = -7.5 + Math.cos(t+3.4);

  this.torso.rotation.x = Math.sin(t)*Math.PI/8;
  this.torso.position.y = 3-Math.sin(t+Math.PI/2)*3;

  //this.head.position.y = 5-Math.sin(t+Math.PI/2)*2;
  this.head.rotation.x = -.1+Math.sin(-t-1)*.4;
  this.mouth.rotation.x = .2 + Math.sin(t+Math.PI+.3)*.4;

  this.tail.rotation.x = .2 + Math.sin(t-Math.PI/2);

  this.eyeR.scale.y = .5 + Math.sin(t+Math.PI)*.5;
}

Monster.prototype.nod = function(){
  var _this = this;
  var sp = 1 + Math.random()*2;

  // HEAD
  var tHeadRotY = -Math.PI/3 + Math.random()*.5;
  var tHeadRotX = Math.PI/3 - .2 +  Math.random()*.4;
  gsap.to(this.head.rotation, sp, {x:tHeadRotX, y:tHeadRotY, ease:Power4.easeInOut, onComplete:function(){_this.nod()}});

  // TAIL

  var tTailRotY = -Math.PI/4;
  gsap.to(this.tail.rotation, sp/8, {y:tTailRotY, ease:Power1.easeInOut, yoyo:true, repeat:8});

  // EYES

  gsap.to([this.eyeR.scale, this.eyeL.scale], sp/20, {y:0, ease:Power1.easeInOut, yoyo:true, repeat:1});
}

Monster.prototype.sit = function(){
  var sp = 1.2;
  var ease = Power4.easeOut;
  var _this = this;
  gsap.to(this.torso.rotation, sp, {x:-1.3, ease:ease});
  gsap.to(this.torso.position, sp, {y:-5, ease:ease, onComplete:function(){
    _this.nod();
    gameStatus = "readyToReplay";
  }});

  gsap.to(this.head.rotation, sp, {x:Math.PI/3, y :-Math.PI/3, ease:ease});
  gsap.to(this.tail.rotation, sp, {x:2, y:Math.PI/4, ease:ease});
  gsap.to(this.pawBL.rotation, sp, {x:-.1, ease:ease});
  gsap.to(this.pawBR.rotation, sp, {x:-.1, ease:ease});
  gsap.to(this.pawFL.rotation, sp, {x:1, ease:ease});
  gsap.to(this.pawFR.rotation, sp, {x:1, ease:ease});
  gsap.to(this.mouth.rotation, sp, {x:.3, ease:ease});
  gsap.to(this.eyeL.scale, sp, {y:1, ease:ease});
  gsap.to(this.eyeR.scale, sp, {y:1, ease:ease});

  //gsap.to(this.body.rotation, sp, {y:Math.PI/4});

}
