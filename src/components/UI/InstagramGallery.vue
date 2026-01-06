<script setup>
import galeria1 from "../../assets/img/galeria/galeria_1.png";
import galeria2 from "../../assets/img/galeria/galeria_2.png";
import galeria3 from "../../assets/img/galeria/galeria_3.png";
import galeria4 from "../../assets/img/galeria/galeria_4.png";
import galeria5 from "../../assets/img/galeria/galeria_5.png";

const posts = [
  {
    id: 1,
    image: galeria1,
    type: "Armonización facial en hombres",
    link: "https://www.instagram.com/dr.oscarac/",
  },
  {
    id: 2,
    image: galeria2,
    type: "Bótox Tercio Superior",
    link: "https://www.instagram.com/dr.oscarac/",
  },
  {
    id: 3,
    image: galeria3,
    type: "Bioestimulacion Facial",
    link: "https://www.instagram.com/dr.oscarac/",
  },
  {
    id: 4,
    image: galeria4,
    type: "Bótox Tercio Superior",
    link: "https://www.instagram.com/dr.oscarac/",
  },
  {
    id: 5,
    image: galeria5,
    type: "🌸Pink Glow🌸",
    link: "https://www.instagram.com/dr.oscarac/",
  },
];
</script>

<template>
  <section class="py-24 bg-white overflow-hidden">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div class="max-w-2xl">
          <span
            class="text-clinic-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
            >Portafolio de Resultados</span
          >
          <h2
            class="text-4xl md:text-5xl font-serif font-bold text-clinic-navy leading-tight"
          >
            El Arte de la Armonización
          </h2>
          <p class="text-gray-600 mt-6 text-lg font-light leading-relaxed">
            Cada tratamiento es un diseño personalizado. Explora nuestra galería de casos
            clínicos reales en Instagram
            <a
              href="https://www.instagram.com/dr.oscarac"
              target="_blank"
              rel="noopener noreferrer"
              class="text-clinic-gold font-medium border-b border-clinic-gold/30 hover:border-clinic-gold transition-all duration-300"
            >
              @dr.oscarac </a
            >.
          </p>
        </div>

        <a
          href="https://www.instagram.com/dr.oscarac/"
          target="_blank"
          class="group flex items-center gap-3 text-clinic-navy font-bold hover:text-clinic-gold transition-colors duration-300"
        >
          <span class="border-b-2 border-clinic-gold pb-1 italic"
            >Seguir en Instagram</span
          >
          <svg
            class="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="post in posts"
          :key="post.id"
          class="relative group aspect-[4/5] overflow-hidden rounded-sm bg-slate-100"
        >
          <img
            :src="post.image"
            :alt="post.type"
            class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          />

          <div
            class="absolute inset-0 bg-clinic-navy/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-8 text-center backdrop-blur-sm"
          >
            <span
              class="text-clinic-gold text-xs font-bold uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
              >Resultado Real</span
            >
            <h3
              class="text-white font-serif text-xl mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75"
            >
              {{ post.type }}
            </h3>
            <a
              :href="post.link"
              target="_blank"
              class="w-12 h-12 bg-white/10 hover:bg-clinic-gold rounded-full flex items-center justify-center text-white transition-colors duration-300"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.058-1.69-.072-4.949-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <p class="text-sm text-gray-400 font-medium">
          Resultados sujetos a evaluación clínica individual.
        </p>
      </div>
    </div>
  </section>
</template>
