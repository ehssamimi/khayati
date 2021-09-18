import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Modal, Nav, Navbar } from 'react-bootstrap';
import './Main.css'
import { Config } from '../../Utils'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Logo from '../../photo/logo.png'
class AdminAddClass extends Component {
    componentDidMount() {
        this.getItemShop()

    }
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            cost: '',
            count: '',
            description:'',
            imageUrl:'',
            education: [],
            toast_blur:false,
            showedit:false,
            id_edit:'',
            VideoUrl:''

        }
    }
    getItemShop() {
        var requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                // "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0"

            }


        };
        var uid=56
        if(localStorage.getItem("info")){
          let info=  JSON.parse(localStorage.getItem("info"));
             uid=info.id
        }
        console.log(uid)

        fetch(Config()['apiUrl'] + `/premiumTutorial?uid=${uid}`, requestOptions)
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
        if (event.target.name === "cost") {
            this.setState({
                cost: event.target.value
            })
        }
        if (event.target.name === "description") {
            this.setState({
                description: event.target.value
            })
        }
        if (event.target.name === "count") {
           
            this.setState({
                count: event.target.value
            })
        }

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
      
        fetch(Config()['apiUrl']+'/user/uploadImg?mobile='+window.localStorage.getItem('username'),requestOptions)
            .then(response =>
                response.json().then(rep => {
                    console.log(rep)
                   
                    
                        this.setState({
                     
                          imageUrl:rep.path,
                            blur: false,
                            toast_blur: false
                        })
                    
                })
            )

            .catch(error => console.log('error', error));


    }
    onChangeForDetail(e) {

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
      
        fetch(Config()['apiUrl']+'/user/uploadImg?mobile='+window.localStorage.getItem('username'),requestOptions)
            .then(response =>
                response.json().then(rep => {
                    console.log(rep)
                   
                    
                        this.setState({
                     
                          VideoUrl:rep.path,
                            blur: false,
                            toast_blur: false
                        })
                    
                })
            )

            .catch(error => console.log('error', error));


    }
    closeblur=()=>{
        this.setState({
            toast_blur:false
        })
    }
    last_submit=()=>{
        var Item={}
       
        Item.description=this.state.description
      
        Item.iconPath=this.state.imageUrl
       
        Item.name=this.state.name
        Item.price=parseInt(this.state.cost)
     Item.sectionCount=parseInt(this.state.count)
     Item.videoZipAddress=this.state.VideoUrl
     console.log(Item)
         var requestOptions = {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'Accept': '*/*',
                 "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0" 
     
             },
             body:JSON.stringify(Item)
     
     
         };
     
         fetch(Config()['apiUrl'] + "/premiumTutorial/create", requestOptions)
             .then(response => {
     
     if(response.status===200){
          response.json().then(rep => {
                  console.log(rep)
                  this.setState({
                      name:'',
                      count:'',
                      description:'',
                      imageUrl:'',
                      cost:''
                  })
     window.location.reload()
     
                 })
     }
     
                
     
     
     
     
     
             })
             .catch(error => console.log('error', error)); 
     }
     handleCloseedit=()=>{
         this.setState({
             showedit:false
         })
     }
     showeditpop=(id)=>{
         this.setState({
             showedit:true,
             id_edit:id
         })
     }
     saveedit=()=>{
var item={}
if(this.state.description!==''){
    item.description=this.state.description
}
if(this.state.imageUrl!==''){
    item.iconPath=this.state.imageUrl
}
if(this.state.count!==''){
    item.sectionCount=this.state.count
}
if(this.state.cost!==''){
    item.price=this.state.cost
}
if(this.state.name!==''){
    item.name=this.state.name
}
item.id=this.state.id_edit

var requestOptions = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0" 

    },
    body:JSON.stringify(item)


};

fetch(Config()['apiUrl'] + "/premiumTutorial/edit", requestOptions)
    .then(response => {
console.log(item)
if(response.status===200){
 response.json().then(rep => {
    console.log(rep)
window.location.reload()

        })
}

       





    })
    .catch(error => console.log('error', error)); 
     }
     deletePack=(id)=>{
     
         var requestOptions = {
             method: 'DELETE',
             headers: {
                 'Content-Type': 'application/json',
                 'Accept': '*/*',
                 "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0" 
     
             },
             
     
     
         };
     
         fetch(Config()['apiUrl'] + "/premiumTutorial/delete?pid="+id, requestOptions)
             .then(response => {
     
     if(response.status===200){
          response.json().then(rep => {
                  console.log(rep)
             if(rep.status===200){
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
 <Snackbar open={this.state.toast_blur} autoHideDuration={6000} onClose={this.closeblur}>
                    <Alert onClose={this.closeblur} severity={this.state.severity}>
                      فایل در حال آپلود
                    </Alert>
                </Snackbar>
                <>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#home">
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
                <Modal size="xl" 
                    aria-labelledby="contained-modal-title-vcenter"
                    centered show={this.state.showedit} onHide={this.handleCloseedit}>
                    <Modal.Header closeButton={this.handleCloseedit}>
                       
                    </Modal.Header>
                    <Modal.Body >
                        <div className='row' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className='col-4' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection:'row-reverse' }}>
                            <h6>تعداد جلسه</h6>
                            <input onChange={this.changetext} name='count' style={{ width: '150px', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '30px', paddingRight: '10px' }} className='inputAdd'></input>

                    </div>
                    <div className='col-4' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection:'row-reverse' }}>
                            <h6>هزینه</h6>
                            <input onChange={this.changetext} name='cost' style={{ width: '150px', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '30px', paddingRight: '10px' }} className='inputAdd'></input>

                    </div>
                    <div className='col-4' style={{ paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'row-reverse' }}>
                            <h6>نام </h6>
                                                    <input onChange={this.changetext} name='name' style={{ width: '150px', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '30px', paddingRight: '10px' }} className='inputAdd'></input>

                    </div>
                    <div className='col-12'>
                    <div style={{display:"flex", justifyContent:'center',alignItems:'center',paddingTop:'50px', flexDirection:'row-reverse'}}>

                    <h6>عکس دوره</h6>
    <input type="file" id="file" onChange={(e) => this.onChange(e)} />


</div>

                    </div>
                    <div class='col-12 ' >

<h6 style={{ textAlign: 'right', paddingRight: '10px' }}>توضیحات</h6>
<textarea name='description' onChange={this.changetext} className='col-12' style={{ textAlign: 'right', backgroundColor: 'rgb(127, 127, 127,0.1)', height: '180px', borderColor: 'transparent' }}></textarea>
</div>
                    <div className='col-12' style={{display:"flex", justifyContent:'center',alignItems:'center' ,paddingTop:'50px'}}>
                    <Button onClick={this.saveedit} style={{ backgroundColor: '#4ce285', border: 'transparent', width: '150px', height: '50px', color: 'black', borderRadius: '10px' }}>ثبت</Button>
                    </div>
                        </div>

                    </Modal.Body>

                </Modal>
            
                <div className='col-12 ' >
                    <div  >
                        <div className='row'>
                            <div className='col-12'>
                                <div style={{ display: 'flex', flexDirection: 'row-reverse', textAlign: 'right' }}>
                                    <h3 style={{ paddingRight: '40px', paddingTop: '20px' }}>اضافه کردن آیتم آموزشی</h3>
                                </div>

                            </div>

                        </div>

                        <div className='row'>
                            <div className='col-12' style={{ textAlign: 'right' }}>
                                <div className='row' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div className='col-11'>
                                        <div className='content' >
                                            <div class='row' >
                                                <div class='col-4' style={{ display: 'flex', flexDirection: 'row-reverse', textAlign: 'right', paddingTop: '15px', justifyContent: 'center', alignItems: 'center' }}>
                                                    <h6>
                                                        هزینه
                                                    </h6>
                                                    <input style={{ width: '150px', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '30px', paddingRight: '10px' }} onChange={this.changetext} autoComplete='off' name='cost' className='inputAdd'></input>
                                                </div>
                                                <div class='col-4  ' style={{ display: 'flex', flexDirection: 'row-reverse', textAlign: 'right', paddingTop: '15px', justifyContent: 'center', alignItems: 'center' }}>
                                                    <h6>
                                                       تعداد جلسات
                                                    </h6>
                                                    <input onChange={this.changetext} name='count' style={{ width: '150px', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '30px', paddingRight: '10px' }} className='inputAdd'></input>

                                                </div>

                                                <div class='col-4 ' style={{ display: 'flex', flexDirection: 'row-reverse', textAlign: 'right', paddingTop: '15px', justifyContent: 'center', alignItems: 'center' }}>

                                                    <h6>نام محصول</h6>
                                                    <input onChange={this.changetext} name='name' style={{ width: '150px', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '30px', paddingRight: '10px' }} className='inputAdd'></input>

                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className='row' >
                            <div className='col-12' style={{ textAlign: 'right' }}>
                                <div className='row' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div className='col-11'>
                                        <div className='content' style={{ marginTop: '50px' }}>

                                            {/* <div class='row row1'  >
                                                <div class='col-12 ' style={{ textAlign: 'right', paddingRight: '50px', paddingTop:'20px' }}>

                                                    <h6 style={{ paddingTop: '7px' }}>
                                                        {i18n.t('AddClass.description')}
                                                    </h6>

                                                </div>




                                            </div> */}


                                            <div class='row row1'  >
                                                <div class='col-12 ' style={{ margin: '0px', marginTop: '10px', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                                                    <div>

                                                        <label id="largeFile" for="file">
                                                            <input type="file" id="file" onChange={(e) => this.onChange(e)} />

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
                                            <div class='row row1'  >
                                                <div class='col-12 ' style={{ mpaddingTop: '40vh', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection:'row' }}>
                                                    <div>
<h6 style={{paddingTop:'10px'}}>فیلم جلسات</h6>
                                                     
                                                            <input type="file" id="file" onChange={(e) => this.onChangeForDetail(e)} />

                                                      
                                                    </div>
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
                        <div className='col-2' style={{ textAlign: 'center' }}>
                                <h6>حذف</h6>
                            </div>
                        <div className='col-2' style={{ textAlign: 'center' }}>
                                <h6>ویرایش</h6>
                            </div>
                            <div className='col-2' style={{ textAlign: 'center' }}>
                                <h6>قیمت</h6>
                            </div>
                            <div className='col-3' style={{ textAlign: 'center' }}>
                                <h6>تعداد جلسات</h6>
                            </div>
                            <div className='col-3' style={{ textAlign: 'center' }}>
                                <h6>نام</h6>
                            </div>
                        </div>

                        {this.state.education.map((result, i) => (
                            <div className='row d-flex align-items-center'>
                                    <div className='col-2'  style={{  textAlign: 'center'}}>
                                <Button onClick={()=>this.deletePack(result.id)} style={{ backgroundColor: 'red', border: 'transparent', width: '150px', height: '50px', color: 'black', borderRadius: '10px' }}>حذف</Button>

                                </div>
                                <div className='col-2'  style={{  textAlign: 'center'}}>
                                <Button onClick={()=>this.showeditpop(result.id)} style={{ backgroundColor: '#4ce285', border: 'transparent', width: '150px', height: '50px', color: 'black', borderRadius: '10px' }}>ویرایش</Button>

                                </div>
                                <div className='col-2' style={{  textAlign: 'center' }}>

                                    {/* <img alt='' style={{ width: '80px' }} src={result.imageUrl}></img> */}

                                    {result.price + ' T'}



                                </div>
                                <div className='col-3' style={{ textAlign: 'center' }}>{result.sectionCount}</div>
                                <div className='col-3' style={{ textAlign: 'center' }}>
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