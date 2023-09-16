<script setup >
import Header from "@/components/Header.vue";
import {fetchBookmarks,addBookmark} from "@/request.js";
import BookmarkTile from "@/components/BookmarkTile.vue";
import {Create, Delete, Detail, Edit, Liste} from "@/main.js";
import {computed, ref, watch, watchEffect} from "vue";
import FloatMenu from "@/components/FloatMenu.vue";
import Form from "@/components/Form.vue";
import ComfirmDelete from "@/components/ComfirmDelete.vue";
import APropos from "@/components/APropos.vue";
let bookmarks = ref([])
fetchBookmarks().then(
    (bookmarksArray) => {
      bookmarks.value = bookmarksArray
    }
)
let filter = ref("*")

let allCategory = computed(() => {
  let cat = []
  for (let bookmark of bookmarks.value) {
    if (!cat.includes(bookmark.Catégorie)) {
      cat.push(bookmark.Catégorie)
    }
  }
  return cat
})

const filteredBookmark = computed(() => {
  if (filter.value === '*') {
    return bookmarks.value;
  }
  return bookmarks.value.filter(bookmark => bookmark.Catégorie === filter.value);
});


const handleCategorySelected = (selectedCategory) => {
  filter.value = selectedCategory
}
const handlePlusPressed = () => {
  content.value = Create
}
let selectedId = ref(0)
const handleDeletePressed = (id) => {
  selectedId.value = id;
  content.value = Delete;
}
const handleModifiedPressed = (id) => {
  selectedId.value = id;
  content.value = Edit;
}
const changeContent = (newContent) => {
  fetchBookmarks().then(
      (bookmarksArray) => {
        bookmarks.value = bookmarksArray
      }
  )
  content.value = newContent
}
let content = ref(Liste)


</script>

<template>
  <div id="main">
    <Header :type=content :category="allCategory" @about-pressed="changeContent(Detail)" @category-selected="handleCategorySelected" @plus-pressed="handlePlusPressed" ></Header>
    <div class="front-element content">
      <BookmarkTile v-if='content === Liste' @modified-pressed="handleModifiedPressed" @deleted-pressed="handleDeletePressed" v-for="bookmark in filteredBookmark" :key="bookmark.id" :id="bookmark.id" :title="bookmark.Titre" :url="bookmark.URL" :category="bookmark.Catégorie" :has-right-button="true"/>
      <Form v-if="content === Create" @form-cancelled="changeContent(Liste)"></Form>
      <ComfirmDelete @cancel-delete="changeContent(Liste)" v-if="content === Delete" :bookmark-id="selectedId"></ComfirmDelete>
      <Form v-if="content === Edit" @form-cancelled="changeContent(Liste)" :modify="true" :selected-id="selectedId" ></Form>
      <APropos v-if="content === Detail" @retour="changeContent(Liste)"></APropos>
    </div>
  </div>

</template>

<style scoped>
#main {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
}
.content {
  height: 95%;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  scroll-snap-type: y mandatory;
  padding-bottom: 8px;
  scrollbar-width: none;
}
</style>
