import { useState, useEffect } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [user, setUserName] = useState('')
  const {signup, error, isLoading} = useSignup()
  const [formError, setFormError] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [userError, setUserError] =useState('')

  useEffect( () => {
    if (password !== confirmPassword) {
      setFormError('Passwords do not match')
    } else {
      setFormError('')
    }
  }, [confirmPassword, password])

  useEffect( () => {
    if (error === "Email is not valid" ){
      setEmailError(error)
    } else if (error === "Email already in use" ){
      setEmailError(error)
    } else {
      setEmailError('')
    }

    if(error === 'Password not strong enough') {
      setPasswordError(error)
    } else {
      setPasswordError('')
    }
  }, [error])

  const handleChange = (e, callback) => {
    callback(e.target.value)

    if(e.target.name === 'user') {
      if (e.target.value === "") {
        setUserError("Please enter your name")
      } else {
        setUserError('')
      }
    }
    
    if(e.target.name === 'email') {
      if (e.target.value === "") {
        setEmailError("Please enter your email")
      } else {
        setEmailError('')
      }
    }
    
    if(e.target.name === 'password') {
      if (e.target.value === "") {
        setPasswordError("Please enter your password")
      } else {
        setPasswordError('')
      }
    }

    if(e.target.name === 'confirm-password') {
      if (e.target.value === "") {
        setFormError("Please enter your password")
      } else {
        setFormError('')
      }
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user && !email && !password && !confirmPassword) {
      setUserError("Please enter your name");
      setEmailError("Please enter your email");
      setPasswordError("Please enter your password");
      setFormError("Please enter your password")
    }

    if(!user || !email || !password || !confirmPassword) {
      return;
    } else if(password !== confirmPassword) {
        return;
    } else {
      await signup(email, password, user);
    }
    
  }
  return (
    <form className="form-fix needs-validation rounded-lg" onSubmit={handleSubmit} noValidate>
    <h2 className="mb-4">Sign Up</h2>

    <div className="form-group mb-3">
      <label htmlFor="user" className="form-label">User name:</label>
      <input 
        type="text"
        id="user"
        className={`form-control ${userError && 'is-invalid'}`}
        name="user"
        onChange={(e) => handleChange(e, setUserName)} 
        value={user} 
        required
      />
      {userError && <div className="invalid-feedback">{userError}</div>}
    </div>

    <div className="form-group mb-3">
      <label htmlFor="email" className="form-label">Email address:</label>
      <input 
        type="email"
        id="email"
        className={`form-control ${emailError && 'is-invalid'}`}
        name="email"
        onChange={(e) => handleChange(e, setEmail)} 
        value={email} 
        required
      />
      {emailError && <div className="invalid-feedback">{emailError}</div>}
    </div>

    <div className="form-group mb-4">
      <label htmlFor="password" className="form-label">Password:</label>
      <input 
        type="password"
        id="password"
        className={`form-control ${passwordError && 'is-invalid'}`}
        name="password"
        onChange={(e) => handleChange(e, setPassword)} 
        value={password} 
        required
      />
      {passwordError && <div className="invalid-feedback">{passwordError}</div>}
    </div>

      <div className="form-group mb-4">
        <label htmlFor="confirm-password" className="form-label">Confirm Password:</label>
        <input 
          type="password"
          id="confirm-password"
          className={`form-control ${formError && 'is-invalid'}`}
          name="confirm-password"
          onChange={(e) => handleChange(e, setConfirmPassword)} 
          value={confirmPassword} 
          required
        />
        {formError && <div className="invalid-feedback">{formError}</div>}
      </div>
      <button className="btn btn-1" disabled={isLoading}>Sign up</button>
      {/* {error && <div className="text-danger mt-3">{error}</div>} */}
    </form>
  )
}

export default Signup
