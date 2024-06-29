import * as THREE from 'three';

class AxisGridHelper {
  private _visible: boolean;
  private grid: THREE.GridHelper;
  private axes: THREE.AxesHelper;

  constructor(node: THREE.Object3D, units: number = 10) {
    const axes = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 2;
    node.add(axes);

    const grid = new THREE.GridHelper(units, units);
    grid.material.depthTest = false;
    grid.renderOrder = 1;
    node.add(grid);

    this.grid = grid;
    this.axes = axes;
    this._visible = false;
    //------------------------//
    this.grid.visible = false;
    this.axes.visible = false;
    //------------------------//
  }

  get visible(): boolean {
    return this._visible;
  }

  set visible(v: boolean) {
    this._visible = v;
    this.grid.visible = v;
    this.axes.visible = v;
  }
}

export default AxisGridHelper;
