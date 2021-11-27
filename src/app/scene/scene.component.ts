import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { Bounce, ScrollTrigger } from 'gsap/all';
import { fromEvent } from 'rxjs';
import {
  AmbientLight,
  BoxGeometry,
  Camera,
  Color,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  Texture,
  TorusGeometry,
  WebGLRenderer,
} from 'three';
import * as THREE from 'three';
import { WebGL1Renderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas')
  canvasRef?: ElementRef;
  scene?: Scene;
  camera?: PerspectiveCamera;
  renderer?: WebGLRenderer;
  geometry?: BoxGeometry;
  material?: MeshStandardMaterial;
  object?: Mesh;
  pointLight?: PointLight;
  ambientLight?: AmbientLight;

  get height() {
    return Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
  }

  get currentScroll() {
    return document.body.getBoundingClientRect().top;
  }

  get persentDownPage() {
    return (this.currentScroll / this.height) * 100;
  }

  get position() {
    return Math.asin(this.persentDownPage);
  }
  createScene(): void {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight
    );
    this.renderer = new WebGLRenderer({
      canvas: this.canvasRef?.nativeElement,
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.setZ(30);

    this.geometry = new BoxGeometry(15, 30, 2.5);
    this.material = new MeshStandardMaterial({ color: 0xff6347 });
    this.object = new Mesh(this.geometry, this.material);
    this.object.position.setX(window.innerWidth < 500 ? 0 : 20);

    this.pointLight = new PointLight(0xffffff);
    this.pointLight.position.set(20, 20, 20);

    this.ambientLight = new AmbientLight(0xffffff);

    this.scene.add(this.pointLight, this.ambientLight, this.object);

    this.scene.background = new Color(0xffffff);

    this.renderer.render(this.scene, this.camera);

    const { renderer, object, camera } = this;

    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(this.scene!, this.camera!);
    };

    fromEvent(window, 'scroll').subscribe((e) => {
      object.rotation.y = this.persentDownPage / 10;
    });

    animate();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createScene();
  }
}
