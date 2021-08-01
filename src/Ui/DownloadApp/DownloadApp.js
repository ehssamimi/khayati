import React, {useState, useEffect} from 'react';
import {Card} from "react-bootstrap";


const DownloadApp = (props) => {
    // const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);
    const handelDownload=()=>{

    }

    return (
        <div className="w-100" style={{background:  "aliceblue" }}>
            <div className="  min-vh-100    overflow-x-hidden   BGMain    h-100    justify-content-center  align-items-center">

                <div className="w-100 main-logo-padding margin-p "  >

                    <div className="w-75  mr-auto ml-auto text-center position-relative">

                        <img src='./logo192.png' className="img-width-logo  " alt={"logo"}/>


                        {/*<span className=" position-absolute position-back-login" ><FaAlignRight/></span>*/}

                        {/*<p className="text-center Fs4 mb-0 color-header" >رزرو آنلاین ساعت تمرین</p>*/}
                    </div>


                </div>

                <div>
                    <div className="position-relative w-100   d-flex justify-content-center">
                        <div className="position-relative  "   id="login1">
                            <div className="d-flex justify-content-center  ">
                                <Card.Body
                                    className="d-flex justify-content-center      card-login  pt-3 pb-3 pr-1 pl-1 pr-md-4 pl-md-4 pr-lg-4 pl-md-4 pr-xl-4 pl-xl-4  ">
                                    <div
                                        className=" d-flex flex-column align-items-center w-100 padding-main-logo-2  ">
                                        <p className="color-Landing-header mb-1 mt-2 Fs5   font-weight-bold YekanBakh">دانلود
                                            اپلیکیشن هوم آرت </p>
                                        <p className="color-login-sub mb-1 mt-3 Fs3 padding-text-logo-2 text-center">جهت
                                            دانلود از لینک  زیر اقدام فرمایید </p>
                                        <div className="w-100 d-flex justify-content-center  mt-3 mb-3">

                                            <a  href='./HomeArt-0.1.apk' download className=" bg-badge   d-flex align-items-center  pr-2 pl-2  "  style={{courser:"pointer"}}>
                                                    <img alt="get app"
                                                         src='./logo192.png' width="20%" height="60%" style={{maxHeight:'174px'}}/>
                                                <span className="text-white"> دانلود اپلیکیشن</span>

                                            </a>




                                        </div>
                                    </div>
                                </Card.Body>
                            </div>




                        </div>
                    </div>

                </div>

            </div>


        </div>
    );
};

export default DownloadApp;