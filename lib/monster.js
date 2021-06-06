Monster = function(){

  this.runningCycle = 0;

  this.mesh = new THREE.Group();
  this.body = new THREE.Group();

  var torsoGeom = new THREE.BoxGeometry(15,15,20, 1);
  this.torso = new THREE.Mesh(torsoGeom, blackMat);

  var headGeom = new THREE.BoxGeometry(20,20,40, 1);
  headGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,0,20));
  this.head = new THREE.Mesh(headGeom, blackMat);
  this.head.position.z = 12;
  this.head.position.y = 2;

  var mouthGeom = new THREE.BoxGeometry(10,4,20, 1);
  mouthGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,-2,10));
  this.mouth = new THREE.Mesh(mouthGeom, blackMat);
  this.mouth.position.y = -8;
  this.mouth.rotation.x = .4;
  this.mouth.position.z = 4;

  this.heroHolder = new THREE.Group();
  this.heroHolder.position.z = 20;
  this.mouth.add(this.heroHolder);

  var toothGeom = new THREE.BoxGeometry(2,2,1,1);

  // toothGeom.vertices[1].x-=1;
  // toothGeom.vertices[4].x+=1;
  // toothGeom.vertices[5].x+=1;
  // toothGeom.vertices[0].x-=1;

  for(var i=0; i<3; i++){
    var toothf = new THREE.Mesh(toothGeom, whiteMat);
    toothf.position.x = -2.8 + i*2.5;
    toothf.position.y = 1;
    toothf.position.z = 19;

    var toothl = new THREE.Mesh(toothGeom, whiteMat);
    toothl.rotation.y = Math.PI/2;
    toothl.position.z = 12 + i*2.5;
    toothl.position.y = 1;
    toothl.position.x = 4;

    var toothr = toothl.clone();
    toothl.position.x = -4;

    this.mouth.add(toothf);
    this.mouth.add(toothl);
    this.mouth.add(toothr);
  }

  var tongueGeometry = new THREE.BoxGeometry(6,1,14);
  tongueGeometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0,0,7));

  this.tongue = new THREE.Mesh(tongueGeometry, pinkMat);
  this.tongue.position.z = 2;
  this.tongue.rotation.x = -.2;
  this.mouth.add(this.tongue);

  var noseGeom = new THREE.BoxGeometry(4,4,4, 1);
  this.nose = new THREE.Mesh(noseGeom, pinkMat);
  this.nose.position.z = 39.5;
  this.nose.position.y = 9;
  this.head.add(this.nose);

  this.head.add(this.mouth);

  var eyeGeom = new THREE.BoxGeometry(2,3,3);

  this.eyeL = new THREE.Mesh(eyeGeom, whiteMat);
  this.eyeL.position.x = 10;
  this.eyeL.position.z = 5;
  this.eyeL.position.y = 5;
  this.eyeL.castShadow = true;
  this.head.add(this.eyeL);

  var irisGeom = new THREE.BoxGeometry(.6,1,1);

  this.iris = new THREE.Mesh(irisGeom, blackMat);
  this.iris.position.x = 1.2;
  this.iris.position.y = -1;
  this.iris.position.z = 1;
  this.eyeL.add(this.iris);

  this.eyeR = this.eyeL.clone();
  this.eyeR.children[0].position.x = -this.iris.position.x;
  this.eyeR.position.x = -this.eyeL.position.x;
  this.head.add(this.eyeR);


  var earGeom = new THREE.BoxGeometry(8, 6, 2, 1);
  // earGeom.vertices[1].x-=4;
  // earGeom.vertices[4].x+=4;
  // earGeom.vertices[5].x+=4;
  // earGeom.vertices[5].z-=2;
  // earGeom.vertices[0].x-=4;
  // earGeom.vertices[0].z-=2;


  earGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,3,0));

  this.earL = new THREE.Mesh(earGeom, blackMat);
  this.earL.position.x = 6;
  this.earL.position.z = 1;
  this.earL.position.y = 10;
  this.earL.castShadow = true;
  this.head.add(this.earL);

  this.earR = this.earL.clone();
  this.earR.position.x = -this.earL.position.x;
  this.earR.rotation.z = -this.earL.rotation.z;
  this.head.add(this.earR);

  var eyeGeom = new THREE.BoxGeometry(2,4,4);

  var tailGeom = new THREE.CylinderGeometry(5,2, 20, 4, 1);
  tailGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,10,0));
  tailGeom.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI/2));
  tailGeom.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI/4));

  this.tail = new THREE.Mesh(tailGeom, blackMat);
  this.tail.position.z = -10;
  this.tail.position.y = 4;
  this.torso.add(this.tail);


  var pawGeom = new THREE.CylinderGeometry(1.5,0,10);
  pawGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,-5,0));
  this.pawFL = new THREE.Mesh(pawGeom, blackMat);
  this.pawFL.position.y = -7.5;
  this.pawFL.position.z = 8.5;
  this.pawFL.position.x = 5.5;
  this.torso.add(this.pawFL);

  this.pawFR = this.pawFL.clone();
  this.pawFR.position.x = - this.pawFL.position.x;
  this.torso.add(this.pawFR);

  this.pawBR = this.pawFR.clone();
  this.pawBR.position.z = - this.pawFL.position.z;
  this.torso.add(this.pawBR);

  this.pawBL = this.pawBR.clone();
  this.pawBL.position.x = this.pawFL.position.x;
  this.torso.add(this.pawBL);

  this.mesh.add(this.body);
  this.torso.add(this.head);
  this.body.add(this.torso);

  this.torso.castShadow = true;
  this.head.castShadow = true;
  this.pawFL.castShadow = true;
  this.pawFR.castShadow = true;
  this.pawBL.castShadow = true;
  this.pawBR.castShadow = true;

  this.body.rotation.y = Math.PI/2;
}
