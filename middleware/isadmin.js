//call this middleware on pages that you want only admin to use 

export default function ({ $auth, redirect }) {
  let user = $auth.user;
    if (user.scope === "admin" || user.scope === "superadmin") {
      
    }else {
      return redirect('/')
    }
}