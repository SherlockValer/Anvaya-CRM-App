import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSalesAgents } from '../api/salesAgentAPI'
import AddNewSalesAgent from '../components/AddNewSalesAgent'
import Sidebar from '../components/Sidebar'

const SalesAgentManagement = () => {
    const [salesAgents, setAgents] = useState([])
    const [agentLoading, setLoading] = useState(false)
    const [agentError, setAgentError] = useState(null)

    const [newAgentScr, setAgentScr] = useState(false)

    // Get Sales Agents
    const getAllAgents = async() => {
        try {
            setLoading(true)
            const response = await getSalesAgents()
            if(response) {
                setAgents(response.data)
                setLoading(false)
            }
        } catch (error) {
            setAgentError(error.response.data.error)
        }
    }

    useEffect(() => {
        getAllAgents()
    }, [])

    const handleNewAgentScr = () => {
        setAgentScr(scr => !scr)
    }

    return (
        <>
            <header>
                <h1>Sales Agent Management</h1>
            </header>
            <main>
                <Sidebar />
                <div className="content">
                    {salesAgents && salesAgents.length !== 0 && 
                        <>
                            <h2 className="content-heading">Sales Agent List</h2>
                            <div>
                                <div className='agent-flex'>
                                    {salesAgents && salesAgents.length !==0 && 
                                        salesAgents.map(agent => ( 
                                            <Link to={`/agent/${agent._id}`}>
                                                <div className='agent-card'>
                                                    <img src={`https://placehold.co/150?text=${agent.name[0]}`} alt="" />
                                                    <h3>{agent.name}</h3>
                                                    <p>{agent.email}</p>
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            </div>
                            <button onClick={() => setAgentScr(true)} className='addButton'>Add New Agent</button>
                            {newAgentScr && 
                                <AddNewSalesAgent handleNewAgentScr={handleNewAgentScr}/>
                            }
                        </>}
                        {agentLoading && !agentError && 
                            <div className='loader-div'>
                                <h3 className='loader'></h3>
                            </div>
                        }
                        {agentError && 
                            <div className='loader-div'>
                                <h3 className='error-msg'>{error}</h3>
                            </div>
                        }
                </div>
            </main>
        </>
    )
}

export default SalesAgentManagement

// Legacy code
// {/* <table>
//     <thead>
//         <tr>
//             <th>Agent</th>
//             <th>Email</th>
//         </tr>
//     </thead>
//     <tbody>
//         {salesAgents && salesAgents.length !==0 &&
//             salesAgents.map(agent => (
//                 <tr key={agent._id}>
//                     <td><Link to={`/agent/${agent._id}`}>{agent.name}</Link></td>
//                     <td>{agent.email}</td>
//                 </tr> 
//             ))
//         }
//         {agentError && 
//             <tr>
//                 <td colSpan={2}>No Sales Agents Found!</td>
//             </tr>
//         }
//     </tbody>
// </table> */}