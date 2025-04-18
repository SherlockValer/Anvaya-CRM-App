import {Pie} from 'react-chartjs-2'
import {Chart as ChartJS, ArcElement, Tooltip, Legend, scales} from 'chart.js'

// Register necessary chart types
ChartJS.register(ArcElement, Tooltip, Legend)

const TotalLeadsChart = ({data}) => {
    const dataClosed = data.filter(lead => lead.status === "Closed" ).length
    const dataInPipeline = data.length - dataClosed
    
    const chartData = {
        labels: ['In Pipeline', 'Closed'],
        datasets: [
            {
                label: 'Leads',
                data: [dataInPipeline, dataClosed],
                backgroundColor: ['#FF6384', '#FFCE56'],
                borderWidth: 1,

            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                align: 'left',
                labels: {
                    boxWidth: 20,
                    padding: 15,
                    textAlign: 'left',
                }
            },
            title: {
                display: true,
                text: 'Total Leads',
            }
        },
    }


    return (
        <div className='pie-chart-container'>
            <Pie data={chartData} options={options} />
        </div>
    )
}

export default TotalLeadsChart