import React, { useEffect, useState } from 'react'
import { Avatar,useChatContext } from 'stream-chat-react'
import { InviteIcon } from '../assets'
// import { chatLogo } from '../assets'


const ListContainer=({children})=>{
  return(
    <div className='user-list__container'>
      <div className='user-list__header'>
        <p>user</p>
        <p>Invite</p>

      </div>
      {children}

    </div>
  )
}
const UsserItem=({user,setSelectedUsers})=>{
const [selected,setSelected]=useState(false)
const handleChange=()=>{
  if(selected){
    setSelectedUsers((previousUsers)=>previousUsers.filter((previousUsers)=>previousUsers!==user.id))
  }
  else{
    setSelectedUsers((previousUsers)=>[...previousUsers,user.id])
  }
  setSelected((preselected)=>!preselected)
}
  return(
    <div className='user-item__wrapper' onClick={handleChange}>
      <div className='user-item__name-wrapper'>
        <Avatar image={user.image } name={user.fullName || user.id} size={32}/>
        <p className='user-item__name'>{user.name || user.id}</p>

      </div>
      {selected?<InviteIcon/>:<div className='user-item__invite-empty' ></div>}

    </div>
  )
  
}

const UserList = ({setSelectedUsers}) => {
  const {client}=useChatContext()
  const [loading,setLoading]=useState(false)
  const [users,setUsers]=useState([])
  const [listIsEmpty,setListIsEmpty]=useState(false)
const [error,setError]=useState(false)
  useEffect(()=>{
      const getUsers=async()=>{
        if(loading) return
        setLoading(true)
        try{
          const response=await client.queryUsers(
            {id:{$ne:client.userID}},
            {id:1},
            {limit:10}
          )
          if(response.users.length){
            setUsers(response.users)
          }
          else{
            setListIsEmpty(true)
          }
          
        }catch(err){
          setError(true)
        }
        setLoading(false)
    }
    if(client) getUsers()
  },[])
  if(error){
    return(
      <ListContainer>

      <div className='user-list__message'>
          Error while loading please refresh or try again

        </div>
      </ListContainer>
    )
    
  }
  if(listIsEmpty){
    return(
      <ListContainer>

      <div className='user-list__message'>
          No users are Found.

        </div>
      </ListContainer>
    )
  }
  return (
      <ListContainer>
        {loading ? <div className='user-list__message'>
          Loading Users

        </div>:(
          users?.map((user,i)=>(
            <UsserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers}/>
          ))
        )}

      </ListContainer>
      
  )
}

export default UserList
