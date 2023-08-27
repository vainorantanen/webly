import { configureStore } from '@reduxjs/toolkit'
import devsPostReducer from './reducers/devsPosts'
import feedBidsReducer from './reducers/feedBids'
import feedPostsReducer from './reducers/feedPosts'
import formDataReducer from './reducers/formData'
import notificationReducer from './reducers/notification'
import portalPostsReducer from './reducers/portalPosts'
import userReducer from './reducers/user'
import usersReducer from './reducers/users'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
    devsPosts: devsPostReducer,
    feedPosts: feedPostsReducer,
    feedBids: feedBidsReducer,
    portalPosts: portalPostsReducer,
    formData: formDataReducer
  }
})

export default store