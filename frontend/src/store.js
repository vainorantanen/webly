import { configureStore } from '@reduxjs/toolkit'
import devsPostReducer from './reducers/devsPosts'
import feedBidsReducer from './reducers/feedBids'
import feedPostsReducer from './reducers/feedPosts'
import formDataReducer from './reducers/formData'
import notificationReducer from './reducers/notification'
import portalPostsReducer from './reducers/portalPosts'
import userReducer from './reducers/user'
import usersReducer from './reducers/users'
import blogsReducer from './reducers/blogs'
import ratingsReducer from './reducers/ratings'
import portalBidsReducer from './reducers/portalBids'
import customerinfoRouter from './reducers/customerinfo'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
    devsPosts: devsPostReducer,
    feedPosts: feedPostsReducer,
    feedBids: feedBidsReducer,
    portalPosts: portalPostsReducer,
    formData: formDataReducer,
    blogs: blogsReducer,
    ratings: ratingsReducer,
    portalBids: portalBidsReducer,
    customerInfos: customerinfoRouter
  }
})

export default store