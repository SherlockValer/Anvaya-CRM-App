import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getLeadByStatus } from '../api/leadsAPI'
import { getSalesAgents } from '../api/salesAgentAPI'
import Sidebar from '../components/Sidebar'


const LeadsByStatus = () => {
    const {statusName} = useParams()
    
    const [data, setData] = useState([])
    const [error, setError] = useState(false)

    const [salesAgents, setAgents] = useState([])
    const [agentError, setAgentError] = useState(null)

    const [currAgent, setCurrAgent] = useState('All')
    const [currPriority, setCurrentPriority] = useState('All')
    const [currTimeToClose, setTimeToClose] = useState('All')

    const [updatedData, setUpdatedData] = useState([])

    const [timeSort, setTimeSort] = useState(false)

    // Get leads data
    const getLeadsData = async (status) => {
        try {
            const res = await getLeadByStatus(status)
            setData(res.data)
        } catch (error) {
            setError(error.response.data.error)
        }
    }
    
    useEffect(() => {
        getLeadsData(statusName)
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

    // Filter
    useEffect(() => {
        const filteredByAgent = currAgent === "All" ? data : data.filter(lead => lead.salesAgent.name === currAgent)

        const filteredByPriority = currPriority === "All" ? filteredByAgent : filteredByAgent.filter(lead => lead.priority === currPriority)

        if(currTimeToClose !== 'All') {
            const sortedData = currTimeToClose === "LTH" ? filteredByPriority.sort((a,b) => a.timeToClose - b.timeToClose) : filteredByPriority.sort((a,b) => b.timeToClose - a.timeToClose)
            setUpdatedData([...sortedData])
        } else {
            setUpdatedData([...filteredByPriority])
        }


    }, [data, currTimeToClose, currAgent, currPriority])

    const handleTimeSort = (e) => {
        setTimeToClose(e.target.value)
        setTimeSort(false)
    }

    const handleResetTime = () => {
        setCurrAgent('All')
        setCurrentPriority('All')
        setTimeToClose(null)
        setTimeSort(false)
    }

    return (
        <>
            <header>
                <h1>Leads By Status </h1>
            </header>
            <main>
                <Sidebar />
                <div className="content">
                    {data && data.length !== 0 && 
                        <>
                            <h2 className="content-heading">Lead List by Status</h2>
                            <h3>Status: {statusName}</h3>
                            <div className="filters">
                                <label htmlFor="salesAgent">Sales Agent</label>
                                <select name="salesAgent" onChange={(e) => setCurrAgent(e.target.value)} value={currAgent}>
                                    <option value="All">All</option>
                                    {salesAgents && 
                                        salesAgents.map(agent => (
                                            <option 
                                                key={agent._id} 
                                                value={agent.name}
                                            >{agent.name}</option>
                                        ))
                                    }
                                </select>

                                <label htmlFor="priority">Priority</label>
                                <select name="priority" onChange={(e) => setCurrentPriority(e.target.value)}>
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
                                            <th>Sales Agent</th>
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
                                                    <td><Link to={`/agent/${lead.salesAgent._id}`}>{lead.salesAgent.name}</Link></td>
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

export default LeadsByStatus