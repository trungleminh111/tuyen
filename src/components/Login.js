import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { loginApi } from '../services/UserService';
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    useEffect(() => {
        let token = localStorage.getItem("token")
        if (token) {
            navigate("/")
            toast.success("Login successfuly")
        }
    }, [])
    const handleLogin = async () => {
        if (email === '' || password === '') {
            toast.error("vui lòng nhập đầy đủ thông tin")
            return;
        }

        let res = await loginApi(email, password)
        if (res && res.token) {

            localStorage.setItem("token", res.token)
            navigate("/")
            toast.success("Login successfuly")
        }
        else {
            if (res && res.status === 400) {
                toast.error(res.data.error)

            }
        }

    }
    return (

        <div className='container'>
            <div className="py-5"></div>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h4>Login form</h4>
                        </div>
                        <div className="card-body">

                            <div className="form-group">
                                <label htmlFor="">Email: eve.holt@reqres.in</label>
                                <input type="text"
                                    className='form-control'
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Password: cityslicka</label>
                                <input type="password"
                                    className='form-control'
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)} />
                            </div>
                            <div className="from-group">
                                <button className='btn btn-primary w-100 mt-2'
                                    onClick={() => handleLogin()}
                                >Login</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Login
