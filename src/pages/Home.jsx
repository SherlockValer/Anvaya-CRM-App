import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getLeads } from '../api/leadsAPI'
import LeadCards from '../components/LeadCards'
import LeadStatus from '../components/LeadStatus'
import AddNewLead from '../components/AddNewLead'

const Home = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    const [filteredData, setFilteredData] = useState(null)

    const [newLeadScr, setNewLeadScr] = useState(false)


    const getLeadsData = async () => {
        try {
            const res = await getLeads()
            setData(res.data)
        } catch (error) {
            setError(error.response.data.error)
        }
    }
    
    useEffect(() => {
        getLeadsData()
    }, [])


    const filterHandler = (filter) => {
        if(filter !== 'All') {
            const filteredData = data.filter(lead => lead.status === filter)
            setFilteredData(filteredData)
        } else {
            setFilteredData(data)
        }

    }

    const handleNewLeadScr = () => {
        setNewLeadScr(newLeadScr => !newLeadScr)
    }


    return (
        <>
            <header>
                <h1>Anvaya CRM Dashboard</h1>
            </header>
            <main>
                <div className="sidebar">
                    <ul>
                        <li>
                            <Link 
                                to='/leadlist' 
                            >
                                <span 
                                    className='material-icons' 
                                >
                                    groups
                                </span> 
                                <span>Leads</span>
                            </Link>
                        </li>
                        <li><Link to='/salesagents'><span className='material-icons'>person_pin</span><span>Sales Agents</span></Link></li>
                        <li><Link to='/reports'><span className='material-icons'>analytics</span><span>Reports</span></Link></li>
                        <li><Link><span className='material-icons'>settings</span><span>Settings</span></Link></li>
                    </ul>
                </div>

                <div className="content">
                    <LeadCards data={filteredData || data} error={error} />
                    <LeadStatus data={data} error={error}/>

                    <p>Quick Filters:</p>
                    <div className='quick-filters'>
                        <button className='btn-accent' onClick={() => filterHandler('All')}>Latest</button>
                        <button className='btn-accent' onClick={() => filterHandler('New')}>New</button>
                        <button className='btn-accent' onClick={() => filterHandler('Contacted')}>Contacted</button>
                        <button className='btn-accent' onClick={() => filterHandler('Qualified')}>Qualified</button>
                        <button className='btn-accent' onClick={() => filterHandler('Proposal Sent')}>Proposal Sent</button>
                        <button className='btn-accent' onClick={() => filterHandler('Closed')}>Closed</button>
                    </div>

                    <button onClick={() => handleNewLeadScr()} className='addButton'> + Add New Lead</button>
                    {newLeadScr &&
                        <AddNewLead handleNewLeadScr={handleNewLeadScr}/>
                    }
                </div>
            </main>
        </>
    )
}

export default Home