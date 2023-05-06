<template>
    <div>
        <div class="flex h-screen bg-black">
            <div class="w-1/2 flex flex-col justify-center px-8" ref="textContainer">
                <h1 class="font-exo text-white text-4xl mb-8">
                    “If something can go wrong, it will.” - Murphy’s law
                </h1>
                <div>
                    <button @click="navigate()" class="text-white 
                        bg-blue-600 inline-block px-8 py-4 rounded-full 
                        font-exo hover:bg-white hover:text-gray-800 
                        cursor-pointer">
                        Contact
                    </button>
                </div>
            </div>
            <div class="w-1/2" ref="canvasContainer">
                <canvas ref="canvas"></canvas>
            </div>
        </div>
    </div>
</template>
  
<style>
body {
    margin: 0;
}

.custom-size {
    top: 30%;
    transform: translate(-50%, 50%);
    left: 50%;
}

.font-exo {
    font-family: 'Exo 2', sans-serif;
}

.font-space-mono {
    font-family: 'Space Mono', monospace;
}
</style>
  
<script>
import gsap from 'gsap';
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    SphereGeometry,
    ShaderMaterial,
    TextureLoader,
    Mesh,
    AdditiveBlending,
    BackSide,
    Group,
    BufferGeometry,
    PointsMaterial,
    Float32BufferAttribute,
    Points,
} from 'three';
import vertexShader from '../assets/shaders/vertex.glsl';
import fragmentShader from '../assets/shaders/fragment.glsl';
import atmosphereVertexShader from '../assets/shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from '../assets/shaders/atmosphereFragment.glsl';
import img from '../assets/img.jpg';

export default {
    methods: {
        navigate() {
            this.$router.push('/work');
        }
    },
    mounted() {
        const scene = new Scene();
        const camera = new PerspectiveCamera(
            60,
            this.$refs.canvasContainer.offsetWidth / this.$refs.canvasContainer.offsetHeight,
            0.1,
            1000
        );

        const renderer = new WebGLRenderer({
            canvas: this.$refs.canvas,
            antialias: true,
        });

        renderer.setSize(this.$refs.canvasContainer.offsetWidth, this.$refs.canvasContainer.offsetHeight);
        renderer.setPixelRatio(devicePixelRatio);

        // Creating a Sphere
        const sphere = new Mesh(
            new SphereGeometry(5, 50, 50),
            new ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: {
                    globeTexture: {
                        value: new TextureLoader().load(img),
                    }
                }
            }),
        );

        // Creating the atmosphere
        const atmosphere = new Mesh(
            new SphereGeometry(5, 50, 50),
            new ShaderMaterial({
                vertexShader: atmosphereVertexShader,
                fragmentShader: atmosphereFragmentShader,
                blending: AdditiveBlending,
                side: BackSide,
            }),
        );
        atmosphere.scale.set(1.1, 1.1, 1.1);
        scene.add(atmosphere);

        const group = new Group();
        group.add(sphere);
        scene.add(group);

        // Stars background
        const starGeometry = new BufferGeometry();
        const starMaterial = new PointsMaterial({
            color: 0xffffff,
        });
        const starVertices = [];
        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = -Math.random() * 2500;
            starVertices.push(x, y, z);
        }
        starGeometry.setAttribute('position', new Float32BufferAttribute(starVertices, 3));

        const stars = new Points(starGeometry, starMaterial);
        scene.add(stars);

        camera.position.z = 25;

        const mouse = {
            x: undefined,
            y: undefined,
        }
        addEventListener('mousemove', (event) => {
            mouse.x = (event.clientX / innerWidth) * 2 - 1;
            mouse.y = (event.clientY / innerHeight) * 2 + 1;
        });

        let maxValue = (innerWidth / 4);
        let minValue = 0;
        let currentValue = 0;
        let direction = 1;

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            sphere.rotation.y += 0.005;
            gsap.to(group.rotation, {
                x: -mouse.y * 0.1,
                y: mouse.x * 0.25,
                duration: 2,
            });

            currentValue += 0.25 * direction;
            if (currentValue >= maxValue) {
                direction *= -1;
                currentValue = maxValue;
            } else if (currentValue <= minValue) {
                direction *= -1;
                currentValue = minValue;
            }
            stars.position.x = currentValue;

        }

        animate();

        gsap.to(this.$refs.textContainer, {
            opacity: 1,
            duration: 3,
            stagger: 0.1,
            ease: 'expo',
            delay: 0.2,
        });
    }
}
</script>