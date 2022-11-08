export default function ({ $auth, redirect }) {
    let user = $auth.user;
      if (user.scope === "suspended") {
        
      }else {
        return redirect('/')
      }
}