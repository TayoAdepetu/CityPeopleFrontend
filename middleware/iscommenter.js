//call this middleware on pages that you want only commenter to use 

export default function ({ $auth, redirect }) {
    let user = $auth.user;
      if (user.scope === "commenter" || "admin" || "superadmin") {
        
      }else {
        return redirect('/')
      }
}