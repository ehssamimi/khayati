import React,{Component} from 'react';
import { Config } from '../../Utils'
class viner extends Component{
 componentDidMount(){
     var loc =window.location.href
     var arrloc=loc.split("?channel=")
     if(arrloc.length>1){
         var channel = arrloc[1]
         console.log(channel)
         window.location.replace(Config()['apiUrl']+'/viner/redirectWithRedirectView?channel='+channel)
     }
 }
 

render(){
    
    return (
    
          
          <div >
      
         
          </div>
       
      
      );
}
}

export default viner