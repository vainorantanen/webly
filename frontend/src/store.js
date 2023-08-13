import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notification'
import userReducer from './reducers/user'
import usersReducer from './reducers/users'
import devsPostReducer from './reducers/devsPosts'
import feedPostsReducer from './reducers/feedPosts'
import feedBidsReducer from './reducers/feedBids'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
    devsPosts: devsPostReducer,
    feedPosts: feedPostsReducer,
    feedBids: feedBidsReducer
  }
})

export default store