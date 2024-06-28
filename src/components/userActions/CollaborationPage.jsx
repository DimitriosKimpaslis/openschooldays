import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../client'
import SettingsIcon from '@mui/icons-material/Settings';
import ProfileCard from '../etc/ProfileCard';
import { UserContext } from '../../App';
import ArrowBack from '../etc/ArrowBack';

const CollaborationPage = () => {
    const navigate = useNavigate()

    const { user } = useContext(UserContext)
    const { id, status } = useParams()
    const [collaboration, setCollaboration] = useState({})
    const [ticketColor, setTicketColor] = useState('bg-gray-500')
    const [profiles, setProfiles] = useState([])
    const [creatorProfile, setCreatorProfile] = useState()

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
        return data[0]
    }

    const getProfileData = async (uid) => {
        const { data, error } = await supabase
            .from('usersInfo')
            .select('*')
            .eq('uid', uid)
        if (error) {
            console.error('Error fetching profile:', error.message)
            return
        }
        return data[0]
    }

    useEffect(() => {
        const color = getCollaborationStatusColor()
        setTicketColor(color)

        const fetchData = async () => {
            try {
                const data = await getCollaborationData();
                console.log(data);
                let created_by_uid = data.created_by_uid;
                if (data) {
                    let memberUids = [];
                    if (data.executed_by_uids !== null) {
                        data.executed_by_uids.forEach((uid) => {
                            memberUids.push({ uid });
                        })
                    }

                    let tempProfiles = [];
                    for (const uid of memberUids) {
                        const profileData = await getProfileData(uid.uid);
                        tempProfiles.push({ data: profileData });
                    }
                    let creatorProfile = tempProfiles.find((profile) => profile.data.uid === created_by_uid);
                    if (!creatorProfile) {
                        creatorProfile = await getProfileData(created_by_uid);
                        setCreatorProfile(creatorProfile)
                    } else {
                        setCreatorProfile(creatorProfile.data)
                    }
                    setProfiles(tempProfiles)
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        }

        fetchData();
    }, [])

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
            <div className='container mx-auto space-y-4 relative py-8'>
                <ArrowBack location={"/collaboration"} />

                <div>
                    <img src={collaboration.idea && collaboration.idea.thumbnail} alt='collaboration' className='w-full h-[500px] object-contain' />
                </div>


                <div>
                    <div className='flex items-center gap-1 border-b-2 border-black'>
                        <p className='text-2xl'><span className='font-bold text-4xl'>{collaboration.idea && collaboration.idea.title}</span></p>
                    </div>
                </div>

                <div>
                    <div className='flex gap-1 border-b-2 border-black mb-3'>
                        <p className='text-2xl'>Updates</p>
                    </div>
                    {collaboration.updates && collaboration.updates.length !== 0 ?
                        collaboration.updates.map((update, index) => {
                            const date = new Date(update.date).toDateString()
                            return <div key={index} className='shadow-md hover:text-white hover:bg-black py-1 px-4 cursor-pointer'>
                                <p className='text-lg'>{update.title} at {date}</p>
                            </div>
                        })
                        // <div className='space-y-4'>
                        //     <div className='shadow-md hover:text-white hover:bg-black py-1 px-4 cursor-pointer'>
                        //         <p className='text-lg'>Changed trash cans around PAOK stadium at <span className='text-gray-500'>10/03/2021</span></p>
                        //     </div>
                        //     <div className='shadow-md hover:text-white hover:bg-black py-1 px-4 cursor-pointer'>
                        //         <p className='text-lg'>Talked with president for issue at <span className='text-gray-500'>23/08/2020</span></p>
                        //     </div>
                        //     <div className='shadow-md hover:text-white hover:bg-black py-1 px-4 cursor-pointer'>
                        //         <p className='text-lg'>Changed trash cans in Tirolois at <span className='text-gray-500'>23/05/2018</span></p>
                        //     </div>
                        // </div>
                        :
                        <div className='flex justify-center items-center h-[200px]'>
                            <p className='text-xl text-gray-500'>No updates for this collaboration</p>
                        </div>}
                </div>


                <div className='space-y-4'>
                    <div className='flex items-center gap-1 border-b-2 border-black'>
                        <p className='text-2xl'>Executing Members</p>
                    </div>
                    {profiles.length === 0 &&
                        <div className='flex items-center justify-center h-32'>
                            <p className='text-xl text-gray-500'>No members executing this collaboration</p>
                        </div>
                    }
                    <div className='flex gap-4'>
                        {profiles.map((profile, index) => {
                            return <ProfileCard key={index} img={profile.data.image} name={profile.data.name} surname={profile.data.surname} description={profile.data.description} facebook={profile.data.facebook} instagram={profile.data.instagram} email={profile.data.email} telephone={profile.data.telephone} />
                        })}
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
                    <p className='text-2xl border-b-2 border-black'>Created at <span className='text-xl italic'>{new Date(collaboration.created_at).toDateString()}</span> By:</p>
                    {creatorProfile && <ProfileCard img={creatorProfile.image} name={creatorProfile.name} surname={creatorProfile.surname} description={creatorProfile.description} facebook={creatorProfile.facebook} instagram={creatorProfile.instagram} email={creatorProfile.email} telephone={creatorProfile.telephone} />}
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