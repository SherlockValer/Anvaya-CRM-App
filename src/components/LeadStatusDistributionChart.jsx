import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import {
    Chart as ChartJS, 
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    plugins,
    scales
} from 'chart.js'

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
)

const LeadStatusDistributionChart = ({data}) => {
    const [chartData, setChartData] = useState(null)


    const storeChartData = (data) => {
        const statusObj = {
            new: 0,
            contacted: 0,
            qualified: 0,
            proposalSent: 0,
            closed: 0
        }

        for(let i=0; i< data.length; i++) {
            switch(data[i].status) {
                case "New" :
                    statusObj.new = statusObj.new + 1;
                    break;
                case "Contacted" :
                    statusObj.contacted = statusObj.contacted + 1;
                    break;
                case "Qualified" :
                    statusObj.qualified = statusObj.qualified + 1;
                    break;
                case "Proposal Sent" :
                    statusObj.proposalSent = statusObj.proposalSent + 1;
                    break;
                case "Closed" :
                    statusObj.closed = statusObj.closed + 1;
                    break;
            }
    
        }

        const chart = {
            labels: Object.keys(statusObj),
            datasets:[
                {
                    label: "leads",
                    data: Object.values(statusObj),
                    backgroundColor: ['#FF6384', '#0F9D58', '#FFCE56', '#FFB300', 'dodgerBlue']
                }
            ]
        }

        setChartData(chart)


    }

    useEffect(() => {

        storeChartData(data)

    }, [data])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display:false,
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Lead Status Distribution'
            },
        },
        scales: {
            x: {
                title: {
                    display:true,
                    text: 'Lead Status',
                    color: 'black',
                },
            },
            y: {
                ticks: {
                    precision: 0,
                },
                title: {
                    display: true,
                    text: 'Number of Leads',
                    color: 'black',
                },
                max: 10
            }
        }
    }


    return (
        <div className="bar-chart-container lead-distribution">
            {chartData && 
                <Bar data={chartData} options={options} />
            }
        </div>
    )
}

export default LeadStatusDistributionChart