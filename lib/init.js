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

function gameOver(){
  fieldGameOver.style.display = "block";
  fieldGameOver.style.opacity = "1";
  gameStatus = "gameOver";
  gsap.to(this, 1, {speed:0});
  gsap.to(camera.position, 3, {z:cameraPosGameOver, y: 60, x:-30});
  clearInterval(levelInterval);
}

function replay(){
  fieldGameOver.style.display = "none";
  fieldGameOver.style.opacity = "0";
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

  if (floorRotation + obstacle.angle > 2.5 ){
    obstacle.angle = -floorRotation + Math.random() * .3;
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
  obstacle.mesh.scale.set(1.1,1.1,1.1);
  obstacle.mesh.position.y = floorRadius+4;
  obstacle.mesh.position.z = 30;
  scene.add(obstacle.mesh);
}



function checkCollision(){
  var dm = hero.position.clone().sub(obstacle.mesh.position.clone());

  if (dm.length() < collisionObstacle && obstacle.status != "flying"){
    console.log('salim');
    fieldGameOver.style.display = "block";
    fieldGameOver.style.opacity = "1";
    gameOver()
    clearInterval(levelInterval);
    window.stop();
  }
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
  createBuildings();
  createObstacle();
  initUI();
  resetGame();
  loop();
}

function resetGame(){
  gsap.to(camera.position, 3, {z:cameraPosGame, x:0, y:30, ease:Power4.easeInOut});

  speed = initSpeed;
  level = 0;
  distance = 0;
  obstacle.mesh.visible = true;
  gameStatus = "play";
  updateLevel();
  levelInterval = setInterval(updateLevel, levelUpdateFreq);
  location.reload;
}

function initUI(){
  fieldDistance = document.getElementById("distValue");
  fieldGameOver = document.getElementById("gameoverInstructions");
}
