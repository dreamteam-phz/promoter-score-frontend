import React from 'react'

export default function Label(props) {
  return (
    <>
      <input key={props.id} type="radio" id={props.id} name={props.name} value={props.id} defaultChecked={props.checked} onChange={props.change} />
      <label name={props.id} htmlFor={props.id} onClick={props.onclick}>{props.content}</label>
    </>
  )
}