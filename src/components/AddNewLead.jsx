import { useEffect, useState } from "react"
import { getTags } from '../api/tagsAPI'
import { getSalesAgents } from "../api/salesAgentAPI"
import { createNewLead } from "../api/leadsAPI"


const AddNewLead = ({handleNewLeadScr}) => {
    // Fetch Call Data
    const [salesAgents, setAgents] = useState([])
    const [agentError, setAgentError] = useState(null)

    const [tags, setTags] = useState([])
    const [tagError, setTagError] = useState(null)
    const [current, setTagDropdown] = useState(false)

    const [formError, setFormError] = useState(null)
    const [formRes, setFormRes] = useState(null)



    // Form Data
    const [leadName, setLeadName] = useState(null)
    const [leadSource, setLeadSource] = useState(null)
    const [selectedAgent, setSelectedAgent] = useState(null)
    const [leadStatus, setLeadStatus] = useState(null)
    const [selectedTags, setSelectedTags] = useState([])
    const [timeToClose, setTimeToClose] = useState(null)
    const [priority, setPriority] = useState(null)

    // Get Sales Agents
    const getAllAgents = async() => {
        try {
            const response = await getSalesAgents()
            setAgents(response.data)
        } catch (error) {
            setAgentError(error.response.data.error)
        }
    }

    useEffect(() => {
        getAllAgents()
    }, [])

    // Get All Tags
    const getAllTags = async() => {
        try {
            const response = await getTags()
            setTags(response.data.map(tag => ({value: tag.name, label: tag.name})))
        } catch (error) {
            setTagError(error.response.data.error)
        }
    }

    useEffect(() => {
        getAllTags()
    }, [])


    // handle tags
    const tagCheckboxHandler = (e) => {
        const {value, checked} = e.target
        if(checked) {
            setSelectedTags(prevTags => [...prevTags, value])
        } else {
            setSelectedTags(prevTags => prevTags.filter(tag => tag !== value))
        }
    }

    const deleteTagHandler = (value) => {
        setSelectedTags(prevTags => prevTags.filter(tag => tag !== value))
    }

    const allTagClearHandler = (e) => {
        e.preventDefault()
        setSelectedTags([])
    }

    const dropDownHandler = (e) => {
        e.preventDefault()
        setTagDropdown(current => !current)
    }

    // Handle Form
    const createLead = async(data) => {
        try {
            const response = await createNewLead(data)
            if(response.status === 201) {
                setFormRes("Lead Created Successfully!")  
                setFormError(null)
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
     
        } catch (error) {
            setFormError(error.response.data.error)
            setFormRes(null)
        }
    }

    const formHandler = (e) => {
        e.preventDefault()

        const leadData = {
            name: leadName,
            source: leadSource,
            salesAgent: selectedAgent,
            status: leadStatus,
            tags: selectedTags,
            timeToClose: timeToClose,
            priority: priority
        }

        createLead(leadData)
                                                                                                                                                                                                                                                   
    }
   

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add New Lead</h2>
                    <i onClick={() => handleNewLeadScr()} className="material-icons">close</i>
                </div>
                <div>
                    <form onSubmit={(e) => formHandler(e)}>
                        <div className='add-lead-input'>
                            <label htmlFor="name">Lead Name</label>
                            <span>:</span>
                            <input onChange={(e) => setLeadName(e.target.value)} type="text" name="name"  required/>
                        </div>
                        <div className='add-lead-input'>
                            <label htmlFor="source">Lead Source</label>
                            <span>:</span>
                            <select onChange={(e) => setLeadSource(e.target.value)} name="source" required>
                                <option value="">Select Source</option>
                                <option value="Website">Website</option>
                                <option value="Referral">Referral</option>
                                <option value="Cold Call">Cold Call</option>
                                <option value="Advertisement">Advertisement</option>
                                <option value="Email">Email</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='add-lead-input'>
                            <label htmlFor="salesAgent">Sales Agent</label>
                            <span>:</span>
                            <select onChange={(e) => setSelectedAgent(e.target.value)} name="salesAgent" required>
                                <option value="">Select Sales Agent</option>
                                {salesAgents && 
                                    salesAgents.map(agent => (
                                        <option key={agent._id} value={agent._id}>{agent.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='add-lead-input'>
                            <label htmlFor="leadStatus">Lead Status</label>
                            <span>:</span>
                            <select onChange={(e) => setLeadStatus(e.target.value)} name="leadStatus" required>
                                <option value="">Select Lead Status</option>
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Proposal Sent">Proposal Sent</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                        <div className='add-lead-input'>
                            <label htmlFor="priority">Priority</label>
                            <span>:</span>
                            <select onChange={(e) => setPriority(e.target.value)} name="priority" required>
                                <option value="">Select Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div className='add-lead-input'>
                            <label htmlFor="timeToClose">Time to Close</label>
                            <span>:</span>
                            <input onChange={(e) => setTimeToClose(e.target.value)} type="number" name="timeToClose" min={1} max={90} required/>
                        </div>
                        <div className='add-lead-input'>
                            <label htmlFor="tags">Tags</label>
                            <span>:</span>
                            <div className="tag-main-div">
                                <div className="select-div">
                                    <div className="select-div-tags">
                                        {selectedTags && selectedTags.length !==0 && 
                                            selectedTags.map((tag, index) => (
                                                <div key={index} className="select-div-tag">
                                                    <span>{tag}</span>
                                                    <button onClick={() => deleteTagHandler(tag)}>&times;</button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="select-div-buttons">
                                        <button onClick={(e) => allTagClearHandler(e)}>
                                            <i className="material-icons">close</i>
                                        </button>
                                        
                                        <button onClick={(e) => dropDownHandler(e)}>
                                            <i className="material-icons">keyboard_arrow_down</i>
                                        </button>
                                    </div>
                                </div>

                                {current && 
                                    <div className="checkbox-div">
                                        {tags && tags.length !==0 &&
                                            tags.map(tag => 
                                                (   
                                                <div key={tag.name} className="checkbox-div-tag">
                                                    <input 
                                                        onChange={(e) => tagCheckboxHandler(e)} 
                                                        type="checkbox" name={tag.value} 
                                                        checked={selectedTags.includes(tag.value)} 
                                                        value={tag.value} 
                                                    /> 
                                                    <label htmlFor={tag.label}>
                                                        {tag.label}
                                                    </label>

                                                </div>
                                            ))
                                        }
                                    </div>
                                }

                            </div>
                            
                        </div>
                        <input className="add-lead-button" type="submit" value="Submit" />
                        <input onClick={() => resetBtnHandler} className="add-lead-button" type="reset" value="Reset" />
                    </form>
                </div>
                <div>
                    {agentError && <p>{agentError}</p>}
                    {tagError && <p>{tagError}</p>}
                    {formRes && <p>{formRes}</p>}
                    {formError && <p>{formError}</p>}
                </div>
            </div>
        </div>
    )
}

export default AddNewLead