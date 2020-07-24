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
        <MdPerson className="text-xl" />
      </div>

      {visible && (
        <div className="absolute bg-white content-between mr-2 mt-12 right-0 shadow-md top-0 w-1/3">
          <div className="flex p-3">
            <MdPerson className="text-3xl text-6xl text-gray-800" />

            <div className="ml-4">
              <h1 className="font-bold">{user.username}</h1>
              <h2 className="text-base">{user.attributes.email}</h2>
            </div>
          </div>

          <div className="bg-gray-200 border-t p-2 text-right">
            <Button primary onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
