import { Link } from "react-router-dom"

const LeadCards = ({data, error}) => {
    const threeDataArr = []
    for(let i=0; i<data.length && i<3; i++) {
        threeDataArr.push(data[i])
    }

    return (
        <>
            <div className='leads-flex' >
                {threeDataArr && threeDataArr.length !==0 && 
                    threeDataArr.map(lead => (
                        <Link to={`/leads/${lead._id}`} key={lead._id}>
                            <div className="card" key={lead._id}>
                                <h3>{lead.name}</h3>
                                <p>{lead.status}</p>
                                <p>{lead.salesAgent.name}</p>
                            </div>
                        </Link>
                    ))
                }
                {error && <p>{error}</p>}
            </div>
        </>
    )
}

export default LeadCards