import api from "../api";

// Create a new tag
export const createNewTag = (tagObj) => {
    return api.post('/tags', tagObj)
}

// Get all tags
export const getTags = () => {
    return api.get('/tags')
}