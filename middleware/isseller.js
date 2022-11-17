export default function ({ $auth, redirect }) {
    let user = $auth.user;
      if (user.scope === "seller" || user.scope === "admin" || user.scope === "superadmin" || user.scope === "publisher") {
        
      }else {
        return redirect('/')
      }
}