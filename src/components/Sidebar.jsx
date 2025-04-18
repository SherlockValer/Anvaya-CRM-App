import { Link } from 'react-router-dom'

const Sidebar = () => {

    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to='/' style={{display: 'flex', flexWrap: 'wrap', alignItems:"center"}}> 
                        <span className='material-icons' style={{height: '16px'}}>arrow_back</span> 
                        <span>Back to Dashboard</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar