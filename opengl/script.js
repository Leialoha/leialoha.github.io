
const backgroundColor = 0x000000;

/*////////////////////////////////////////*/

var renderCalls = [];
function render () {
  requestAnimationFrame( render );
  renderCalls.forEach((callback)=>{ callback(); });
}
render();

/*////////////////////////////////////////*/

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 800 );
camera.position.set(-2.5, 1.5, 0);

var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( backgroundColor );//0x );

renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = Math.pow( 0.94, 5.0 );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

window.addEventListener( 'resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

document.body.appendChild( renderer.domElement);

function renderScene(){ renderer.render( scene, camera ); }
renderCalls.push(renderScene);

/* ////////////////////////////////////////////////////////////////////////// */

var controls = new THREE.OrbitControls( camera );

controls.rotateSpeed = 0.1;
controls.zoomSpeed = 0;

controls.minDistance = 3;
controls.maxDistance = 20;

controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI /2; // radians

controls.enableDamping = true;
controls.dampingFactor = 0.05;

renderCalls.push(function(){
  controls.update()
});


/* ////////////////////////////////////////////////////////////////////////// */


// var light = new THREE.PointLight( 0xffffcc, 20, 200 );
// light.position.set( 4, 30, -20 );
// scene.add( light );

var light2 = new THREE.AmbientLight( 0x20202A, 10, 100 );
light2.position.set( 30, -10, 30 );
scene.add( light2 );

/* ////////////////////////////////////////////////////////////////////////// */



var loader = new THREE.GLTFLoader();
loader.crossOrigin = true;
loader.load( 'https://leialoha.github.io/opengl/model.gltf', function ( data ) {

  
    var object = data.scene;
     object.position.set(0, 0, 0);
//     object.rotation.set(Math.PI / -2, 0, 0);

//     TweenLite.from( object.rotation, 1.3, {
//       y: Math.PI * 2,
//       ease: 'Power3.easeOut'
//     });

    // TweenMax.from( object.position, 3, {
    //   y: -8,
    //   yoyo: true,
    //   repeat: -1,
    //   ease: 'Power2.easeInOut'
    // });
    //object.position.y = - 95;
    scene.add( object );
  //, onProgress, onError );
});
