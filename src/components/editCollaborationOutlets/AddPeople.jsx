import React, { useEffect, useState } from 'react'
import { supabase } from '../../client'
import { useOutletContext } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AddPeople = () => {
    const collaboration = useOutletContext();

    const [peopleNotInCollaboration, setPeopleNotInCollaboration] = useState([])
    const [peopleToAdd, setPeopleToAdd] = useState([])

    const getPeopleData = async () => {
        const { data, error } = await supabase
            .from('usersInfo')
            .select('*')
        if (error) {
            console.error('Error fetching users:', error.message)
            return
        }
        return data
    }

    useEffect(() => {
        const fetchData = async () => {
            getPeopleData().then((data) => {
                let peopleNotInCollaboration = [];
                data.forEach((person) => {
                    if (collaboration !== undefined && !collaboration.executed_by_uids?.includes(person.uid)) {
                        peopleNotInCollaboration.push({ ...person, showCheckIcon: false })
                    }
                })
                setPeopleNotInCollaboration(peopleNotInCollaboration)
            })
        }
        fetchData();
    }, [collaboration])



    const toggleCheckIcon = (person) => {

        const addPerson = (person) => {
            let tempPeopleToAdd = peopleToAdd;
            tempPeopleToAdd.push(person);
            setPeopleToAdd(tempPeopleToAdd);
        }

        const removePerson = (person) => {
            let tempPeopleToAdd = peopleToAdd;
            tempPeopleToAdd = tempPeopleToAdd.filter((p) => p.uid !== person.uid)
            setPeopleToAdd(tempPeopleToAdd);
        }

        peopleNotInCollaboration.forEach((p) => {
            if (p.uid === person.uid) {
                if (!p.showCheckIcon) {
                    addPerson(person)
                } else {
                    removePerson(person)
                }
                p.showCheckIcon = !p.showCheckIcon
            }
        })
        setPeopleNotInCollaboration([...peopleNotInCollaboration])
    }

    const handleUpdate = async () => {
        if (peopleToAdd.length === 0) {
            alert('Please select at least one person to add')
            return
        }
        let executed_by_uids = []
        executed_by_uids = peopleToAdd.map((person) => person.uid)
        if (collaboration.executed_by_uids !== null) {
            executed_by_uids.push(...collaboration.executed_by_uids)
        }
        let executed_by_names = []
        executed_by_names = peopleToAdd.map((person) => person.name + " " + person.surname)
        if (collaboration.executed_by_names !== null) {
            executed_by_names.push(...collaboration.executed_by_names)
        }
        console.log(executed_by_uids, executed_by_names);
        const { error } = await supabase
            .from('collaboration')
            .update({ executed_by_uids: executed_by_uids, executed_by_names: executed_by_names })
            .eq('id', collaboration.id)
        if (error) {
            console.error('Error updating collaboration:', error.message)
            return
        }
        console.log('Collaboration updated successfully')
        window.location.reload();
    }

    useEffect(() => {
        console.log(peopleToAdd)
    }, [peopleToAdd])

    return (
        <div >
            <p className='text-3xl my-5'>Add People</p>
            <p className='text-xl text-gray-500 mb-10'>Select people to add to the collaboration</p>
            {peopleNotInCollaboration.length > 0 ? (
                <div className='grid grid-cols-6 gap-3'>
                    {peopleNotInCollaboration.map((person) => {
                        return (
                            <div key={person.uid} className='flex flex-col items-center relative cursor-pointer lg:col-span-1 sm:col-span-2 col-span-3' onClick={() => toggleCheckIcon(person)}>
                                <div className='w-20 h-20 relative'>
                                    <img src={person.image} alt='member' className='w-20 h-20 object-cover rounded-full' />
                                    <div className='absolute inset-0 bg-black opacity-0 lg:hover:opacity-50 transition-opacity duration-100 rounded-full'></div>
                                </div>
                                <p className='text-center'>{person.name + " " + person.surname}</p>
                                {person.showCheckIcon && (
                                    <div className='absolute top-0 right-10'>
                                        <CheckCircleIcon className='text-green-500' />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className='flex justify-center items-center h-40'>
                    <p className='text-lg text-center text-gray-500'>No people to add</p>
                </div>
            )}
            <div className='flex justify-center mt-10'>
                <button onClick={handleUpdate} className='bg-green-500 hover:bg-green-600 text-white py-2 px-6'>Update</button>
            </div>
        </div>
    )
}

export default AddPeople