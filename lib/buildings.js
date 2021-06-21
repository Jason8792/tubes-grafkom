// TREE

Building = function(){
	this.mesh = new THREE.Object3D();
	this.block = new BuildingBlock();
	this.mesh.add(this.block.mesh);
}


BuildingBlock = function(){
  var blockHeight = 50 + Math.random()*150;
  var topRadius = 1+Math.random()*5;
  var bottomRadius = 5+Math.random()*5;
  var matBuildingBlock = new THREE.TextureLoader().load('building.jpg');
  var matBuildingBlock = building;
  var nhSegments = 3;
  var nvSegments = 3;
  var geom = new THREE.CylinderGeometry(bottomRadius,bottomRadius,blockHeight, nhSegments, nvSegments);
  geom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,blockHeight/2,0));

  this.mesh = new THREE.Mesh(geom, matBuildingBlock);

  this.mesh.castShadow = true;
}
