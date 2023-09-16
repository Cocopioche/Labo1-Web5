<script setup>

const prop = defineProps(['value','text'])
const emit = defineEmits(['category-selected'])
const handleClick = () => {
  emit('category-selected', prop.value);
}
</script>

<template>
<div @click="handleClick">{{prop.text}}</div>
</template>

<style scoped>
div:hover{
  background-color: #eee4e4;
}
div:active{
  background-color: #cacaca;
}

div{
  padding: 5px;
}
</style>