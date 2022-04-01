import React from 'react'

export default function Label(props) {
  return (
    <>
        <input key={props.id} type="radio" id={props.id} name="score" value={props.id} onChange={props.change} />
        <label htmlFor={props.id}>{props.id} </label>
    </>
  )
}
