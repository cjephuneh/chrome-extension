import React, { useRef, useEffect, useState } from "react";


import Iframe from "@/components/supportchat/Iframe";
import SupportWindow from "@/components/supportchat/SupportWindow"
import Login from "@/components/react/login";

export default function Home(){
  const [visible, setVisible] = useState(false);
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            setVisible(false)
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [ref])

  return (
     <div ref={ref} className="h-96 z-50 border-0 w-80" >
              {/* <SupportWindow visible={visible} /> */}

                {/* <Iframe
                    onClick={() => setVisible(true)}
                    style={{
                      position: 'fixed',
                      bottom: '24px',
                      right: '24px',
                      height: '60%',
                      width: '100%'
                      
                    }}
                /> */}
                <Login />
            </div>
       
  )
}

