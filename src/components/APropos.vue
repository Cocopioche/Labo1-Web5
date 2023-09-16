<script setup>
const emit = defineEmits(['retour'])

const retour = () => {
  emit('retour')
}
</script>

<template>
  <h2>Développement de services d’échange de données: Labo 1</h2>
  <br>
  <p>Fait par: Jean-Christophe Rochon</p>
  <br>
  <button @click="retour" class="cancel-button">Retour</button>
</template>

<style scoped>

</style>