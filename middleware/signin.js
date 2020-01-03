export default async ({ store, redirect }) => {
  if (store.state.auth.loggedIn) return redirect('/')
}
