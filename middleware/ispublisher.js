export default function ({ $auth, redirect }) {
    let user = $auth.user;
      if (user === "publisher" || "admin" || "superadmin") {
        
      }else {
        return redirect('/')
      }
}