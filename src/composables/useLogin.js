import { useFirebaseAuth } from 'vuefire'
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  getAdditionalUserInfo,
} from 'firebase/auth'

const useLogin = () => {
  const auth = useFirebaseAuth()

  const options = {
    url: 'http://localhost:5173/loginconfirm',
    handleCodeInApp: true,
  }
  const startLogin = async (email) => {
    const result = { result: null }
    try {
      await sendSignInLinkToEmail(auth, email, options)
      window.localStorage.setItem('emailForSignIn', email)
      result.result = true
    } catch (error) {
      result.result = false
      result.error = error
    }
    return result
  }

  const confirmLogin = async (email) => {
    const result = { result: null }
    if (isSignInWithEmailLink(auth, window.location.href)) {
      try {
        const response = await signInWithEmailLink(auth, email, window.location.href)
        window.localStorage.removeItem('emailForSignIn')
        result.result = true
        result.info = getAdditionalUserInfo(response)
      } catch (error) {
        result.result = false
        result.error = error
      }
    } else {
      result.result = false
      result.error = 'invalid login link'
    }
    return result
  }

  return {
    startLogin,
    confirmLogin,
  }
}

export default useLogin
