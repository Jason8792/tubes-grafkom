function createHero() {

  const geometry = new THREE.BoxGeometry( 10, 10, 10 );
  const material1 = new THREE.MeshPhongMaterial({
    color: 0xdc5f45,//0xb43b29,//0xff5b49,
    shininess:0,
    flatShading:THREE.FlatShading,
  });
  const cube = new THREE.Mesh( geometry, material1 );

  var x = 0;
  var y = 5;
  var z = 30;

  cube.position.z = z;
  cube.position.y= y;
  cube.position.x = x;

  scene.add( cube );

  let t1 = gsap.timeline({paused:true});
  t1.to(cube.position,{y:30,duration:1});
  t1.to(cube.position,{y:y,duration:1});

  let jump = false;

  addEventListener('mousedown',function(e){
    if(jump == false){
      t1.play();
    }
    else{
      t1.reverse();
    }
    jump =!jump;

    // agar loncat bisa berulang
    // sumber : https://www.youtube.com/watch?v=vccdcoI432c&list=PL5gLq0nzeozvgdrykl2tI8SZBRiYoe54Q&index=8

  });
  hero = cube;
}

// function createMonster() {

  // const geometry =  new THREE.CylinderGeometry( 8, 8, 20, 32 );;
  // const material = new THREE.MeshPhongMaterial({
    // color: 0x8c4408,
    // flatShading:THREE.FlatShading,
  // });
  // const sphere = new THREE.Mesh( geometry, material );
  // sphere.position.z = 50;
  // sphere.position.y= 5;
  // sphere.position.x = -40;
  // sphere.rotation.x = 30;
  // monster = new Monster();
  // monster.mesh.position.z = 20;
  // sphere.scale.set(1.2,1.2,1.2);
  // scene.add(sphere);

  // gsap.to(sphere.rotation,1.2);
  // updateMonsterPosition();

// }

// function updateMonsterPosition(){
//   monster.run();
//   monsterPosTarget -= delta*monsterAcceleration;
//   monsterPos += (monsterPosTarget-monsterPos) *delta;
//   if (monsterPos < .56){
//     gameOver();
//   }

//   var angle = Math.PI*monsterPos;
//   monster.mesh.position.y = - floorRadius + Math.sin(angle)*(floorRadius + 12);
//   monster.mesh.position.x = Math.cos(angle)*(floorRadius+15);
//   monster.mesh.rotation.z = -Math.PI/2 + angle;
// }

function gameOver(){
  fieldGameOver.style.opacity = "1";
  gameStatus = "gameOver";
  // monster.sit();
  // hero.hang();
  // monster.heroHolder.add(hero.mesh);
  gsap.to(this, 1, {speed:0});
  gsap.to(camera.position, 3, {z:cameraPosGameOver, y: 60, x:-30});
  // carrot.mesh.visible = false;
  // obstacle.mesh.visible = false;
  clearInterval(levelInterval);
}

function replay(){
  fieldGameOver.style.opacity = "0";
  gsap.to(camera.position, 3, {z:cameraPosGame, x:0, y:30, ease:Power4.easeInOut});
  resetGame();
}

function createBuildings(){

  var nBuildings = 25;
   for(var i=0; i< nBuildings; i++){
    var phi = i*(Math.PI*2)/nBuildings;
    var theta = Math.PI/2;
    theta += (Math.random()>.05)? .25 + Math.random()*.3 : - .35 -  Math.random()*.1;

    var fir = new Building();
    fir.mesh.position.x = Math.sin(theta)*Math.cos(phi)*floorRadius;
    fir.mesh.position.y = Math.sin(theta)*Math.sin(phi)*(floorRadius-10);
    fir.mesh.position.z = Math.cos(theta)*floorRadius;

    var vec = fir.mesh.position.clone();
    var axis = new THREE.Vector3(0,1,0);
    fir.mesh.quaternion.setFromUnitVectors(axis, vec.clone().normalize());
    floor.add(fir.mesh);
  }
}

function updateObstaclePosition(){
  if (obstacle.status=="flying")return;

  // TODO fix this,
  if (floorRotation+obstacle.angle > 2.5 ){
    obstacle.angle = -floorRotation + Math.random()*.3;
    // obstacle.body.rotation.y = Math.random() * Math.PI*2;
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

  obstacle = new Cone();
  // obstacle.body.rotation.y = -Math.PI/2;
  obstacle.mesh.scale.set(1.1,1.1,1.1);
  obstacle.mesh.position.y = floorRadius+4;
  obstacle.mesh.position.z = 30;
  // obstacle.nod();
  scene.add(obstacle.mesh);

}

// function createBonusParticles(){
//   bonusParticles = new BonusParticles();
//   bonusParticles.mesh.visible = false;
//   scene.add(bonusParticles.mesh);

// }



function checkCollision(){

  var dm = hero.position.clone().sub(obstacle.mesh.position.clone());

  // if(db.length() < collisionBonus){
  //   getBonus();
  // }

  if (dm.length() < collisionObstacle && obstacle.status != "flying"){
    console.log('salim');
    fieldGameOver.style.opacity = "1";
    gameOver()
    clearInterval(levelInterval);
    window.stop();
  }
}

// function getBonus(){
//   bonusParticles.mesh.position.copy(carrot.mesh.position);
//   bonusParticles.mesh.visible = true;
//   bonusParticles.explose();
//   carrot.angle += Math.PI/2;
//   //speed*=.95;
//   monsterPosTarget += .025;

// }

// function getMalus(){
//   obstacle.status="flying";
//   var tx = (Math.random()>.5)? -20-Math.random()*10 : 20+Math.random()*5;
//   gsap.to(obstacle.mesh.position, 4, {x:tx, y:Math.random()*50, z:350, ease:Power4.easeOut});
//   gsap.to(obstacle.mesh.rotation, 4, {x:Math.PI*3, z:Math.PI*3, y:Math.PI*6, ease:Power4.easeOut, onComplete:function(){
//     obstacle.status = "ready";
//     obstacle.body.rotation.y = Math.random() * Math.PI*2;
//     obstacle.angle = -floorRotation - Math.random()*.4;

//     obstacle.angle = obstacle.angle%(Math.PI*2);
//     obstacle.mesh.rotation.x = 0;
//     obstacle.mesh.rotation.y = 0;
//     obstacle.mesh.rotation.z = 0;
//     obstacle.mesh.position.z = 0;

//   }});
//   //
//   monsterPosTarget -= .04;
//   gsap.from(this, .5, {malusClearAlpha:.5, onUpdate:function(){
//     renderer.setClearColor(malusClearColor, malusClearAlpha );
//   }})
// }

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

    updateDistance();
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
  d = 0;
  initScreenAnd3D();
  createLights();
  createFloor()
  createHero();
  // createMonster();
  createBuildings();
  // createCarrot();
  // createBonusParticles();
  createObstacle();
  initUI();
  resetGame();
  loop();

  // setInterval(hero.blink.bind(hero), 3000);
}

function resetGame(){
  // monsterPos = .56;
  // monsterPosTarget = .65;
  speed = initSpeed;
  level = 0;
  distance = 0;
  // carrot.mesh.visible = true;
  obstacle.mesh.visible = true;
  gameStatus = "play";
  // hero.status = "running";
  // hero.nod();
  // audio.play();
  updateLevel();
  levelInterval = setInterval(updateLevel, levelUpdateFreq);
  location.reload;
}

function initUI(){
  fieldDistance = document.getElementById("distValue");
  fieldGameOver = document.getElementById("gameoverInstructions");

}
