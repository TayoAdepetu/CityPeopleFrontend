export default function ({ $auth, redirect }) {
    let user = $auth.user;
      if (user.scope === "publisher" || "admin" || "superadmin" || "seller") {
        
      }else {
        return redirect('/')
      }
}