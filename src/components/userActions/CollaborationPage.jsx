import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../client'
import SettingsIcon from '@mui/icons-material/Settings';
import ProfileCard from '../etc/ProfileCard';
import { UserContext } from '../../App';

const CollaborationPage = () => {
    const navigate = useNavigate()

    const { user } = useContext(UserContext)
    const { id, status } = useParams()
    const [collaboration, setCollaboration] = useState({})
    const [ticketColor, setTicketColor] = useState('bg-gray-500')
    const [profiles, setProfiles] = useState([])
    

    const getCollaborationData = async () => {
        const { data, error } = await supabase
            .from('collaboration')
            .select('*')
            .eq('id', id)
        if (error) {
            console.error('Error fetching collaborations:', error.message)
            return
        }
        setCollaboration(data[0])
        console.log(data[0])
        return data[0]
    }

    const getProfileData = async (uid) => {
        const { data, error } = await supabase
            .from('usersInfo')
            .select('*')
            .in('uid', uid)
        if (error) {
            console.error('Error fetching profile:', error.message)
            return
        }
        console.log(data[0])
        return data[0]
    }

    useEffect(() => {
        const color = getCollaborationStatusColor()
        setTicketColor(color)
    
        const fetchData = async () => {
            const data = await getCollaborationData();
            if (data) {
                console.log('step1');
                const memberUids = data.executed_by_uids;
                console.log(memberUids, data.created_by_uid, "step2");
                if (memberUids) {
                    console.log('step3')
                    memberUids.forEach((uid) => {
                        getProfileData(uid).then((data) => {
                            setProfiles((prev) => [...prev, data]);
                        });
                    });
                }
                getProfileData(data.created_by_uid).then((data) => {
                    setProfiles((prev) => [...prev, data]);
                });
            }
        };
    
        fetchData();
    }, []);
    
    useEffect(() => {
        console.log(profiles, "profiles")
    }, [profiles])

    const getCollaborationStatusColor = () => {
        switch (status) {
            case 'active':
                return 'bg-green-500'
            case 'inactive':
                return 'bg-purple-500'
            case 'deleted':
                return 'bg-red-500'
            case 'completed':
                return 'bg-yellow-500'
            default:
                return 'bg-gray-500'
        }
    }

    const getAccessStatus = () => {
        const user_uid = user.id;
        let memberUids = [];
        if (collaboration.executed_by_uids !== null) {
            collaboration.executed_by_uids.forEach((item) => {
                memberUids.push(item);
            })
        }
        memberUids.push(collaboration.created_by_uid);
        if (memberUids.includes(user_uid)) {
            return true;
        }
        return false;
    }

    const goToEditPage = () => {
        if (getAccessStatus()) {
            navigate("/collaboration-page-edit/" + id)
        } else {
            alert("You don't have access to this page, please contact the creator of the collaboration or the members of the collaboration to get access.")
        }
    }



    return (
        <div>
            <div className='container mx-auto space-y-4 relative'>


                <div>
                    <img src={collaboration.idea && collaboration.idea.thumbnail} alt='collaboration' className='w-full h-[500px] object-contain' />
                </div>


                <div>
                    <div className='flex items-center gap-1 border-b-2 border-black'>
                        <p className='text-2xl'>Title: <span className='font-bold'>{collaboration.idea && collaboration.idea.title}</span></p>
                    </div>
                </div>

                <div>
                    <div className='flex items-center gap-1 border-b-2 border-black'>
                        <p className='text-2xl'>Help Needed</p>
                    </div>
                    <div className='flex items-center justify-center h-32'>
                        <p className='text-xl text-gray-500 italic'>Currently no help needed</p>
                    </div>
                </div>

                <div className='space-y-4'>
                    <div className='flex gap-1 border-b-2 border-black'>
                        <p className='text-2xl'>Updates</p>
                    </div>
                    <div className='shadow-md hover:text-white hover:bg-black py-1 px-4 cursor-pointer'>
                        <p className='text-lg'>Changed trash cans around PAOK stadium at <span className='text-gray-500'>10/03/2021</span></p>
                    </div>
                    <div className='shadow-md hover:text-white hover:bg-black py-1 px-4 cursor-pointer'>
                        <p className='text-lg'>Talked with president for issue at <span className='text-gray-500'>23/08/2020</span></p>
                    </div>
                    <div className='shadow-md hover:text-white hover:bg-black py-1 px-4 cursor-pointer'>
                        <p className='text-lg'>Changed trash cans in Tirolois at <span className='text-gray-500'>23/05/2018</span></p>
                    </div>
                </div>


                <div className='space-y-4'>
                    <div className='flex items-center gap-1 border-b-2 border-black'>
                        <p className='text-2xl'>Executing Members</p>
                    </div>
                    <div className='flex gap-4'>
                        <div className='flex flex-col items-center gap-1'>
                            <img src='https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/ProfileImages/1bbwcau78u4hp0mz9ybc2n1718552675807' alt='member' className='w-20 h-20 object-cover rounded-full' />
                            <p className='text-lg max-w-32  text-center'>Eleutherios Benizelos</p>
                        </div>
                        <div className='flex flex-col items-center gap-1'>
                            <img src='https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/ProfileImages/brexny8iuykqxpkdt1et6m1718552906890' alt='member' className='w-20 h-20 object-cover rounded-full' />
                            <p className='text-lg max-w-32  text-center'>Georgios Papandreou</p>
                        </div>
                        <div className='flex flex-col items-center gap-1'>
                            <img src='https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/ProfileImages/n2uizm0t6qsv6yk6lx03r1718553316373' alt='member' className='w-20 h-20 object-cover rounded-full' />
                            <p className='text-lg max-w-32  text-center'>Dora Bakogianni</p>
                        </div>
                    </div>
                </div>


                <div className='space-y-4'>
                    <div className='flex items-center gap-1 border-b-2 border-black'>
                        <p className='text-2xl'>Description</p>
                    </div>
                    <div className='space-y-1'>
                        {collaboration.idea && collaboration.idea.content.map((item, index) => {
                            if (item.type === 'paragraph' || item.type === 'bullets') {
                                return <p key={index} className='text-xl whitespace-pre-line'>{item.value}</p>
                            }
                            if (item.type === 'image') {
                                return <img key={index} src={item.value} alt={item.title} className='w-full h-[600px] object-left object-contain' />
                            }
                            return null
                        })}
                    </div>
                </div>
                <div className='space-y-4'>
                    <p className='text-2xl border-b-2 border-black'>Created at <span className='text-xl italic'>23/08/2015</span> By:</p>
                    <ProfileCard img='https://qokcqfzgzxiqcoswvfjr.supabase.co/storage/v1/object/public/Media/ProfileImages/n2uizm0t6qsv6yk6lx03r1718553316373' name='Dora' surname='Bakogianni' description={"Lorem ipsum etc that what it means to fight"} />
                </div>
                <div className={"absolute flex items-center gap-2 top-0 right-0 p-2 cursor-pointer hover:bg-black hover:text-white " + ticketColor} onClick={goToEditPage}>
                    <p className='font-semibold text-lg'>{collaboration.status && collaboration.status[0].toUpperCase() + collaboration.status.slice(1, collaboration.status.length)}</p>
                    <SettingsIcon className='relative top-[1px]' />
                </div>
            </div>
        </div>
    )
}

export default CollaborationPage