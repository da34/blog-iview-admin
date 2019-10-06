const getters = {
  token: state => state.user.token,
  username: state => state.user.username,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  addRoutes: state => state.permission.addRoutes,
  routes: state => state.permission.routes
}

export default getters
