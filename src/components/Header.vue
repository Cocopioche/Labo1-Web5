<script setup>
import {Create, Delete, Detail, Edit, Liste} from "@/main.js";
import FloatMenu from "@/components/FloatMenu.vue";
import {onMounted, onUnmounted, ref} from "vue";

const props = defineProps(['type','category'])
const emit = defineEmits(['category-selected','plus-pressed','about-pressed'])
let showMenu = ref(false)

onMounted(() => {
  document.addEventListener('click', closeMenuOnClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', closeMenuOnClickOutside);
});

function closeMenuOnClickOutside(event) {
  if (showMenu.value && !event.target.closest('.drop-down')) {
    showMenu.value = false;
  }
}

const handleCategorySelected = (selectedCategory) => {
  emit('category-selected', selectedCategory);
}
const handlePlusPressed = () => {
  emit('plus-pressed')
}
const handleAboutPressed = () => {
  emit('about-pressed')
}

</script>

<template>
  <div class="front-element header">
    <font-awesome-icon :icon="['fas', 'bookmark']" />
    <span  v-if="props.type === Liste">Favoris</span>
    <span  v-if="props.type === Create">Création</span>
    <span  v-if="props.type === Edit">Modification</span>
    <span  v-if="props.type === Delete">Retrait</span>
    <span v-if="props.type === Detail">A propos</span>
    <font-awesome-icon class="button" :icon="['fas', 'plus']" @click="handlePlusPressed" v-if="props.type === Liste" />
    <span class="drop-down"><FloatMenu v-if="showMenu" @about-pressed="handleAboutPressed" :liste-category="props.category" @category-selected="handleCategorySelected"></FloatMenu><font-awesome-icon class="button" @click="showMenu = true" :icon="['fas', 'ellipsis-vertical']" /></span>

  </div>
</template>

<style scoped>

.header{
  align-items: center;
  grid-template-columns: 30px 6fr 50px 50px;
  display: grid;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: xx-large;
  margin-bottom: 20px;
  margin-top: 20px;
}


.right-icon > * {
  margin-right: 30px;
}
.button:hover{
  cursor: pointer;
  color: deepskyblue;
}
.button:active{
  color: white;
}
.button{
  color: blue;
}

</style>