import api from "../api"

// create new sales agent
export const createSalesAgent = (agentData) => {
    return api.post('/agents', agentData)
}

// get all sales agents
export const getSalesAgents = () => {
    return api.get('/agents')
}
