import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa"
import { UsersModal } from "./UsersModal";
import axios from "axios";


export default function Users () {

    const [ dataUser, setDataUser ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ deleteModal, setDeleteModal ] = useState(false);
    const [ userId, setUserId ] = useState();

    useEffect(() => {

        const getData = () => {
            setIsLoading(true);
            axios.get("http://localhost:3977/users")
                .then((res) => {
                    const dataJson = res.data;
                    const dataToString = JSON.stringify(dataJson)
                    const dataP = JSON.parse(dataToString);
                    setDataUser(dataP);
                    console.log(dataP);
                })
                .catch(error => {
                    console.log(error)})
                .finally(
                    setIsLoading(false)
                )
        }

        getData();

    }, []);

    if (isLoading) {
        return (
            <div>Cargando datos...</div>
        )
    }

    const usersRole = dataUser.filter((u) => u.role === 'ROLE_USER')

    
    const handleDeleteModal = (index) => {
        setDeleteModal(true);
        const newArr = [...dataUser];
        const userI = newArr[index];
        const { _id } = userI
        setUserId(_id);
    } 

    const closeDeleteModal = () => {
        setDeleteModal(false);
    }

    const deleteUser = (id) => {
        const data = {
            data:{id}
        };

        axios
            .delete('http://localhost:3977/users/id', data)
            .then(res => console.log(res.data))
            .catch(err => 
                console.log(err)
            )
            .finally(
                setDeleteModal(false)
            )
        
        window.location.reload();
        console.log(id);
    }

    return (
        <div className="users-table">
            <div className="table-container">
                <table>
                    <thead className="table-head">
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th className="table-btn">Eliminar</th>
                        </tr>
                    </thead>
                <tbody>
                    {usersRole.map((d, index) => {
                    return ( 
                        <tr className="table-data" id={d.id}>
                            <td>{d.name}</td>
                            <td>{d.surname}</td>
                            <td>{d.email}</td>
                            <td className="table-btn">
                                <button 
                                    key={d.id}
                                    type="button" 
                                    className="btn-table"
                                    onClick={() => handleDeleteModal(index)}    
                                ><FaTrashAlt/>
                                </button>
                            </td>
                        </tr>
                    )})}
                </tbody>
                </table>
                {deleteModal && <UsersModal 
                    closeDeleteModal={closeDeleteModal}
                    deleteUser={(id) => deleteUser(id)}
                    id={userId}
                />}
            </div>
        </div>
    );
};