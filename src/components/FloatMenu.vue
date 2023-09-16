<script setup>
import FloatMenuButton from "@/components/FloatMenuButton.vue";
const props = defineProps(['listeCategory'])
const emit = defineEmits(['category-selected','about-pressed']);
const handleCategorySelected = (selectedCategory) => {
  emit('category-selected', selectedCategory);
}
const handleAboutPressed = () => {
  emit('about-pressed')
}
</script>

<template>
<div class="float-menu">
  <FloatMenuButton value="*" text="Toute les catégorie" @category-selected="handleCategorySelected"></FloatMenuButton>
  <div class="delimiter"></div>
  <FloatMenuButton v-for="listeCategory in props.listeCategory" :text="listeCategory" :value="listeCategory" @category-selected="handleCategorySelected"></FloatMenuButton>
  <div class="delimiter"></div>
  <FloatMenuButton @click.stop="handleAboutPressed" text="A propos... !" value="about"></FloatMenuButton>
</div>
</template>

<style scoped>
.float-menu {
  background-color: white;
  border: #eee4e4 solid 1px;
  border-radius: 4px;
  width: fit-content;
  user-select: none;
  position: absolute;
  font-size: medium;
  right: 1vw;
  top: 90px;
}
.delimiter {
  border-bottom: #eee4e4 solid 1px;
}
</style>