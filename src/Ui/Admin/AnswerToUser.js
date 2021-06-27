import React, { Component } from 'react'

import 'react-tabs/style/react-tabs.css';

import { Button, Modal } from 'react-bootstrap';
import { Config } from '../../Utils'
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '../../photo/Icon/send.png'
class dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            height: '',
            product: [],
            show: false,
            info: {},
            showPro: false,
            list: {},
            vip: true,
            showpopupcountinue: false,
            id_product: '',
            toto: [],
            showpopupBuy: false,
            codeinvite: '',
            city: '',
            no: '',
            address: '',
            unit: '',
            province: '',
            nationalCode: '',
            postalCode: '',
            recieverName: '',
            recieverPhoneNumber: '',
            productId: '',
            amountproduct: '',
            uid: '',
            wronginvitationCode: false,
            gem: '',
            gemtype: '',
            charge: '',
            disableChargeBtn: true,
            chatHistory: [],
            que: '',
            setting:[],
            successfulCashout:false,
            weakcode:'',
            useOnlyone:false

        }
    }
    componentDidMount() {
       
        this.getChatHistory()
      
    }
  
    getChatHistory = () => {
        var requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0"

            }


        };

        fetch(Config()['apiUrl'] + "/support/admin/user-chat?uid="+window.localStorage.getItem('idOfUser'), requestOptions)
            .then(response => {



                response.json().then(rep => {
                    console.log(rep)

                    this.setState({
                        chatHistory: rep
                    })


                })





            })
            .catch(error => console.log('error', error));
    }
 
 
   
    handleClose = () => {
        this.setState({
            show: false
        })
    }
  
  
  
   
    handleCloseModal = () => {
        this.setState({
            showPro: false
        })
    }

    handleClosepopupCountinue = () => {
        this.setState({
            showpopupcountinue: false
        })
    }

   
  
    changetext = (e) => {
     
   
    
     
        if (e.target.name === 'que') {
            this.setState({
                que: e.target.value
            })
           
        }
    }
  
    ClickOnInstaIcon = () => {
        var User = {}

        User.uid = this.state.uid
        User.type = "FOLLOW_INSTAGRAM"
        var raw = JSON.stringify(User);
        console.log(raw)
        var requestOptions1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                "Authorization": "Basic " + window.localStorage.getItem('basic')
            },
            body: raw,

        };

        fetch(Config()['apiUrl'] + "/reward/earn-gem", requestOptions1)
            .then(response => {
                console.log(response)

                response.json().then(rep => {


                    console.log(rep)
                    if (rep.status === 200) {

                    }
                    window.open('https://www.instagram.com/hosna.art.home/')
                })





            })
            .catch(error => console.log('error', error));
    }
    clickOnSendIcon = () => {
 
        var requestOptions1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                "Authorization": "Basic " + window.localStorage.getItem('basic')
            },


        };

        fetch(Config()['apiUrl'] + "/support/admin/answer-user-chat?description=" + this.state.que+"&uid="+window.localStorage.getItem('idOfUser'), requestOptions1)
            .then(response => {
                console.log(response)

                response.json().then(rep => {


                    console.log(rep)
                    if (response.status === 200) {
                        window.location.reload()
                    }

                })





            })
            .catch(error => console.log('error', error));

    }
    setBackgroundColor(type) {
        if (type === "QUESTION") {
            return '#f3effe'
        }
        if (type === "ANSWER") {
            return '#6e4bd9'
        }
    }
    setFloat(type) {
        if (type === "QUESTION") {
            return 'right'
        }
        if (type === "ANSWER") {
            return 'left'
        }
    }
  
   
    checkType = (isbuy, result) => {

        if (isbuy === true) {
            return <Button style={{ width: '70px', fontSize: '12px' , marginLeft:'15px'}} onClick={() => this.getLink(result)}>مشاهده</Button>
        }
        else {
            return <Button style={{ width: '50px', fontSize: '12px', marginLeft:'15px' }} onClick={() => this.BuyTutorial(result)}>خرید</Button>
        }
    }
    SendQuestion=(e)=>{
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
      
        fetch(Config()['apiUrl']+'/user/uploadImg',requestOptions)
            .then(response =>{
                  if(response.status===200){
                           response.json().then(rep => {
                    console.log(rep.path)
                    var requestOptions1 = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': '*/*',
                            "Authorization": "Basic " + window.localStorage.getItem('basic')
                        },
            
            
                    };
            
                    fetch(Config()['apiUrl'] + "/support?file=" + rep.path, requestOptions1)
                        .then(response => {
                            console.log(response)
            
                            response.json().then(rep => {
            
            
                                console.log(rep)
                                if (response.status === 200) {
                                    window.location.reload()
                                }
            
                            })
            
            
            
            
            
                        })
                        .catch(error => console.log('error', error));
                    
                      
                    
                })
                }
            }
              
         
            )
    
            .catch(error => console.log('error', error));
    }
  
    checkimage(res,type){
        console.log(res)
        if(type==="QUESTION"){
 if( res==="null"){
            //<img alt='' src={result.downloadUri} style={{width:'0',height:this.checkimage(result.downloadUri)}}></img>
        }
        if( res!=="null"){
            return <img alt='' src={res} style={{width:'100%',height:'100%'}}></img>
        }
        }
        else{
            if(res===null ){
                //<img alt='' src={result.downloadUri} style={{width:'0',height:this.checkimage(result.downloadUri)}}></img>
            }
            if(res!==null ){
                return <img alt='' src={res} style={{width:'100%',height:'100%'}}></img>
            }
        }
       
    }

    render() {
        return (
            <div className='row'>
    
           
    <div className='col-3'  onClick={()=>window.location.replace('/admin/dashboard')}><HomeIcon style={{width:'50px', height:'50px',cursor:'pointer'}}/></div>
      
                <div className='col'>
      
                  

                                
                               
                                    {this.state.chatHistory.map((result, i) => (

                                        <div className='row' style={{ display: 'flex', flexDirection: 'column' }}>

                                            <div className='col-12' >
                                                <div style={{ width: '200px', height: '80px', backgroundColor: this.setBackgroundColor(result.supportType), borderRadius: '15px', float: this.setFloat(result.supportType), marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                   {this.checkimage(result.downloadUri,result.supportType)}
                                                    {result.description}
                                                </div>
                                            </div>

                                        </div>

                                    ))}




                                <div className='row' >
                                    <div className='col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20px' }}>
                                        
                                        <input name='que' onChange={this.changetext} style={{ width: '80%', borderRadius: '10px', height: '40px', borderStyle: 'solid', borderColor: 'transparent', backgroundColor: '#f3effe' }}></input>
                                        <img src={SendIcon} alt='' style={{ width: '30px', marginLeft: '10px', cursor: 'pointer' }} onClick={this.clickOnSendIcon}></img>
                                    </div>


                                </div>
                            </div>

                 

                 
             
                </div>

          
        )
    }
}
export default dashboard