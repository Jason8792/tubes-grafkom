//THREEJS RELATED VARIABLES
var scene,
  camera, fieldOfView, aspectRatio, nearPlane, farPlane,
  GlobalLight, shadowLight, backLight,
  renderer,
  container,
  controls,
  clock;
var delta = 0;
var floorRadius = 200;
var speed = 6;
var distance = 0;
var level = 1;
var levelInterval;
var levelUpdateFreq = 3000;
var initSpeed = 5;
var maxSpeed = 48;
var monsterPos = .65;
var monsterPosTarget = .65;
var floorRotation = 0;
var collisionObstacle = 10;
var collisionBonus = 20;
var gameStatus = "play";
var cameraPosGame = 160;
var cameraPosGameOver = 260;
var monsterAcceleration = 0.004;
var malusClearColor = 0xb44b39;
var malusClearAlpha = 0;
var audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/264161/Antonio-Vivaldi-Summer_01.mp3');

var fieldGameOver, fieldDistance;

//SCREEN & MOUSE VARIABLES

var HEIGHT, WIDTH, windowHalfX, windowHalfY,
  mousePos = {
    x: 0,
    y: 0
  };

//3D OBJECTS VARIABLES

var hero;


// Materials
var blackMat = new THREE.MeshPhongMaterial({
    color: 0x100707,
    flatShading:THREE.FlatShading,
  });

var brownMat = new THREE.MeshPhongMaterial({
    color: 0xb44b39,
    shininess:0,
    flatShading:THREE.FlatShading,
  });

var greenMat = new THREE.MeshPhongMaterial({
    color: 0x7abf8e,
    shininess:0,
    flatShading:THREE.FlatShading,
  });

  var pinkMat = new THREE.MeshPhongMaterial({
    color: 0xdc5f45,//0xb43b29,//0xff5b49,
    shininess:0,
    flatShading:THREE.FlatShading,
  });

  var lightBrownMat = new THREE.MeshPhongMaterial({
    color: 0xe07a57,
    flatShading:THREE.FlatShading,
  });

  var whiteMat = new THREE.MeshPhongMaterial({
    color: 0xa49789,
    flatShading:THREE.FlatShading,
  });
  var skinMat = new THREE.MeshPhongMaterial({
    color: 0xff9ea5,
    flatShading:THREE.FlatShading
  });
  //personal
  var building = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('building.jpg'),
    flatShading:THREE.FlatShading
  });


// OTHER VARIABLES

var PI = Math.PI;

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function initScreenAnd3D() {

  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;

  scene = new THREE.Scene();

  scene.fog = new THREE.Fog(0x3f3c54, 160,350);

  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 50;
  nearPlane = 1;
  farPlane = 2000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );

  camera.position.x = 0;
  camera.position.z = cameraPosGame;
  camera.position.y = 30;
  camera.lookAt(new THREE.Vector3(0, 30, 0));

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor( malusClearColor, malusClearAlpha);

  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;

  container = document.getElementById('world');
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', handleWindowResize, false);
  document.addEventListener('mousedown', handleMouseDown, false);
  document.addEventListener("touchend", handleMouseDown, false);

  /*
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  //controls.minPolarAngle = -Math.PI / 2;
  //controls.maxPolarAngle = Math.PI / 2;
  //controls.noZoom = true;
  controls.noPan = true;
  //*/

  clock = new THREE.Clock();

}

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}


function handleMouseDown(event){
  if (gameStatus == "play") hero.jump();
  else if (gameStatus == "readyToReplay"){
    replay();
  }
}

function createLights() {
  // globalLight = new THREE.AmbientLight(0xffffff, .9);
  globalLight = new THREE.AmbientLight(0x0f0936, 1);

  shadowLight = new THREE.DirectionalLight(0xffffff, 1);
  shadowLight.position.set(-30, 40, 20);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 2000;
  shadowLight.shadow.mapSize.width = shadowLight.shadow.mapSize.height = 2048;

  scene.add(globalLight);
  scene.add(shadowLight);

}

function createFloor() {

  floorShadow = new THREE.Mesh(new THREE.SphereGeometry(floorRadius, 50, 50), new THREE.MeshPhongMaterial({
    color: 0x110000,
    specular:0x000000,
    shininess:0.5,
    transparent:true,
    opacity:.5
  }));
  floorShadow.receiveShadow = false;

  floorGrass = new THREE.Mesh(new THREE.SphereGeometry(floorRadius-.5, 50, 50), new THREE.MeshBasicMaterial({
    color: 0x53bd6f
  }));
  floorGrass.receiveShadow = true;

  floor = new THREE.Group();
  floor.position.y = -floorRadius;

  floor.add(floorShadow);
  floor.add(floorGrass);
  scene.add(floor);

}
