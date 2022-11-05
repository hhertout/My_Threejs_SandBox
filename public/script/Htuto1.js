import * as THREE from "/../../node_modules/three/build/three.module.js";
import { gsap } from "/../../node_modules/gsap/all.js";

//Loading

const textureLoader = new THREE.TextureLoader()


const normalTexture = textureLoader.load('./assets/texture/NormalMap.png')

// Canvas
const canvas = document.querySelector('canvas.tuto-sphere')
//GUI init
const gui = new dat.GUI();

// Scene
const scene = new THREE.Scene()

// Objects
const sphereGeometry = new THREE.SphereGeometry(0.5, 30, 30);

// Materials
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.color = new THREE.Color(0x660066)
material.normalMap = normalTexture

// Mesh
const sphere = new THREE.Mesh(sphereGeometry,material)
scene.add(sphere)

// Lights
const pointLight = new THREE.PointLight(0xFF0000)
pointLight.position.x = 1.3
pointLight.position.y = 2.8
pointLight.position.z = 0.1
pointLight.intensity = 1.6
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0x1b5cd)
pointLight2.position.set(0.9,-0.9,0.15)
pointLight2.intensity = 1.8
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0xcefa01)
pointLight3.position.set(-1.5,2.3,1)
pointLight3.intensity = 1.6
scene.add(pointLight3)

const pointLight4 = new THREE.PointLight(0xd2d270)
pointLight4.position.set(-3, -4, 6)
pointLight4.intensity = 1.6
scene.add(pointLight4)

//GUI HELPER POINT LIGHT POSITION
const light2 = gui.addFolder('Light 2')
light2.add(pointLight2.position, 'x').min(-5).max(3)
light2.add(pointLight2.position, 'y').min(-5).max(3)
light2.add(pointLight2.position, 'z').min(-5).max(3)
light2.add(pointLight2, 'intensity').min(-3).max(10)

const light2Color = {color: 0xffff00}

light2.addColor( light2Color , 'color')
    .onChange(()=> {
        pointLight2.color.set(light2Color.color)
    })

const light4 = gui.addFolder('Light 4')
light4.add(pointLight4.position, 'x').min(-10).max(10)
light4.add(pointLight4.position, 'y').min(-10).max(10)
light4.add(pointLight4.position, 'z').min(-10).max(10)
light4.add(pointLight4, 'intensity').min(-10).max(10)

const light4Color = {color: 0xffff00}

light4.addColor( light4Color , 'color')
    .onChange(()=> {
        pointLight4.color.set(light4Color.color)
    })


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
 
    mouseX = (e.clientX - windowHalfX)
    mouseY = (e.clientY - windowHalfY)
})

window.addEventListener('scroll', (e)=> {
    sphere.position.y = window.scrollY * 0.001
});


const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .2 * elapsedTime

    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
    sphere.rotation.y += .2 * (targetX - sphere.rotation.y)
    sphere.position.z += .9 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
