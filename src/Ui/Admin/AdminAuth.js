import React, {useState, useEffect} from 'react';
import { Button ,Form,Card} from 'react-bootstrap';
import {ALertCenter} from "../Common/Modals/Modals";
import {Link, useHistory} from "react-router-dom";
 const AdminAuth = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [Push, setPush] = useState("/admin/dashboard");
    const [formData, setformData] = useState({user:"",password:""});
    // useEffect(() => {
    //     let lastName=props.location.state.from.pathname
    //     let Pushes=lastName!=="/admin-auth"?lastName:'/admin/dashboard'
    //     setPush(Pushes)
    //     // Update the document title using the browser API
    //     // return //for componentDidMount
    // }, [props]);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if (formData.user !=="adminart" || formData.password !=="adminart"){
            setIsOpen(true)
        }else {
            await localStorage.setItem("adminAccess",true)
            console.log( Push)

            document.location.reload()

            // props.location.state.referrer

         }


    }

    return (
        <div className="w-100 min-vh-100 flex-center">
            <Card >
                <Card.Body  >
                    <Form onSubmit={handleSubmit}>
                        <Card.Header className="text-center">ورود ادمین </Card.Header>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-right d-block" dir="rtl">نام کاربری:</Form.Label>
                            <Form.Control type="text" placeholder="نام کاربری را وارد کنید "    value={formData.user}  onChange={e=>{setformData({...formData,user:e.target.value})}}  />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="text-right d-block" dir="rtl">رمز عبور:</Form.Label>
                            <Form.Control type="password" placeholder="رمز عبور را وارد کنید" value={formData.password}  onChange={e=>{setformData({...formData,password:e.target.value})}}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="text-center">
                            ارسال
                        </Button>
                    </Form>
                </Card.Body>

            </Card>

            <ALertCenter    isOpen={isOpen}
            toggle={()=>{setIsOpen(!isOpen)}}
            text={"نام کاربری یا رمز عبور اشتباه است"}/>


        </div>
    );
};

export default AdminAuth;