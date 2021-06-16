Hero.prototype.run = function(){
  this.status = "running";

  var s = Math.min(speed,maxSpeed);

  this.runningCycle += delta * s * .7;
  this.runningCycle = this.runningCycle % (Math.PI*2);
  var t = this.runningCycle;

  var amp = 4;
  var disp = .2;

  // BODY

  this.body.position.y = 6+ Math.sin(t - Math.PI/2)*amp;
  this.body.rotation.x = .2 + Math.sin(t - Math.PI/2)*amp*.1;

  this.torso.rotation.x =  Math.sin(t - Math.PI/2)*amp*.1;
  this.torso.position.y =  7 + Math.sin(t - Math.PI/2)*amp*.5;

  // MOUTH
  this.mouth.rotation.x = Math.PI/16 + Math.cos(t)*amp*.05;

  // HEAD
  this.head.position.z = 2 + Math.sin(t - Math.PI/2)*amp*.5;
  this.head.position.y = 8 + Math.cos(t - Math.PI/2)*amp*.7;
  this.head.rotation.x = -.2 + Math.sin(t + Math.PI)*amp*.1;

  // EARS
  this.earL.rotation.x = Math.cos(-Math.PI/2 + t)*(amp*.2);
  this.earR.rotation.x = Math.cos(-Math.PI/2 + .2 + t)*(amp*.3);

  // EYES
  this.eyeR.scale.y = this.eyeL.scale.y = .7 +  Math.abs(Math.cos(-Math.PI/4 + t*.5))*.6;

  // TAIL
  this.tail.rotation.x = Math.cos(Math.PI/2 + t)*amp*.3;

  // FRONT RIGHT PAW
  this.pawFR.position.y = 1.5 + Math.sin(t)*amp;
  this.pawFR.rotation.x = Math.cos(t ) * Math.PI/4;


  this.pawFR.position.z = 6 - Math.cos(t)*amp*2;

  // FRONT LEFT PAW

  this.pawFL.position.y = 1.5 + Math.sin(disp + t)*amp;
  this.pawFL.rotation.x = Math.cos( t ) * Math.PI/4;


  this.pawFL.position.z = 6 - Math.cos(disp+t)*amp*2;

  // BACK RIGHT PAW
  this.pawBR.position.y = 1.5 + Math.sin(Math.PI + t)*amp;
  this.pawBR.rotation.x = Math.cos(t + Math.PI*1.5) * Math.PI/3;


  this.pawBR.position.z = - Math.cos(Math.PI + t)*amp;

  // BACK LEFT PAW
  this.pawBL.position.y = 1.5 + Math.sin(Math.PI + t)*amp;
  this.pawBL.rotation.x = Math.cos(t + Math.PI *1.5) * Math.PI/3;


  this.pawBL.position.z = - Math.cos(Math.PI + t)*amp;


}

Hero.prototype.jump = function(){
  if (this.status == "jumping") return;
  this.status = "jumping";
  var _this = this;
  var totalSpeed = 10 / speed;
  var jumpHeight = 45;

  gsap.to(this.earL.rotation, totalSpeed, {x:"+=.3", ease:Back.easeOut});
  gsap.to(this.earR.rotation, totalSpeed, {x:"-=.3", ease:Back.easeOut});

  gsap.to(this.pawFL.rotation, totalSpeed, {x:"+=.7", ease:Back.easeOut});
  gsap.to(this.pawFR.rotation, totalSpeed, {x:"-=.7", ease:Back.easeOut});
  gsap.to(this.pawBL.rotation, totalSpeed, {x:"+=.7", ease:Back.easeOut});
  gsap.to(this.pawBR.rotation, totalSpeed, {x:"-=.7", ease:Back.easeOut});

  gsap.to(this.tail.rotation, totalSpeed, {x:"+=1", ease:Back.easeOut});

  gsap.to(this.mouth.rotation, totalSpeed, {x:.5, ease:Back.easeOut});

  gsap.to(this.mesh.position, totalSpeed/2, {y:jumpHeight, ease:Power2.easeOut});
  gsap.to(this.mesh.position, totalSpeed/2, {y:0, ease:Power4.easeIn, delay:totalSpeed/2, onComplete: function(){
    //t = 0;
    _this.status="running";
  }});

}

// Second Section

Hero.prototype.nod = function(){
  var _this = this;
  var sp = .5 + Math.random();

  // HEAD
  var tHeadRotY = -Math.PI/6 + Math.random()* Math.PI/3;
  gsap.to(this.head.rotation, sp, {y:tHeadRotY, ease:Power4.easeInOut, onComplete:function(){_this.nod()}});

  // EARS
  var tEarLRotX =  Math.PI/4 + Math.random()* Math.PI/6;
  var tEarRRotX =  Math.PI/4 + Math.random()* Math.PI/6;

  gsap.to(this.earL.rotation, sp, {x:tEarLRotX, ease:Power4.easeInOut});
  gsap.to(this.earR.rotation, sp, {x:tEarRRotX, ease:Power4.easeInOut});


  // PAWS BACK LEFT

  var tPawBLRot = Math.random()*Math.PI/2;
  var tPawBLY = -4 + Math.random()*8;

  gsap.to(this.pawBL.rotation, sp/2, {x:tPawBLRot, ease:Power1.easeInOut, yoyo:true, repeat:2});
  gsap.to(this.pawBL.position, sp/2, {y:tPawBLY, ease:Power1.easeInOut, yoyo:true, repeat:2});


  // PAWS BACK RIGHT

  var tPawBRRot = Math.random()*Math.PI/2;
  var tPawBRY = -4 + Math.random()*8;
  gsap.to(this.pawBR.rotation, sp/2, {x:tPawBRRot, ease:Power1.easeInOut, yoyo:true, repeat:2});
  gsap.to(this.pawBR.position, sp/2, {y:tPawBRY, ease:Power1.easeInOut, yoyo:true, repeat:2});

  // PAWS FRONT LEFT

  var tPawFLRot = Math.random()*Math.PI/2;
  var tPawFLY = -4 + Math.random()*8;

  gsap.to(this.pawFL.rotation, sp/2, {x:tPawFLRot, ease:Power1.easeInOut, yoyo:true, repeat:2});

  gsap.to(this.pawFL.position, sp/2, {y:tPawFLY, ease:Power1.easeInOut, yoyo:true, repeat:2});

  // PAWS FRONT RIGHT

  var tPawFRRot = Math.random()*Math.PI/2;
  var tPawFRY = -4 + Math.random()*8;

  gsap.to(this.pawFR.rotation, sp/2, {x:tPawFRRot, ease:Power1.easeInOut, yoyo:true, repeat:2});

  gsap.to(this.pawFR.position, sp/2, {y:tPawFRY, ease:Power1.easeInOut, yoyo:true, repeat:2});

  // MOUTH
  var tMouthRot = Math.random()*Math.PI/8;
  gsap.to(this.mouth.rotation, sp, {x:tMouthRot, ease:Power1.easeInOut});
  // IRIS
  var tIrisY = -1 + Math.random()*2;
  var tIrisZ = -1 + Math.random()*2;
  var iris1 = this.iris;
  var iris2 = this.eyeR.children[0];
  gsap.to([iris1.position, iris2.position], sp, {y:tIrisY, z:tIrisZ, ease:Power1.easeInOut});

  //EYES
  if (Math.random()>.2) gsap.to([this.eyeR.scale, this.eyeL.scale], sp/8, {y:0, ease:Power1.easeInOut, yoyo:true, repeat:1});

}

Hero.prototype.hang = function(){
  var _this = this;
  var sp = 1;
  var ease = Power4.easeOut;

  gsap.killTweensOf(this.eyeL.scale);
  gsap.killTweensOf(this.eyeR.scale);

  this.body.rotation.x = 0;
  this.torso.rotation.x = 0;
  this.body.position.y = 0;
  this.torso.position.y = 7;

  gsap.to(this.mesh.rotation, sp, {y:0, ease:ease});
  gsap.to(this.mesh.position, sp, {y:-7, z:6, ease:ease});
  gsap.to(this.head.rotation, sp, {x:Math.PI/6, ease:ease, onComplete:function(){_this.nod();}});

  gsap.to(this.earL.rotation, sp, {x:Math.PI/3, ease:ease});
  gsap.to(this.earR.rotation, sp, {x:Math.PI/3, ease:ease});

  gsap.to(this.pawFL.position, sp, {y:-1, z:3, ease:ease});
  gsap.to(this.pawFR.position, sp, {y:-1, z:3, ease:ease});
  gsap.to(this.pawBL.position, sp, {y:-2, z:-3, ease:ease});
  gsap.to(this.pawBR.position, sp, {y:-2, z:-3, ease:ease});

  gsap.to(this.eyeL.scale, sp, {y:1, ease:ease});
  gsap.to(this.eyeR.scale, sp, {y:1, ease:ease});
}
