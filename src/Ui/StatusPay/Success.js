import React, {useState, useEffect} from 'react';
import {Config} from "../../Utils";

import RowShowShowColEdit from "../Common/RowShowShowColEdit/RowShowShowColEdit";

const Success = (props) => {
    const [user, setUser] = useState(localStorage.getItem("purchaseAddress")?JSON.parse(localStorage.getItem("purchaseAddress")):null);
    useEffect(() => {
          SendAddress()
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);

    const SendAddress=()=>{
        var User = {}
        User.address = user.address
        User.city = user.city
        User.nationalCode = user.nationalCode
        User.no = user.no
        User.postalCode = user.postalCode
        User.productId = user.productId
        User.recieverName = user.recieverName
        User.recieverPhoneNumber = user.recieverPhoneNumber
        User.unit =user.unit
        User.province = user.province
        User.useGemType = user.useGemType!==undefined?user.useGemType:""

        var raw = JSON.stringify(User);
        // console.log(user)
        console.log(User)
        var requestOptions1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                // "Authorization": "Basic " + window.localStorage.getItem('basic')
            },
            body: raw,

        };

        fetch(Config()['apiUrl'] + `/product/purchase/?transactionId=${user.transactionId}`, requestOptions1)
            .then(response => {
                console.log(response)
                response.json().then(async rep => {
                    console.log( rep)

                    if (rep.status === 200) {
                         await localStorage.clear("purchaseAddress")
                        document.getElementById("goHome").click();

                    }

                })


            })
            .catch(error => console.log('error', error));
    }
    console.log(user)
    return (
        <div className='w-100'>
            {
                user?
                    <div className='container min-vh-100 pr-32 pl-32 d-flex flex-column'>
                        <div className= "d-flex flex-column justify-content-center align-items-center w-100" style={{marginTop:"11vh"}}>
                            <div className='text-center'>
                                <img src='/img/payment/success.svg' alt="loading" width={48} height={48}/>
                            </div>

                            <p className="pb-0 text-success  Fs-16 font-weight-500 text-center mt-3 mb-0 justify-content-between"> خرید   با موفقیت  انجام شد </p>
                            {/*<p className="pb-0 font-color-second font-weight-300 text-center Fs-14  mt-2">پکیج مورد نظر به ادرس : { user.address} ارسال می شود </p>*/}
                        </div>





                        <div className='mt-auto mb-32 flex-center ' id='goHome'>
                            <a href={'/'} className='p-2      flex-center  text-decoration-none btn btn-success'  style={{width:'200px', height:"45px"}}>
                                <span className={[' font-weight-bold   text-center   '  ].join('')}>بازگشت به اپلیکیشن</span>
                            </a>

                        </div>

                    </div> :""
            }

        </div>

    );
};

export default Success;