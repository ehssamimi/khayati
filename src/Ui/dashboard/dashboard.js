import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import i18n from '../../i18n'
import crown from '../../photo/crown.png'
import 'react-tabs/style/react-tabs.css';
import Avatar from '../../photo/Useravatar.png'
import TitlePic from '../../photo/pic.png'
import MoreShop from '../../photo/بیشترین خرید.png'
import SchoolIcon from '@material-ui/icons/School';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Boy from '../../photo/pic1.png'
import { Button, Modal } from 'react-bootstrap';
import { Config } from '../../Utils'
import './dashboard.css'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import insta from '../../photo/F.I.T/instagram.png'
import StopIcon from '@material-ui/icons/Stop';
import Bascket from '../../photo/basket.png'
import ShopBoy from '../../photo/pic 3.png'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'
import ChatImg from '../../photo/pic 4.png'
import TeleIcon from '../../photo/F.I.T/telg.png'
import SendIcon from '../../photo/Icon/send.png'
import ShopImg from '../../photo/shopImage.jpeg'
import Countdown from "react-countdown";
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
            city: null,
            no: null,
            address: null,
            unit: null,
            province: '',
            nationalCode: null,
            postalCode: null,
            recieverName: '',
            recieverPhoneNumber: '',
            productId: '',
            amountproduct: '',
            uid: '',
            wronginvitationCode: false,
            wrongUser:false,
            SelfCode:false,
            gem: '',
            gemtype: null,
            charge: '',
            disableChargeBtn: true,
            chatHistory: [],
            que: '',
            setting:[],
            successfulCashout:false,
            weakcode:'',
            useOnlyone:false,
            showTimer:false,
            timeExp:'',
            badreq:false

        }
    }
    componentDidMount() {
console.log("props.params.match")
console.log(this.props.match.params.status)

// localStorage.clear()
        this.setState({
            height: document.getElementById("tabpanel").offsetHeight
        })
        console.log(window.localStorage.getItem('password'))
        var basicAuth = Buffer.from(window.localStorage.getItem('username') + ":" + window.localStorage.getItem('password')).toString('base64')
        window.localStorage.setItem('basic', basicAuth)
        console.log(basicAuth)
        var sp = document.getElementById("tab_list");

        console.log(sp.offsetTop)
        this.getCategory()
        this.getInfo()
        this.getProduct()

       
        this.getChatHistory()
        this.getSetting()
    }
    getSetting(){
        var requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                // "Authorization": "Basic " + window.localStorage.getItem('basic')

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
    getChatHistory = () => {
        var requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                // "Authorization": "Basic " + window.localStorage.getItem('basic')

            }


        };

        fetch(Config()['apiUrl'] + "/support?mobile="+window.localStorage.getItem('username'), requestOptions)
            .then(response => {


if(response.status===500){
    window.location.replace('/')
    localStorage.clear()
}
                response.json().then(rep => {
                    console.log(rep)

                    this.setState({
                        chatHistory: rep
                    })


                })





            })
            .catch(error => console.log('error', error));
    }
    getToto() {
        var requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                // "Authorization": "Basic " + window.localStorage.getItem('basic')

            }


        };

        fetch(Config()['apiUrl'] + "/premiumTutorial?uid=" + this.state.uid, requestOptions)
            .then(response => {



                response.json().then(rep => {
                    console.log(rep)

                    this.setState({
                        toto: rep
                    })


                })





            })
            .catch(error => console.log('error', error));
    }
    getProduct() {
        var requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                // "Authorization": "Basic " + window.localStorage.getItem('basic')

            }


        };

        fetch(Config()['apiUrl'] + "/product", requestOptions)
            .then(response => {



                response.json().then(rep => {
                    console.log(rep)

                    this.setState({
                        product: rep
                    })


                })





            })
            .catch(error => console.log('error', error));
    }
    getInfo() {
        var requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                // "Authorization": "Basic " + window.localStorage.getItem('basic')

            }


        };

        fetch(Config()['apiUrl'] + "/user?mobile="+window.localStorage.getItem('username'), requestOptions)
            .then(response => {



                response.json().then(rep => {
             
                    console.log(nowtime)
                    console.log(rep)
                    window.localStorage.setItem('info', JSON.stringify(rep))
                    if (rep.gem >= 100) {
                        this.setState({
                            gemtype: 'TEN_PERCENT'
                        })
                    }
                    if (rep.charge >= 2000000) {
                        this.setState({
                            disableChargeBtn: false
                        })
                    }
                    this.setState({
                        vip: rep.vip,
                        info: rep,
                        uid: rep.id,
                        gem: rep.gem,
                        charge: rep.charge
                    })
                    var unix = new Date(rep.endOfTrial).valueOf()
                    var nowtime = Date.now() 
                    
                    
                
                    if(unix >= nowtime){
                       
                        this.setState({
                            vip:true,
                            showTimer:true,
                            timeExp:rep.endOfTrial
                        })
                    }
                    this.getToto()

                })





            })
            .catch(error => console.log('error', error));
    }

    getCategory() {


        var requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                // "Authorization": "Basic " + window.localStorage.getItem('basic')

            }


        };

        fetch(Config()['apiUrl'] + "/education", requestOptions)
            .then(response => {


if(response.status===401){
window.location.replace('/')
window.localStorage.clear()
}
    

else{
      response.json().then(rep => {
                    this.setState({
                        category: rep
                    })


                })
}
              





            })
            .catch(error => console.log('error', error));
    }
    transfer() {
        window.location.replace('/dashboard/profile')
    }
    handleClose = () => {
        this.setState({
            show: false
        })
    }
    clickOnCourse = (id) => {
        window.localStorage.setItem('id_course', id)
        console.log(id)

        this.setState({
            show: true
        })


    }
    transferTocourse = (level) => {
        window.localStorage.setItem('level', level)
        window.location.replace('/dashboard/course')
    }
    clickOnproduct = (list) => {
         console.log(list)

        this.setState({
            list: list,
            showPro: true,
            productId: list.id,
            amountproduct: list.price
        })
    }
    transferTocompelete = (id) => {
        this.setState({
            id_product: id,
            showpopupcountinue: true,
            showPro: false
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
    Buyproduct = () => {
        var User = {}
        User.address = this.state.address
        User.city = this.state.city
        User.nationalCode = this.state.nationalCode
        User.no = this.state.no
        User.postalCode = this.state.postalCode
        User.productId = this.state.productId
        User.recieverName = this.state.recieverName
        User.recieverPhoneNumber = this.state.recieverPhoneNumber
        User.unit = this.state.unit
        User.province = this.state.province
        User.useGemType = this.state.gemtype===null?"NOTHING":this.state.gemtype

        // var raw = JSON.stringify(User);
        var purchaseAddress =  User ;

        console.log(purchaseAddress)
if(this.state.address===null || this.state.city===null || this.state.nationalCode===null  || this.state.no===null){
this.setState({badreq:true})
}
else{

        var User = {}
        User.invitationCode = ''
        User.uid = this.state.uid
        User.amount = this.state.amountproduct

        if (this.state.gemtype === 'TEN_PERCENT') {
            User.amount = this.state.amountproduct * 0.9
        }
        if (this.state.gemtype === 'TWENTY_PERCENT') {
            User.amount = this.state.amountproduct * 0.8
        }
         // User.amount = this.state.amountproduct * 0.1

        User.amount=User.amount+'0'

        var raw = JSON.stringify(User);
        console.log(raw)
        var requestOptions1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                // "Authorization": "Basic " + window.localStorage.getItem('basic')
            },
            body: raw,

        };

        fetch(Config()['apiUrl'] + "/payment/pay/web", requestOptions1)
            .then(   response => {

                response.json().then(async rep => {
                    console.log( rep)

                     if (rep.status === 200) {
                         purchaseAddress.transactionId=rep.transactionId
                       await localStorage.setItem("purchaseAddress",JSON.stringify(purchaseAddress))
                        window.location.replace(rep.Authority)
                    }

                })





            })
            .catch(error => console.log('error', error));



    // var requestOptions1 = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': '*/*',
    //         // "Authorization": "Basic " + window.localStorage.getItem('basic')
    //     },
    //     body: raw,
    //
    // };
    //
    //
    //
    //     fetch(Config()['apiUrl'] + "/product/purchase", requestOptions1)
    //         .then(response => {
    //             console.log(response)
    //
    //         })
    //         .catch(error => console.log('error', error));
}
      
    }
    BuyTutorial = (res) => {
        var User = {}
        User.invitationCode = ''
        User.uid = this.state.uid
        User.amount = res.price+'0'
        User.productId=''
        User.premiumToturialId = res.id
        User.useGemType='NOTHING'
        var raw = JSON.stringify(User);
        console.log(raw)
        var requestOptions1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                // "Authorization": "Basic " + window.localStorage.getItem('basic')
            },
            body: raw,

        };

        fetch(Config()['apiUrl'] + "/payment/pay/web", requestOptions1)
            .then(response => {
                console.log(response)

                response.json().then(rep => {


                    if (response.status === 200) {
                        window.location.replace(rep.Authority)
                    }




                })





            })
            .catch(error => console.log('error', error));
    }
    PayVip = () => {
        this.setState({
            showpopupBuy: true
        })
    }
    handleClosepopupBuy = () => {
        this.setState({
            showpopupBuy: false
        })

    }
    pay = () => {

        var User = {}
        User.invitationCode = this.state.codeinvite
        User.uid = this.state.uid
        // User.premiumToturialId = 0
        // User.productId = 0
        // User.useGemType = "TEN_PERCENT"

        if (this.state.codeinvite === '') {
            User.amount = 3500000
        }
        else {
            User.amount = 3500000
        }
        //
        // {
        //
        //
        //     "premiumToturialId": 0,
        //     "productId": 0,
        //     "uid": 0,
        //     "useGemType": "TEN_PERCENT"
        // }



        var raw = JSON.stringify(User);
        console.log(raw)
        var requestOptions1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                // "Authorization": "Basic " + window.localStorage.getItem('basic')
            },
            body: raw,

        };

        // fetch(Config()['apiUrl'] + "/payment/pay/web", requestOptions1)
        fetch(Config()['apiUrl'] + "/payment/pay/web", requestOptions1)
            .then(response => {
                console.log(response)

                response.json().then(repAuth => {


                    console.log(repAuth)
                    if (repAuth.status === 403  ){
                        this.setState({
                            wronginvitationCode: true
                        })
                    }
                        if(repAuth.message === 'invalid invitation code'  ){
                            this.setState({
                                wronginvitationCode: true
                            })
                        }else if (repAuth.message === 'you used invitation code before'  ){
                            this.setState({
                                useOnlyone: true
                            })}

                        else if (repAuth.message === 'user not found'  ){
                            this.setState({
                                wrongUser: true
                            })}else if (repAuth.message === 'this code is belong to you'  ){
                            this.setState({
                                SelfCode: true
                            })}else if (repAuth.message === 'successfull'){
                            window.location.href =repAuth.authority;

                        }else if(repAuth.status===500){
                            this.setState({
                                wronginvitationCode: true
                            })
                        }







                    // if (repAuth.status === 200) {
                    //     var User = {}
                    //     User.invitationCode = this.state.codeinvite
                    //     User.uid = this.state.uid
                    //     User.type = "INVITATION_CODE"
                    //     var raw = JSON.stringify(User);
                    //     console.log(raw)
                    //     var requestOptions1 = {
                    //         method: 'POST',
                    //         headers: {
                    //             'Content-Type': 'application/json',
                    //             'Accept': '*/*',
                    //             // "Authorization": "Basic " + window.localStorage.getItem('basic')
                    //         },
                    //         body: raw,
                    //
                    //     };
                    //
                    //     fetch(Config()['apiUrl'] + "/reward/earn-gem", requestOptions1)
                    //         .then(response => {
                    //             console.log(response)
                    //             if (response.status === 200) {
                    //                 response.json().then(rep => {
                    //
                    //
                    //                     console.log(rep)
                    //
                    //                     window.location.replace(repAuth.Authority)
                    //
                    //
                    //                 })
                    //             }
                    //
                    //
                    //
                    //
                    //
                    //
                    //         })
                    //         .catch(error => console.log('error', error));
                    //
                    // }

                })





            })
            .catch(error => console.log('error', error));


    }
    changetext = (e) => {
        if (e.target.name === 'weakcode') {
            this.setState({
                weakcode: e.target.value
            })
        }
        if (e.target.name === 'invitationCode') {
            this.setState({
                codeinvite: e.target.value
            })
        }
        if (e.target.name === 'codemelli') {
            this.setState({
                nationalCode: e.target.value
            })
        }
        if (e.target.name === 'name') {
            this.setState({
                recieverName: e.target.value
            })
        }
        if (e.target.name === 'ostan') {
            this.setState({
                province: e.target.value
            })
        }
        if (e.target.name === 'city') {
            this.setState({
                city: e.target.value
            })
        }
        if (e.target.name === 'address') {
            this.setState({
                address: e.target.value
            })
        }
        if (e.target.name === 'codeposti') {
            this.setState({
                postalCode: e.target.value
            })
        }
        if (e.target.name === 'vahed') {
            this.setState({
                unit: e.target.value
            })
        }
        if (e.target.name === 'pelak') {
            this.setState({
                no: e.target.value
            })
        }
        if (e.target.name === 'phoneN') {
            this.setState({
                recieverPhoneNumber: e.target.value
            })
        }
        if (e.target.name === 'que') {
            this.setState({
                que: e.target.value
            })
            console.log('queeeeee')
        }
    }
    closewronginvitationCode = () => {
        this.setState({
            wronginvitationCode: false
        })
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
                // "Authorization": "Basic " + window.localStorage.getItem('basic')
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

    ClickOnTelegramIcon = () => {
        var User = {}

        User.uid = this.state.uid
        User.type = "FOLLOW_TELEGRAM_CHANNEL"
        var raw = JSON.stringify(User);
        console.log(raw)
        var requestOptions1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                // "Authorization": "Basic " + window.localStorage.getItem('basic')
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
                    window.open('https://t.me/hosnaarthome')
                })





            })
            .catch(error => console.log('error', error));
    }
    returnOption() {

        if (this.state.gem >= 100 && this.state.gem < 150) {

            return <option value="TEN_PERCENT">تخفیف ۱۰ درصدی</option>
        }
        if (this.state.gem >= 150 && this.state.gem < 200) {


            return [
                <option value="TEN_PERCENT">تخفیف ۱۰ درصدی</option>,
                <option value="TWENTY_PERCENT">تخفیف ۲۰ درصدی</option>,

            ]
        }
        if (this.state.gem >= 200) {

            return [
                <option value="TEN_PERCENT">تخفیف ۱۰ درصدی</option>,
                <option value="TWENTY_PERCENT">تخفیف ۲۰ درصدی</option>,
                <option value="FREE_SHIPPING">ارسال رایگان</option>
            ]
        }
    }
    usegem = (e) => {
        this.setState({
            gemtype: e.target.value
        })
        console.log(e.target.value)
    }
    getCharge = () => {

        var requestOptions1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                // "Authorization": "Basic " + window.localStorage.getItem('basic')
            },


        };

        fetch(Config()['apiUrl'] + "/payment/deposit-request?uid=" + this.state.uid, requestOptions1)
            .then(response => {
                console.log(response)

                response.json().then(rep => {


                    console.log(rep)
                    if (rep.status === 200) {
                        this.setState({successfulCashout:true})
                        setTimeout(function(){ 
                            window.location.reload()
                         }, 5000);
                        
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
    //     scrollTopFunc(){
    //         var element=document.getElementById("idofdiv")
    //                 if(element!==null){
    //  setTimeout(function () {
    //                     var element=document.getElementById("idofdiv")
    //                     console.log(element)
    //                     element.scrollTop = element.scrollHeight;
    //                 }, 1000);
    //                 }


    //         // 



    //     }
    clickOnSendIcon = () => {
        var User = {}

        User.uid = this.state.uid
        User.type = "FOLLOW_TELEGRAM_CHANNEL"
        var raw = JSON.stringify(User);
        console.log(raw)
        var requestOptions1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                // "Authorization": "Basic " + window.localStorage.getItem('basic')
            },


        };

        fetch(Config()['apiUrl'] + "/support?description=" + this.state.que+"&file=null&mobile="+localStorage.getItem('username'), requestOptions1)
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
    click() {

        var element = document.getElementById("idofdiv")
        if (element !== null) {

            element.scrollTop = element.scrollHeight;
        }

    }
    checkType = (isbuy, result) => {
if(result.price===0){
    return <Button style={{ width: '70px', fontSize: '12px' , marginLeft:'15px'}} onClick={() => this.getLink(result)}>مشاهده </Button>
}
else{
       if (isbuy === true) {
            return <Button style={{ width: '70px', fontSize: '12px' , marginLeft:'15px'}} onClick={() => this.getLink(result)}>مشاهده</Button>
        }
        else {
            return <Button style={{ width: '50px', fontSize: '12px', marginLeft:'15px' }} onClick={() => this.BuyTutorial(result)}>خرید</Button>
        }

}
     
    }
    getLink=(res)=>{
window.open(res.videoZipAddress)
    }
    SendQuestion=(e)=>{
        console.log(e.target.files[0])
        var formdata = new FormData();
        formdata.append("file", e.target.files[0]);
    
        var requestOptions = {
            method: 'POST',
               headers: {
           
                // "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0" 
    
            },
            body: formdata,
    
        };
      
        fetch(Config()['apiUrl']+'/user/uploadImg?mobile='+window.localStorage.getItem('username'),requestOptions)
            .then(response =>{
                  if(response.status===200){
                           response.json().then(rep => {
                    console.log(rep.path)
                    var requestOptions1 = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': '*/*',
                            // "Authorization": "Basic " + window.localStorage.getItem('basic')
                        },
            
            
                    };
            
                    fetch(Config()['apiUrl'] + "/support?file=" + rep.path+"&mobile="+localStorage.getItem('username'), requestOptions1)
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
    onError(){
        console.log('dd')
    }
    checkimage(res,type){
        // console.log(res)
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
    submitcode=()=>{
   
        var requestOptions1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                "Authorization": "Basic " + window.localStorage.getItem('basic')
            },
           

        };

        fetch(Config()['apiUrl'] + "/trial/use-trial-code?code="+this.state.weakcode+"&uid="+this.state.uid, requestOptions1)
            .then(response => {
                console.log(response)

                response.json().then(rep => {
                console.log(rep)

                    if (rep.status === 200) {
                       window.location.reload()
                    }
                    if(rep.status===403){
                    this.setState({
                     wronginvitationCode:true
                        })
                    }
                    if(rep.status===404){
                        this.setState({
                            useOnlyone:true
                        })
                                            }



                })





            })
            .catch(error => console.log('error', error));
    }
    checkprice=(price)=>{
        if(price===0)
        return "رایگان"
        else
        return price+" T " 

    }
    render() {
        return (
            <div className='row'>
                  <Snackbar open={this.state.badreq} autoHideDuration={6000} onClose={()=>this.setState({badreq:false})}>
                    <Alert onClose={()=>this.setState({badreq:false})} severity={this.state.severity}>
                        تمامی موارد باید پر باشد
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.wronginvitationCode} autoHideDuration={6000} onClose={this.closewronginvitationCode}>
                    <Alert onClose={this.closewronginvitationCode} severity={this.state.severity}>
                        کد نا معتبر
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.useOnlyone} autoHideDuration={6000} onClose={()=>this.setState({useOnlyone:false})}>
                    <Alert onClose={()=>this.setState({useOnlyone:false})} severity={this.state.severity}>
                        یکبار استفاده کردید
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.wrongUser} autoHideDuration={6000} onClose={()=>this.setState({wrongUser:false})}>
                    <Alert onClose={()=>this.setState({wrongUser:false})} severity={this.state.severity}>
                        کاربری با این آیدی یافت نشد
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.SelfCode} autoHideDuration={6000} onClose={()=>this.setState({SelfCode:false})}>
                    <Alert onClose={()=>this.setState({SelfCode:false})} severity={this.state.severity}>
                      !! این کد متعلق به خود شماست
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.successfulCashout} autoHideDuration={6000} onClose={()=>this.setState({successfulCashout:false})}>
                    <Alert style={{textAlign:'right'}} onClose={()=>this.setState({successfulCashout:false})} >
                       درخواست شما با موفقیت ثبت شد . طی روز ای آینده به حساب شما واریز خواهد شد
                    </Alert>
                </Snackbar>
                <Modal size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered show={this.state.showPro} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton={this.handleCloseModal}>

                    </Modal.Header>
                    <Modal.Body >
                        <div className='row' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='col-12' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img alt='' style={{ width: '250px' }} src={this.state.list.imageUrl}></img>
                            </div>
                            <div className='col-6' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h6 style={{ textAlign: 'center' }}>{this.state.list.size}</h6>
                            </div>
                            <div className='col-6' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h6 style={{ textAlign: 'center' }}> {this.state.list.name}</h6>
                            </div>
                            <div className='col-6' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h6 style={{ textAlign: 'center', paddingTop: '5px' }}>{this.state.list.material}</h6>

                            </div>
                            <div className='col-6' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h6 style={{ paddingRight: '10px', paddingTop: '5px', textAlign: 'center' }}>جنس</h6>
                                <StopIcon />
                            </div>
                            <div className='col-6' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h6 style={{ textAlign: 'center', paddingTop: '5px' }}>{this.state.list.color}</h6>

                            </div>
                            <div className='col-6' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h6 style={{ paddingRight: '10px', paddingTop: '5px', textAlign: 'center' }}>رنگ</h6>
                                <StopIcon />
                            </div>
                            <div className='col-6' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h6 style={{ textAlign: 'center', paddingTop: '5px' }}>{this.state.list.size}</h6>

                            </div>
                            <div className='col-6' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h6 style={{ paddingRight: '10px', paddingTop: '5px', textAlign: 'center' }}>سایز</h6>
                                <StopIcon />
                            </div>
                            <div className='col-6' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h6 style={{ textAlign: 'center', paddingTop: '5px' }}>{this.state.list.price}</h6>

                            </div>
                            <div className='col-6' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h6 style={{ paddingRight: '10px', paddingTop: '5px', textAlign: 'center' }}>قیمت</h6>
                                <StopIcon />
                            </div>
                            <div className='col-12' style={{ paddingTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button onClick={() => this.transferTocompelete(this.state.list.id)} style={{ backgroundColor: '#909afc', width: '200px', color: 'white', borderColor: 'transparent', height: '50px', borderRadius: '10px' }}>ادامه</Button>
                            </div>
                        </div>

                    </Modal.Body>

                </Modal>

                <Modal size="md" hidden={this.state.vip}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header onHide={this.handleClose}>

                    </Modal.Header>
                    <Modal.Body >
                        <div className='row' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='col-12' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h6 style={{ color: 'black', borderColor: 'transparent', cursor: 'pointer' }}>ابتدا حساب کاربری ویژه را بخرید</h6>
                            </div>

                        </div>

                    </Modal.Body>

                </Modal>

                <Modal size="md" hidden={!this.state.vip}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton={this.handleClose}>
                        <img alt='' style={{ width: '150px', position: 'absolute', marginTop: '-80px', marginLeft: '30%' }} src={Boy}></img>
                    </Modal.Header>
                    <Modal.Body >
                        <div className='row' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='col-12' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button onClick={() => this.transferTocourse("BEGINNER")} style={{ backgroundColor: '#e3e2f2', width: '200px', color: 'black', borderColor: 'transparent' }}>{i18n.t('dashboard.easy')}</Button>
                            </div>
                            <div className='col-12' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button onClick={() => this.transferTocourse("MEDIUM")} style={{ backgroundColor: '#e3e2f2', width: '200px', color: 'black', borderColor: 'transparent' }}>{i18n.t('dashboard.meduim')}</Button>
                            </div>
                            <div className='col-12' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button onClick={() => this.transferTocourse("ADVANCED")} style={{ backgroundColor: '#e3e2f2', width: '200px', color: 'black', borderColor: 'transparent' }}>{i18n.t('dashboard.hard')}</Button>
                            </div>
                        </div>

                    </Modal.Body>

                </Modal>
                <Modal size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered show={this.state.showpopupcountinue} onHide={this.handleClosepopupCountinue}>
                    <Modal.Header closeButton={this.handleClosepopupCountinue}>

                    </Modal.Header>
                    <Modal.Body >
                        <div className='row' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='col-12' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img alt='' src={Bascket} style={{ width: '160px' }}></img>
                            </div>
                            <div className='col-6' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <h6>کد ملی گیرنده</h6>
                                <input onChange={this.changetext} name='codemelli' style={{ width: '100%', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '50px', paddingRight: '10px' }} className='inputAdd'></input>
                            </div>
                            <div className='col-6' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <h6>نام گیرنده</h6>
                                <input onChange={this.changetext} name='name' style={{ width: '100%', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '50px', paddingRight: '10px' }} className='inputAdd'></input>

                            </div>
                            <div className='col-6' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <h6>استان</h6>
                                <input onChange={this.changetext} name='ostan' style={{ width: '100%', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '50px', paddingRight: '10px' }} className='inputAdd'></input>
                            </div>
                            <div className='col-6' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <h6>شهر</h6>
                                <input onChange={this.changetext} name='city' style={{ width: '100%', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '50px', paddingRight: '10px' }} className='inputAdd'></input>

                            </div>
                            <div className='col-12' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'right' }}>
                                <h6>نشانی</h6>
                                <input onChange={this.changetext} name='address' style={{ width: '100%', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '50px', paddingRight: '10px' }} className='inputAdd'></input>

                            </div>
                            <div className='col-5' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <h6>کد پستی</h6>
                                <input onChange={this.changetext} name='codeposti' style={{ width: '100%', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '50px', paddingRight: '10px' }} ></input>

                            </div>
                            <div className='col-3' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <h6>واحد</h6>
                                <input onChange={this.changetext} name='vahed' style={{ width: '100%', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '50px', paddingRight: '10px' }} className='inputAdd'></input>

                            </div>
                            <div className='col-4' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <h6>پلاک</h6>
                                <input onChange={this.changetext} name='pelak' style={{ width: '100%', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '50px', paddingRight: '10px' }} className='inputAdd'></input>

                            </div>
                            <div className='col-4' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                            </div>
                            <div className='col-8' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <h6>شماره تماس گیرنده</h6>
                                <input onChange={this.changetext} name='phoneN' style={{ width: '100%', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '50px', paddingRight: '10px' }} className='inputAdd'></input>

                            </div>
                            <div className='col-6' style={{ paddingTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', textAlign: 'right' }}>

                                <select onChange={this.usegem} name="cars" id="cars">
                                    {this.returnOption()}

                                </select>
                            </div>
                            <div className='col-12' style={{ paddingTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button onClick={() => this.Buyproduct()} style={{ backgroundColor: '#909afc', width: '200px', color: 'white', borderColor: 'transparent', height: '50px', borderRadius: '10px' }}>پرداخت</Button>
                            </div>

                        </div>

                    </Modal.Body>

                </Modal>
                <Modal size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered show={this.state.showpopupBuy} onHide={this.handleClosepopupBuy}>
                    <Modal.Header onClick={this.handleClosepopupBuy}>
                        <div className='text-center w-100 font-weight-bold ' style={{ cursor: 'pointer'}}>
                            خرید حساب ویژه
                        </div>


                    </Modal.Header>
                    <Modal.Body >
                        <div className='row  ' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='col-12' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h6 style={{ color: 'black', borderColor: 'transparent',  }}>همین حالا حساب خود را ویژه کنید( بدون کد) </h6>
                            </div>
                            <div className='col-12' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {/*<h6 style={{ color: 'black', borderColor: 'transparent', cursor: 'pointer' }}>هزینه : ۲۵۰هزار تومان</h6>*/}
                                <h6 style={{ color: 'black', borderColor: 'transparent',   }}>هزینه : 350هزار تومان</h6>
                            </div>
                        </div>
                        <div className='row' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='col-12' style={{ paddingTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button onClick={this.pay} style={{ backgroundColor: '#e3e2f2', width: '200px', color: 'black', borderColor: 'transparent' }}>پرداخت</Button>
                            </div>

                        </div>



                        <div className='row' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',paddingTop: '30px' }}>
                            <div className='col-12' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h6 style={{ color: 'black', borderColor: 'transparent',  }}>ویژه کردن حساب کاربری . کد معرف دارید؟</h6>
                            </div>
                            {/*<div className='col-12' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>*/}
                            {/*    /!*<h6 style={{ color: 'black', borderColor: 'transparent', cursor: 'pointer' }}>هزینه : ۲۵۰هزار تومان</h6>*!/*/}
                            {/*    <h6 style={{ color: 'black', borderColor: 'transparent',   }}>هزینه : 350هزار تومان</h6>*/}
                            {/*</div>*/}
                        </div>
                        <div className='row' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='col-12' style={{ paddingTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <input onChange={this.changetext} name='invitationCode' style={{ height: '30px', width: '150px', borderRadius: '5px', backgroundColor: 'rgb(127,127,127,0.2)', borderColor: 'transparent', marginRight: '10px' }} />
                                <h6 style={{ color: 'black', borderColor: 'transparent', }}>کد معرف</h6>

                            </div>

                        </div>
                        <div className='row' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='col-12' style={{ paddingTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button onClick={this.pay} style={{ backgroundColor: '#e3e2f2', width: '200px', color: 'black', borderColor: 'transparent' }}>پرداخت</Button>
                            </div>

                        </div>
                        <div className='row' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='col-12' style={{ paddingTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <h6 style={{ color: 'black', borderColor: 'transparent', cursor: 'pointer' }}>ویژه کردن حساب کاربری . کد دو هفته ای دارید؟</h6>
                            </div>

                        </div>
                        <div className='row' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='col-12' style={{ paddingTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <input onChange={this.changetext} name='weakcode' style={{ height: '30px', width: '150px', borderRadius: '5px', backgroundColor: 'rgb(127,127,127,0.2)', borderColor: 'transparent', marginRight: '10px' }} />
                                <h6 style={{ color: 'black', borderColor: 'transparent', cursor: 'pointer' }}>کد دو هفته ای</h6>

                            </div>

                        </div>
                        <div className='row' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='col-12' style={{ paddingTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button onClick={this.submitcode} style={{ backgroundColor: '#e3e2f2', width: '200px', color: 'black', borderColor: 'transparent' }}>ثبت</Button>
                            </div>

                        </div>

                    </Modal.Body>

                </Modal>

                <div className='col'>
                    <Tabs  >
                        <TabPanel style={{ top: '0', width: '100%', height: '100%' }}>
                            <div id='tabpanel' style={{ overflowY: 'auto', overflowX: 'auto', height: '89vh' }}>
                                <div className='row' style={{ display: 'flex', flexDirection: 'row', paddingTop: '20px' }}>
                                    <div className='col-1'></div>

                                    <div className='col-2' hidden={!this.state.vip}>
                                        <img  alt='' style={{ width: '60px', padding: '10px' }} src={crown}></img>
                                    </div>
                                    <div className='col-2' hidden={this.state.vip}>
                                        <h6 onClick={this.PayVip} alt='' style={{  padding: '10px',cursor:'pointer',color:'blue' }} >خرید حساب ویژه</h6>
                                    </div>
                                    <div className='col-6' hidden={this.state.showTimer}>
                                       
                                    </div>
                                    <div className='col-6' hidden={!this.state.showTimer}>
                              <h6>{this.state.timeExp}</h6>
                                    
                                    </div>
                                    <div className='col-3' onClick={this.transfer} style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center' }}>
                                        <img className='imagetag'  alt='' style={{ width: '100px', padding: '10px' }} src={this.state.info.profileUrl} ></img>
                                        {this.state.info.name}
                                      
                                    </div>
                                   
                                </div>
                                <div className='row'>
                                    <div className='col-12' style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center' }}>

                                        <div className='col-5' >
                                            <img alt='' style={{ width: '200px' }} src={this.state.setting.homeImage}></img>
                                        </div>
                                        <div className='col-7' style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', alignItems: 'flex-end', marginRight: '20px', paddingTop: '30px' }}>
            
                                            <h4 style={{ paddingTop: '5px' }}>{this.state.setting.homeText}</h4>
                                            
                                        </div>
                                    </div>


                                </div>
                                <div className='row'>
                                    {this.state.category.map(result => (
                                        <div className='col-6 col-md-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '20px' }}>
                                            <div onClick={() => this.clickOnCourse(result.id)} style={{ backgroundColor: 'rgb(127,127,127,0.1)', borderRadius: '10px', width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                                <img alt='' style={{ width: '80px' }} src={result.iconUrl}></img>
                                                <h6>{result.packageName}</h6>
                                            </div>


                                        </div>
                                    ))}


                                </div>
                            </div>

                        </TabPanel>
                        <TabPanel style={{ top: '0', width: '100%', height: '100%' }}>
                            <div className='row' style={{ overflowY: 'auto', overflowX: 'auto', height: '91vh' }}>
                            <div className='col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '20px' }}>
                            <img alt='' style={{ width: '200px' }} src={this.state.setting.storeImage}></img>
                                </div>
                                {this.state.product.map((result, i) => (
                                    <div className='col-6 col-md-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '20px' }}>
                                        <div onClick={() => this.clickOnproduct(result)} style={{ borderStyle: 'solid', borderColor: 'rgb(127,127,127,0.1)', borderRadius: '10px', width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'right' }}>
                                            <img alt='' style={{ width: '80px' }} src={result.imageUrl}></img>
                                            <h6 style={{ fontSize: '10px', paddingTop: '20px' }}>{result.name}</h6>
                                            <h6 style={{ fontSize: '10px' }}>{result.price + ' T'}</h6>
                                        </div>


                                    </div>
                                ))}


                            </div>
                        </TabPanel>
                        <TabPanel style={{ top: '0', width: '100%', height: '100%' }}>
                            <div className='row' style={{ overflowY: 'auto', overflowX: 'auto', height: '91vh' }}>
                                <div className='col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '20px' }}>
                                <img alt='' style={{ width: '200px' }} src={this.state.setting.toturialImage}></img>
                                </div>
                                {this.state.toto.map((result, i) => (
                                    <div className='col-12 col-md-6' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '20px' }}>
                                        <div style={{ backgroundColor: 'rgb(127,127,127,0.1)', borderRadius: '10px', width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse', textAlign: 'right', paddingTop: '20px', paddingBottom: '20px', height: '100px' }}>
                                            <img alt='' style={{ width: '80px' }} src={result.iconPath}></img>
                                            <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '10px' }}>
                                                <h6 style={{ fontSize: '10px' }}>{result.name}</h6>
                                                <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                                    <h6 style={{ fontSize: '8px' }}>{result.sectionCount} &nbsp;</h6>
                                                    <h6 style={{ fontSize: '10px' }}>&nbsp;</h6>
                                                    <h6 style={{ fontSize: '8px' }}> فیلم آموزشی</h6>
                                                </div>
                                                <h6 style={{ fontSize: '10px' }}>{this.checkprice(result.price)}</h6>
                                            </div>
                                            <div style={{ marginRight: '90px' }}>
                                                {this.checkType(result.isBuy, result)}

                                            </div>
                                        </div>


                                    </div>
                                ))}


                            </div>
                        </TabPanel>
                        <TabPanel style={{ top: '0', width: '100%', height: '100%' }}>
                            <div id='tabpanel' style={{ overflowY: 'auto', overflowX: 'auto', height: '91vh' }}>

                                <div className='row' style={{ paddingTop: '10px' }}>
                                    <div className='col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <div style={{ width: '300px', backgroundColor: "rgb(127,127,127,0.2)", borderRadius: '10px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'row-reverse', paddingTop: '20px' }}>
                                                <h6 style={{ paddingRight: '20px', fontSize: '14px' }}>{this.state.info.name}</h6>
                                                <h6 style={{ marginRight: '85px', fontSize: '14px' }}>{this.state.info.cardNumber}</h6>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row-reverse', paddingTop: '20px' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', width: '180px', textAlign: 'right' }}>
                                                    <div style={{display:'flex',flexDirection:'row',paddingLeft:'110px'}}>
                                                    {this.state.info.gem}
                                                        <AccountBalanceWalletIcon/>
                                                     
                                                    </div>
                                                    <h6 style={{ paddingRight: '20px', fontSize: '14px', paddingTop: '20px' }}>{this.state.charge}</h6>
                                                    <h6 style={{ paddingRight: '20px', fontSize: '14px', paddingTop: '5px' }}>{i18n.t('dashboard.money')}</h6>
                                                </div>
                                                <img alt='' src={this.state.info.profileUrl} style={{ width: '100px' }}></img>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'20px' }}>
                                                <Button onClick={this.getCharge} disabled={this.state.disableChargeBtn} style={{ backgroundColor: '##909afc', borderColor: 'transparent', width: '200px', borderRadius: '10px' }}>{i18n.t('dashboard.get')}</Button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='row'>
                                    <div className='col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20px' }}>
                                        <div className='backcode' style={{ textAlign: 'right' }}>
                                            <h4 style={{ color: 'white', paddingTop: '10px', paddingRight: '5px' }}>{i18n.t('dashboard.getincome')}</h4>
                                            <h6 style={{ color: 'white', paddingTop: '10px', paddingRight: '5px' }}>{i18n.t('dashboard.explain')}</h6>
                                            <h6 style={{ color: 'white', paddingTop: '10px', textAlign: 'center' }}>{i18n.t('dashboard.code')}</h6>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <div style={{ width: '180px', backgroundColor: 'white', borderRadius: '10px', textAlign: 'center', height: '30px', paddingTop: '5px' }}>
                                                    {this.state.info.invitationCode}
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className='row'>
                                    <div className='col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20px' }}>
                                        <div className='backsupport' style={{ textAlign: 'right' }}>
                                            <h4 style={{ color: 'white', paddingTop: '10px', paddingRight: '5px' }}>{i18n.t('dashboard.supporting')}</h4>
                                            <h6 style={{ color: 'white', paddingTop: '10px', paddingRight: '5px' }}>{i18n.t('dashboard.supportme')}</h6>
                                            <div className='row' style={{ paddingTop: '10px' }}>

                                                <div className='col-6' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <img alt='' style={{ width: '70px', cursor: 'pointer' }} onClick={this.ClickOnTelegramIcon} src={TeleIcon}></img>
                                                </div>
                                                <div className='col-6' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <img alt='' style={{ width: '70px', cursor: 'pointer' }} src={insta} onClick={this.ClickOnInstaIcon}></img>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </TabPanel>
                        <TabPanel style={{ top: '0', width: '100%', height: '100%' }}>
                            <div id='tabpanel' style={{ overflowY: 'auto', overflowX: 'auto', height: '93vh' }}>

                                <div className='row' style={{ paddingTop: '10px' }}>
                                    <div className='col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                        <h6 style={{ paddingTop: '30px' }}>به صورت آنلاین میتوانید سوالات خود را با ما در میان بگذارید</h6>
                                        <img alt='' style={{ width: '100px' }} src={ChatImg}></img>

                                    </div>


                                </div>
                                <div id='idofdiv' style={{ height: '65%', overflowY: 'auto', display: 'flex', flexDirection: 'column', paddingRight:'70px',paddingLeft:'70px' }}>
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


                                </div>


                                <div className='row' style={{ bottom: '0' }}>
                                    <div className='col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20px' }}>
                                        <input onChange={this.SendQuestion} style={{width:'100px'}} type='file'></input>
                                        <input name='que' onChange={this.changetext} style={{ width: '80%', borderRadius: '10px', height: '40px', borderStyle: 'solid', borderColor: 'transparent', backgroundColor: '#f3effe' }}></input>
                                        <img src={SendIcon} alt='' style={{ width: '30px', marginLeft: '10px', cursor: 'pointer' }} onClick={this.clickOnSendIcon}></img>
                                    </div>


                                </div>
                            </div>

                        </TabPanel>

                        <TabList inkBarStyle={{backgroundColor: 'blue'}} id='tab_list' style={{ display: 'flex', flexDirection: 'row', borderStyle: 'solid', borderColor: 'transparent', borderTopColor: 'black', position: 'fixed', bottom: '0', width: '100%' }}>
                            <Tab className='col-3 tabs' style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>
                                <HomeIcon  />
                                {i18n.t('dashboard.home')}
                            </Tab>
                            <Tab className='col-2 tabs' style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>
                                <ShoppingBasketIcon />
                                {i18n.t('dashboard.store')}
                            </Tab>
                            <Tab className='col-3 tabs' style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '8px' }}>
                                <SchoolIcon  />
                                {i18n.t('dashboard.items')}
                            </Tab>
                            <Tab className='col-2 tabs' style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '9px' }}>
                                <EqualizerIcon />
                                {i18n.t('dashboard.income')}
                            </Tab>
                            <Tab onMouseLeave={this.click} className='col-2 tabs' style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>
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