export default function ({ $auth, redirect }) {
    let user = $auth.user;
      if (user.scope === "superadmin") {
        
      }else {
        return redirect('/')
      }
}