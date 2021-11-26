import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { WebGL1Renderer } from 'three';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas')
  canvasRef?: ElementRef;

  camera!: PerspectiveCamera;

  get canvas(): HTMLCanvasElement {
    return this.canvasRef?.nativeElement;
  }
  geometry = new BoxGeometry(1, 1, 1);
  material = new MeshBasicMaterial({
    color: 0xff6347,
  });

  cube: THREE.Mesh = new Mesh(this.geometry, this.material);

  renderer!: THREE.WebGLRenderer;

  scene!: THREE.Scene;

  animateCube() {
    this.cube.rotation.x += 1;
    this.cube.rotation.y += 1;
  }

  createScene(canvas: any) {
    this.scene = new Scene();
    this.scene.add(this.cube);
    let aspectRatio = canvas.clientWidth / canvas.clientHeight;
    this.camera = new PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.position.setZ(30);
  }

  startRenderingLoop(canvas: any) {
    this.renderer = new WebGLRenderer({ canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    let component = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    })();
  }

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    console.log(this.canvasRef);
    this.createScene(this.canvas);
    this.startRenderingLoop(this.canvas);
  }
}
