import * as THREE from 'three';
class HelixCurve extends THREE.Curve {
  constructor(radius, height, turns,scale=1) {
      super();
      this.radius = radius;
      this.height = height;
      this.turns = turns;
  }

  getPoint(t,optionalTarget=new THREE.Vector3()) {
      const angle = t * this.turns * Math.PI * 2;
      const x = this.radius * Math.cos(angle);
      const y = t * this.height;
      const z = this.radius * Math.sin(angle);
      return optionalTarget.set(x, y, z);
  }
}

const radius = 1;         // Radius of the spring coil
const tubeRadius = 0.1;   // Radius of the tube
const tubularSegments = 200; // Number of segments along the length of the spring
const radialSegments = 8; // Number of segments around the tube
const height = 5;         // Height of the spring
const turns = 10;         // Number of turns of the spring
const path = new HelixCurve(radius, height, turns);
export const springGeometry = new THREE.TubeGeometry(path, tubularSegments, tubeRadius, radialSegments, false);
springGeometry.scale(0.1, 0.1, 0.1);