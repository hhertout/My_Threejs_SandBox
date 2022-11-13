import * as THREE from "/../../node_modules/three/build/three.module.js";
import { gsap } from "/../../node_modules/gsap/all.js";

//Texture Loader


// Canvas
const canvas = document.querySelector('canvas.tuto-2')
//GUI init
const gui = new dat.GUI();


//Creating images
const textureLoader = new THREE.TextureLoader()
const geometry = new THREE.PlaneGeometry(1, 1.4)
const scene = new THREE.Scene()

for(let i = 0 ; i< 4 ; i++){
    const material = new THREE.MeshBasicMaterial({
        map: textureLoader.load(`assets/images/building${i}.jpg`)
    })

    const img = new THREE.Mesh(geometry, material)

    scene.add(img)

    img.position.set(Math.random() , i * -1.9 - 0.6)
}


//Put images in array
let objects = []

scene.traverse(object => {
    if (object.isMesh) {
        objects.push(object)
    }
})

//set the scroll to the posY
let y = 0
let position = 0
window.addEventListener('wheel', (e) => {
    y = e.deltaY * 0.0009
})

const mouse = new THREE.Vector2()

window.addEventListener('mousemove', e => {

    mouse.x = e.clientX / sizes.width * 2 - 1
    mouse.y = - (e.clientY / sizes.height) * 2 + 1

})
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
    renderer.setPixelRatio(window.devicePixelRatio)
})


// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.z = 1.8
scene.add(camera)

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

renderer.setClearColor( 0x222222, 1);

const raycaster = new THREE.Raycaster()

const tick = () =>
{
    position += y
    y *= 0.5

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(objects)

    for(const intersect of intersects){
        gsap.to(intersect.object.scale, {
            x: 1.3,
            y: 1.4,
        })
        gsap.to(intersect.object.rotation, {
            y: -0.4,
        })
        gsap.to(intersect.object.position, {
            z: -0.5,
        })
        gsap.to(intersect.object.position, {

        })
    }

    for(const object of objects){
        if (!intersects.find(intersect => intersect.object === object)){
            gsap.to(object.scale, {
                x: 1,
                y: 1,
            })
            gsap.to(object.rotation, {
                y: 0
            })
            gsap.to(object.position, {
                z: 0,
            })
        }
    }
    
    if (position > 6.8) {
        position = 6.8
    }
    if(position < 0) {
        position = 0
    }
    
    camera.position.y = -position

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
