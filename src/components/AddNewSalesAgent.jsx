import { useEffect, useState } from "react"
import { createSalesAgent } from "../api/salesAgentAPI"

const AddNewSalesAgent = ({handleNewAgentScr}) => {
    const [res, setRes] = useState(null)
    const [error, setError] = useState(null)

    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    
    const createNewSalesAgent = async(agentData) => {
        try {
            const response = await createSalesAgent(agentData)
            if(response.status === 201) {
                setRes("Agent Created Successfully!")
                setError(null)
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        } catch (error) {
            setRes(null)
            setError(error.response.data.error)
        }
    }

    const formHandler = (e) => {
        e.preventDefault()

        const agentData = {
            name: name,
            email: email
        }

        createNewSalesAgent(agentData)
    }


    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add New Sales Agent</h2>
                    <i onClick={() => handleNewAgentScr()} className="material-icons">close</i>
                </div>
                <form onSubmit={(e) => formHandler(e)} className="agent-form">
                    <div className="add-lead-input">
                        <label htmlFor="agentName">Agent Name</label>
                        <span>:</span>
                        <input onChange={(e) => setName(e.target.value)} type="text" name="agentName" />
                    </div>
                    <div className="add-lead-input">
                        <label htmlFor="email">Email Address</label>
                        <span>:</span>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" />
                    </div>
                    <input className="addButton" type="submit" value="Create Agent" />
                </form>
                {res && <p>{res}</p>}
                {error && <p>{error}</p>}
            </div>

        </div>
    )
}

export default AddNewSalesAgent