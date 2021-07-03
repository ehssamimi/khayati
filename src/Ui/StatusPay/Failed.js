import React, {useState, useEffect} from 'react';

const Failed = (props) => {
    // const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);

    return (
        <div className='container min-vh-100 pr-32 pl-32 d-flex flex-column'>
            <div className= "d-flex flex-column justify-content-center align-items-center w-100" style={{marginTop:"11vh"}}>
                <div className='text-center'>
                    <img src='/img/payment/error-icon.svg' alt="loading" width={48} height={48}/>
                </div>
                <p className="pb-0 text-danger  Fs-16 font-weight-500 text-center mt-3 mb-0 justify-content-between"> خطایی در پرداخت ایجاد شده    </p>

                 {/*<p className="pb-0 font-color-second font-weight-300 text-center Fs-14  mt-2">پکیج مورد نظر به ادرس : { user.address} ارسال می شود </p>*/}
            </div>





            <div className='mt-auto mb-32 flex-center ' id='goHome'>
                <a href={'/'} className='p-2      flex-center  text-decoration-none btn btn-success'  style={{width:'200px', height:"45px"}}>
                    <span className={[' font-weight-bold   text-center   '  ].join('')}>بازگشت به اپلیکیشن</span>
                </a>

            </div>

        </div>
    );
};

export default Failed;