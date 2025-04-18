import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getLeadByID } from '../api/leadsAPI'

import LeadDetails from "../components/LeadDetails"
import CommentsSection from '../components/CommentsSection'
import Sidebar from '../components/Sidebar'

const LeadManagement = () => {
    const leadIDObj = useParams()

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    const getLeadDetails = async(leadID) => {
        try {
            const res = await getLeadByID(leadID)
            setData(res.data[0])
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        getLeadDetails(leadIDObj.leadID)
    }, [])

    return (
        <>
            <header>
                {data && 
                    <h1>Lead Management : {data.name}</h1>
                }
            </header>
            <main>
                <Sidebar />
                <div className="content">
                    <LeadDetails data={data} error={error} />
                    <CommentsSection id={leadIDObj.leadID} />
                </div>
            </main>
        </>
    )
}

export default LeadManagement