import api from "../api";

// Add a comment to a lead
export const addComment = (leadID, commentData) => {
    return api.post(`/leads/${leadID}/comments`, commentData)
}

// get all comments for a lead
export const getComments = (leadID) => {
    return api.get(`/leads/${leadID}/comments`)
}
