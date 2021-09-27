import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Modal, Nav, Navbar } from 'react-bootstrap';
import './Main.css'
import { Config } from '../../Utils'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Logo from '../../photo/logo.png'
class AdminAddClass extends Component {
    componentDidMount(){
        var basicAuth = Buffer.from(window.localStorage.getItem('username') + ":" + window.localStorage.getItem('password')).toString('base64')
        window.localStorage.setItem('basic', basicAuth)
        this.getSupport()
    }
  
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            cost: '',
            size: '',
count:'',
            support: [],
            show:false,
            id_chall:'',
path:'',
level:'',
title:'',
toast_blur:false,
dis:false,
imageUrl:'',
addfile:'',
showedit:false,
id_edit:'',
showdetail:false,
listDetail:[]
        }
    }
    getSupport() {
        var requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0"

            }


        };

        fetch(Config()['apiUrl'] + "/support/admin/all-unread-messages", requestOptions)
            .then(response => {



                response.json().then(rep => {
                    console.log(rep)

                    this.setState({
                        support: rep
                    })


                })





            })
            .catch(error => console.log('error', error));
    }

    changetext = (event) => {
        if (event.target.name === "name") {
            this.setState({
                name: event.target.value
            })
        }
        if (event.target.name === "count") {
            this.setState({
                count: event.target.value
            })
        }
        if (event.target.name === "description") {
            this.setState({
                description: event.target.value
            })
        }
        if (event.target.name === "level") {
            this.setState({
                level: event.target.value
            })
        }
       
        if (event.target.name === "title") {
            this.setState({
                title: event.target.value
            })
        }

    }
  

handleClose=()=>{
    this.setState({
        show:false
    })
}


last_submit=()=>{
    var Item={}
    Item.sectionCount=this.state.count
    Item.enable=true
  
    Item.iconUrl=this.state.imageUrl
    Item.packageName=this.state.name
 
     var requestOptions = {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             'Accept': '*/*',
             "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0" 
 
         },
         body:JSON.stringify(Item)
 
 
     };
 
     fetch(Config()['apiUrl'] + "/admin/educations/package", requestOptions)
         .then(response => {
 

 if(response.status===200){
     response.json().then(rep => {
         
 window.location.reload()
             })
 }
             
 
 
 
 
 
         })
         .catch(error => console.log('error', error)); 
 }
 onChange(e) {

    console.log(e.target.files[0])
    this.setState({
        file: e.target.files[0]
    })

  

    var formdata = new FormData();
    formdata.append("file", e.target.files[0]);

    var requestOptions = {
        method: 'POST',
           headers: {
       
            "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0" 

        },
        body: formdata,

    };
    this.showSpinner()
    fetch(Config()['apiUrl']+'/user/uploadImg',requestOptions)
        .then(response =>{
            console.log(response)
                // if(response.status===200){
                 response.json().then(rep => {
                
                console.log(rep)
              
                    var spinner = document.getElementById("spinner");
                    spinner.className = "";
                 this.setState({
                     path:rep.path,
                   toast_blur:false
                 })

                
            }) 
            // } 
        }
       
          
        )

        .catch(error => console.log('error', error));


}


showSpinner() {

    var spinner = document.getElementById("spinner");
    this.setState({
       
        toast_blur: true,
        dis:true
    })
    // document.getElementById('main_div').disable=true
    spinner.className = "show";

}

closeblur=()=>{
    this.setState({
        toast_blur:false
    })
}

showeditpop=(id)=>{
    this.setState({
        showedit:true,
        id_edit:id
    })
}

handleCloseedit=()=>{
    this.setState({
        showedit:false
    })
}
saveedit=()=>{
    var Item={}
  
   if(this.state.path!==''){
    Item.iconUrl=this.state.path
}

if(this.state.name!==''){
     Item.packageName=this.state.name
}
if(this.state.count!==''){
    Item.count=this.state.count
}


Item.id=this.state.id_edit
    console.log(Item)
     var requestOptions = {
         method: 'PUT',
         headers: {
             'Content-Type': 'application/json',
             'Accept': '*/*',
             "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0" 
 
         },
         body:JSON.stringify(Item)
 
 
     };
 
     fetch(Config()['apiUrl'] + "/education/edit", requestOptions)
         .then(response => {
 console.log(response)
 if(response.status===200){
      response.json().then(rep => {
              console.log(rep)
 window.location.reload()
 
             })
 }
 
            
 
 
 
 
 
         })
         .catch(error => console.log('error', error)); 
}
handleClosedetail=()=>{
    this.setState({
        showdetail:false
    })
}
pay=(id)=>{
   

  

  
    var requestOptions = {
        method: 'POST',
           headers: {
       
            "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0" 

        },
      

    };
   
    fetch(Config()['apiUrl']+'/payment/deposit-request?uid='+id,requestOptions)
        .then(response =>{
            console.log(response)
                // if(response.status===200){
                 response.json().then(rep => {
                    console.log(rep)  
                if(rep.status===200){
window.location.reload()
                }
               
              
              

                
            }) 
            // } 
        }
       
          
        )

        .catch(error => console.log('error', error));

}
answer=(id)=>{
    window.localStorage.setItem('idOfUser', id)
    window.location.replace('/admin/answertouser')
}
    render() {
        return (
            <div className=' row '>
                  <div id="spinner" ></div>
                  <Snackbar open={this.state.toast_blur}  >
                    <Alert  severity={this.state.severity}>
                      فایل در حال آپلود
                    </Alert>
                </Snackbar>
                <div hidden={this.state.dis}>
     
                </div>
                 
                <>
                    <Navbar  expand="lg">
                        <Navbar.Brand href="/dashboard">
                            <img style={{width:'50px'}} alt='' src={Logo}></img>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/admin/Store">Store</Nav.Link>
                                <Nav.Link href="/admin/dashboard">Challenge</Nav.Link>
                                <Nav.Link href="/admin/education">Education</Nav.Link>
                                <Nav.Link href="/admin/deposit">Deposit</Nav.Link>
                                <Nav.Link href="/admin/setting">Setting</Nav.Link>
                                <Nav.Link href="/admin/purchase">Purchase</Nav.Link>
                                <Nav.Link href="/admin/support">Support</Nav.Link>
                                <Nav.Link href="/admin/createcode">CreateCode</Nav.Link>
                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>



                </>
       
                <div className='col-12 ' >
                    <div  >
                        <div className='row'>
                            <div className='col-12'>
                                <div style={{ display: 'flex', flexDirection: 'row-reverse', textAlign: 'right' }}>
                                    <h3 style={{ paddingRight: '40px', paddingTop: '20px' }}>پیام ها</h3>
                                </div>

                            </div>

                        </div>

                        <div className='row' style={{paddingTop:'50px'}}>
                        <div className='col-4' style={{ textAlign: 'center' }}>
                                <h6>پاسخ</h6>
                            </div>
                 
                         
                            <div className='col-4' style={{ textAlign: 'center' }}>
                                <h6>تعداد</h6>
                            </div>
                            <div className='col-4' style={{ textAlign: 'center' }}>
                                <h6>نام</h6>
                            </div>
                         
                        </div>

                         {this.state.support.map((result, i) => (
                            <div className='row'>
                                <div className='col-4' style={{ textAlign: 'center' , paddingTop: '20px', cursor:'pointer' }}>
                                <Button onClick={()=>this.answer(result.uid)}> پاسخ</Button>
                                </div>
                                <div className='col-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '20px' }}>

                         
                                    {result.count}


                                </div>
                              
                               
                                <div className='col-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '20px' }}>
                                {result.name}
                                </div>
                            </div>
                        ))} 



                    </div>

                </div>

            </div>


        )
    }
}

export default AdminAddClass