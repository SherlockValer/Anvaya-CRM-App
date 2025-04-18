import api from '../api'

// get all leads
export const getLeads = () => {
    return api.get('/leads')
}

// get lead by id
export const getLeadByID = (id) => {
    return api.get(`/leads?_id=${id}`)
}

// get lead by status
export const getLeadByStatus = (status) => {
    return api.get(`/leads?status=${status}`)
}

// get lead by agent
export const getLeadBySalesAgent = (agent) => {
    return api.get(`/leads?salesAgent=${agent}`)
}

// create new lead
export const createNewLead = (leadData) => {
    return api.post('/leads', leadData)
}

// update lead
export const updateLead = (leadID, leadData) => {
    return api.put(`/leads/${leadID}`, leadData)
}

// delete lead
export const deleteLead = (leadID) => {
    return api.delete(`/leads/${leadID}`)
}

