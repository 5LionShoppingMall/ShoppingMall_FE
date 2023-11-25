import { useState, useEffect } from 'react'

export default function FieldError(name, value, validate) {
  const [error, setError] = useState(null)

  useEffect(() => {
    const errorMsg = validate(value)
    setError(errorMsg)
  }, [name, value, validate])

  return error
}
