
const LeadOverviewCards = ({data}) => {
    const total = data.length
    const closed = data.filter(lead => lead.status === 'Closed').length
    const open = total - closed

    
    return (
        <>
            <div className="cards">
            <div className="overview-card total-card">
                    <h2 >{total}</h2>
                    <p>Total Leads</p>
                </div>
                <div className="overview-card">
                    <h2>{open}</h2>
                    <p>Open</p>
                </div>
                <div className="overview-card">
                    <h2>{closed}</h2>
                    <p>Closed</p>
                </div>
            </div>
        </>
    )
}

export default LeadOverviewCards