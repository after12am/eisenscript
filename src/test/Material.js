export default class Material {

  static get Basic() { return 'basic'; }
  static get Normal() { return 'normal'; }
  static get Lambert() { return 'lambert'; }

  constructor(parameters) {
    switch (parameters.type) {
      case Material.Lambert: return new THREE.MeshLambertMaterial(parameters);
      case Material.Normal: return new THREE.MeshNormalMaterial(parameters);
      default: return new THREE.MeshBasicMaterial(parameters);
    }
  }
}
