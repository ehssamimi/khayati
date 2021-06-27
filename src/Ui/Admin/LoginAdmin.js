import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
        username:'',
        password:'',
        Success:false
        }
    }
    changetext = (event) => {
        console.log(event.target.name)
        if (event.target.name === "username") {
            this.setState({
                username: event.target.value
            })
        }
        if (event.target.name === "password") {
            this.setState({
                password: event.target.value
            })
        }


    }
    login=()=>{
        console.log(this.state.username)
        console.log(this.state.password)
        if(this.state.username==='admin'){
          if(this.state.password==='admin'){
            localStorage.setItem('username',"admin")
            localStorage.setItem('password',"admin")
            window.location.replace('/admin/dashboard')
          }
        }
        else{
this.setState({
  Success:true
})
        }
    }
    handleCloseSuccess=()=>{
      this.setState({
        Success:false
      })
    }
render(){
    
    return (
    
          
          <div className='row' style={{display:'flex', justifyContent:'center', alignItems:'center',marginTop:'20%', flexDirection:'column'}}>
             <div>
                    <Snackbar open={this.state.Success} autoHideDuration={6000} onClose={this.handleCloseSuccess}>
                        <Alert onClose={this.handleCloseSuccess} severity={this.state.severity}>
                           رمز عبور یا نام کاربری اشتباه است
                        </Alert>
                    </Snackbar>
                </div>
        <div className='col-sm-8 col-md-4'>
                     <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="username"
                name="username"
                autoComplete="email"
                autoFocus
                onChange={this.changetext}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.changetext}
              />
            
              <Button
               
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.login}
              >
                Sign In
              </Button>
        </div>
         
          
     
          
         
          </div>
       
      
      );
}
}

export default Login