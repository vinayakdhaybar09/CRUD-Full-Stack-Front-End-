
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import './addedit.css'

const initialState = {
    name: "",
    email: "",
    contact: "",
}

const AddEdit = () => {
    const [state, setState] = useState(initialState)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then((res) => setState({ ...res.data[0] }))
    }, [id])



    const { name, email, contact } = state

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !email || !contact) {
            toast.error("Please provide value into each input field")
            console.log("Please provide value into each input field");
        } else {
            if (!id) {
                axios.post("http://localhost:5000/api/post", {
                    name,
                    email,
                    contact
                }).then(() => {
                    toast.success('Contact added succesfully')
                    setState({ name: "", email: "", contact: "" })
                }).catch((err) => {
                    toast.error(err.response.data)
                })
            } else {
                axios.put(`http://localhost:5000/api/put/${id}`, {
                    name, email, contact
                }).then(() => {
                    toast.success('Contact added succesfully')
                }).catch((err) => {
                    toast.error(err.response.data)
                })
            }
            setTimeout(() => {
                navigate('/')
            }, 500);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    return (
        <div className='form_container'>
            <form className='contact_form'>
                <input type="text" name='name' value={name || ""} onChange={handleInputChange} placeholder='Full Name' />
                <input type="text" name='email' value={email || ""} onChange={handleInputChange} placeholder='Email id' />
                <input type="text" name='contact' value={contact || ""} onChange={handleInputChange} placeholder='Contact No.' />
                <input type="submit" value={id ? "Update" : 'Save'} className='btn_save' onClick={(e) => handleSubmit(e)} />
                <Link>
                    <input type="button" value='Go Back' className='btn_back' />
                </Link>
            </form>
        </div>
    )
}

export default AddEdit