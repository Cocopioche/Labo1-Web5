<script setup>
import {ref, watchEffect} from "vue";

const props = defineProps(["title","url","category","id","hasRightButton"])
const imageUrl = ref(`https://s2.googleusercontent.com/s2/favicons?domain=${props.url}`)
const emit = defineEmits(["deleted-pressed","modified-pressed"])

const goToUrl = () => {
  let formattedUrl = props.url;
  if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
    formattedUrl = 'https://' + formattedUrl;
  }
  window.open(formattedUrl, '_blank');
}
const pencilClick = () => {
  emit("modified-pressed",props.id)
}
const trashClick = () => {
  emit("deleted-pressed",props.id)
}
watchEffect(() => {
  imageUrl.value = `https://s2.googleusercontent.com/s2/favicons?domain=${props.url}`
})
</script>

<template>
  <div class="gap"></div>
  <div class="urlButton" @click="goToUrl">
    <div>
      <img :src="imageUrl" alt="X">
      <p class="left-element">{{ props.title }}</p>
      <p class="category left-element">{{ category }}</p>
    </div>
    <div v-if="props.hasRightButton" class="right-element">
      <font-awesome-icon :icon="['fas', 'pencil']"   @click.stop="pencilClick"/>
      <font-awesome-icon :icon="['fas', 'trash']" @click.stop="trashClick"/>
    </div>
  </div>
</template>



<style scoped>
.urlButton {
  margin: 10px;
  background-color: #ececec;
  border-radius: 9px;
  padding: 10px;
  display: flex; /* Use Flexbox */
  align-items: center; /* Vertically center the content */
}

.urlButton:hover {
  background-color: #cacaca;
  cursor: pointer;
}

.urlButton:active {
  background-color: #ececec;
}

img {
  height: 16px;
}

.category {
  text-decoration: underline;
}

.left-element {
  margin: 0; /* Reset margin for left elements */
}

.right-element {
  margin-left: auto; /* Push the right element to the right */
}
.right-element > * {
  margin-right: 20px;
  font-size: xx-large;
  color: blue;
  opacity: 0;
}
.right-element > *:hover{
  color: deepskyblue;
  cursor: pointer;
}
.right-element > *:active{
  color: white;
}
.urlButton:hover > .right-element > *{
  opacity: 1;
}
.gap {
  padding-top: 5px;
  scroll-snap-align: start;
}
</style>
