var Material = function(parameters) {
  switch (parameters.type) {
    case Material.Lambert: return new THREE.MeshLambertMaterial(parameters);
    case Material.Normal: return new THREE.MeshNormalMaterial(parameters);
    default: return new THREE.MeshBasicMaterial(parameters);
  }
}

Material.Basic = 'basic';
Material.Normal = 'normal';
Material.Lambert = 'lambert';