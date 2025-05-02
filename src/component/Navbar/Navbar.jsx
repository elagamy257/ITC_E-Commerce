import React from 'react'
import img from '../../assets/images/freshcart.webp'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react';
import { userContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';


export default function Navbar() {
    let navigate = useNavigate()
    let { isLogin, setLogin } = useContext(userContext)
    let { cartNumber } = useContext(cartContext)


    function logOut() {
        localStorage.removeItem('userToken');
        setLogin(null);  //modify isLogin= null 
        navigate('/login')
    }



    return (
        <nav className='bg-dark-subtle px-3 shadow-sm'>
            <div className='d-flex flex-column flex-lg-row justify-content-between'>
                <div className='logo d-flex flex-column flex-lg-row'>
                    <img src={img} width='50' alt='logo' />

                    {isLogin ?   //isLogin = true
                        <ul className='d-flex flex-column flex-lg-row list-unstyled p-3'>
                            <li><NavLink to={''} className='text-decoration-none p-2'>Home</NavLink></li>
                            <li><NavLink to={'carts'} className='text-decoration-none p-2 position-relative '>
                                Carts
                                <span className="position-absolute top-0 start-100 translate-middle badge bg-warning text-dark rounded-circle">{cartNumber}</span></NavLink></li>
                            <li><NavLink to={'brands'} className='text-decoration-none p-2'>Brands</NavLink></li>
                        </ul> : null
                    }

                </div>

                <div className='social'>
                    <ul className='d-flex flex-column flex-lg-row p-3 list-unstyled'>

                        {!isLogin ? // isLogin = null
                            <>
                                <li><NavLink to={'register'} className='text-decoration-none p-2'>Register</NavLink></li>
                                <li><NavLink to={'login'} className='text-decoration-none p-2'>Login</NavLink></li>
                            </> :
                            <li className='px-2'><span onClick={() => { logOut() }}>Logout</span></li>
                        }

                        <li>
                            <i className='fab fa-facebook px-1'></i>
                            <i className='fab fa-youtube px-1'></i>
                            <i className='fab fa-instagram px-1'></i>
                        </li>
                    </ul>
                </div>

            </div>

        </nav>
    )
}

