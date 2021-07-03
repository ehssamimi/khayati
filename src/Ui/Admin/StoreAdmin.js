import React, {Component, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Modal, Nav, Navbar } from 'react-bootstrap';
import './Main.css'
import { Config } from '../../Utils'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Logo from '../../photo/logo.png'
import {AiOutlineCopy, AiOutlinePlus} from "react-icons/all";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {CenterModal} from "../Common/Modals/Modals";
import {UseModals} from "../Common/Hooks/UseModals/UseModals";


const PlusProduct=(props)=>{
     const [modalShow, setModalShow] = React.useState(false);
    const [text, setText] = React.useState(1);
     const handelSubmit=()=>{
         var Item={}

         Item.inventory=text
         Item.productId=props.id
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

         fetch(Config()['apiUrl'] + "/admin/products/inventory", requestOptions)
             .then(response => {

                 if(response.status===200){
                     response.json().then(rep => {
                         console.log(rep)
                         props.getItemShop();
                         setModalShow(false);

                     })
                 }

             })
             .catch(error => console.log('error', error));
     }

    return(
        <button className='mr-2' onClick={() => setModalShow(true)}><AiOutlinePlus/>

        <CenterModal  header={"افزایش محصول"}  onHide={() => setModalShow(false)}  show={modalShow}>
            <div className='w-100 d-flex justify-content-center align-items-center'>


               <button className="btn btn-success mr-3" onClick={handelSubmit}>ثبت</button>
                <input style={{
                    width: '150px',
                    backgroundColor: 'rgb(127, 127, 127,0.1)',
                    borderRadius: '10px',
                    borderColor: 'transparent',
                    height: '30px',
                    paddingRight: '10px'
                }} onChange={(e) => {
                    console.log(e.target.value);
                    setText(e.target.value)
                }} autoComplete='off' name='cost' className='inputAdd' value={text} type='number'/>
            </div>
        </CenterModal>
        </button>
    )



}
class AdminAddClass extends Component {
    componentDidMount() {
        console.log(this.state.name)
        this.getItemShop()
console.log(window.localStorage.getItem('basic'))
    }
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            cost: '',
            size: '',
            color:'',
            material:'',
            weight:'',
            description:'',
            file:'',
            product: [],
            blur:false,
            toast_blur:false,
            imageUrl:'',
            id_edit:''

        }
    }
    getItemShop() {
        var requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0" 

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

    changetext = (event) => {
        if (event.target.name === "color") {
            this.setState({
                color: event.target.value
            })
        }
        if (event.target.name === "cost") {
            this.setState({
                cost: event.target.value
            })
        }
        if (event.target.name === "name") {
            this.setState({
                name: event.target.value
            })
        }
        if (event.target.name === "material") {
            this.setState({
                material: event.target.value
            })
        }
        if (event.target.name === "weight") {
            this.setState({
                weight: event.target.value
            })
        }
        if (event.target.name === "description") {
            this.setState({
                description: event.target.value
            })
        }
        if (event.target.name === "size") {
            this.setState({
                size: event.target.value
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
        this.showSpinner()
        fetch(Config()['apiUrl']+'/user/uploadImg?mobile=09016991742',requestOptions)
            .then(response =>
                response.json().then(rep => {
                    console.log(rep)
                   
                        var spinner = document.getElementById("spinner");
                        spinner.className = "";
                        this.setState({
                     
                          imageUrl:rep.path,
                            blur: false,
                            toast_blur: false
                        })
                    
                })
            )

            .catch(error => console.log('error', error));


    }
    showSpinner() {

        var spinner = document.getElementById("spinner");
        this.setState({
            blur: true,
            toast_blur: true
        })
        // document.getElementById('main_div').disable=true
        spinner.className = "show";

    }

closeblur=()=>{
    this.setState({
        toast_blur:false
    })
}


last_submit=()=>{
   var Item={}
   Item.color=this.state.color
   Item.description=this.state.description
   Item.enable=true
   Item.imageUrl=this.state.imageUrl
   Item.material=this.state.material
   Item.name=this.state.name
   Item.price=parseInt(this.state.cost)
   Item.size=this.state.size
   Item.weight=this.state.weight
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0" 

        },
        body:JSON.stringify(Item)


    };
console.log(Item)
    fetch(Config()['apiUrl'] + "/admin/products", requestOptions)
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
    if(this.state.color!==''){
         Item.color=this.state.color  
    }
    if(this.state.description!==''){
        Item.description=this.state.description 
   }
   if(this.state.imageUrl!==''){
    Item.imageUrl=this.state.imageUrl
}
if(this.state.material!==''){
    
    Item.material=this.state.material
}
if(this.state.name!==''){
     Item.name=this.state.name
}
if(this.state.price!==''){
        Item.price=parseInt(this.state.cost)
}
if(this.state.size!==''){
    Item.size=this.state.size
}
if(this.state.imageUrl!==''){
   Item.weight=this.state.weight
}
Item.enable='true'
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
 
     fetch(Config()['apiUrl'] + "/product/edit", requestOptions)
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
deletePack=(id)=>{

     var requestOptions = {
         method: 'DELETE',
         headers: {
             'Content-Type': 'application/json',
             'Accept': '*/*',
             "Authorization": "Basic MDkwMTY5OTE3NDI6QlJUN0MxNjAyOTcxODczNzA0" 
 
         },
        
 
 
     };
 
     fetch(Config()['apiUrl'] + "/admin/products?productId="+id, requestOptions)
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
    render() {
        return (
            <div className=' row '>
                <div id="spinner" ></div>
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
                    <div class='row' >
                                                <div class='col-4' style={{ display: 'flex', flexDirection: 'row-reverse', textAlign: 'right', paddingTop: '15px', justifyContent: 'center', alignItems: 'center' }}>
                                                    <h6>
                                                        هزینه
                                                    </h6>
                                                    <input style={{ width: '150px', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '30px', paddingRight: '10px' }} onChange={this.changetext} autoComplete='off' name='cost' className='inputAdd'></input>
                                                </div>
                                                <div class='col-4  ' style={{ display: 'flex', flexDirection: 'row-reverse', textAlign: 'right', paddingTop: '15px', justifyContent: 'center', alignItems: 'center' }}>
                                                    <h6>
                                                        سایز لباس
                                                    </h6>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"

                                                        onChange={this.changetext}
                                                        name='size'
                                                        className='col-6'
                                                        value={this.state.typeid}>



                                                        <MenuItem value='SMALL' > S</MenuItem>
                                                        <MenuItem value='MEDIUM' > M</MenuItem>
                                                        <MenuItem value='LARGE' >L</MenuItem>
                                                        <MenuItem value='FREE' >Free</MenuItem>
                                                    </Select>
                                                </div>

                                                <div class='col-4 ' style={{ display: 'flex', flexDirection: 'row-reverse', textAlign: 'right', paddingTop: '15px', justifyContent: 'center', alignItems: 'center' }}>

                                                    <h6>نام محصول</h6>
                                                    <input onChange={this.changetext} name='name' style={{ width: '150px', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '30px', paddingRight: '10px' }} className='inputAdd'></input>

                                                </div>
                                            </div>
                                            <div class='row' >
                                                <div class='col-4' style={{ display: 'flex', flexDirection: 'row-reverse', textAlign: 'right', paddingTop: '15px', justifyContent: 'center', alignItems: 'center' }}>
                                                    <h6>
                                                        رنگ
                                                    </h6>
                                                    <input style={{ width: '150px', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '30px', paddingRight: '10px' }} onChange={this.changetext} autoComplete='off' name='color' className='inputAdd'></input>
                                                </div>
                                                <div class='col-4  ' style={{ display: 'flex', flexDirection: 'row-reverse', textAlign: 'right', paddingTop: '15px', justifyContent: 'center', alignItems: 'center' }}>
                                                    <h6>
                                                      اندازه
                                                    </h6>
                                                    <input onChange={this.changetext} name='weight' style={{ width: '150px', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '30px', paddingRight: '10px' }} className='inputAdd'></input>

                                                </div>

                                                <div class='col-4 ' style={{ display: 'flex', flexDirection: 'row-reverse', textAlign: 'right', paddingTop: '15px', justifyContent: 'center', alignItems: 'center' }}>

                                                    <h6>جنس</h6>
                                                    <input onChange={this.changetext} name='material' style={{ width: '150px', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '30px', paddingRight: '10px' }} className='inputAdd'></input>

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
            
                <div hidden={this.state.blur} className='col-12 ' >
                    <div  >
                        <div className='row'>
                            <div className='col-12'>
                                <div style={{ display: 'flex', flexDirection: 'row-reverse', textAlign: 'right' }}>
                                    <h3 style={{ paddingRight: '40px', paddingTop: '20px' }}>اضافه کردن آیتم فروشگاه</h3>
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
                                                        سایز لباس
                                                    </h6>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"

                                                        onChange={this.changetext}
                                                        name='size'
                                                        className='col-6'
                                                        value={this.state.typeid}>



                                                        <MenuItem value='SMALL' > S</MenuItem>
                                                        <MenuItem value='MEDIUM' > M</MenuItem>
                                                        <MenuItem value='LARGE' >L</MenuItem>
                                                        <MenuItem value='FREE' >Free</MenuItem>
                                                    </Select>
                                                </div>

                                                <div class='col-4 ' style={{ display: 'flex', flexDirection: 'row-reverse', textAlign: 'right', paddingTop: '15px', justifyContent: 'center', alignItems: 'center' }}>

                                                    <h6>نام محصول</h6>
                                                    <input onChange={this.changetext} name='name' style={{ width: '150px', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '30px', paddingRight: '10px' }} className='inputAdd'></input>

                                                </div>
                                            </div>
                                            <div class='row' >
                                                <div class='col-4' style={{ display: 'flex', flexDirection: 'row-reverse', textAlign: 'right', paddingTop: '15px', justifyContent: 'center', alignItems: 'center' }}>
                                                    <h6>
                                                        رنگ
                                                    </h6>
                                                    <input style={{ width: '150px', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '30px', paddingRight: '10px' }} onChange={this.changetext} autoComplete='off' name='color' className='inputAdd'></input>
                                                </div>
                                                <div class='col-4  ' style={{ display: 'flex', flexDirection: 'row-reverse', textAlign: 'right', paddingTop: '15px', justifyContent: 'center', alignItems: 'center' }}>
                                                    <h6>
                                                      اندازه
                                                    </h6>
                                                    <input onChange={this.changetext} name='weight' style={{ width: '150px', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '30px', paddingRight: '10px' }} className='inputAdd'></input>

                                                </div>

                                                <div class='col-4 ' style={{ display: 'flex', flexDirection: 'row-reverse', textAlign: 'right', paddingTop: '15px', justifyContent: 'center', alignItems: 'center' }}>

                                                    <h6>جنس</h6>
                                                    <input onChange={this.changetext} name='material' style={{ width: '150px', backgroundColor: 'rgb(127, 127, 127,0.1)', borderRadius: '10px', borderColor: 'transparent', height: '30px', paddingRight: '10px' }} className='inputAdd'></input>

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
                                                            <input  type="file" id="file" onChange={(e) => this.onChange(e)} />

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
                                {/*<h6>سایز</h6>*/}
                                <h6>موجودی</h6>
                            </div>
                            <div className='col-3' style={{ textAlign: 'center' }}>
                                <h6>نام</h6>
                            </div>
                        </div>

                        {this.state.product.map((result, i) => (
                            <div className='row'>
                                  <div className='col-2' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                              <Button onClick={()=>this.deletePack(result.id)} style={{ backgroundColor: 'red', border: 'transparent', width: '150px', height: '50px', color: 'black', borderRadius: '10px' }}>حذف</Button>
                                  </div>
                              <div className='col-2' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                              <Button onClick={()=>this.showeditpop(result.id)} style={{ backgroundColor: '#4ce285', border: 'transparent', width: '150px', height: '50px', color: 'black', borderRadius: '10px' }}>ویرایش</Button>
                                  </div>
                                <div className='col-2' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                                    {/* <img alt='' style={{ width: '80px' }} src={result.imageUrl}></img> */}

                                    {result.price + ' T'}



                                </div>
                                <div className='col-3 d-flex ' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'  }}><PlusProduct getItemShop={()=>{this.getItemShop()}} id={result.id} />{result.inventory} </div>
                                <div className='col-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
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