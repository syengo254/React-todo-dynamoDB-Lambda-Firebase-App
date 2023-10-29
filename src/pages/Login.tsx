import UseAuth from "../hooks/useAuth"

export default function LoginPage() {
  const { SignIn } = UseAuth();

  return (
    <>
      <button className='login-with-google-btn' onClick={SignIn}>Sign in with Google</button>
      <div>Sign in to view your tasks.</div>
    </>
  )
}
