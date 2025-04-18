import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getLeadByID } from '../api/leadsAPI'

import LeadDetails from "../components/LeadDetails"
import CommentsSection from '../components/CommentsSection'
import Sidebar from '../components/Sidebar'

const LeadManagement = () => {
    const leadIDObj = useParams()

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getLeadDetails = async(leadID) => {
        try {
            setLoading(true)
            const res = await getLeadByID(leadID)
            if(res) {
                setData(res.data[0])
                setLoading(false)
            }
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
                <h1>Lead Management : {data && <span>{data.name}</span>}</h1>
            </header>
            <main>
                <Sidebar />
                <div className="content">
                {data && 
                    <>
                        <LeadDetails data={data} error={error} />
                        <CommentsSection id={leadIDObj.leadID} />
                    </>
                }
                {loading && 
                    <div className='loader-div'>
                        <h3 className='loader'></h3>
                    </div>
                }
                </div>
            </main>
        </>
    )
}

export default LeadManagement