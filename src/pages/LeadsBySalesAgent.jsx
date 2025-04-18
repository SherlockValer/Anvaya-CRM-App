import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getLeadBySalesAgent } from '../api/leadsAPI'
import { getSalesAgents } from '../api/salesAgentAPI'
import Sidebar from '../components/Sidebar'



const LeadsBySalesAgent = () => {
    const {agentId} = useParams()
    
    const [data, setData] = useState([])
    const [error, setError] = useState(false)

    const [salesAgent, setAgent] = useState(null)
    const [agentError, setAgentError] = useState(null)

    const [currStatus, setCurrStatus] = useState('All')
    const [currPriority, setCurrentPriority] = useState('All')
    const [currTimeToClose, setTimeToClose] = useState('All')

    const [updatedData, setUpdatedData] = useState([])

    const [timeSort, setTimeSort] = useState(false)

    // Get leads data
    const getLeadsData = async (agent) => {
        try {
            const res = await getLeadBySalesAgent(agent)
            setData(res.data)
        } catch (error) {
            setError(error.response.data.error)
        }
    }
    
    useEffect(() => {
        getLeadsData(agentId)
    }, [])

    // Get Sales Agents
    const getAllAgents = async() => {
        try {
            const response = await getSalesAgents()
            if(response.status === 200) {
                const currentAgent = response.data.find(agent => agent._id === agentId)
                setAgent(currentAgent)
            }
        } catch (error) {
            setAgentError(error.response.data.error)
        }
    }

    useEffect(() => {
        getAllAgents()
    }, [])


    // Filter
    useEffect(() => {
        const filteredByStatus = currStatus === "All" ? data : data.filter(lead => lead.status === currStatus)

        const filteredByPriority = currPriority === "All" ? filteredByStatus : filteredByStatus.filter(lead => lead.priority === currPriority)

        if(currTimeToClose !== 'All') {
            const sortedData = currTimeToClose === "LTH" ? filteredByPriority.sort((a,b) => a.timeToClose - b.timeToClose) : filteredByPriority.sort((a,b) => b.timeToClose - a.timeToClose)
            setUpdatedData([...sortedData])
        } else {
            setUpdatedData([...filteredByPriority])
        }

    }, [data, currTimeToClose, currStatus, currPriority])

    const handleTimeSort = (e) => {
        setTimeToClose(e.target.value)
        setTimeSort(false)
    }

    const handleResetTime = () => {
        setCurrStatus('All')
        setCurrentPriority('All')
        setTimeToClose(null)
        setTimeSort(false)
    }

    return (
        <>
            <header>
                <h1>Leads By Sales Agent </h1>
            </header>
            <main>
                <Sidebar />
                <div className="content">
                {data && data.length !== 0 && 
                    <>
                        <h2 className="content-heading">Lead List by Sales Agent</h2>
                        {salesAgent && <h3>Sales Agent: {salesAgent.name}</h3>}
                        <div className="filters">
                            <label htmlFor="status">Status</label>
                            <select name="status" onChange={(e) => setCurrStatus(e.target.value)} value={currStatus}>
                                <option value="All">All</option>
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Proposal Sent">Proposal Sent</option>
                                <option value="Closed">Closed</option>
                            </select>

                            <label htmlFor="priority">Priority</label>
                            <select name="priority" onChange={(e) => setCurrentPriority(e.target.value)} value={currPriority}>
                                <option value="All">All</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Source</th>
                                        <th>Status</th>
                                        <th>Priority</th>
                                        <th>Time to Close
                                            <i onClick={() => setTimeSort(sort => !sort)} className="material-icons sort-icon">sort</i>
                                            {timeSort && 
                                                <div className="priority-sort">
                                                    <p>Sort By:</p>
                                                    <label>
                                                        <input 
                                                            onChange={(e) => handleTimeSort(e)} 
                                                            type="radio" 
                                                            name="sort" 
                                                            value="HTL" 
                                                            checked={currTimeToClose === "HTL"}
                                                        /> 
                                                        High to Low
                                                    </label>
                                                    <label>
                                                        <input 
                                                            onChange={(e) => handleTimeSort(e)} 
                                                            type="radio" 
                                                            name="sort" 
                                                            value="LTH" 
                                                            checked={currTimeToClose === "LTH"}
                                                        /> 
                                                        Low to High
                                                    </label>
                                                    <button onClick={() => handleResetTime()}>reset</button>
                                                </div>
                                            }
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {updatedData.length !==0 && 
                                        updatedData.map((lead,index) => (
                                            <tr key={lead._id}>
                                                <td>{index + 1}</td>
                                                <td><Link to={`/leads/${lead._id}`}>{lead.name}</Link></td>
                                                <td>{lead.source}</td>
                                                <td><Link to={`/status/${lead.status}`}>{lead.status}</Link></td>
                                                <td>{lead.priority}</td>
                                                <td>{lead.timeToClose}</td>
                                            </tr>
                                        ))
                                    }
                                    {updatedData && updatedData.length === 0 && 
                                        <tr style={{textAlign: "center"}}>
                                            <td colSpan={7}>No Data Found!</td>
                                        </tr>
                                    }
                                </tbody>

                            </table>
                        </div>
                    </>
                    }
                    {data.length === 0 && 
                        <div className='loader-div'>
                            <h3 className='loader'></h3>
                        </div>
                    }
                </div>
            </main>
        </>
    )
}

export default LeadsBySalesAgent