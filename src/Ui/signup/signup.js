import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css'
import Stepper from 'react-js-stepper'
import Book from '../../photo/Group8.png'
import Countdown from "react-countdown";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import ReactCodeInput from 'react-verification-code-input';
import i18n from '../../i18n'
import Data from '../../photo/Mobilelogin-amico.png'
import { Config } from '../../Utils'
const steps = [{ title: '' }, { title: ''}, { title: '' },]
const renderer = ({ minutes, seconds }) => {
    if (seconds <= 9) {
        return (
            <span>
                {minutes}:{"0" + seconds}
            </span>
        );
    } else {
        return (
            <span>
                {minutes}:{seconds}
            </span>
        );
    }


}
class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 1,
            phoneN: '',
            code: '',
            name: '',
            codeViner:null

        }
    }
    componentDidMount(){
      
        if(window.localStorage.getItem('basic')!==null){
            window.location.replace('/dashboard')
        }
        var loc =window.location.href
        var arrloc=loc.split("?code=")
        if(arrloc.length>1){
            var code = arrloc[1]
            console.log(code)
            this.setState({
                codeViner:code
            })
        }
    }
    handleOnClickNext = () => {

        if (this.state.activeStep === 1) {


            // var User = {}
            // User.mobile = this.state.phoneN
            // User.name = this.state.fname
            // User.family = this.state.lname
            // User.birthday = parseInt(this.state.bdate)
            // if (this.state.email == null)
            //     User.email = ''
            // else
            //     User.email = this.state.email
            // var raw = JSON.stringify(User);
            // console.log(raw)
            var requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',

                },


            };

            fetch(Config()['apiUrl'] + "/user/login?mobile=" + this.state.phoneN, requestOptions)
                .then(response => {

                    response.json().then(rep => {
                        if (rep.httpCode === 200) {
                            let nextStep = this.state.activeStep + 1;
                            this.setState({ activeStep: nextStep })
                        }
                        // else{
                        //     this.setState({
                        //         Success: true,messageSuccess:'خطا در ثبت نام',severity:'error'
                        //     })
                        // }
                        console.log(rep)
                    })
                })
                .catch(error => console.log('error', error));
        }
        else if (this.state.activeStep === 2) {

            var User1 = {}
            User1.mobile = this.state.phoneN
            User1.otp = this.state.code


            var raw = JSON.stringify(User1);
            console.log(raw)
            var requestOptions1 = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',

                },
                body: raw,

            };

            fetch(Config()['apiUrl'] + "/user/confirmotp", requestOptions1)
                .then(response => {
                    console.log(response)
                    if (response.status === 201) {
                        let nextStep = this.state.activeStep + 1;
                        this.setState({ activeStep: nextStep })
                    }
                    if (response.status === 200) {
                        response.json().then(rep => {

                            window.localStorage.setItem('username', this.state.phoneN)
                            window.localStorage.setItem('password', rep.password)
                            window.location.replace('/dashboard')

                        })



                    }

                })
                .catch(error => console.log('error', error));
        }

        else if (this.state.activeStep === 3) {
            console.log("sssteppp")
            //             if (this.state.password == this.state.password1) {
            //    console.log(window.localStorage.getItem('token'))
            var User = {}
            User.mobile = this.state.phoneN
            User.name = this.state.name



            fetch(Config()['apiUrl'] + "/user?channel="+this.state.codeViner, {
                method: 'PUT',
                // mode:'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',

                },
                body: JSON.stringify(User)
            })

                .then(response => {
                    if (response.status === 200) {
                        response.json().then(rep => {
                            window.localStorage.setItem('username', this.state.phoneN)
                            window.localStorage.setItem('password', rep.password)
                            window.location.replace('/dashboard')



                        })
                    }

                });

        }


    }


    changetext = (event) => {
        if (event.target.name === "name") {
            this.setState({
                name: event.target.value
            })
        }
        if (event.target.name === "phone") {
            this.setState({
                phoneN: event.target.value
            })
        }


    }
    changecode = (e) => {
        this.setState({
            code: e
        })

    }
    render() {
        return (
            <div className='row '>
                <div>
                    <Snackbar open={this.state.Success} autoHideDuration={6000} onClose={this.handleCloseSuccess}>
                        <Alert onClose={this.handleCloseSuccess} severity={this.state.severity}>
                            {this.state.messageSuccess}
                        </Alert>
                    </Snackbar>
                </div>





                <div className='col-12 txt_signup' >

                    <div className='stepper_cont'>

                        <Stepper
                            steps={steps}
                            activeStep={this.state.activeStep}
                            onSelect={this.handleOnClickStepper}
                           
                        />

                        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {this.state.activeStep === 1 ?

                                <div className='row enter_data' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div className='col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img alt='' className=' col-12 col-md-7' src={Book}></img>
                                    </div>
                                    <div className='col-12'> 
                                        <h3 style={{ fontWeight: 'bold', textAlign: 'center', paddingTop: '30px', fontSize: '30px' }}>{i18n.t('Signup.enter_your_phone')}</h3>

                                    </div>


                                    <div className='col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                        <input className='col-12 inputStyleSignup1' name='phone' autoComplete='off' onChange={this.changetext}></input>
                                    </div>



                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                        <input style={{ width: '150px', height: '50px', borderRadius: '10px', backgroundColor: '#17a2b8', borderColor: 'transparent', marginTop: '50px', marginBottom: '10px' }} type="button" value={this.state.activeStep === steps.length ? 'ورود' : 'مرحله بعد'}
                                            onClick={this.state.activeStep === steps.length ? null : this.handleOnClickNext} />

                                    </div>
                                </div>

                                :
                                this.state.activeStep === 2 ?
                                    <div className='row enter_data' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <div className='col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <img alt='' className=' col-12 col-md-7' src={Book}></img>
                                        </div>
                                        <div className='col-12'>
                                            <h5 style={{ textAlign: 'center', fontWeight: 'bold', paddingTop: '20px' }}>{this.state.phoneN}</h5>
                                            <h5 style={{ textAlign: 'center', fontWeight: 'bold', paddingTop: '15px' }}>{i18n.t('Signup.enter_your_code')}</h5>
                                        </div>


                                        <div className='col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


                                            <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', justifyContent: 'center', justifyItems: 'center', paddingTop: '15px' }}>
                                                <ReactCodeInput fields={4} onChange={this.changecode} />

                                            </div>
                                        </div>



                                        <div className='col-12'>
                                            <div style={{ textAlign: 'center', justifyContent: 'center', justifyItems: 'center', paddingTop: '20px' }}>
                                                <Button onClick={this.send_new_code} disabled={this.state.disable} style={{ backgroundColor: 'transparent', color: 'black', borderColor: 'transparent' }}>ارسال مجدد کد</Button>
                                                <div>
                                                    {this.state.show ? <Countdown date={Date.now() + 60000} renderer={renderer} onComplete={this.complete} /> : null}
                                                </div>


                                            </div>
                                        </div>
                                        <div className='col-12'>
                                            <div style={{ textAlign: 'center' }}>
                                                <input style={{ width: '150px', height: '50px', borderRadius: '10px', backgroundColor: '#17a2b8', borderColor: 'transparent', marginTop: '50px', marginBottom: '10px' }} type="button" value={this.state.activeStep === steps.length ? 'ورود' : 'مرحله بعد'}
                                                    onClick={this.state.activeStep === steps.length ? null : this.handleOnClickNext} />

                                            </div>
                                        </div>
                                    </div> :
                                    this.state.activeStep === 3 ?
                                        <div className='row enter_data' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <div className='col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <img alt=''className=' col-12 col-md-7' src={Data}></img>
                                            </div>



                                            <div className='col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'right', paddingTop: '28px' }}>
                                                <h6>{i18n.t('Signup.name')}</h6>
                                                <input className='col-12 inputStyleSignup1' name='name' autoComplete='off'  onChange={this.changetext}></input>
                                            </div>
                                            <div className='col-12' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'right', paddingTop: '28px' }}>
                                                <h6>{i18n.t('Signup.phone')}</h6>
                                                <input className='col-12 inputStyleSignup1' disabled={true} value={this.state.phoneN} name='phone' autoComplete='off'  onChange={this.changetext}></input>
                                            </div>


                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                                <input style={{ width: '150px', height: '50px', borderRadius: '10px', backgroundColor: '#17a2b8', borderColor: 'transparent', marginTop: '50px', marginBottom: '10px' }} type="button" value={this.state.activeStep === steps.length ? 'ورود' : 'مرحله بعد'}
                                                    onClick={this.handleOnClickNext} />

                                            </div>
                                        </div>
                                        :
                                        <div></div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        )
    }


}
export default signup

