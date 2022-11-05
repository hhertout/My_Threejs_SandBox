import * as THREE from "/../../node_modules/three/build/three.module.js";
import { gsap } from "/../../node_modules/gsap/all.js";


const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('./assets/texture/Lunar-map.png')
// Canvas
const canvas = document.querySelector('canvas.lunar-canvas')
//GUI init
const gui = new dat.GUI();

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry( 15, 120, 120);

// Materials

const material = new THREE.MeshPhongMaterial()
material.reflectivity = 0
material.shininess = 0
material.roughness = 40
material.normalMap = normalTexture

// Mesh
const sphere = new THREE.Mesh(geometry,material)
sphere.position.x = 20
sphere.position.y = -10
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(-955, -683, 292)
pointLight.intensity = 0.85
scene.add(pointLight)

const light = gui.addFolder('SunLight')
light.add(pointLight.position, 'x').min(-600).max(600)
light.add(pointLight.position, 'y').min(-600).max(600)
light.add(pointLight.position, 'z').min(-600).max(600)
light.add(pointLight, 'intensity').min(0).max(10)


/**
 * Sizes
 */
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
camera.position.z = 60
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


window.addEventListener('scroll', (e) => {
    camera.position.x = window.scrollY * 0.03
    camera.position.y = -window.scrollY * 0.01
})



const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .05 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
