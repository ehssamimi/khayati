import React, { Component } from 'react'

import './courseDetail.css'

import 'react-tabs/style/react-tabs.css';
import HomeIcon from '@material-ui/icons/Home';
import { Config } from '../../Utils'
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          category:[],
          height: '',
          show:false,
          title:'',
          path:'',
          description:'',
          attFile:''


        }
    }
    componentDidMount() {
        this.getDeatil()
    }
    transferTohome() {
        window.location.replace('/dashboard')
    }
getDeatil(){
 

    var requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            "Authorization": "Basic "+ window.localStorage.getItem('basic')

        }
     

    };
    // /education/section/{educationSectionId}
    fetch(Config()['apiUrl'] + "/education/section/"+window.localStorage.getItem('courseDetailId'), requestOptions)
   
    // fetch(Config()['apiUrl'] + "/education/"+window.localStorage.getItem('courseDetailId')+"/get-sections-videos", requestOptions)
        .then(response => {
           
        
           
                response.json().then(rep => {
console.log(rep)
              this.setState({
                  title:rep.title,
                  path:rep.path,
                  description:rep.description,
                  attFile:rep.attachedFilePath
              })

                })



            

        })
        .catch(error => console.log('error', error));
}

  
    render() {
        return (
            <div className='row'>
               <div className='col-3'  onClick={()=>window.location.replace('/dashboard')}><HomeIcon style={{width:'50px', height:'50px',cursor:'pointer'}}/></div>
                <div className='col-12' style={{textAlign:'center'}}>
                    <h6 style={{ paddingTop:'40px'}}>  {this.state.title}</h6>
                </div>
<div className='col-12' style={{display:'flex', justifyContent:'center', alignItems:'center',paddingTop:'20px'}}>
    <video controls style={{height:'250px',width:'400px'}} src={this.state.path}></video>
</div>
<div className='col-12' style={{textAlign:'center'}}>
<h6 style={{ paddingTop:'30px'}}>

{this.state.description}
</h6>
   
</div>
<div className='col-12' style={{textAlign:'center'}}>
<a style={{paddingTop:'30px'}} href={this.state.attFile}>فایل اضافه</a>
   
</div>

            </div>
        )
    }
}
export default Detail