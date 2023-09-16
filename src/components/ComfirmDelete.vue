<script setup>
import BookmarkTile from "@/components/BookmarkTile.vue";
import {ref, watchEffect} from "vue";
import {deleteBookmark, getBookmark} from "@/request.js";
const props = defineProps(["bookmarkId"])
const emit = defineEmits(['cancelDelete'])
let url = ref("")
let category = ref("")
let title = ref("")

watchEffect(() => {
  getBookmark(props.bookmarkId).then((bookmark) => {
    url.value = bookmark.URL;
    title.value = bookmark.Titre;
    category.value = bookmark.Catégorie;
  });
});

const submitForm = () => {
  deleteBookmark(props.bookmarkId).then(() =>
      emit("cancelDelete")
  )
}
const cancelForm = () => {
  emit("cancelDelete")
}
</script>

<template>
  <h2>Voulez-vous effacer le favori suivant?</h2>
  <BookmarkTile :category="category" :url="url" :title="title" :has-right-button="false"></BookmarkTile>
  <button @click="submitForm" class="submit-button">Suprimer</button>
  <button @click="cancelForm" class="cancel-button">Annuler</button>
</template>

<style scoped>

</style>