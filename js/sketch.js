import  fragmentShader  from 'FlameCirclShade/shaders/fragment.js';
function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.autoClearColor = false;

    const camera = new THREE.OrthographicCamera(
      -1, // left
      1, // right
      1, // top
      -1, // bottom
      -1, // near,
      1, // far
    );
    const scene = new THREE.Scene();
    const plane = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3()},
      iMouse:{ value: new THREE.Vector2()} 
    };

    const material = new THREE.ShaderMaterial({
      fragmentShader,
      uniforms,
    });

    scene.add(new THREE.Mesh(plane, material));

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }
   var mouse = new THREE.Vector2()
            document.addEventListener('mousemove', onDocumentMouseMove, false);
            //document.addEventListener('mousedown', onMouseDown, false);
            function onDocumentMouseMove(event) {
                event.preventDefault();
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            }
    function render(time) {
      time *= 0.001;  // convert to seconds

      resizeRendererToDisplaySize(renderer);

      const canvas = renderer.domElement;
      uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
      uniforms.iTime.value = time;
      uniforms.iMouse.value.set(300.,300.);

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  main();
