import {Component} from "react" 
import {Link, Navigate} from "react-router-dom"; 
import Cookies from "js-cookie"
import "./index.css" 


class Home extends Component{
    state={isLogout:false, userName: "", tasks: [],
  leads: [],
  users: []}

    componentDidMount() {
    const user = Cookies.get("userName")
    this.getDashboardData()
    this.setState({ userName: user })
  }


  getDashboardData = async () => {
    
    
  try {
    const response = await fetch("/DashboardData.json")

    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }

    const data = await response.json()

    this.setState({
      tasks: data.tasks,
      leads: data.leads,
      users: data.users,
    })
  } catch (error) {
    console.log("Error:", error)
  }
}


    onLogout=()=>{
      Cookies.remove('password')
      Cookies.remove('userName')
      this.setState({isLogout:true, userName:""})
     }
    render(){
        const {isLogout, userName, tasks, leads, users}=this.state 
        const password = Cookies.get('password')
           if ( password === undefined || isLogout===true) {
           return <Navigate to="/login" />
            }
        return(
            <div className="home-container">
               <div className="navbar">
               <div className="nav-left">
          <p className="welcome-text ">Welcome, {userName} </p>
        </div>

        <div className="nav-right">
          <div className="nav-tabs">
            <Link to="/tasks" className="link-items"><p>Tasks</p></Link>
            <Link to="/leads" className="link-items"><p>Leads</p></Link>
            <Link to="/users" className="link-items"><p>Users</p></Link>
          </div>
          <button className="logout-btn" onClick={this.onLogout}>
            Logout
          </button>
        </div>
      </div>

  
  <div className="section">
    <h2 className="section-title">Tasks</h2>
    
    <div className="row-cards">
         {this.state.tasks.map(task => (
      <div key={task.id} className="task-card">
        <h3>{task.title}</h3>
        <p className={`status ${task.status.toLowerCase()}`}>
          {task.status}
        </p>
        <p>Priority: {task.priority}</p>
        <p>Due: {task.dueDate}</p>
      </div>
    ))}
      
    </div>
  </div>

  
  <div className="section">
    <h2 className="section-title">Leads</h2>
    <div className="row-cards">
      {this.state.leads.map(lead => (
      <div key={lead.id} className="lead-card">
        <h3>{lead.name}</h3>
        <p>{lead.company}</p>
        <p className={`status ${lead.status.toLowerCase()}`}>
          {lead.status}
        </p>
        <p>₹{lead.value}</p>
      </div>
    ))}
    </div>
  </div>

  
  <div className="section">
    <h2 className="section-title">Users</h2>
    <div className="row-cards">
      {this.state.users.map(user => (
      <div key={user.id} className="user-card">
        <h3>{user.name}</h3>
        <p>{user.role}</p>
        <p className={`status ${user.status.toLowerCase()}`}>
          {user.status}
        </p>
      </div>
    ))}
    </div>
  </div>
</div>
        )
    }
}




export default Home