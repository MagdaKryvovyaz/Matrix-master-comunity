import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from "react-router-dom";
import baseApi from '../API';

export const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password ) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${baseApi}/api/routes/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password  })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // Navigate after sign up
      navigate(`/`);

      // update loading state
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}
