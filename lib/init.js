function createHero() {
  hero = new Hero();
  hero.mesh.rotation.y = Math.PI/2;
  scene.add(hero.mesh);
  hero.nod();
}

function createMonster() {

  monster = new Monster();
  monster.mesh.position.z = 20;
  //monster.mesh.scale.set(1.2,1.2,1.2);
  scene.add(monster.mesh);
  updateMonsterPosition();

}

function updateMonsterPosition(){
  monster.run();
  monsterPosTarget -= delta*monsterAcceleration;
  monsterPos += (monsterPosTarget-monsterPos) *delta;
  if (monsterPos < .56){
    gameOver();
  }

  var angle = Math.PI*monsterPos;
  monster.mesh.position.y = - floorRadius + Math.sin(angle)*(floorRadius + 12);
  monster.mesh.position.x = Math.cos(angle)*(floorRadius+15);
  monster.mesh.rotation.z = -Math.PI/2 + angle;
}

function gameOver(){
  fieldGameOver.className = "show";
  gameStatus = "gameOver";
  monster.sit();
  hero.hang();
  monster.heroHolder.add(hero.mesh);
  gsap.to(this, 1, {speed:0});
  gsap.to(camera.position, 3, {z:cameraPosGameOver, y: 60, x:-30});
  carrot.mesh.visible = false;
  obstacle.mesh.visible = false;
  clearInterval(levelInterval);
}

function replay(){

  gameStatus = "preparingToReplay"

  fieldGameOver.className = "";

  gsap.killTweensOf(monster.pawFL.position);
  gsap.killTweensOf(monster.pawFR.position);
  gsap.killTweensOf(monster.pawBL.position);
  gsap.killTweensOf(monster.pawBR.position);

  gsap.killTweensOf(monster.pawFL.rotation);
  gsap.killTweensOf(monster.pawFR.rotation);
  gsap.killTweensOf(monster.pawBL.rotation);
  gsap.killTweensOf(monster.pawBR.rotation);

  gsap.killTweensOf(monster.tail.rotation);
  gsap.killTweensOf(monster.head.rotation);
  gsap.killTweensOf(monster.eyeL.scale);
  gsap.killTweensOf(monster.eyeR.scale);

  //gsap.killTweensOf(hero.head.rotation);

  monster.tail.rotation.y = 0;

  gsap.to(camera.position, 3, {z:cameraPosGame, x:0, y:30, ease:Power4.easeInOut});
  gsap.to(monster.torso.rotation,2, {x:0, ease:Power4.easeInOut});
  gsap.to(monster.torso.position,2, {y:0, ease:Power4.easeInOut});
  gsap.to(monster.pawFL.rotation,2, {x:0, ease:Power4.easeInOut});
  gsap.to(monster.pawFR.rotation,2, {x:0, ease:Power4.easeInOut});
  gsap.to(monster.mouth.rotation,2, {x:.5, ease:Power4.easeInOut});


  gsap.to(monster.head.rotation,2, {y:0, x:-.3, ease:Power4.easeInOut});

  gsap.to(hero.mesh.position, 2, { x:20, ease:Power4.easeInOut});
  gsap.to(hero.head.rotation, 2, { x:0, y:0, ease:Power4.easeInOut});
  gsap.to(monster.mouth.rotation, 2, {x:.2, ease:Power4.easeInOut});
  gsap.to(monster.mouth.rotation, 1, {x:.4, ease:Power4.easeIn, delay: 1, onComplete:function(){

    resetGame();
  }});

}

function createFirs(){

  var nTrees = 100;
   for(var i=0; i< nTrees; i++){
    var phi = i*(Math.PI*2)/nTrees;
    var theta = Math.PI/2;
    //theta += .25 + Math.random()*.3;
    theta += (Math.random()>.05)? .25 + Math.random()*.3 : - .35 -  Math.random()*.1;

    var fir = new Tree();
    fir.mesh.position.x = Math.sin(theta)*Math.cos(phi)*floorRadius;
    fir.mesh.position.y = Math.sin(theta)*Math.sin(phi)*(floorRadius-10);
    fir.mesh.position.z = Math.cos(theta)*floorRadius;

    var vec = fir.mesh.position.clone();
    var axis = new THREE.Vector3(0,1,0);
    fir.mesh.quaternion.setFromUnitVectors(axis, vec.clone().normalize());
    floor.add(fir.mesh);
  }
}

function createCarrot(){
  carrot = new Carrot();
  scene.add(carrot.mesh);
}

function updateCarrotPosition(){
  carrot.mesh.rotation.y += delta * 6;
  carrot.mesh.rotation.z = Math.PI/2 - (floorRotation+carrot.angle);
  carrot.mesh.position.y = -floorRadius + Math.sin(floorRotation+carrot.angle) * (floorRadius+50);
  carrot.mesh.position.x = Math.cos(floorRotation+carrot.angle) * (floorRadius+50);

}

function updateObstaclePosition(){
  if (obstacle.status=="flying")return;

  // TODO fix this,
  if (floorRotation+obstacle.angle > 2.5 ){
    obstacle.angle = -floorRotation + Math.random()*.3;
    obstacle.body.rotation.y = Math.random() * Math.PI*2;
  }

  obstacle.mesh.rotation.z = floorRotation + obstacle.angle - Math.PI/2;
  obstacle.mesh.position.y = -floorRadius + Math.sin(floorRotation+obstacle.angle) * (floorRadius+3);
  obstacle.mesh.position.x = Math.cos(floorRotation+obstacle.angle) * (floorRadius+3);

}

function updateFloorRotation(){
  floorRotation += delta*.03 * speed;
  floorRotation = floorRotation%(Math.PI*2);
  floor.rotation.z = floorRotation;
}

function createObstacle(){
  obstacle = new Hedgehog();
  obstacle.body.rotation.y = -Math.PI/2;
  obstacle.mesh.scale.set(1.1,1.1,1.1);
  obstacle.mesh.position.y = floorRadius+4;
  obstacle.nod();
  scene.add(obstacle.mesh);
}

function createBonusParticles(){
  bonusParticles = new BonusParticles();
  bonusParticles.mesh.visible = false;
  scene.add(bonusParticles.mesh);

}



function checkCollision(){
  var db = hero.mesh.position.clone().sub(carrot.mesh.position.clone());
  var dm = hero.mesh.position.clone().sub(obstacle.mesh.position.clone());

  if(db.length() < collisionBonus){
    getBonus();
  }

  if(dm.length() < collisionObstacle && obstacle.status != "flying"){
    getMalus();
  }
}

function getBonus(){
  bonusParticles.mesh.position.copy(carrot.mesh.position);
  bonusParticles.mesh.visible = true;
  bonusParticles.explose();
  carrot.angle += Math.PI/2;
  //speed*=.95;
  monsterPosTarget += .025;

}

function getMalus(){
  obstacle.status="flying";
  var tx = (Math.random()>.5)? -20-Math.random()*10 : 20+Math.random()*5;
  gsap.to(obstacle.mesh.position, 4, {x:tx, y:Math.random()*50, z:350, ease:Power4.easeOut});
  gsap.to(obstacle.mesh.rotation, 4, {x:Math.PI*3, z:Math.PI*3, y:Math.PI*6, ease:Power4.easeOut, onComplete:function(){
    obstacle.status = "ready";
    obstacle.body.rotation.y = Math.random() * Math.PI*2;
    obstacle.angle = -floorRotation - Math.random()*.4;

    obstacle.angle = obstacle.angle%(Math.PI*2);
    obstacle.mesh.rotation.x = 0;
    obstacle.mesh.rotation.y = 0;
    obstacle.mesh.rotation.z = 0;
    obstacle.mesh.position.z = 0;

  }});
  //
  monsterPosTarget -= .04;
  gsap.from(this, .5, {malusClearAlpha:.5, onUpdate:function(){
    renderer.setClearColor(malusClearColor, malusClearAlpha );
  }})
}

function updateDistance(){
  distance += delta*speed;
  var d = distance/2;
  fieldDistance.innerHTML = Math.floor(d);
}

function updateLevel(){
  if (speed >= maxSpeed) return;
  level++;
  speed += 2;
}

function loop(){
  delta = clock.getDelta();
  updateFloorRotation();

  if (gameStatus == "play"){

    if (hero.status == "running"){
      hero.run();
    }
    updateDistance();
    updateMonsterPosition();
    updateCarrotPosition();
    updateObstaclePosition();
    checkCollision();
  }

  render();
  requestAnimationFrame(loop);
}

function render(){
  renderer.render(scene, camera);
}

window.addEventListener('load', init, false);

function init(event){
  initScreenAnd3D();
  createLights();
  createFloor()
  createHero();
  createMonster();
  createFirs();
  createCarrot();
  createBonusParticles();
  createObstacle();
  initUI();
  resetGame();
  loop();

  //setInterval(hero.blink.bind(hero), 3000);
}

function resetGame(){
  scene.add(hero.mesh);
  hero.mesh.rotation.y = Math.PI/2;
  hero.mesh.position.y = 0;
  hero.mesh.position.z = 0;
  hero.mesh.position.x = 0;

  monsterPos = .56;
  monsterPosTarget = .65;
  speed = initSpeed;
  level = 0;
  distance = 0;
  carrot.mesh.visible = true;
  obstacle.mesh.visible = true;
  gameStatus = "play";
  hero.status = "running";
  hero.nod();
  audio.play();
  updateLevel();
  levelInterval = setInterval(updateLevel, levelUpdateFreq);
}

function initUI(){
  fieldDistance = document.getElementById("distValue");
  fieldGameOver = document.getElementById("gameoverInstructions");

}
