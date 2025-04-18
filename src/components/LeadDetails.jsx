import { useState } from "react"
import { Link } from "react-router-dom"
import EditLeadDetails from "./EditLeadDetails"

const LeadDetails = ({data, error}) => {
    const [showEdit, setShow] = useState(false)

    const handleShowEdit = () => {
        setShow(showEdit => !showEdit)
    }

    return (
        <>
            <h2 style={{marginTop: "0.2rem"}}>Lead Details</h2>
            {data && !error &&
                <div className="lead-details-section">
                    <div className="lead-info">
                        <p>Lead Name</p>
                        <p>:</p>
                        <p>{data.name}</p>
                    </div>
                    <div className="lead-info">
                        <p>Sales Agent</p>
                        <p>:</p>
                        <p><Link to={`/agent/${data.salesAgent._id}`}>{data.salesAgent.name}</Link></p>
                    </div>
                    <div className="lead-info">
                        <p>Lead Source</p>
                        <p>:</p>
                        <p>{data.source}</p>
                    </div>
                    <div className="lead-info">
                        <p>Lead Status</p>
                        <p>:</p>
                        <p><Link to={`/status/${data.status}`}>{data.status}</Link></p>
                    </div>
                    <div className="lead-info">
                        <p>Priority</p>
                        <p>:</p>
                        <p>{data.priority}</p>
                    </div>
                    <div className="lead-info">
                        <p>Time to Close</p>
                        <p>:</p>
                        <p>{data.timeToClose} Days</p>
                    </div>
                    <div className="lead-info">
                        <p>Tags</p>
                        <p>:</p>
                        <p>{data.tags.join(', ')}</p>
                    </div>
                </div>
            }
            {error && 
                <p>{error.error}</p>
            }
            <button onClick={() => handleShowEdit()} className="btn-accent">&#9998; Edit Lead Details</button>
            {showEdit && <EditLeadDetails leadData={data} handleShowEdit={handleShowEdit} />}
        </>
    )
}

export default LeadDetails