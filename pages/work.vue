<template>
    <div class="bg-black h-screen px-6 py-12">
        <h2 class="text-white font-exo text-5xl opacity-0" ref="title" style="transform: translateY(30px);">CONTACT</h2>
        <div class="flex space-x-4">
            <div ref="projects" v-for="project in projects" class="w-full opacity-0">
                <a :href="project.link">
                    <img :src="project.image.url" style="height: 70vh;" class="object-cover" />
                </a>
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
import imageA from "../assets/unsplash_a.jpg";
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
                        url: imageA
                    },
                    title: 'GITHUB',
                    link: 'https://github.com/ChristianPastenC'
                },
                {
                    image: {
                        url: imageB
                    },
                    title: 'LINKEDIN',
                    link: 'https://www.linkedin.com/in/christian-pas-cass'
                },
                {
                    image: {
                        url: imageC
                    },
                    title: 'WHATSAPP',
                    link: 'https://wa.me/+522224012809'
                },
                {
                    image: {
                        url: imageD
                    },
                    title: 'EMAIL',
                    link: 'mailto:christian_pasten@outlook.com'
                },
            ]
        }
    },
    mounted() {
        gsap.to(this.$refs.title, {
            opacity: 1,
            duration: 3,
            y: 0,
            ease: 'expo',
        });
        gsap.to(this.$refs.projects, {
            opacity: 1,
            duration: 3,
            stagger: 0.1,
            ease: 'expo',
            delay: 0.2,
        });
    }
}
</script>