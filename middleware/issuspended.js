export default function ({ $auth, redirect }) {
    let user = $auth.user;
      if (user === "suspended") {
        
      }else {
        return redirect('/')
      }
}