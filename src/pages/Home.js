import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import './home.css'

const Home = () => {

    const [data, setData] = useState([])

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get")
        setData(response.data)
    }

    useEffect(() => {
        loadData()
    }, [])

    const deleteHandle = async (id) => {
        if (window.confirm("Are you sure ?")) {
            axios.delete(`http://localhost:5000/api/remove/${id}`)
            toast.success("Contact deleted successfully")
            setTimeout(() => {
                loadData()
            }, 500);
        }
    }


    return (
        <div className='table_container'>
            <div>
                <Link to={'/addContact'}><button className='btn btn_add'>Add Contact</button></Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th className='th_big'>Name</th>
                            <th className='th_big'>Email</th>
                            <th>Contact</th>
                            <th className='th_big'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.contact}</td>
                                        <td className='td_action'>
                                            <Link to={`/update/${item.id}`}>
                                                <button className='btn btn_edit'>Edit</button>
                                            </Link>
                                            <button className='btn btn_delete' onClick={() => deleteHandle(item.id)}>Delete</button>
                                            <Link to={`/view/${item.id}`}>
                                                <button className='btn btn_view'>View</button>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home