export default function ({ $auth, redirect }) {
    let user = $auth.user;
      if (user === "superadmin") {
        
      }else {
        return redirect('/')
      }
}