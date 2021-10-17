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
        <div className="w-100 d-flex justify-content-center align-items-center" style={{background:  "aliceblue" }}>
            <div className="       overflow-x-hidden   BGMain    h-100    justify-content-center  align-items-center">

                <div className="w-100 main-logo-padding margin-p "  >

                    <div className="w-75  mr-auto ml-auto text-center position-relative">

                        <img src='./img/app/logo.png' className="img-width-logo  " alt={"logo"} style={{maxWidth:"200px"}}/>


                        {/*<span className=" position-absolute position-back-login" ><FaAlignRight/></span>*/}

                        {/*<p className="text-center Fs4 mb-0 color-header" >رزرو آنلاین ساعت تمرین</p>*/}
                    </div>
                    <p className="  mb-1     text-center  font-weight-bold YekanBakh glow" style={{color:"rgb(140 50 165)",fontSize:"calc(1em + 1vw)"}}>آموزشگاه مجازی هوم آرت </p>
                    <a  href='./HomeArt-0.1.apk' download className=" mt-4  d-flex align-items-center justify-content-center  pr-2 pl-2  "  style={{courser:"pointer"}}>
                        <img alt="get app"
                             src='./img/app/android.png' width="80%"  style={{maxWidth:"600px"}}  />

                    </a>
                    {/*<div className='fixed-action-btn'>*/}
                    {/*    <a  href='#' download className="   d-flex align-items-center justify-content-center pr-2 pl-2  "  style={{courser:"pointer"}}>*/}
                    {/*        <img alt="get app"*/}
                    {/*             src='./img/app/web.png' width="80%" style={{maxWidth:"600px"}}   />*/}

                    {/*    </a>*/}
                    {/*</div>*/}




                </div>

                <div>
                    {/*<div className="position-relative w-100   d-flex justify-content-center">*/}
                    {/*    <div className="position-relative  "   id="login1">*/}
                    {/*        <div className="d-flex justify-content-center  ">*/}
                    {/*            <Card.Body*/}
                    {/*                className="d-flex justify-content-center      card-login  pt-3 pb-3 pr-1 pl-1 pr-md-4 pl-md-4 pr-lg-4 pl-md-4 pr-xl-4 pl-xl-4  ">*/}
                    {/*                <div*/}
                    {/*                    className=" d-flex flex-column align-items-center w-100 padding-main-logo-2  ">*/}
                    {/*                    <p className="color-Landing-header mb-1 mt-2 Fs5   font-weight-bold YekanBakh">آموزشگاه مجازی هوم آرت </p>*/}

                    {/*                    <div className="w-100 d-flex justify-content-center  mt-3 mb-3">*/}

                    {/*                        <a  href='./HomeArt-0.1.apk' download className=" bg-badge   d-flex align-items-center  pr-2 pl-2  "  style={{courser:"pointer"}}>*/}
                    {/*                                <img alt="get app"*/}
                    {/*                                     src='./img/app/android.png' width="20%" height="60%" style={{maxHeight:'174px'}}/>*/}
                    {/*                            <span className="text-white"> دانلود اپلیکیشن</span>*/}

                    {/*                        </a>*/}




                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </Card.Body>*/}
                    {/*        </div>*/}




                    {/*    </div>*/}
                    {/*</div>*/}

                </div>

            </div>


        </div>
    );
};

export default DownloadApp;