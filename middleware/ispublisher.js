export default function ({ $auth, redirect }) {
    let user = $auth.user;
      if (user.scope === "publisher" || user.scope === "admin" || user.scope === "superadmin" || user.scope === "seller") {
        
      }else {
        return redirect('/')
      }
}