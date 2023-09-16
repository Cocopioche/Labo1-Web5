import axios from 'axios';

const baseURL = 'http://localhost:5000';

const axiosInstance = axios.create({
    baseURL,
});

export const fetchBookmarks = async () => {
    try {
        const response = await axiosInstance.get('/api/bookmarks');
        return response.data;
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        throw error;
    }
};

export const getBookmark = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/bookmarks/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching bookmark:', error);
        throw error;
    }
}

export const addBookmark = async (title,url,category) => {
    let bookmark = {
        Titre : title,
        URL : url,
        Catégorie : category,
    }
    try {
        const response = await axiosInstance.post('/api/bookmarks', bookmark);
        return response.data;
    } catch (error) {
        console.error('Error adding bookmark:', error);
        throw error;
    }
}
export const deleteBookmark = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/bookmarks/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting bookmark:', error);
        throw error;
    }
}

export const updateBookmark = async (id,title,url,category) => {
    let bookmark = {
        id:id,
        Titre : title,
        URL : url,
        Catégorie : category,
    }
    try {
        const response = await axiosInstance.put(`/api/bookmarks`, bookmark);
        return response.data;
    } catch (error) {
        console.error('Error updating bookmark:', error);
        throw error;
    }
}
