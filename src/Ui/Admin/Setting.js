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
        this.getSetting()
    }
  
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            cost: '',
            size: '',
count:'',
            setting: [],
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
listDetail:[],
homeimage:'',
storeimage:'',
toturialimage:''
        }
    }
    getSetting() {
        var requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0"

            }


        };

        fetch(Config()['apiUrl'] + "/support/setting", requestOptions)
            .then(response => {



                response.json().then(rep => {
                    console.log(rep)

                    this.setState({
                        setting: rep
                    })


                })





            })
            .catch(error => console.log('error', error));
    }

    changetext = (event) => {

        if (event.target.name === "description") {
            this.setState({
                description: event.target.value
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
 Item.homeText=this.state.description
 Item.homeImage=this.state.homeimage
 Item.storeImage=this.state.storeimage
 Item.toturialImage=this.state.toturialimage
 
     var requestOptions = {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             'Accept': '*/*',
             "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0" 
 
         },
         body:JSON.stringify(Item)
 
 
     };
 
     fetch(Config()['apiUrl'] + "/support/set-setting", requestOptions)
         .then(response => {
 

 if(response.status===200){
     response.json().then(rep => {
         console.log(rep)
 window.location.reload()
             })
 }
             
 
 
 
 
 
         })
         .catch(error => console.log('error', error)); 
 }
 onChange1(e) {

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
    fetch(Config()['apiUrl']+'/user/uploadImg?mobile='+window.localStorage.getItem('username'),requestOptions)
        .then(response =>{
            console.log(response)
                // if(response.status===200){
                 response.json().then(rep => {
                
                console.log(rep)
              
                    var spinner = document.getElementById("spinner");
                    spinner.className = "";
                 this.setState({
                     homeimage:rep.path,
                   toast_blur:false
                 })

                
            }) 
            // } 
        }
       
          
        )

        .catch(error => console.log('error', error));


}
onChange2(e) {

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
    fetch(Config()['apiUrl']+'/user/uploadImg?mobile='+window.localStorage.getItem('username'),requestOptions)
        .then(response =>{
            console.log(response)
                // if(response.status===200){
                 response.json().then(rep => {
                
                console.log(rep)
              
                    var spinner = document.getElementById("spinner");
                    spinner.className = "";
                 this.setState({
                     storeimage:rep.path,
                   toast_blur:false
                 })

                
            }) 
            // } 
        }
       
          
        )

        .catch(error => console.log('error', error));


}

onChange3(e) {

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
    fetch(Config()['apiUrl']+'/user/uploadImg?mobile='+window.localStorage.getItem('username'),requestOptions)
        .then(response =>{
            console.log(response)
                // if(response.status===200){
                 response.json().then(rep => {
                
                console.log(rep)
              
                    var spinner = document.getElementById("spinner");
                    spinner.className = "";
                 this.setState({
                     toturialimage:rep.path,
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

handleClosedetail=()=>{
    this.setState({
        showdetail:false
    })
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
                                    <h3 style={{ paddingRight: '40px', paddingTop: '20px' }}>اضافه کردن متن اول سایت</h3>
                                </div>

                            </div>

                        </div>


                        <div className='row' >
                            <div className='col-12' style={{ textAlign: 'right' }}>
                                <div className='row' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div className='col-11'>
                                        <div className='content' style={{ marginTop: '50px' }}>

                                 


                                        <div class='row row1'  >
                                                <div class='col-12 ' style={{ margin: '0px', marginTop: '10px', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                                                    <div>

                                                       عکس صفحه اصلی
                                                    </div>
                                                </div>

                                            </div>
                                            <div class='row row1'  >
                                                <div class='col-12 ' style={{ margin: '0px', marginTop: '10px', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                                                    <div>

                                                    
                                                            <input type="file" id="file" onChange={(e) => this.onChange1(e)} />

                                                      
                                                    </div>
                                                </div>

                                            </div>
                                            <div class='row row1'  >
                                                <div class='col-12 ' style={{ margin: '0px', marginTop: '10px', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                                                    <div>

                                                       عکس صفحه فروشگاه
                                                    </div>
                                                </div>

                                            </div>
                                            <div class='row row1'  >
                                                <div class='col-12 ' style={{ margin: '0px', marginTop: '10px', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                                                    <div>

                                                      
                                                            <input type="file" id="file" onChange={(e) => this.onChange2(e)} />

                                                       
                                                    </div>
                                                </div>

                                            </div>
                                  
                                            <div class='row row1'  >
                                                <div class='col-12 ' style={{ margin: '0px', marginTop: '10px', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                                                    <div>

                                                       عکس صفحه محصولات آموزشی
                                                    </div>
                                                </div>

                                            </div>
                                            <div class='row row1'  >
                                                <div class='col-12 ' style={{ margin: '0px', marginTop: '10px', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                                                    <div>

                                                       
                                                            <input type="file" id="file" onChange={(e) => this.onChange3(e)} />

                                                    </div>
                                                </div>

                                            </div>
                                  
                                            <div class='row row1' style={{ paddingTop: '36vh' }} >
                                                <div class='col-12 ' >

                                                    <h6 style={{ textAlign: 'right', paddingRight: '50px' }}>متن</h6>
                                                    <textarea name='description' onChange={this.changetext} className='col-10' style={{ textAlign: 'right', marginRight: '50px', backgroundColor: 'rgb(127, 127, 127,0.1)', height: '180px', borderColor: 'transparent' }}></textarea>
                                                </div>




                                            </div>



                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class='row' style={{ marginTop: '50px', marginBottom: '50px' }} >
                            <div class='col-12 ' style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }} >
                                <Button onClick={this.last_submit} style={{ backgroundColor: '#4ce285', border: 'transparent', width: '150px', height: '50px', color: 'black', borderRadius: '10px' }}>اضافه کردن</Button>

                            </div>




                        </div>
                
   
                        <div className='row'>
                            <div className='col-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '20px' }}>

{/* <img alt='' style={{ width: '80px' }} src={result.imageUrl}></img> */}

{/* {result.price + ' T'} */}
<h6 style={{width:'100%'}} > Store Image</h6>


</div>
<div className='col-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '20px' }}>

{/* <img alt='' style={{ width: '80px' }} src={result.imageUrl}></img> */}

{/* {result.price + ' T'} */}
<h6 style={{width:'100%'}} > Toturial Image</h6>


</div>
                                <div className='col-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '20px' }}>

                                    {/* <img alt='' style={{ width: '80px' }} src={result.imageUrl}></img> */}

                                    {/* {result.price + ' T'} */}
                                    <h6 style={{width:'100%'}} > Home Image</h6>


                                </div>
                              
                                <div className='col-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '20px' }}>
                                <h6 style={{width:'100%'}} >  Home text</h6>
                                </div>
                            </div>
                       

                            <div className='row'>
                            <div className='col-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '20px' }}>

{/* <img alt='' style={{ width: '80px' }} src={result.imageUrl}></img> */}

{/* {result.price + ' T'} */}
<img style={{width:'100%'}} src={this.state.setting.storeImage} alt=''></img>


</div>
<div className='col-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '20px' }}>

{/* <img alt='' style={{ width: '80px' }} src={result.imageUrl}></img> */}

{/* {result.price + ' T'} */}
<img style={{width:'100%'}} src={this.state.setting.toturialImage} alt=''></img>


</div>
                                <div className='col-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '20px' }}>

                                    {/* <img alt='' style={{ width: '80px' }} src={result.imageUrl}></img> */}

                                    {/* {result.price + ' T'} */}
                                   <img style={{width:'100%'}} src={this.state.setting.homeImage} alt=''></img>


                                </div>
                              
                                <div className='col-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '20px' }}>
                               {this.state.setting.homeText}
                                </div>
                            </div>
                       



                    </div>

                </div>

            </div>


        )
    }
}

export default AdminAddClass