import React from 'react'

export default function Label(props) {
  return (
    <>
        <input type="radio" id={props.id} name="rad" value={props.id}  />
        <label for={props.id}>{props.id} </label>
    </>
  )
}
