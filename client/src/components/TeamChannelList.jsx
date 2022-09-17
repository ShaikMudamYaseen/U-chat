import React from 'react'
import { AddChannel } from '../assets'
const TeamChannelList = ({ children, error = false, loading, type,isCreating,setIsCreating,setCreateType,setIsEditing,setToggleContainer }) => {
  if (error) {
    console.log(error);
    return type === 'team' ? (
      <div className='team-channel-list'>
        <p className='team-channel-list__message'>
          Connection Error,Please Wait a moment or try again later...
        </p>
      </div>
    ) : null
  }
  if (loading) {
    return (
      <div className='team-channel-list'>
        <p className='team-channel-list__message loading'>
          {type === 'team' ? 'Channel' : 'Messages'}
        </p>
      </div>

    )
  }
return(
  <div className="team-channel-list">
    <div className="team-channel-list-header" style={{display:"flex" , alignItems:"center",justifyContent:"space-between",paddingRight:"1rem"}}>
    <p className='team-channel-list__message loading'>
          {type === 'team' ? 'Channel' : 'Direct Message'}
        </p>
        {/* button to create channel */}
        <AddChannel 
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        setCreateType={setCreateType}
        setIsEditing={setIsEditing} 
        type={type==="team"? "team" : "messaging" }
        setToggleContainer={setToggleContainer}z/>
        
    </div>
    {children}
  </div>
)
}

export default TeamChannelList