import React, { useEffect, useState } from 'react'

const UnmountTest = () => {
  useEffect(()=>{
    console.log('mount!!');
    return () => {
      console.log('unmount!!!!!!!!!!!!!')
    }
  },[]);

  return <div>Unmount Testing Component</div>
}

const Lifecycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);
  return (
    <div>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest/>}
    </div>
  )
}

export default Lifecycle