
import './App.css'
import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'
import { ChannelListContainer, ChannelContainer, Auth } from './components'
import axios from 'axios';
import 'stream-chat-react/dist/css/index.css'
import Landing from './components/Landing'
import {BrowserRouter as Router, Routes,Route,useNavigate} from 'react-router-dom'
const cookies = new Cookies();


const apikey = 'hcakaqp2cctj'
const client = StreamChat.getInstance(apikey)
const authToken = cookies.get("jwt");
const streamToken = cookies.get("streamToken");


// console.log(authToken);



// if(authToken) {
//     client.connectUser({
//         id: cookies.get('userId'),
//         email: cookies.get('email'),

//         name: cookies.get('username'),
//         fullName: cookies.get('fullName'),
//         image: cookies.get('avatarURL'),
//         hashedPassword: cookies.get('hashedPassword'),
//         phoneNumber: cookies.get('phoneNumber'),
//     }, authToken)
// }



const App = () => {
  const [currentUser, setCurrentUser] = useState()
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const URL = 'http://localhost:4000';
  //   async function getConnection(){
  //     const queryString=`?jwt=${authToken}&streamToken=${streamToken}`
  //   const {data:{message,user}}=await axios.post(`${URL}/test`+queryString)
  //   // Object.assign(currentUser,user)
  //     setCurrentUser(user)
  //   console.log(message);
  // }
  // getConnection()
  // console.log(currentUser);
  // console.log(currentUser.length);
  useEffect(() => {
    (async () => {
      const queryString = `?jwt=${authToken}`
      const { data: { message, user } } = await axios.post(`${URL}/test` + queryString)
      // Object.assign(currentUser,user)
      if (currentUser === undefined)
        setCurrentUser(user)
      console.log(message);
    })()
    // getConnection()

  }, [])
  const client = StreamChat.getInstance(process.env.API_KEY, process.env.API_SECRET, { allowServerSideConnect: true, })

  if (currentUser) {
    // await client.disconnectUser()


    client.connectUser({
      id: currentUser._id.toString(),
      username: currentUser.userName,
      name: currentUser.fullName,
      image: currentUser.avatarURL,
      email: currentUser.email,
      mobileNo: currentUser.mobileNo
    }, streamToken)
  }
  

  if (!currentUser) {
    return <Landing/>
  }


  return (
    <div className='app__wrapper'>
      <Chat client={client} theme="team-light  ">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>


    </div>


    
  )
}

export default App