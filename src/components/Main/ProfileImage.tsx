import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'


const PROFILE_IMAGE_LINK = 'https://avatars.githubusercontent.com/u/71740032?s=400&u=aec480e3f4477031c9851a3fd05bdec93295940f&v=4'

const ProfileImageWrapper = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  border-radius: 50%;
`

const ProfileImage: FunctionComponent = function () {
  return <ProfileImageWrapper src={PROFILE_IMAGE_LINK} alt="Profile Image" />
}

export default ProfileImage
