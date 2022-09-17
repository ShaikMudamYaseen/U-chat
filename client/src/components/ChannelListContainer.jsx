import React, { useState } from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react'
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';import chatLogo from '../assets/chatLogo.png'
import LogoutIcon from '../assets/logout.png'
import Cookies from 'universal-cookie';
// import { Item } from 'stream-chat-react/dist/components/AutoCompleteTextarea/Item';
const cookies = new Cookies();


const SideBar = ({ logout }) => (
    
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={chatLogo} alt="Chat" width="30" />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                <img src={LogoutIcon} alt="Logout" width="30" title='Logout' />
            </div>
        </div>
    </div>
);
const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">U-Chat</p>
    </div>
)
const customChannelTeamFilter=(list)=>{
    return list.filter((item)=>item.type==='team')
}
const customChannelMessagingFilter=(list)=>{
    return list.filter((item)=>item.type==='messaging')
}
const ChannelListContent = ({isCreating,setIsCreating,setCreateType,setIsEditing,setToggleContainer}) => {
    const {client}=useChatContext();
    const logout = ()=>{
        cookies.remove("jwt")
        cookies.remove("streamToken")
        window.location.reload()

    }
    const filters={members:{$in:[client.userID ]}}

    return (
        <>
            <SideBar logout={logout}/>
            <div className="channel-list__list__wrapper" style={{borderRadius:" 0px 15px 15px 0px"}}>
                <CompanyHeader />
                <ChannelSearch setToggleContainer={setToggleContainer} />
                <ChannelList filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listprops) => (
                        <TeamChannelList {...listprops}
                            type="team"
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType}
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                        setToggleContainer={setToggleContainer}
                        setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing}
                            {...previewProps}
                            type="team"
                        />
                    )}
                />
                 <ChannelList filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listprops) => (
                        <TeamChannelList
                        {...listprops}
                        type="messaging"
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType}
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                        setToggleContainer={setToggleContainer}
                        setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing}
                            {...previewProps}
                            type="messaging"
                        />
                    )}
                />  
            </div>

        </>
    );
}
const ChannelListContainer=({setIsCreating,setCreateType,setIsEditing})=>{
    const [toggleContainer,setToggleContainer]=useState(false)
    return(
        <>
        <div className='channel-list__container'>
            <ChannelListContent 
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
            />

        </div>
        <div className='channel-list__container-responsive' style={{left:toggleContainer ? "0%":"-89%",backgroundColor:"#005aaa"}}>
            <div className='channel-list__container-toggle' onClick={()=>setToggleContainer((prevtoggle)=>!prevtoggle)}>

            </div>
            <ChannelListContent 
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
            setToggleContainer={setToggleContainer}
            />
        </div>
        
        </>
    )

}

export default ChannelListContainer