import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notification'
import { initializeUsers } from '../reducers/users'
import { initUser, clearUser } from '../reducers/user'
import { initializeFeedPosts } from '../reducers/feedPosts'
import { initializeDevsPosts } from '../reducers/devsPosts'
import { initializeFeedBids } from '../reducers/feedBids'
import { initializeBlogs } from '../reducers/blogs'
import { initializeRatings } from '../reducers/ratings'
import { initializeCustomerInfos } from '../reducers/customerinfo'
import { initializePortalBids } from '../reducers/portalBids'
import { initializePortalposts } from '../reducers/portalPosts'

export const useNotification = () => {
  const dispatch = useDispatch()

  return (message, type = 'info')  => {
    dispatch(notify(message, type))
  }
}

export const useInitialization = () => {
  const dispatch = useDispatch()

  return ()  => {
    dispatch(initializeUsers())
    dispatch(initializeFeedPosts())
    dispatch(initializeDevsPosts())
    dispatch(initializeFeedBids())
    dispatch(initializePortalposts())
    dispatch(initUser())
    dispatch(initializeBlogs())
    dispatch(initializeRatings())
    dispatch(initializePortalBids())
    dispatch(initializeCustomerInfos())
  }
}

export const useClearUser = () => {
  const dispatch = useDispatch()

  return ()  => {
    dispatch(clearUser())
  }
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}