import { useEffect, useState } from "react"
import { updateLead } from "../api/leadsAPI"
import { getSalesAgents } from "../api/salesAgentAPI"
import { getTags } from "../api/tagsAPI"

const EditLeadDetails = ({leadData, handleShowEdit}) => {
    // Fetch Call Data
    const [salesAgents, setAgents] = useState([])
    const [agentError, setAgentError] = useState(null)

    const [tags, setTags] = useState([])
    const [tagError, setTagError] = useState(null)
    const [current, setTagDropdown] = useState(false)

    const [formError, setFormError] = useState(null)
    const [formRes, setFormRes] = useState(null)

    // Form Data
    const [leadName, setLeadName] = useState("")
    const [leadSource, setLeadSource] = useState("")
    const [selectedAgent, setSelectedAgent] = useState()
    const [leadStatus, setLeadStatus] = useState()
    const [selectedTags, setSelectedTags] = useState([])
    const [timeToClose, setTimeToClose] = useState(0)
    const [priority, setPriority] = useState()

    useEffect(() => {
        setLeadName(leadData.name)
        setLeadSource(leadData.source)
        setSelectedAgent(leadData.salesAgent._id)
        setLeadStatus(leadData.status)
        setSelectedTags([...leadData.tags])
        setTimeToClose(leadData.timeToClose)
        setPriority(leadData.priority)
    }, [])

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

    const allTagClearHandler = () => {
        setSelectedTags([])
    }

    const dropDownHandler = () => {
        setTagDropdown(current => !current)
    }

    // Handle Form
    const editLeadDetails = async(dataToUpdate) => {
        try {
            const response = await updateLead(leadData._id, dataToUpdate)
            if(response.status === 200) {
                setFormRes("Lead Updated Successfully!")  
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

        editLeadDetails(leadData)
                                                                                                                                                                                                                                                   
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Edit Lead Details</h2>
                    <i onClick={() => handleShowEdit()} className="material-icons">close</i>
                </div>
                <div>
                    <form onSubmit={formHandler}>
                        <div className='add-lead-input'>
                            <label htmlFor="name">Lead Name</label>
                            <span>:</span>
                            <input onChange={(e) => setLeadName(e.target.value)} value={leadName} type="text" name="name"  required/>
                        </div>
                        <div className='add-lead-input'>
                            <label htmlFor="source">Lead Source</label>
                            <span>:</span>
                            <select onChange={(e) => setLeadSource(e.target.value)} value={leadSource} name="source" required>
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
                            <select onChange={(e) => setSelectedAgent(e.target.value)} value={selectedAgent} name="salesAgent" required>
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
                            <select onChange={(e) => setLeadStatus(e.target.value)} value={leadStatus} name="leadStatus" required>
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
                            <select onChange={(e) => setPriority(e.target.value)} value={priority} name="priority" required>
                                <option value="">Select Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div className='add-lead-input'>
                            <label htmlFor="timeToClose">Time to Close</label>
                            <span>:</span>
                            <input onChange={(e) => setTimeToClose(e.target.value)} value={timeToClose} type="number" name="timeToClose" min={1} max={90} required/>
                        </div>
                        <div className='add-lead-input'>
                            <label >Tags</label>
                            <span>:</span>
                            <div className="tag-main-div">
                                <div className="select-div">
                                    <div className="select-div-tags">
                                        {selectedTags && selectedTags.length !==0 && 
                                            selectedTags.map((tag,index) => (
                                                <div key={index} className="select-div-tag">
                                                    <span>{tag}</span>
                                                    <button type="button" onClick={() => deleteTagHandler(tag)}>&times;</button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="select-div-buttons">
                                        <button type="button" onClick={allTagClearHandler}>
                                            <i className="material-icons">close</i>
                                        </button>
                                        
                                        <button type="button" onClick={dropDownHandler}>
                                            <i className="material-icons">keyboard_arrow_down</i>
                                        </button>
                                    </div>
                                </div>

                                {current && 
                                    <div className="checkbox-div">
                                        {tags && tags.length !==0 &&
                                            tags.map(tag => 
                                                (   
                                                <div key={tag._id} className="checkbox-div-tag">
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
                        <input className="add-lead-button" type="submit" value="Submit" />                    </form>
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

export default EditLeadDetails