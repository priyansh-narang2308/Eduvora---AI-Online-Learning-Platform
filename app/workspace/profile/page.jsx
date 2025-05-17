import { UserProfile } from '@clerk/nextjs';
import React from 'react'

const ProfilePage = () => {
  return (
    <div>
      <h2 className="font-bold text-3xl mb-7 p-4">Manage Your Profile</h2>
      <UserProfile/>
    </div>
  )
}

export default ProfilePage