export default function ({ $auth, redirect }) {
    let user = $auth.user;
      if (user.scope === "seller" || "admin" || "superadmin" || "publisher") {
        
      }else {
        return redirect('/')
      }
}