<script setup>
import {ref, defineProps, defineEmits, computed, watchEffect} from 'vue';
import {addBookmark, getBookmark, updateBookmark} from "@/request.js";

const props = defineProps(['selectedId','modify']);
const emit = defineEmits(['form-cancelled']);

const name = ref('');
const url = ref('');
const category = ref('');
const id = ref(0);


watchEffect(() => {
  getBookmark(props.selectedId).then((bookmark) => {
    url.value = bookmark.URL;
    name.value = bookmark.Titre;
    category.value = bookmark.Catégorie;
    id.value = bookmark.id;
  });
});


const imageUrl = computed(() => {
  return `https://s2.googleusercontent.com/s2/favicons?domain=${url.value.trim() === '' ? "www.example.com" : url.value}`
})

const isSubmitDisabled = computed(() => {
  return !name.value.trim() || !url.value.trim() || !category.value.trim();
});

const submitForm = () => {
  if (props.modify){
    updateBookmark(id.value, name.value, url.value, category.value).then(() => cancelForm())
  }
  else{
    addBookmark(name.value, url.value, category.value).then(() => cancelForm())
  }
}

const cancelForm = () => {
  emit('form-cancelled');
}
</script>

<template>
  <div class="bookmark-form">
    <img :src="imageUrl">
    <div class="form-group">
      <label for="name">Nom:</label>
      <input v-model="name" id="name" placeholder="Nom" class="input-field" />
    </div>

    <div class="form-group">
      <label for="url">URL:</label>
      <input v-model="url" id="url" placeholder="URL" class="input-field" />
    </div>

    <div class="form-group">
      <label for="category">Catégorie:</label>
      <input v-model="category" id="category" placeholder="Catégorie" class="input-field" />
    </div>

    <div class="button-group">
      <button @click="submitForm" class="submit-button" :disabled="isSubmitDisabled">{{props.modify ? "Modifier" : "Ajouter"}}</button>
      <button @click="cancelForm" class="cancel-button">Annuler</button>
    </div>
  </div>
</template>


<style scoped>
img{
  margin: 10px 10px 10px 0px;
  width: 20px;
}
.bookmark-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

label {
  margin-bottom: 5px;
}

.input-field {
  min-width: 40vw;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  gap: 10px;
}



</style>
