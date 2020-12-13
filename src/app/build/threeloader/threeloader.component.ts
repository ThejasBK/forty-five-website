import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { NgxSpinnerService } from 'ngx-spinner';
import { Color } from 'three';
@Component({
  selector: 'app-threeloader',
  templateUrl: './threeloader.component.html',
  styleUrls: ['./threeloader.component.css'],
})
export class ThreeloaderComponent implements OnInit {
  choices = [0, 0, 0, 0, 0, 0, 0];
  @Input() bikeColor;
  @Input() fenders;
  @Input() lock;
  @Input() tpms;
  constructor(private spinner: NgxSpinnerService) {}
  // 0 is black
  @Output() sendColor = new EventEmitter();
  @Output() sendFenders = new EventEmitter();
  @Output() sendTpms = new EventEmitter();
  @Output() sendLock = new EventEmitter();
  ngOnInit(): void {
    this.bike();
    this.spinner.show();
  }
  buyProduct = () => {
    const color = this.choices[0] ? 'Grey' : 'Black';
    const goToUrl = `https://pages.razorpay.com/fortyfivebike?bike_color=${color}&range_plus=${this.choices[1]}&charging_plus=${this.choices[2]}&electronic_locking=${this.choices[3]}&intelligent_systems_service=${this.choices[5]}&tyre_pressure_monitoring=${this.choices[6]}&fenders=${this.choices[4]}`;
    window.open(goToUrl, '_self');
  };
  setColor(val) {
    this.sendColor.emit(val);
  }
  setFenders(val) {
    this.sendFenders.emit(val);
  }
  setTpms(val) {
    this.sendTpms.emit(val);
  }
  setLock(val) {
    this.sendLock.emit(val);
  }
  bike = () => {
    window.addEventListener('click', (e) => {
      let id = (<HTMLButtonElement>e.target).id;
      console.log(id);
      if (id === 'gray') {
        let frame;
        frame = new THREE.MeshPhongMaterial({
          color: 0x181818,
          emissive: 0x0,
          shininess: 40,
          specular: 0x111111,
          reflectivity: 1,
          side: THREE.DoubleSide,
          shadowSide: THREE.FrontSide,
        });
        initFrame(bike, frame);
      }
      if (id === 'black') {
        let frame;
        frame = new THREE.MeshPhongMaterial({
          color: 0x000000,
          side: THREE.DoubleSide,
          shadowSide: THREE.FrontSide,
        });
        initFrame(bike, frame);
      }
      if (id === 'cable') {
        let frame;
        frame = new THREE.MeshPhongMaterial({
          color: 0x72544c,
          side: THREE.DoubleSide,
          shadowSide: THREE.FrontSide,
          visible: true,
        });
        initComponent(bike, frame, 'lock_1');
          frame = new THREE.MeshPhongMaterial({
          visible: false,
        });
        initComponent(bike, frame, 'lock');
      }
      if (id === 'smart') {
        let frame;
        frame = new THREE.MeshPhongMaterial({
          visible: false,
        });
        initComponent(bike, frame, 'lock_1');
        frame = new THREE.MeshPhongMaterial({
          color: 0x72544c,
          emissive: 0x0,
          shininess: 40,
          specular: 0x111111,
          reflectivity: 1,
          side: THREE.DoubleSide,
          shadowSide: THREE.FrontSide,
          visible: true,
        });
        initComponent(bike, frame, 'lock');
      }
      if (id === 'tpms-yes') {
        let frame;
        frame = new THREE.MeshPhongMaterial({
          color: 0x72544c,
          emissive: 0x0,
          shininess: 40,
          specular: 0x111111,
          reflectivity: 1,
          side: THREE.DoubleSide,
          shadowSide: THREE.FrontSide,
        });
        initComponent(bike, frame, 'tmps');
      }
      if (id === 'tpms-no') {
        let frame;
        frame = new THREE.MeshPhongMaterial({
          color: 0x000000,
          side: THREE.DoubleSide,
          shadowSide: THREE.FrontSide,
          visible: false,
        });
        initComponent(bike, frame, 'tmps');
      }
      if (id === 'fender-yes') {
        let frame;
        frame = new THREE.MeshPhongMaterial({
          color: 0x000000,
          emissive: 0x0,
          shininess: 40,
          specular: 0x111111,
          reflectivity: 1,
          side: THREE.DoubleSide,
          shadowSide: THREE.FrontSide,
          visible: true,
        });
        const REFLECTOR_MTL = new THREE.MeshPhongMaterial({
          color: 0xff0000,
          emissive: 0x0,
          shininess: 40,
          specular: 0x111111,
          reflectivity: 1,
          visible: true,
        });
        initComponent(bike, frame, 'fenders');
        initComponent(bike, REFLECTOR_MTL, 'Reflector');
      }
      if (id === 'fender-no') {
        let frame;
        frame = new THREE.MeshPhongMaterial({
          visible: false,
        });
        initComponent(bike, frame, 'fenders');
        initComponent(bike, frame, 'Reflector');
      }
    });

    window.addEventListener('resize', onWindowResize);

    var camera, scene, renderer, bike;

    let container = document.getElementById('container');

    // scene

    scene = new THREE.Scene();

    // background

    scene.background = new THREE.Color(0xd8d8d8);

    // scene.background = new THREE.Color(0xffffff);

    // renderer

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.shadowMap.enabled = true;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    document.querySelector('canvas').style.outline = 'none';
    document.querySelector('canvas').style.cursor = 'grab';

    // camera

    camera = new THREE.PerspectiveCamera(
      20, container.clientWidth / container.clientHeight , 0.5, 8000
    );
    scene.add(camera);
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    controls.enablePan = false;
    controls.enableZoom = true;
    let loader = new GLTFLoader();
    let url = '/assets/3d/bike.glb';

    const TYRE_MTL = new THREE.MeshPhongMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
      shadowSide: THREE.FrontSide,
    });
    const FRAME_MTL = new THREE.MeshPhongMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
      shadowSide: THREE.FrontSide,
    });
    // tmps are dust caps in tyre
    const TMPS_MTL = new THREE.MeshPhongMaterial({
      color: 0x000000,
      // side: THREE.DoubleSide,
      // shadowSide: THREE.FrontSide,
    });

    const LOCK_MTL = new THREE.MeshPhongMaterial({
      color: 0x000000,
      // side: THREE.DoubleSide,
      // shadowSide: THREE.FrontSide,
    });

    // glass

    const GLASS_MTL = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      // side: THREE.DoubleSide,
      // shadowSide: THREE.FrontSide,
    });

    // front panel

    const FRONT_PANEL_MTL = new THREE.MeshPhongMaterial({
      color: 0x000000,
      // side: THREE.DoubleSide,
      // shadowSide: THREE.FrontSide,
    });

    // front lock

    const FRONT_LOCK_MTL = new THREE.MeshPhongMaterial({
      color: 0x000000,
      // side: THREE.DoubleSide,
      // shadowSide: THREE.FrontSide,
    });

    // mud gaurd center mount

    const MUDGUARD_MOUNT_MTL = new THREE.MeshPhongMaterial({
      color: 0x000000,
      // side: THREE.DoubleSide,
      // shadowSide: THREE.FrontSide,
    });

    // mid frame color

    const MID_FRAME_MTL = new THREE.MeshPhongMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
      shadowSide: THREE.FrontSide,
    });

    // chain link color

    const CHAINLINK_MTL = new THREE.MeshPhongMaterial({
      color: 0x808080,
      // side: THREE.DoubleSide,
      // shadowSide: THREE.FrontSide,
    });

    // front mudgaurd mount cad
    const FRONT_MUDCAD_MTL = new THREE.MeshPhongMaterial({
      color: 0x000000,
      // side: THREE.DoubleSide,
      // shadowSide: THREE.FrontSide,
    });

    // battery lock
    const BATTERY_LOCK_MTL = new THREE.MeshPhongMaterial({
      color: 0x000000,
      // side: THREE.DoubleSide,
      // shadowSide: THREE.FrontSide,
    });

    // disc

    const DISC_MTL = new THREE.MeshPhongMaterial({
      color: 0xc0c0c0,
      // side: THREE.DoubleSide,
      // shadowSide: THREE.FrontSide,
    });

    // rim material

    const RIM_MTL = new THREE.MeshPhongMaterial({
      color: 0x000000,
      // side: THREE.DoubleSide,
      // shadowSide: THREE.FrontSide,
    });

    // reflector material

    const REFLECTOR_MTL = new THREE.MeshPhongMaterial({
      color: 0xcc0000,
      // side: THREE.DoubleSide,
      // shadowSide: THREE.FrontSide,
    });

    const INVISIBLE_MTL = new THREE.MeshPhongMaterial({
      visible: false,
    });

    camera.position.set(100, 0, 0);
    // camera.position.x = 0;
    // camera.position.y = 0;
    // camera.position.z = 0;
    // camera.translateZ(1);
    let dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderConfig({ type: 'js' });
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);
    loader
      .loadAsync(url)
      .then(function (gltf) {
        bike = gltf.scene;
        // bike.children[0].castShadow = true;
        // bike.children[0].receiveShadow = true;
        // bike.children[0].children[0].castShadow = true;
        // bike.children[0].children[0].receiveShadow = true;
        // bike.traverse((o) => {
        //   o.castShadow = true;
        //   o.receiveShadow = true;
        // });
        bike.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            if (o.material.map) {
              o.material.map.anisotropy = 16;
            }
          }
        });

        const boundingBox = new THREE.Box3();
        boundingBox.setFromObject(bike);
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);
        camera.position.y = center.y - 400;
        if (window.innerWidth < 595) {
          camera.position.x = center.x + 600;
        } else {
          camera.position.x = center.x + 1200;
        }

        camera.updateProjectionMatrix();
        const size = new THREE.Vector3();
        boundingBox.getSize(size);

        const fov = camera.fov * (Math.PI / 180);
        const maxDim = Math.max(size.x, size.y, size.z);
        let cameraZ = Math.abs((maxDim / 4) * Math.tan(fov * 2));

        if (window.innerWidth < 595) {
          camera.position.z = 6100;
        } else if (window.innerWidth < 1220) {
          camera.position.z = 4600;
        } else {
          camera.position.z = 3900;
        }

        camera.updateProjectionMatrix();
        bike.position.setY(-500);
        // bike.position.setZ(-500);
        // bike.position.y
        // bike_position = bike.position.y;
        // console.log(bike_position);
        camera.lookAt(screen);

        initColor(bike, TYRE_MTL);
        initFrame(bike, FRAME_MTL);
        // initComponent(bike, INVISIBLE_MTL, 'tmps');
        // initComponent(bike, INVISIBLE_MTL, 'lock_1');

        scene.add(gltf.scene);
        animate();
      })
      .then(() => {
        this.spinner.hide();
      });

    function initFrame(parent, mtl) {
      parent.traverse((o) => {
        if (o.name === 'frame') {
          o.material = mtl;
          console.log(o);
        }
        if (o.name === 'handle') {
          o.material = mtl;
        }
        if (o.name === 'handle_grip') {
          o.material = mtl;
        }
      });
    }
    function initComponent(parent, mtl, name) {
      if (name === 'fenders') {
        parent.traverse((o) => {
          if (o.name === 'front_mudguard_center_mount_20') {
            o.material = mtl;
          }
          if (o.name === 'front_mudguard_mount_1') {
            o.material = mtl;
          }
          if (o.name === 'front_mudguard_mount_cad') {
            o.material = mtl;
          }
          if (o.name === 'rear_mudguard_center_mount_20') {
            o.material = mtl;
          }

          if (o.name === 'mudguard_front_3') {
            o.material = mtl;
          }
          if (o.name === 'mudguard_rear_3') {
            o.material = mtl;
          }
          if (o.name === 'rear_mudguard_mount_cad') {
            o.material = mtl;
          }
          if (o.name === 'socket_head_cap_screw_am') {
            // lot of screws
            o.material = mtl;
          }
          if (o.name === 'socket_head_cap_screw_is') {
            o.material = mtl;
          }
          if (o.name === 'mudguard_rear_mount_2') {
            o.material = mtl;
          }
        });
      }
      parent.traverse((o) => {
        if (o.name === name) {
          o.material = mtl;
        }
      });
    }

    function initColor(parent, mtl) {
      parent.traverse((o) => {
        if (o.name === 'ttyre') {
          o.material = mtl;
        }
        if (o.name === 'battery_lock') {
          o.material = BATTERY_LOCK_MTL;
          o.material.visible = false;
        }
        if (o.name === 'tmps') {
          o.material = INVISIBLE_MTL;
        }
        if (o.name === 'lock_1') {
          o.material = INVISIBLE_MTL;
        }
        if (o.name === 'glass') {
          o.material = GLASS_MTL;
        }
        if (o.name === 'front_plate_front_-_Copy_-_Copy') {
          o.material = FRONT_PANEL_MTL;
        }
        if (o.name === 'lock') {
          o.material = INVISIBLE_MTL;
        }
        if (o.name === 'front_mudguard_center_mount_20') {
          o.material = INVISIBLE_MTL;
        }
        if (o.name === 'frame_-_Copy_(2)') {
          o.material = MID_FRAME_MTL;
        }
        if (o.name === 'chainlink') {
          o.material = CHAINLINK_MTL;
        }
        if (o.name === 'front_mudguard_mount_1') {
          o.material = INVISIBLE_MTL;
        }
        if (o.name === 'steering_cap_reno') {
          o.material = mtl;
        }
        if (o.name === 'front_mudguard_mount_cad') {
          o.material = INVISIBLE_MTL;
        }

        if (o.name === 'Remgreep_Saccon') {
          o.material = mtl;
        }
        if (o.name === 'seat') {
          o.material = mtl;
        }

        if (o.name === 'rear_clamp_disc') {
          o.material = mtl;
        }
        if (o.name === '3D') {
          o.material = mtl;
        }
        if (o.name === 'disc') {
          o.material = DISC_MTL;
        }
        if (o.name === 'front_clamp') {
          o.material = mtl;
        }

        if (o.name === 'rim') {
          o.material = RIM_MTL;
        }

        if (o.name === 'rear_mudguard_center_mount_20') {
          o.material = INVISIBLE_MTL;
        }

        if (o.name === 'mudguard_front_3') {
          o.material = INVISIBLE_MTL;
        }
        if (o.name === 'mudguard_rear_3') {
          o.material = INVISIBLE_MTL;
        }
        if (o.name === 'battery_outer_case') {
          o.material = mtl;
        }
        if (o.name === 'peg') {
          o.material = mtl;
        }
        if (o.name === 'rear_mudguard_mount_cad') {
          o.material = INVISIBLE_MTL;
        }
        if (o.name === 'calliper') {
          o.material = mtl;
        }
        if (o.name === 'rear_clamp') {
          o.material = mtl;
        }
        if (o.name === 'socket_head_cap_screw_am') {
          // lot of screws
          o.material = INVISIBLE_MTL;
        }
        if (o.name === 'Reflector') {
          o.material = INVISIBLE_MTL;
        }
        if (o.name === 'front_disc_mount') {
          o.material = mtl;
        }
        if (o.name === 'front_brake_liner') {
          o.material = mtl;
        }
        if (o.name === 'rear_brake_liner') {
          o.material = mtl;
        }
        if (o.name === 'adapter_A_F160_R140') {
          o.material = mtl;
        }
        if (o.name === 'rear_shaft_wheel_20') {
          o.material = mtl;
        }
        if (o.name === 'front_shaft_wheel_20') {
          o.material = mtl;
        }
        if (o.name === 'SF-MX30_Shimano_Freewheel') {
          o.material = mtl;
        }
        if (o.name === 'socket_head_cap_screw_is') {
          o.material = INVISIBLE_MTL;
        }
        // if (o.name === 'hex_flange_nut_am') {
        //   o.material = mtl;
        // }
        if (o.name === 'inner_battery_case') {
          o.material = mtl;
        }
        if (o.name === 'mudguard_rear_mount_2') {
          o.material = INVISIBLE_MTL;
        }
        if (o.name === 'hex_flange_nut_am') {
          o.material = mtl;
        }
        if (o.name === 'lock_nut_is') {
          o.material = mtl;
        }
      });
    }

    let ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

    let dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0, 1200, 0);
    const d = 1000;
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.camera.far = 7000;
    dirLight.shadow.camera.near = 70;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.radius = 1;

    dirLight.shadow.bias = -0.004;
    scene.add(dirLight);
    scene.add(dirLight.target);

    let l1 = new THREE.PointLight(0xc4c4c4, 1);
    l1.position.set(-100, -200, 0);
    scene.add(l1);

    let l2 = new THREE.PointLight(0xc4c4c4, 1);
    l2.position.set(500, 100, 0);
    scene.add(l2);

    let l3 = new THREE.PointLight(0xc4c4c4, 1);
    l3.position.set(0, 100, -500);
    scene.add(l3);

    let l4 = new THREE.PointLight(0xc4c4c4, 1);
    l4.position.set(-500, 300, 0);
    scene.add(l4);

    var planeGeometry = new THREE.PlaneBufferGeometry(1800, 1800, 1, 1);
    var planeMaterial = new THREE.ShadowMaterial();
    planeMaterial.opacity = 0.1;
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.translateY(-500);
    plane.rotation.x = Math.PI * -0.5;
    plane.receiveShadow = true;
    scene.add(plane);
    function animate() {
      requestAnimationFrame(animate);
      bike.rotation.y -= 0.008;

      renderer.render(scene, camera);

      controls.update();
    }

    function onWindowResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
  };
}