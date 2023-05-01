    import { useState, useEffect } from "react"
    import { useLogin } from "../hooks/useLogin"
    
    const Login = () => {
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const {login, error, isLoading} = useLogin()
      const [loginError, setLoginError] = useState('')
      const [passwordError, setPasswordError] = useState('')


    
      const handleSubmit = async (e) => {
    
        e.preventDefault()
        if (email === '') {
          setLoginError('Email is required')
        } else  if(error === "Incorrect email" ) {
          setLoginError(error)
        }else {
          setLoginError('')
        }
        
        if (password === '') {
          setPasswordError('Password is required')
        } else if(error === "Incorrect password" ) {
          setPasswordError(error)
        }else {
          setPasswordError('')
        }

        await login(email, password);

      }
  
      useEffect( () => {
        if(error === "Incorrect email" ) {
          setPasswordError('')
          setLoginError(error)
        }
        if(error === "Incorrect password" ) {
          setLoginError('');
          setPasswordError(error)
        }
      }, [error])
    
    
      return (
        <form className="form-fix needs-validation rounded-lg" onSubmit={handleSubmit} noValidate>
          <h2 className="mb-4">Login</h2>
          <div className="form-group mb-3">
            <label htmlFor="emailL" className="form-label">Email address:</label>
            <input 
              type="email"
              id="emailL"
              className={`form-control ${loginError && 'is-invalid'}`}
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
            />
            {loginError && <div className="invalid-feedback">{loginError}</div>}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="passwordL" className="form-label">Password:</label>
            <input 
              type="password"
              id="passwordL"
              className={`form-control ${passwordError && 'is-invalid'}`}
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
            />
            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
          </div>
          <button className="btn btn-1" style={{weight:"80px", height: "40px"}} disabled={isLoading}>
            {isLoading ? (
              <div className="d-flex justify-content-between">
                <div >
                   <p >Login</p>
                </div>
                <div className="spinner-border spinner-border-sm" role="status" style={{marginLeft:"20px", marginTop:"3px"}} >
                  <span className="sr-only" ></span>
                </div>
              </div>
            ) : (
              'Login'
            )}
          </button>
       
            
        </form>
      )
    }
    
    export default Login
    