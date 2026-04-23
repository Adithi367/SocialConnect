import React from 'react'

export default function Child({handleSubmit}) {
  return (
    <div>
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
