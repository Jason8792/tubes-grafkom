Cone = function() {
  this.angle = 0;
  this.status="ready";

  this.mesh = new THREE.Group();
  const geometrycon = new THREE.ConeGeometry( 5, 20, 32 );
  const materialcon = new THREE.MeshBasicMaterial( {color: 0xff6600} );
  const cone = new THREE.Mesh( geometrycon, materialcon );

  this.mesh.add(cone);
}
