import {Component} from "react" 
import {Navigate} from "react-router-dom"; 
import Cookies from 'js-cookie' 
import "./index.css" 

class Login extends Component { 
      state={isLoggedIn:"", userName:"",email:"", password:"", nameErr:false, passwordErr:false, isErr:false}
     
    onChangeName =(event)=>{ 
        this.setState({userName:event.target.value, isErr:false, nameErr:false})
        


    }
    onChangePassword =(event)=>{ 
        this.setState({password:event.target.value, isErr:false, passwordErr:false})
        

    } 
    onChangeEmail =(event)=>{ 
        this.setState({email:event.target.value, isErr:false})
        

    } 
    onSubmitSuccess=(username, password)=>{
       Cookies.set("password", password, {expires: 30})
        Cookies.set("userName", username, {expires: 30})
        this.setState({isErr:false, isLoggedIn:true}) 
        
        
    }
    onSubmitFailure=()=>{ 
        this.setState({isErr:true, isLoggedIn:false})

    }
    userLogin=(event)=>{
        event.preventDefault() 
        const {userName, password}=this.state
        
        const isNameValid = userName.length > 0 
        const isPasswordValid = password.length >= 5 
        
        if (isNameValid && isPasswordValid){ 
            this.onSubmitSuccess(userName, password) 
          
        }
        else{
            this.onSubmitFailure() 
            if (!isNameValid){
                this.setState({nameErr:true})
            }
            if (!isPasswordValid){
                this.setState({passwordErr:true})
            }
        }

    }

    render(){ 
      const {userName, password, isErr, isLoggedIn, nameErr, passwordErr} = this.state
        if (isLoggedIn === true){
            return <Navigate to="/" />
         }
        return (
            <div className="login-container">
            <form onSubmit={this.userLogin} className="form-container">
  <h1>Login</h1>

  <div className="input-container">
    <label htmlFor="name">Username</label>
    <input
      type="text"
      id="name"
      className="input-element"
      onChange={this.onChangeName}
      placeholder="Enter your name"
      value={userName}
    />
    {nameErr&& <p className="error-text">*Invalid username</p>}
  </div>

  <div className="input-container">
    <label htmlFor="Email">Email</label>
    <input
      type="email"
      id="Email"
      className="input-element"
      onChange={this.onChangeEmail}
      placeholder="Enter your email"
    />
  </div>

  <div className="input-container">
    <label htmlFor="password">Password</label>
    <input
      type="password"
      id="password"
      className="input-element"
      onChange={this.onChangePassword}
      placeholder="Enter at least 5 characters"
    />
    {passwordErr && <p className="error-text" >*Invalid Password</p>}
  </div>
  

  <button type="submit" className="submit-btn">Login</button>

  {isErr && <p className="error-text">*Invalid inputs</p>}
</form>
            </div>
        )
    }
}

export default Login 