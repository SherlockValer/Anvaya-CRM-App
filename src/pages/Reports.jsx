import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getSalesAgents } from "../api/salesAgentAPI"
import { getLeads } from "../api/leadsAPI"


import LeadsClosedChart from "../components/LeadsClosedChart"
import TotalLeadsChart from "../components/TotalLeadsChart"
import LeadStatusDistributionChart from "../components/LeadStatusDistributionChart"
import Sidebar from "../components/Sidebar"

const Reports = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(false)

    // Get All Leads
    const getLeadsData = async () => {
        try {
            const res = await getLeads()
            setData(res.data)
        } catch (error) {
            setError(error)
        }
    }
    

    useEffect(() => {
        getLeadsData()
    }, [])


    return (
        <>
            <header>
                <h1>Anvaya CRM Reports</h1>
            </header>
            <main>
                <Sidebar />
                <div className="content">
                    {data && data.length !== 0 && 
                        <>

                            <h2 className="content-heading">Report Overview</h2>
                            <div className="chart-flex">
                                <TotalLeadsChart data={data} />
                                <LeadsClosedChart data={data} />
                                <LeadStatusDistributionChart data={data}/>
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

export default Reports