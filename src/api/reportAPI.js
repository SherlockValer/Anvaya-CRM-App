import api from "../api";

// get leads closed last week
export const getLeadsLastWeek = () => {
    return api.get('/report/last-week')
}

// get total leads in pipeline
export const getTotalActiveLeads = () => {
    return api.get('/report/pipeline')
}