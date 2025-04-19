import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AddNewLead from "../components/AddNewLead"
import { getLeads } from "../api/leadsAPI"
import { getSalesAgents } from "../api/salesAgentAPI"
import LeadOverviewCards from "../components/LeadOverviewCards"
import Sidebar from '../components/Sidebar'


const LeadList = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [filteredData, setFilteredData] = useState(null)

    const [newLeadScr, setNewLeadScr] = useState(false)

    const [currStatus, setCurrStatus] = useState('All')
    const [currAgent, setCurrAgent] = useState('All')

    const [salesAgents, setAgents] = useState([])
    const [agentError, setAgentError] = useState(null)

    const [prioritySort, setPrioritySort] = useState(false)
    const [currPrioritySort, setSort] = useState('')

    const [timeSort, setTimeSort] = useState(false)
    const [currTimeSort, setCurrTimeSort] = useState('')

    // Get All Leads
    const getLeadsData = async () => {
        try {
            setLoading(true)
            const res = await getLeads()
            if(res) {
                setData(res.data)
                setFilteredData(res.data)
                setLoading(false)
            }
        } catch (error) {
            setError(error)
        }
    }
    
    useEffect(() => {
        getLeadsData()
    }, [])

    // Filters
    const statusFilterHandler = (filter) => {
        setCurrStatus(filter)
    }

    const handleNewLeadScr = () => {
        setNewLeadScr(newLeadScr => !newLeadScr)
    }


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

    const agentFilterHandler = (filter) => {
        setCurrAgent(filter)
    }

    // Sort 
    const handlePrioritySort = (sort) => {
        setPrioritySort(false)
        setSort(sort)
    }

    const handleResetPriority = () => {
        setSort("")
        setPrioritySort(false)
    }

    const handleTimeSort = (sort) => {
        setCurrTimeSort(sort)
        setTimeSort(false)
    }

    useEffect(() => {
        // Status Filter
        const filteredByStatus = currStatus === "All" ? data : data.filter(lead => lead.status === currStatus)
        // Sales Agent Filter
        const filteredByAgent = currAgent === "All" ? filteredByStatus : filteredByStatus.filter(lead => lead.salesAgent.name === currAgent)

        // Priority Sort
        const prioritySortData = []
        const highPriorityLeads = filteredByAgent.filter(lead => lead.priority === 'High')
        const mediumPriorityLeads = filteredByAgent.filter(lead => lead.priority === 'Medium')
        const lowPriorityLeads = filteredByAgent.filter(lead => lead.priority === 'Low')
        if(currPrioritySort === "HTL") {
            const sortedData = [...highPriorityLeads, ...mediumPriorityLeads, ...lowPriorityLeads]
            prioritySortData.push(...sortedData)
        } else if (currPrioritySort === "LTH") {
            const sortedData = [...lowPriorityLeads, ...mediumPriorityLeads, ...highPriorityLeads]
            prioritySortData.push(...sortedData)
        } else {
            prioritySortData.push(...filteredByAgent)
        }

        // Time to Close Sort
        const timeSortData = [...prioritySortData]
        if(currTimeSort === "HTL") {
            timeSortData.sort((a,b) => b.timeToClose - a.timeToClose)
        } else if(currTimeSort === "LTH") {
            timeSortData.sort((a,b) => a.timeToClose - b.timeToClose)
        } 
        setFilteredData(timeSortData)

    }, [data, currStatus, currAgent, currPrioritySort, currTimeSort])

    const handleResetTime = () => {
        setCurrTimeSort('')
        setTimeSort(false)
    }



    return (
        <>
            <header>
                <h1>Lead List </h1>
            </header>
            <main>
                <Sidebar />
                <div className="content">
                {data && data.length !== 0 && 
                    <>
                        <h2 className="content-heading">Lead Overview</h2>
                        <LeadOverviewCards data={data}/>
                        <div className="filters">
                            <label htmlFor="status">Status</label>
                            <select name="status" onChange={(e) => statusFilterHandler(e.target.value)} value={currStatus}>
                                <option value="All">All</option>
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Proposal Sent">Proposal Sent</option>
                                <option value="Closed">Closed</option>
                            </select>
                            <label htmlFor="salesAgent">Sales Agent</label>
                            <select name="salesAgent" onChange={(e) => agentFilterHandler(e.target.value)} value={currAgent}>
                                <option value="All">All</option>
                                {salesAgents && 
                                    salesAgents.map(agent => (
                                        <option key={agent._id} value={agent.name}>{agent.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Source</th>
                                    <th>Status</th>
                                    <th>Sales Agent</th>
                                    <th>Priority 
                                        <i onClick={() => setPrioritySort(sort => !sort)} className="material-icons sort-icon">sort</i>
                                        {prioritySort && 
                                            <div className="priority-sort">
                                                <p>Sort By:</p>
                                                <label>
                                                    <input 
                                                        onChange={(e) => handlePrioritySort(e.target.value)} 
                                                        type="radio" 
                                                        name="prioritySort" 
                                                        value="HTL" 
                                                        checked={currPrioritySort === "HTL"}
                                                    /> 
                                                    High to Low
                                                </label>
                                                <label>
                                                    <input 
                                                        onChange={(e) => handlePrioritySort(e.target.value)} 
                                                        type="radio" 
                                                        name="prioritySort" 
                                                        value="LTH" 
                                                        checked={currPrioritySort === "LTH"}
                                                    /> 
                                                    Low to High
                                                </label>
                                                <button onClick={() => handleResetPriority()}>reset</button>
                                            </div>
                                        }
                                    </th>
                                    <th>Time to Close
                                    <i onClick={() => setTimeSort(sort => !sort)} className="material-icons sort-icon">sort</i>
                                        {timeSort && 
                                            <div className="priority-sort">
                                                <p>Sort By:</p>
                                                <label>
                                                    <input 
                                                        onChange={(e) => handleTimeSort(e.target.value)} 
                                                        type="radio" 
                                                        name="timeSort" 
                                                        value="HTL" 
                                                        checked={currTimeSort === "HTL"}
                                                    /> 
                                                    High to Low
                                                </label>
                                                <label>
                                                    <input 
                                                        onChange={(e) => handleTimeSort(e.target.value)} 
                                                        type="radio" 
                                                        name="timeSort" 
                                                        value="LTH" 
                                                        checked={currTimeSort === "LTH"}
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
                                {filteredData && 
                                filteredData.map((lead,index) => (
                                    <tr key={lead._id}>
                                        <td>{index + 1}</td>
                                        <td><Link to={`/leads/${lead._id}`}>{lead.name}</Link></td>
                                        <td>{lead.source}</td>
                                        <td><Link to={`/status/${lead.status}`}>{lead.status}</Link></td>
                                        <td><Link to={`/agent/${lead.salesAgent._id}`}>{lead.salesAgent.name}</Link></td>
                                        <td>{lead.priority}</td>
                                        <td>{lead.timeToClose}</td>
                                    </tr>
                                ))
                                }
                                {filteredData && filteredData.length === 0 && 
                                    <tr style={{textAlign: "center"}}>
                                        <td colSpan={7}>No Data Found!</td>
                                    </tr>
                                }
                            </tbody>

                        </table>
                        <button onClick={() => setNewLeadScr(true)} className="addButton">+ Add New Lead</button>
                        {newLeadScr &&
                            <AddNewLead handleNewLeadScr={handleNewLeadScr} />
                        }
                    </>}
                    {loading && !error && 
                        <div className='loader-div'>
                            <h3 className='loader'></h3>
                        </div>
                    }
                    {error && 
                        <div className='loader-div'>
                            <h3 className='error-msg'>{error}</h3>
                        </div>
                    }
                </div>

            </main>
        </>
    )
}

export default LeadList

//* Legacy Code

// if(filter !== 'All') {
//     const filteredData = data.filter(lead => lead.status === filter)
//     setFilteredData(filteredData)
// } else {
//     setFilteredData(data)
// }

// if(filter !== "All") {
//     const filteredData = data.filter(lead => lead.salesAgent.name === filter)
//     setFilteredData(filteredData)
// } else {
//     setFilteredData(data)
// }

// const highPriorityLeads = filteredData.filter(lead => lead.priority === 'High')
// const mediumPriorityLeads = filteredData.filter(lead => lead.priority === 'Medium')
// const lowPriorityLeads = filteredData.filter(lead => lead.priority === 'Low')
// if(sort === "HTL") {
//     const sortedData = [...highPriorityLeads, ...mediumPriorityLeads, ...lowPriorityLeads]
//     setFilteredData(sortedData)
// } else if (sort === "LTH") {
//     const sortedData = [...lowPriorityLeads, ...mediumPriorityLeads, ...highPriorityLeads]
//     setFilteredData(sortedData)
// }

// if(sort === "HTL") {
//     const sortData = [...filteredData]
//     sortData.sort((a,b) => b.timeToClose - a.timeToClose)
//     setFilteredData(sortData)
// } else if(sort === "LTH") {
//     const sortData = [...filteredData]
//     sortData.sort((a,b) => a.timeToClose - b.timeToClose)
//     setFilteredData(sortData)
// }