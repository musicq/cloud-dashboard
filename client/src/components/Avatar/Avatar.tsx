import React, {useState} from 'react'
import {MdPerson} from 'react-icons/md'
import {Auth$, UserInfo} from '../../services/auth.service'
import {CProps} from '../../types'
import {Button} from '../Button'

interface AvatarProps {
  user: UserInfo
}

export const Avatar = ({user}: CProps<AvatarProps>) => {
  const [visible, setVisible] = useState(false)

  const onOpenMenu = () => setVisible(!visible)

  const onLogout = async () => Auth$.signOut()

  if (!user) {
    return <div>Login</div>
  }

  return (
    <>
      <div
        className="border cursor-pointer p-2 rounded-full text-white hover:bg-blue-800"
        onClick={onOpenMenu}
      >
        <MdPerson className="text-xl"/>
      </div>

      {visible && (
        <div
          className="absolute shadow-md bg-white border mt-12 p-3 right-0 rounded top-0 w-1/3 mr-2 content-between">
          <div className="flex">
            <MdPerson className="text-3xl text-6xl text-gray-800"/>

            <div className="ml-4">
              <h1 className="text-xl font-bold">{user.username}</h1>
              <h2 className="text-xl">{user.attributes.email}</h2>
            </div>
          </div>

          <div className="border-t pt-4 text-right">
            <Button primary onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
