var objects=new Array();
var mouse = new THREE.Vector2();
const color4 = new THREE.Color("rgb(100%, 0%, 0%)");
var scene = new THREE.Scene({background: color4});
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let lIsPressed = false;
renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);

var geometry = new THREE.BoxGeometry(1, 1, 1);

// 

// geom = new THREE.CubeGeometry( 5, 5, 5 );

// cubes = new THREE.Object3D();
// scene.add( cubes );

// for(var i = 0; i < 100; i++ ) {
//     var grayness = Math.random() * 0.5 + 0.25,
//         mat = new THREE.MeshBasicMaterial(),
//         cube = new THREE.Mesh( geom, mat );
//     mat.color.setRGB( grayness, grayness, grayness );
//     cube.position.set( range * (0.5 - Math.random()), range * (0.5 - Math.random()), range * (0.5 - Math.random()) );
//     cube.rotation.set( Math.random(), Math.random(), Math.random() ).multiplyScalar( 2 * Math.PI );
//     cube.grayness = grayness; // *** NOTE THIS
//     cubes.add( cube );
// }

// const loader = new THREE.CubeTextureLoader();
// loader.setPath( 'assets/images/' );

// const textureCube = loader.load( [
// 	'', '',
// 	'', '',
// 	'', ''
// ] );

// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, envMap: textureCube } );

var textureLoader = new THREE.TextureLoader();

var texture0 = textureLoader.load('assets/images/quiet.jpg');
var texture1 = textureLoader.load('assets/images/catch22.jpeg');
var texture2 = textureLoader.load('assets/images/arizona.jpg');
var texture3 = textureLoader.load('assets/images/row.jpg');
var texture4 = textureLoader.load('assets/images/bigwinlogo.jpeg');
var texture5 = textureLoader.load('assets/images/crayons.jpg');

var materials = [
	new THREE.MeshBasicMaterial({ map: texture0 }),
	new THREE.MeshBasicMaterial({ map: texture1 }),
	new THREE.MeshBasicMaterial({ map: texture2 }),
	new THREE.MeshBasicMaterial({ map: texture3 }),
	new THREE.MeshBasicMaterial({ map: texture4 }),
	new THREE.MeshBasicMaterial({ map: texture5 })
];
var material = new THREE.MultiMaterial(materials);

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// cube.cursor = 'pointer';
// cube.on('click', function(ev) {
// 	console.log(ev)
// // });

// var vector = new THREE.Vector3( 
// 	(e.clientX / window.innerWidth) * 2 - 1, 
// 	- (e.clientY / window.innerHeight) * 2 + 1, 
// 			   0.5 );

// var rayCaster = projector.unprojectVector(vector, camera);

// var intersectedObjects = rayCaster.intersectObjects(objects);

camera.position.z = 5;

var animate = function () {
	requestAnimationFrame(animate);

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render(scene, camera);
};

// Set inner Box Layout
cube.scale.x = -10;
cube.scale.y = -10;
cube.scale.z = -10;
cube.rotation.x = 1;
cube.rotation.y = 1;

animate();

document.onkeydown = checkKey;

function onDocumentMouseMove(event) {

	event.preventDefault();

	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

	if (lIsPressed) {
		cube.rotation.x = event.clientX / 100;
		cube.rotation.y = event.clientY / 100;
	}
}

function onDocumentMouseDown(event) {

	event.preventDefault();

	var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
	vector.unproject(camera);

	var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

	var intersects = ray.intersectObjects(objects);

	if (intersects.length < 0) {

		alert("colision")
	}
}

function checkKey(e) {

	e = e || window.event;

	if (e.key == 'ArrowUp') {
		cube.rotation.x += 0.1;
		// up arrow
	}
	else if (e.key == 'ArrowDown') {
		cube.rotation.x -= 0.1;
		// down arrow
	}
	else if (e.key == 'ArrowLeft') {
		cube.rotation.y -= 0.1;
		// left arrow
	}
	else if (e.key == 'ArrowRight') {
		cube.rotation.y += 0.1;
		// right arrow
	}
	else if (e.key == 'x') {
		cube.scale.x += 1;
		cube.scale.y += 1;
		cube.scale.z += 1;
		// right arrow
	}
	else if (e.key == 'z') {
		cube.scale.x -= 1;
		cube.scale.y -= 1;
		cube.scale.z -= 1;
		// right arrow
	} else if (e.key == 'g') {
		console.log(cube.geometry.faces)
	} else if (e.key == 'l') {
		const mouseMoveButton = document.querySelector('.mouseMouse-button');
		const lkey = document.querySelector('.lkey');

		if (!lIsPressed) {
			lIsPressed = true;
			mouseMoveButton.hidden = true;
			lkey.classList.remove('inverted');
		} else {
			lIsPressed = false;
			mouseMoveButton.hidden = false;
			lkey.classList.add('inverted');
		}
	}

}