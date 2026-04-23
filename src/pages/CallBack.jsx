import React from 'react'
import Child from './Child'
import { useCallback } from 'react'
export default function CallBack() {
    // const handleSubmit=()=>{
    //     console.log("Button clicked in Child component")
    // }
    const handleSubmit=useCallback(()=>{
        console.log('')
    },[])
  return (
    <div>
        <Child handleSubmit={handleSubmit} />
    </div>
  )
}
