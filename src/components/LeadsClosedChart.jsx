import { useEffect, useState } from "react"
import { getLeads } from "../api/leadsAPI"
import { getSalesAgents } from "../api/salesAgentAPI"

import { Bar } from "react-chartjs-2"
import {
    Chart as ChartJS, 
    BarElement, 
    BarController, 
    CategoryScale, 
    LinearScale,
    Title,
    Tooltip, 
    Legend,
    scales, 
} from 'chart.js'


ChartJS.register(
    BarElement, 
    BarController, 
    CategoryScale, 
    LinearScale,
    Title,
    Tooltip, 
    Legend, 
)

const LeadsClosedChart = ({data}) => {


    const [salesAgents, setAgents] = useState([])
    const [agentError, setAgentError] = useState(null)   

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Leads',
                data: [],
                backgroundColor: ['#0F9D58'],
                borderWidth: 1,
            },
        ],
    })
    




    // Get Sales Agents
    const getAllAgents = async() => {
        try {
            const response = await getSalesAgents()
            setAgents(response.data.map(agent => agent.name))
        } catch (error) {
            setAgentError(error.response.data.error)
        }
    }

    useEffect(() => {
        getAllAgents()
    }, [])

    const countObj = {}
    useEffect(() => {
        for(let i=0; i< salesAgents.length; i++) {
            const count = data.reduce((acc,curr) => curr.salesAgent.name === salesAgents[i] && curr.status === "Closed" ? acc + 1 : acc , 0)
            countObj[salesAgents[i]] = count
        }  

        setChartData(prevData => ({
            ...prevData,
            labels: salesAgents,
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: Object.values(countObj)
                }
            ]
        }))
    }, [salesAgents, data])

    



    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'bottom'
            },
            title : {
                display: true,
                text: "Leads Closed by Sales Agent",
            }
        },
        scales : {
            y: {
                max: 6,
                title: {
                    display: true,
                    text: 'Number of Closed Leads',
                    color: 'black',
                }
            },
            x: {
                title: {
                    display: true,
                    text:'Sales Agent',
                    color: 'black',
                }
            }
        }
    }

    return (
        <div className="bar-chart-container">
            {salesAgents.length !==0 && data.length!==0 &&
                <Bar options={options} data={chartData} />
            }
        </ div>
    )
}

export default LeadsClosedChart