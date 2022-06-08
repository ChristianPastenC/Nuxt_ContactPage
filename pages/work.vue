<template>
    <div class="bg-black h-screen px-6 py-12">
        <h2 class="text-white font-exo text-5xl opacity-0" ref="title" style="transform: translateY(30px);">MY WORK</h2>
        <div class="flex space-x-4">
            <div ref="projects" v-for="project in projects" class="w-full opacity-0"
                style="transform: translateX(30px);">
                <nuxt-link to="/">
                    <img :src="project.image.url" alt="" style="height: 70vh;" class="object-cover" />
                </nuxt-link>
                <p class="text-white font-space-mono text-sm">{{ project.title }}</p>
            </div>
        </div>
    </div>
</template>

<style>
.font-exo {
    font-family: 'Exo 2', sans-serif;
}

.font-space-mono {
    font-family: 'Space Mono', monospace;
}
</style>

<script>
import imageB from "../assets/unsplash_b.jpg";
import imageC from "../assets/unsplash_c.jpg";
import imageD from "../assets/unsplash_d.jpg";
import gsap from "gsap";
export default {
    data() {
        return {
            projects: [
                {
                    image: {
                        url: imageB
                    },
                    title: 'IPHONE'
                },
                {
                    image: {
                        url: imageC
                    },
                    title: 'IPHONE'
                },
                {
                    image: {
                        url: imageB
                    },
                    title: 'IPHONE'
                },
                {
                    image: {
                        url: imageC
                    },
                    title: 'IPHONE'
                },
            ]
        }
    },
    mounted() {
        gsap.to(this.$refs.title, {
            opacity: 1,
            duration: 1.5,
            y: 0,
            ease: 'expo',
        });
        gsap.to(this.$refs.projects, {
            opacity: 1,
            duration: 2,
            stagger: 0.1,
            x: 0,
            ease: 'expo',
            delay: 0.2,
        });
    }
}
</script>