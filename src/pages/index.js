/** @format */

import React, { useState, useEffect } from 'react'
import axios from 'axios'

function index() {
  const [text, setText] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:8082/check')
      .then((response) => {
        setText(response.data)
        console.log(response)
      })
      .catch((error) => {
        console.error('Error fetching data: ', error)
      })
  }, [])

  return <div>{text}</div>
}

export default index
