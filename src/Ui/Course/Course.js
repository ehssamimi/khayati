import React, { Component } from 'react'
import HomeIcon from '@material-ui/icons/Home';
import './course.css'
import 'react-tabs/style/react-tabs.css';
import { Button } from 'react-bootstrap';
import Pin1 from '../../photo/pin.png'
import Pin2 from '../../photo/pin 2.png'
import Pin3 from '../../photo/pin 3.png'
import { Config } from '../../Utils'
class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: '',
     course:[]


        }
    }
    
    componentDidMount() {
        console.log(this.state.info)
        // console.log(document.getElementById("tab_list").offsetHeight)

        // this.setState({
        //     height: document.getElementById("tabpanel").offsetHeight - document.getElementById("tab_list").offsetHeight - 100
        // })
       
     

   
    this.getCourse()
    }
 getCourse(){
    var requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            "Authorization": "Basic "+ window.localStorage.getItem('basic')

        }
     

    };

    fetch(Config()['apiUrl'] + "/education/"+window.localStorage.getItem('id_course')+"?level="+window.localStorage.getItem('level'), requestOptions)
        .then(response => {
           
        
           
                response.json().then(rep => {
                    console.log(rep)
this.setState({
    course:rep
})
              

                })



            

        })
        .catch(error => console.log('error', error));
 }
checkWich(i,result){
    console.log(i)
    if(i===0){
        return [
<div style={{marginTop:'500px', marginLeft:'260px',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', position:'absolute'}}>
                       <img style={{ width:'40px',cursor:'pointer'}} onClick={()=>this.gotodetail(result.id)} alt='' src={Pin1}></img>
    <h6 >{result.title}</h6>
  
            </div>
        ]
   }
    if(i===1){
        return [
            <div style={{marginTop:'360px', marginLeft:'250px',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', position:'absolute'}}>
                                   <img style={{ width:'40px',cursor:'pointer'}} onClick={()=>this.gotodetail(result.id)} alt='' src={Pin2}></img>
                <h6 >{result.title}</h6>
              
                        </div>
                    ]
    }
    if(i===2){
        return [
            <div style={{marginTop:'280px', marginLeft:'200px',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', position:'absolute'}}>
                                   <img style={{ width:'40px',cursor:'pointer'}} onClick={()=>this.gotodetail(result.id)} alt='' src={Pin3}></img>
                <h6 >{result.title}</h6>
              
                        </div>
                    ]
    }
    if(i===3){
        return [
            <div style={{marginTop:'280px', marginLeft:'380px',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', position:'absolute'}}>
                                   <img style={{ width:'40px',cursor:'pointer'}} onClick={()=>this.gotodetail(result.id)} alt='' src={Pin1}></img>
                <h6 >{result.title}</h6>
              
                        </div>
                    ]
    }
    if(i===4){
        return [
            <div style={{marginTop:'360px', marginLeft:'530px',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', position:'absolute'}}>
                                   <img style={{ width:'40px',cursor:'pointer'}} onClick={()=>this.gotodetail(result.id)} alt='' src={Pin2}></img>
                <h6 >{result.title}</h6>
              
                        </div>
                    ]
    }
    if(i===5){
        return [
            <div style={{marginTop:'300px', marginLeft:'670px',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', position:'absolute'}}>
                                   <img style={{ width:'40px',cursor:'pointer'}} onClick={()=>this.gotodetail(result.id)} alt='' src={Pin3}></img>
                <h6 >{result.title}</h6>
              
                        </div>
                    ]
    }
    if(i===6){
        return [
            <div style={{marginTop:'540px', marginLeft:'600px',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', position:'absolute'}}>
                                   <img style={{ width:'40px',cursor:'pointer'}} onClick={()=>this.gotodetail(result.id)} alt='' src={Pin1}></img>
                <h6 >{result.title}</h6>
              
                        </div>
                    ]
    }
    if(i===7){
        return [
            <div style={{marginTop:'400px', marginLeft:'770px',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', position:'absolute'}}>
                                   <img style={{ width:'40px',cursor:'pointer'}} onClick={()=>this.gotodetail(result.id)} alt='' src={Pin2}></img>
                <h6 >{result.title}</h6>
              
                        </div>
                    ]
    }
    if(i===8){
        return [
            <div style={{marginTop:'360px', marginLeft:'900px',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', position:'absolute'}}>
                                   <img style={{ width:'40px',cursor:'pointer'}} onClick={()=>this.gotodetail(result.id)} alt='' src={Pin3}></img>
                <h6 >{result.title}</h6>
              
                        </div>
                    ]
    }
    if(i===9){
        return [
            <div style={{marginTop:'600px', marginLeft:'900px',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', position:'absolute'}}>
                                   <img style={{ width:'40px',cursor:'pointer'}} onClick={()=>this.gotodetail(result.id)} alt='' src={Pin1}></img>
                <h6 >{result.title}</h6>
              
                        </div>
                    ]  }

}
gotodetail=(id)=>{
window.localStorage.setItem('courseDetailId',id)
window.location.replace('/dashboard/course/detail')
}
  
    render() {
        return (
            <div  className='row'>
                  <div className='col-3'  onClick={()=>window.location.replace('/dashboard')}><HomeIcon style={{width:'50px', height:'50px',cursor:'pointer'}}/></div>
                <div className='col-12'>
              {this.state.course.map((result,i)=>(
                <div className='row' style={{display:'flex',justifyContent:'center', alignItems:'center',marginTop:'20px'}}>
<div className='col-sm-8 col-md-6'  style={{backgroundColor:'rgb(127,127,127,0.2)', height:'60px', borderRadius:'10px'}}>
<div >
    <div  style={{display:'flex', flexDirection:'row-reverse',marginTop:'10px', width:'300px',float:'right', marginRight:'10px'}}>
       <h6>{++i} </h6>    
           <h6> &nbsp;-&nbsp;</h6>       
    <h6>  {result.title}</h6> 
    </div>
           <div style={{marginTop:'10px', marginLeft:'10px'}}>
              <Button onClick={()=>this.gotodetail(result.id)} style={{ backgroundColor: '##909afc', borderColor: 'transparent', width: '80px', borderRadius: '10px' }}>مشاهده</Button>  
           </div>
 
            </div>
</div>
                </div>
                  
              ))}

                </div>

            </div>
        )
    }
}
export default Course