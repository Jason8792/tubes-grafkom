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

function updateFloorRotation(){
  floorRotation += delta*.03 * speed;
  floorRotation = floorRotation%(Math.PI*2);
  floor.rotation.z = floorRotation;
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

    updateDistance();
    updateCarrotPosition();
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
  createFirs();
  createCarrot();
  initUI();
  loop();
}

function initUI(){
  fieldDistance = document.getElementById("distValue");
  fieldGameOver = document.getElementById("gameoverInstructions");

}
