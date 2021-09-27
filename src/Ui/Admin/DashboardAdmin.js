import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {Button, Modal, Nav, Navbar} from 'react-bootstrap';
import './Main.css'
import {Config} from '../../Utils'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Logo from '../../photo/logo.png'

class AdminAddClass extends Component {
    componentDidMount() {
        var basicAuth = Buffer.from(window.localStorage.getItem('username') + ":" + window.localStorage.getItem('password')).toString('base64')
        window.localStorage.setItem('basic', basicAuth)
        this.getchall()
    }

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            cost: '',
            size: '',
            count: '',
            education: [],
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
            listDetail: []
        }
    }

    getchall() {
        var requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                // "Authorigzation": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0"

            }


        };

        fetch(Config()['apiUrl'] + "/education", requestOptions)
            .then(response => {


                response.json().then(rep => {
                    console.log(rep)

                    this.setState({
                        education: rep
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


    handleClose = () => {
        this.setState({
            show: false
        })
    }

    addFilm = (id) => {
        console.log(id)
        this.setState({
            show: true,
            id_chall: id
        })
    }
    last_submit = () => {
        var Item = {}
        Item.sectionCount = this.state.count
        Item.enable = true

        Item.iconUrl = this.state.imageUrl
        Item.packageName = this.state.name

        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0"

            },
            body: JSON.stringify(Item)


        };

        fetch(Config()['apiUrl'] + "/admin/educations/package", requestOptions)
            .then(response => {


                if (response.status === 200) {
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
        // fetch(Config()['apiUrl'] + '/user/uploadImg?mobile=09016991742', requestOptions)
        fetch(Config()['apiUrl'] + '/user/uploadImg?mobile='+window.localStorage.getItem('username'), requestOptions)
            .then(response => {
                    console.log(response)
                    // if(response.status===200){
                    response.json().then(rep => {

                        console.log(rep)

                        var spinner = document.getElementById("spinner");
                        spinner.className = "";
                        this.setState({
                            path: rep.path,
                            toast_blur: false
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
        fetch(Config()['apiUrl'] + '/user/uploadImg?mobile='+window.localStorage.getItem('username'), requestOptions)
            .then(response => {
                    console.log(response)
                    if (response.status === 200) {
                        response.json().then(rep => {

                            console.log(rep)

                            var spinner = document.getElementById("spinner");
                            spinner.className = "";
                            this.setState({
                                addfile: rep.path,
                                toast_blur: false
                            })


                        })
                    }
                }
            )

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
        fetch(Config()['apiUrl'] + '/user/uploadImg?mobile='+window.localStorage.getItem('username'), requestOptions)
            .then(response => {
                    console.log(response)
                    if (response.status === 200) {
                        response.json().then(rep => {

                            console.log(rep)

                            var spinner = document.getElementById("spinner");
                            spinner.className = "";
                            this.setState({
                                imageUrl: rep.path,
                                toast_blur: false
                            })


                        })
                    }
                }
            )

            .catch(error => console.log('error', error));


    }

    showSpinner() {

        var spinner = document.getElementById("spinner");
        this.setState({

            toast_blur: true,
            dis: true
        })
        // document.getElementById('main_div').disable=true
        spinner.className = "show";

    }

    saveEntry = () => {
        var att = []
        att[0] = this.state.addfile
        var Item = {

            "additionalFilePaths": att,
            "attachedFilePath": this.state.addfile,
            "description": this.state.description,
            "level": this.state.level,
            "packageId": this.state.id_chall,
            "path": this.state.path,
            "title": this.state.title

        }

        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0"

            },
            body: JSON.stringify(Item)


        };

        fetch(Config()['apiUrl'] + "/admin/educations/item", requestOptions)
            .then(response => {
                if (response.status === 200) {
                    response.json().then(rep => {
                        console.log(rep)
                        window.location.reload()
                    })
                }
                console.log(response)


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
    saveedit = () => {
        var Item = {}

        if (this.state.path !== '') {
            Item.iconUrl = this.state.path
        }

        if (this.state.name !== '') {
            Item.packageName = this.state.name
        }
        if (this.state.count !== '') {
            Item.count = this.state.count
        }


        Item.id = this.state.id_edit
        console.log(Item)
        var requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0"

            },
            body: JSON.stringify(Item)


        };

        fetch(Config()['apiUrl'] + "/education/edit", requestOptions)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    response.json().then(rep => {
                        console.log(rep)
                        window.location.reload()

                    })
                }


            })
            .catch(error => console.log('error', error));
    }
    handleClosedetail = () => {
        this.setState({
            showdetail: false
        })
    }
    showdetailfunc = (id) => {
        this.setState({
            showdetail: true
        })
        var requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0"

            }


        };

        fetch(Config()['apiUrl'] + "/education/" + id + "/get-sections-videos", requestOptions)
            .then(response => {


                response.json().then(rep => {
                    console.log(rep)

                    this.setState({
                        listDetail: rep
                    })


                })


            })
            .catch(error => console.log('error', error));
    }
    deletePack = (id) => {

        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0"

            },


        };

        fetch(Config()['apiUrl'] + "/admin/educations/package/delete?packageId=" + id, requestOptions)
            .then(response => {

                if (response.status === 200) {
                    response.json().then(rep => {
                        console.log(rep)
                        if (rep.status === 200) {
                            window.location.reload()
                        }


                    })
                }


            })
            .catch(error => console.log('error', error));
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
                    <Modal size="xl"
                           aria-labelledby="contained-modal-title-vcenter"
                           centered show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton={this.handleClose}>

                        </Modal.Header>
                        <Modal.Body>
                            <div className='row'
                                 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                                <div className='col-6' style={{
                                    paddingTop: '10px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row-reverse'
                                }}>
                                    <h6>سطح انتخابی </h6>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"

                                        onChange={this.changetext}
                                        name='level'
                                        className='col-6'
                                        value={this.state.typeid}>


                                        <MenuItem value='BEGINNER'> BEGINNER</MenuItem>
                                        <MenuItem value='MEDIUM'> MEDIUM</MenuItem>
                                        <MenuItem value='ADVANCED'>ADVANCED</MenuItem>

                                    </Select>

                                </div>
                                <div className='col-6' style={{
                                    paddingTop: '10px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row-reverse'
                                }}>
                                    <h6>نام جلسه</h6>
                                    <input onChange={this.changetext} name='title' style={{
                                        width: '150px',
                                        backgroundColor: 'rgb(127, 127, 127,0.1)',
                                        borderRadius: '10px',
                                        borderColor: 'transparent',
                                        height: '30px',
                                        paddingRight: '10px'
                                    }} className='inputAdd'></input>

                                </div>
                                <div className='col-12'>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingTop: '50px',
                                        flexDirection: 'row-reverse'
                                    }}>

                                        <h6>فیلم جلسات</h6>
                                        <input type="file" id="file" onChange={(e) => this.onChange(e)}/>


                                    </div>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingTop: '50px',
                                        flexDirection: 'row-reverse'
                                    }}>

                                        <h6>فایل های اضافه</h6>
                                        <input type="file" id="file" onChange={(e) => this.onChange2(e)}/>


                                    </div>
                                </div>
                                <div class='col-12 '>

                                    <h6 style={{textAlign: 'right', paddingRight: '10px'}}>توضیحات</h6>
                                    <textarea name='description' onChange={this.changetext} className='col-12' style={{
                                        textAlign: 'right',
                                        backgroundColor: 'rgb(127, 127, 127,0.1)',
                                        height: '180px',
                                        borderColor: 'transparent'
                                    }}></textarea>
                                </div>
                                <div className='col-12' style={{
                                    display: "flex",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingTop: '50px'
                                }}>
                                    <Button onClick={this.saveEntry} style={{
                                        backgroundColor: '#4ce285',
                                        border: 'transparent',
                                        width: '150px',
                                        height: '50px',
                                        color: 'black',
                                        borderRadius: '10px'
                                    }}>اضافه کردن</Button>
                                </div>
                            </div>

                        </Modal.Body>

                    </Modal>

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
                <Modal size="xl"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered show={this.state.showdetail} onHide={this.handleClosedetail}>
                    <Modal.Header closeButton={this.handleClosedetail}>

                    </Modal.Header>
                    <Modal.Body>
                        {this.state.listDetail.map((result, i) => (
                            <div className='row'>
                                <div className='col-4'
                                     style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><a
                                    href={result.attachedFilePath}>فایل اضافه</a></div>
                                <div className='col-4'
                                     style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><a
                                    href={result.path}>فیلم کلاس</a></div>
                                <div className='col-4' style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>{result.title}</div>

                            </div>

                        ))}
                        <div class='row'>

                        </div>


                    </Modal.Body>

                </Modal>
                <Modal size="xl"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered show={this.state.showedit} onHide={this.handleCloseedit}>
                    <Modal.Header closeButton={this.handleCloseedit}>

                    </Modal.Header>
                    <Modal.Body>
                        <div class='row'>
                            <div className='col-4'></div>
                            <div class='col-4  ' style={{
                                display: 'flex',
                                flexDirection: 'row-reverse',
                                textAlign: 'right',
                                paddingTop: '15px',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <h6>تعداد جلسات </h6>
                                <input onChange={this.changetext} name='count' style={{
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

                                <h6>نام چالش</h6>
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
                        <div class='row'>

                            <div className='col-12'>
                                <div style={{
                                    display: "flex",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingTop: '50px',
                                    flexDirection: 'row-reverse'
                                }}>

                                    <h6>عکس دوره</h6>
                                    <input type="file" id="file" onChange={(e) => this.onChange(e)}/>


                                </div>

                            </div>

                            <div className='col-12' style={{
                                display: "flex",
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingTop: '50px'
                            }}>
                                <Button onClick={this.saveedit} style={{
                                    backgroundColor: '#4ce285',
                                    border: 'transparent',
                                    width: '150px',
                                    height: '50px',
                                    color: 'black',
                                    borderRadius: '10px'
                                }}>ثبت</Button>
                            </div>
                        </div>


                    </Modal.Body>

                </Modal>

                <div className='col-12 '>
                    <div>
                        <div className='row'>
                            <div className='col-12'>
                                <div style={{display: 'flex', flexDirection: 'row-reverse', textAlign: 'right'}}>
                                    <h3 style={{paddingRight: '40px', paddingTop: '20px'}}>اضافه کردن چالش</h3>
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
                                                    <h6>تعداد جلسات </h6>
                                                    <input onChange={this.changetext} name='count' style={{
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

                                                    <h6>نام چالش</h6>
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


                        <div className='row'>
                            <div className='col-12' style={{textAlign: 'right'}}>
                                <div className='row'
                                     style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <div className='col-11'>
                                        <div className='content' style={{marginTop: '50px'}}>

                                            {/* <div class='row row1'  >
                                                <div class='col-12 ' style={{ textAlign: 'right', paddingRight: '50px', paddingTop:'20px' }}>

                                                    <h6 style={{ paddingTop: '7px' }}>
                                                        {i18n.t('AddClass.description')}
                                                    </h6>

                                                </div>




                                            </div> */}


                                            <div class='row row1'>
                                                <div class='col-12 ' style={{
                                                    margin: '0px',
                                                    marginTop: '10px',
                                                    display: "flex",
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <div>

                                                        <label id="largeFile" for="file">
                                                            <input type="file" id="file"
                                                                   onChange={(e) => this.onChange1(e)}/>

                                                        </label>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class='row row1' style={{paddingTop: '36vh'}}>
                                                <div class='col-12 '>

                                                    <h6 style={{textAlign: 'right', paddingRight: '50px'}}>توضیحات</h6>
                                                    <textarea name='description' onChange={this.changetext}
                                                              className='col-10' style={{
                                                        textAlign: 'right',
                                                        marginRight: '50px',
                                                        backgroundColor: 'rgb(127, 127, 127,0.1)',
                                                        height: '180px',
                                                        borderColor: 'transparent'
                                                    }}></textarea>
                                                </div>


                                            </div>


                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class='row' style={{marginTop: '50px', marginBottom: '50px'}}>
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
                        <div className='row'>
                            <div className='col-2' style={{textAlign: 'center'}}>
                                <h6>حذف</h6>
                            </div>
                            <div className='col-2' style={{textAlign: 'center'}}>
                                <h6>ویرایش</h6>
                            </div>

                            <div className='col-4' style={{textAlign: 'center'}}>
                                <h6>اضافه کردن فیلم</h6>
                            </div>

                            <div className='col-4' style={{textAlign: 'center'}}>
                                <h6>نام</h6>
                            </div>
                        </div>

                        {this.state.education.map((result, i) => (
                            <div className='row'>
                                <div className='col-2' style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    paddingTop: '20px'
                                }}>
                                    <Button onClick={() => this.deletePack(result.id)} style={{
                                        backgroundColor: 'red',
                                        border: 'transparent',
                                        width: '150px',
                                        height: '50px',
                                        color: 'black',
                                        borderRadius: '10px'
                                    }}>حذف</Button>
                                </div>
                                <div className='col-2' style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    paddingTop: '20px'
                                }}>
                                    <Button onClick={() => this.showeditpop(result.id)} style={{
                                        backgroundColor: '#4ce285',
                                        border: 'transparent',
                                        width: '150px',
                                        height: '50px',
                                        color: 'black',
                                        borderRadius: '10px'
                                    }}>ویرایش</Button>
                                </div>
                                <div className='col-4' style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    paddingTop: '20px'
                                }}>

                                    {/* <img alt='' style={{ width: '80px' }} src={result.imageUrl}></img> */}

                                    {/* {result.price + ' T'} */}

                                    <Button onClick={() => this.addFilm(result.id)}> اضافه کردن فیلم</Button>

                                </div>

                                <div onClick={() => this.showdetailfunc(result.id)} className='col-4'
                                     style={{textAlign: 'center', paddingTop: '20px', cursor: 'pointer'}}>
                                    {result.packageName}
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