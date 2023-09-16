import './assets/main.css'
import {computed, createApp} from 'vue'
import App from './App.vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBookmark, faPlus, faEllipsisV, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faBookmark,faPlus,faEllipsisV, faPencil, faTrash)
export const Edit = "edit"
export const Create = "create"
export const Liste = "liste"
export const Delete = "delete"

export const Detail = "detail"

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
