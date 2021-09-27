import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {Button, Modal, Nav, Navbar} from 'react-bootstrap';
import './Main.css'
import {Config} from '../../Utils'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Logo from '../../photo/logo.png';
import {ALertCenter, CenterModal} from "../Common/Modals/Modals";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {AiOutlineCopy} from "react-icons/all";
 const JDate = require('jalali-date');

class AdminAddClass extends Component {
    componentDidMount() {
        var basicAuth = Buffer.from(window.localStorage.getItem('username') + ":" + window.localStorage.getItem('password')).toString('base64')
        window.localStorage.setItem('basic', basicAuth)
        this.getCode()
    }

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            cost: '',
            size: '',
            count: '',
            deposit: [],
            show: false,
            id_chall: '',
            path: '',
            level: '',
            title: '',
            toast_blur: false,
            dis: false,
            imageUrl: '',
            addfile: '',
            showedit: false,
            id_edit: '',
            showdetail: false,
            code: [],
            lname: '',
            trialCode:"",
            showModal:false,
            copied:false
        }
    }

    getCode() {
        var requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0"

            }


        };

        // fetch(Config()['apiUrl'] + "/invitation/admin/get-all", requestOptions)
        fetch(Config()['apiUrl'] + "/trial/get-all", requestOptions)
            .then(response => {


                response.json().then(rep => {
                    console.log(rep)
                   // let dataa= new JDate(new Date(rep[0].startTime)).date.join('/')
                   //  console.log('rep[0].startTime')
                   //  console.log(rep[0].startTime)
                   //  console.log(dataa.date.join('/'))

                    this.setState({
                        code: rep
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
        if (event.target.name === "lname") {
            this.setState({
                lname: event.target.value
            })
        }


    }


    handleClose = () => {
        this.setState({
            show: false
        })
    }


    last_submit = () => {
        this.setState({
            trialCode:'arsenal',
            showModal:true
        })






        var Item = {}
        Item.lastName = this.state.lname
        Item.name = this.state.name


        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0"

            },
            body: JSON.stringify(Item)


        };

        // fetch(Config()['apiUrl'] + "/invitation/admin/create-code", requestOptions)
        fetch(Config()['apiUrl'] + "/trial/admin/create-trial-code", requestOptions)
            .then(response => {


                if (response.status === 200) {
                    response.json().then(rep => {
                        console.log(rep)
                        this.getCode();
                        this.setState({
                            trialCode:rep.trialCode,
                            showModal:true
                        })



                        // window.location.reload()
                    })
                }


            })
            .catch(error => console.log('error', error));
    }



    closeblur = () => {
        this.setState({
            toast_blur: false
        })
    }

    showeditpop = (id) => {
        this.setState({
            showedit: true,
            id_edit: id
        })
    }

    handleCloseedit = () => {
        this.setState({
            showedit: false
        })
    }

    handleClosedetail = () => {
        this.setState({
            showdetail: false
        })
    }

    render() {
        return (
            <div className=' row '>
                <div id="spinner"></div>
                <Snackbar open={this.state.toast_blur}>
                    <Alert severity={this.state.severity}>
                        فایل در حال آپلود
                    </Alert>
                </Snackbar>
                <div hidden={this.state.dis}>

                </div>

                <>
                    <Navbar expand="lg">
                        <Navbar.Brand href="/dashboard">
                            <img style={{width: '50px'}} alt='' src={Logo}></img>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
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

                <div className='col-12 '>
                    <div>
                        <div className='row'>
                            <div className='col-12'>
                                <div style={{display: 'flex', flexDirection: 'row-reverse', textAlign: 'right'}}>
                                    <h3 style={{paddingRight: '40px', paddingTop: '20px'}}>تولید کد</h3>
                                </div>

                            </div>

                        </div>

                        <div className='row'>
                            <div className='col-12' style={{textAlign: 'right'}}>
                                <div className='row'
                                     style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <div className='col-11'>
                                        <div className='content'>
                                            <div class='row'>
                                                <div class='col-4' style={{
                                                    display: 'flex',
                                                    flexDirection: 'row-reverse',
                                                    textAlign: 'right',
                                                    paddingTop: '15px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                </div>
                                                <div class='col-4  ' style={{
                                                    display: 'flex',
                                                    flexDirection: 'row-reverse',
                                                    textAlign: 'right',
                                                    paddingTop: '15px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <h6>نام خانوادگی </h6>
                                                    <input onChange={this.changetext} name='lname' style={{
                                                        width: '150px',
                                                        backgroundColor: 'rgb(127, 127, 127,0.1)',
                                                        borderRadius: '10px',
                                                        borderColor: 'transparent',
                                                        height: '30px',
                                                        paddingRight: '10px'
                                                    }} className='inputAdd'></input>

                                                </div>

                                                <div class='col-4 ' style={{
                                                    display: 'flex',
                                                    flexDirection: 'row-reverse',
                                                    textAlign: 'right',
                                                    paddingTop: '15px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>

                                                    <h6>نام </h6>
                                                    <input onChange={this.changetext} name='name' style={{
                                                        width: '150px',
                                                        backgroundColor: 'rgb(127, 127, 127,0.1)',
                                                        borderRadius: '10px',
                                                        borderColor: 'transparent',
                                                        height: '30px',
                                                        paddingRight: '10px'
                                                    }} className='inputAdd'></input>

                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*

                        <div className='row' >
                            <div className='col-12' style={{ textAlign: 'right' }}>
                                <div className='row' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div className='col-11'>
                                        <div className='content' style={{ marginTop: '50px' }}>

                                 


                                            <div class='row row1'  >
                                                <div class='col-12 ' style={{ margin: '0px', marginTop: '10px', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                                                    <div>

                                                        <label id="largeFile" for="file">
                                                            <input type="file" id="file" onChange={(e) => this.onChange1(e)} />

                                                        </label>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class='row row1' style={{ paddingTop: '36vh' }} >
                                                <div class='col-12 ' >

                                                    <h6 style={{ textAlign: 'right', paddingRight: '50px' }}>توضیحات</h6>
                                                    <textarea name='description' onChange={this.changetext} className='col-10' style={{ textAlign: 'right', marginRight: '50px', backgroundColor: 'rgb(127, 127, 127,0.1)', height: '180px', borderColor: 'transparent' }}></textarea>
                                                </div>




                                            </div>



                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
   */}
                        <div class='row mr-0 ml-0' style={{marginTop: '50px', marginBottom: '50px'}}>
                            <div class='col-12 '
                                 style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                                <Button onClick={this.last_submit} style={{
                                    backgroundColor: '#4ce285',
                                    border: 'transparent',
                                    width: '150px',
                                    height: '50px',
                                    color: 'black',
                                    borderRadius: '10px'
                                }}>اضافه کردن</Button>

                            </div>


                        </div>

                        <div className='row mr-0 ml-0' style={{paddingTop: '50px'}}>
                            <div className='col-3' style={{textAlign: 'center'}}>
                                <h6>تاریخ انقضاء</h6>
                            </div>

                            <div className='col-3' style={{textAlign: 'center'}}>
                                <h6>VIP</h6>
                            </div>
                            <div className='col-3' style={{textAlign: 'center'}}>
                                <h6>استفاده شده توسط </h6>
                            </div>
                            <div className='col-3' style={{textAlign: 'center'}}>
                                <h6>نام ایجاد کننده</h6>
                            </div>

                        </div>

                        {this.state.code.map((result, i) => (
                            <div className='row mr-0 ml-0'>
                                <div className='col-3 text-center'
                                     style={{
                                         display: 'flex',
                                         justifyContent: 'center',
                                         alignItems: 'center',
                                         flexDirection: 'column',
                                         paddingTop: '20px'
                                     }}>

                                    {new JDate(new Date(result.startTime)).date.join('/')}
                                </div>
                                <div className='col-3' style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    paddingTop: '20px'
                                }}>


                                    {result.vip?"بلی":"خیر"}


                                </div>


                                <div className='col-3 text-center' style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    paddingTop: '20px'
                                }}>
                                    {/*{result.name} {result.lastName}*/}
                                     {result.userName}
                                </div>
                                <div className='col-3 text-center' style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    paddingTop: '20px'
                                }}>
                                    {/*{result.name} {result.lastName}*/}
                                     {result.name +" "+result.lastName}
                                </div>
                            </div>
                        ))}

                    </div>

                </div>
                <CenterModal header={'نمایش کد ایجاد شده'}  show={this.state.showModal} onHide={() =>    this.setState({
                    showModal:false
                })}>
                    {
                        <div className='w-100 d-flex align-items-center justify-content-center' dir='rtl' >
                            <span>کد ایجاد شده :</span>
                            <p className='font-weight-bold mb-0 mr-2 '>{this.state.trialCode}</p>
                            <CopyToClipboard text={this.state.trialCode}
                                             onCopy={() => this.setState({copied: true})}>
                                <button className='mr-2'><AiOutlineCopy/></button>
                            </CopyToClipboard>


                        </div>

                    }

                </CenterModal>

                <ALertCenter    isOpen={this.state.copied}
                toggle={() => this.setState({copied: false})}
                text={'متن کپی شد!'}/>
            </div>


        )
    }
}

export default AdminAddClass