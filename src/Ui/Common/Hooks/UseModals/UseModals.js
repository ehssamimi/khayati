import { useState, useEffect } from "react";


export function UseModals() {
    const [Modal, setModal] = useState({isOpen:false,type:""});


    // useEffect(() => {
    //     const audio = document.getElementById("audio");
    //     console.log(';audioaudio;audioaudio;audioaudio')
    //     console.log(audio)
    //
    //     // state setters wrappers
    //     const setAudioData = () => {
    //         setDuration(audio.duration);
    //         setCurTime(audio.currentTime);
    //     }
    //
    //     const setAudioTime = () => setCurTime(audio.currentTime);
    //
    //     // DOM listeners: update React state on DOM events
    //     audio.addEventListener("loadeddata", setAudioData);
    //
    //     audio.addEventListener("timeupdate", setAudioTime);
    //
    //     // React state listeners: update DOM on React state changes
    //     // playing ? audio.play() : audio.pause();
    //
    //     if (clickedTime && clickedTime !== curTime) {
    //         audio.currentTime = clickedTime;
    //         setClickedTime(null);
    //     }
    //
    //     // effect cleanup
    //     return () => {
    //         audio.removeEventListener("loadeddata", setAudioData);
    //         audio.removeEventListener("timeupdate", setAudioTime);
    //     }
    // });
    const toggleModal=(type)=>{
        setModal({isOpen:!Modal.isOpen,type:type})
    }

    return {
        Modal,toggleModal
    }
}

