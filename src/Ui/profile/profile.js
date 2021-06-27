import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import i18n from '../../i18n'
import { Button } from 'react-bootstrap';
import 'react-tabs/style/react-tabs.css';
import Avatar from '../../photo/Useravatar.png'
import SchoolIcon from '@material-ui/icons/School';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import $ from 'jquery'
import { Config } from '../../Utils'
class dashboard extends Component {
    imgsrc
    constructor(props) {
        super(props);
        this.state = {
            height: '',
            info:{},
            name:'',
            sex:'',
            city:'',
            email:'',
            bank:'',
            profileUrl:''


        }
        
    }
    
    componentDidMount() {
        console.log(this.state.info)
        console.log(document.getElementById("tab_list").offsetHeight)

        this.setState({
            height: document.getElementById("tabpanel").offsetHeight - document.getElementById("tab_list").offsetHeight - 100
        })
       
     
// console.log(this.state.info)
    $(document).ready(function(){


        var settings = {
            "url": Config()['apiUrl'] + "/user?mobile="+localStorage.getItem('username'),
            "method": "GET",
            "timeout": 0,
     
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                "Authorization": "Basic "+ window.localStorage.getItem('basic')
    
            }
    
        };
    
        $.ajax(settings).done(function (response) {
            this.imgsrc=response.profileUrl
         
            $("#nameinp").val(response.name);
            $("#sexinp").val(response.sex);
            $("#cityinp").val(response.city);
            $("#bankinp").val(response.cardNumber);
            $("#phoneinp").val(response.mobile);
        })
           
        })



    
    }
 
    transferTohome() {
        window.location.replace('/dashboard')
    }
    changetext = (event) => {
        if (event.target.name === "name") {
            this.setState({
                name: event.target.value
            })
        }
        if (event.target.name === "sex") {
            this.setState({
                sex: event.target.value
            })
        }
        if (event.target.name === "city") {
            this.setState({
                city: event.target.value
            })
        }
        if (event.target.name === "email") {
            this.setState({
                email: event.target.value
            })
        }
        if (event.target.name === "bank") {
            this.setState({
                bank: event.target.value
            })
        }

    }
    editeProf=()=>{
        console.log("sssteppp")
        //             if (this.state.password == this.state.password1) {
        //    console.log(window.localStorage.getItem('token'))
        var User = {}
        if(this.state.name!==''){
             User.name = this.state.name  
        }
        if(this.state.sex!==''){
            User.sex = this.state.sex  
       }
       if(this.state.city!==''){
        User.city = this.state.city  
   }
   if(this.state.email!==''){
       
    User.email = this.state.email
}
if(this.state.bank!==''){
    User.bankCard = this.state.bank  
}
if(this.state.profileUrl!==''){
    User.profileId = this.state.profileUrl  
}   

console.log(User)


        fetch(Config()['apiUrl'] + "/user/edit?mobile="+localStorage.getItem('username'), {
            method: 'PUT',
            // mode:'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                "Authorization": "Basic "+ window.localStorage.getItem('basic')

            },
            body: JSON.stringify(User)
        })

            .then(response => {
              
                    response.json().then(rep => {
                  console.log(rep)
                        window.location.replace('/dashboard')



                    })
                

            });
    }
//     checkimage(){

//         setTimeout(function(){ 

//                   console.log(this.imgsrc)
// if(this.imgsrc===null)
//       return  <img alt='' style={{ width: '80px', padding: '10px' }} src={Avatar}></img>
//       else
//       return <img alt='' style={{ width: '80px', padding: '10px' }} src={this.imgsrc}></img>

//          }, 3000);
  
//     }
profileimage=(e)=>{
    console.log(e.target.files[0])
    var formdata = new FormData();
    formdata.append("file", e.target.files[0]);

    var requestOptions = {
        method: 'POST',
           headers: {
       
            "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0" 

        },
        body: formdata,

    };
  
    fetch(Config()['apiUrl']+'/user/uploadImg?mobile='+localStorage.getItem('username'),requestOptions)
        .then(response =>
            response.json().then(rep => {
                console.log(rep)
               
                
                    this.setState({
                 
                      profileUrl:rep.id,
                       
                    })
                
            })
        )

        .catch(error => console.log('error', error));
}
    render() {
        return (
            <div className='row'>
                <div className='col'>
                    <Tabs  >
                        <TabPanel style={{ top: '0', width: '100%', height: '100%' }}>
                            <div id='tabpanel' style={{ overflowY: 'auto', overflowX: 'auto',  height: '91vh' }}>
                                <div className='row'>
                                    <div className='col-12' style={{ textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20px' }}>
                                        <h3>{i18n.t('profile.page')}</h3>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12' style={{ display: "flex", justifyContent: 'center', alignItems: 'center',flexDirection:'row-reverse' }}>
                                        <h6>تصویر پروفایل</h6>
                                        <input type='file' onChange={this.profileimage}></input>
                                    </div>
                                    <div className='col-sm-12 col-md-6' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '20px',textAlign:'center' }}>
                                        <h6>{i18n.t('profile.name')}</h6>
                                        <input id='nameinp' type='text'  name='name' autoComplete='off' className='inputStyleSignup1' onChange={this.changetext} style={{textAlign:'center' }}></input>
                                    </div>
                                    <div className='col-sm-12 col-md-6' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '20px',textAlign:'center' }}>
                                        <h6>{i18n.t('profile.sex')}</h6>
                                        <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        style={{ marginRight: '20px' }}
                                                        onChange={this.changetext}
                                                        name='sex'
                                                        className='col-6'
                                                        value={this.state.typeid}>


                                                        <MenuItem value='MALE' >مرد</MenuItem>
                                                        <MenuItem value='FEMALE' >زن</MenuItem>
                                                    



                                                    </Select>
                                    </div>
                                    <div className='col-sm-12 col-md-6' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '20px' }}>
                                        <h6>{i18n.t('profile.country')}</h6>
                                        <input id='cityinp' style={{textAlign:'center' }}  name='city' autoComplete='off' className='inputStyleSignup1' onChange={this.changetext}></input>
                                    </div>
                                 
                                    <div className='col-sm-12 col-md-6' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '20px',textAlign:'center' }}>
                                        <h6>{i18n.t('profile.phone')}</h6>
                                        <input disabled={true} id='phoneinp' style={{textAlign:'center' }} name='mobile' autoComplete='off' className='inputStyleSignup1' onChange={this.changetext}></input>
                                    </div>
                                    <div className='col-sm-12 col-md-6' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '20px' }}>
                                        <h6>{i18n.t('profile.bank')}</h6>
                                        <input id='bankinp'  name='bank' style={{textAlign:'center' }} autoComplete='off' className='inputStyleSignup1' onChange={this.changetext}></input>
                                    </div>
                                    <div className='col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20px' }}>
                                        <Button onClick={this.editeProf} style={{ backgroundColor: '#909afc', width: '150px', borderColor: 'transparent', borderRadius: '10px' }}>{i18n.t('profile.save')}</Button>
                                    </div>
                                </div>



                            </div>

                        </TabPanel>



                        <TabList onClick={this.transferTohome} id='tab_list' style={{ display: 'flex', flexDirection: 'row', borderStyle: 'solid', borderColor: 'transparent', borderTopColor: 'black', position: 'fixed', bottom: '0', width: '100%' }}>
                            <Tab className='col-3' style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>
                                <HomeIcon />
                                {i18n.t('dashboard.home')}
                            </Tab>
                            <Tab className='col-2' style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>
                                <ShoppingBasketIcon />
                                {i18n.t('dashboard.store')}
                            </Tab>
                            <Tab className='col-3' style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '9px' }}>
                                <SchoolIcon />
                                {i18n.t('dashboard.items')}
                            </Tab>
                            <Tab className='col-2' style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '9px' }}>
                                <EqualizerIcon />
                                {i18n.t('dashboard.income')}
                            </Tab>
                            <Tab className='col-2' style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>
                                <HelpIcon />
                                {i18n.t('dashboard.support')}
                            </Tab>
                        </TabList>


                    </Tabs>
                </div>

            </div>
        )
    }
}
export default dashboard