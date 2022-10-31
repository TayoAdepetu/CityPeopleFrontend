export default function ({ $auth, redirect }) {
    let user = $auth.user;
      if (user === "seller") {
        
      }else {
        return redirect('/')
      }
}