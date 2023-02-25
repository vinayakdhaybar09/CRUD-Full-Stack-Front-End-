import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './view.css'
const View = () => {
    const [user, setUser] = useState({})
    const { id } = useParams()
    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then((res) => setUser({ ...res.data[0] }))
    }, [id])

    return (
        <div className='view_container'>
            <div className='view'>
                <h2>User contact details</h2>
                <br />
                <br />
                <br />
                <div>
                    <strong>ID: </strong>
                    <span>{user.id}</span>
                    <br />
                    <br />
                    <strong>Name: </strong>
                    <span>{user.name}</span>
                    <br />
                    <br />
                    <strong>Email: </strong>
                    <span>{user.email}</span>
                    <br />
                    <br />
                    <strong>Contact No. : </strong>
                    <span>{user.contact}</span>
                    <br />
                    <br />
                    <br />
                    <Link to={'/'}>
                        <input type="button" value='Go Back' className='btn_back' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View