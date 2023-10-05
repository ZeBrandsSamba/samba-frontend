<script setup lang="ts">
import { onMounted, ref } from 'vue'

const step = ref(0)
var options = [
  "El producto no cumplió mis expectativas",
  "El producto tiene un defecto",
  "Necesito más tiempo para probar el producto"
]

const steps = [
  { label: 'Let us know' },
  { label: 'Share your experience' }
]

onMounted(() => {
  console.log('mounted');
});
</script>

<template>
  <div class="row align-center">
    <div class="flex flex-col xs12">
      <h1 class="va-h1">LUUNA BRASIL</h1>
      <va-stepper
        v-model="step"
        :steps="steps"  
      >
        <template #step-content-0>
          <h3 class="va-h3">Cuéntanos más detalles de por qué elegiste 6</h3>
          <va-card>
            <va-card-content>
              <va-textarea
                  autosize=true
                  placeholder="Start typing"
                />
            </va-card-content>
          </va-card>
        </template>
        <template #step-content-1>
          <h3 class="va-h3">¿Qué mejorarías de tu experiencia?</h3>
          <va-card>
            <va-card-title>Seleccione una o más opciones</va-card-title>
            <va-card-content>
              <ul>
                <li v-for="x in options">
                  <va-chip outline size="large" class="mr-6 mb-3">
                    {{ x }}
                  </va-chip>
                </li>
              </ul>
            </va-card-content>
          </va-card>
        </template>
      </va-stepper>
    </div>
  </div>
</template>

<style>
</style>
