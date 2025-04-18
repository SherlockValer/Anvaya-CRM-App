import { useEffect, useState } from "react"
import { Link } from "react-router-dom"



const LeadStatus = ({data, error}) => {
    const [status, setStatus] = useState({
        new: 0,
        contacted: 0,
        qualified: 0,
        proposalSent: 0,
        closed: 0
    })

    useEffect(() => {
        const leadsFilter = (status) => {
            const num = data.filter(lead => lead.status === status).length
            return num
        }

        const newLeads = leadsFilter('New')
        const contactedLeads = leadsFilter('Contacted')
        const qualifiedLeads = leadsFilter('Qualified')
        const proposalSentLeads = leadsFilter('Proposal Sent')
        const closedLeads = leadsFilter('Closed')

        const newStatus = {
            new: newLeads,
            contacted: contactedLeads,
            qualified: qualifiedLeads,
            proposalSent: proposalSentLeads,
            closed: closedLeads
        }

        setStatus(newStatus)
    }, [data])

    return (
        <>
            <h2>Lead Status:</h2>
            {data && 
            <ul className='lead-status'>
                <li>
                    <span><Link to={`/status/New`}>New</Link></span> <span style={{width: "5rem"}}>:</span> <span>{status.new} Leads</span>
                </li>
                <li>
                    <span><Link to={`/status/Contacted`}>Contacted</Link></span> <span style={{width: "5rem"}}>:</span> <span>{status.contacted} Leads</span>
                </li>
                <li>
                    <span><Link to={`/status/Qualified`}>Qualified</Link></span> <span style={{width: "5rem"}}>:</span> <span>{status.qualified} Leads</span>
                </li>
                <li>
                    <span><Link to={`/status/Proposal Sent`}>Proposal Sent</Link></span> <span style={{width: "5rem"}}>:</span> <span>{status.proposalSent} Leads</span>
                </li>
                <li>
                    <span><Link to={`/status/Closed`}>Closed</Link></span> <span style={{width: "5rem"}}>:</span> <span>{status.closed} Leads</span>
                </li>
            </ul>}
            {error && <p>{error}</p>}
        </>
    )
}

export default LeadStatus