import { ref } from 'vue'
import { useFirebaseAuth, useDocument, useDatabase } from 'vuefire'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'

import { doc, getDoc, updateDoc } from 'firebase/firestore'

const useCurrentUser = async () => {
  const auth = useFirebaseAuth()
  console.log('auth.currentUser', auth.currentUser)
  const user = ref(auth.currentUser)
  const db = useDatabase()

  onAuthStateChanged(auth, async (loggedInUser) => {
    console.log('onAuthStateChanged', loggedInUser)
    user.value = loggedInUser
    if (loggedInUser) {
      // const docRef = doc(db, 'Profiles', loggedInUser.uid)
      // const docSnap = await getDoc(docRef)
      // console.log(docSnap.data)
    }
  })

  // const db = useDatabase()
  // const docRef = await getDoc(db, 'Profiles', user.value?.uid)
  // const profileDoc = useDocument(docRef)

  const updateDisplayName = (displayName) => {
    return updateProfile(user.value, { displayName })
  }

  const updateUserProfile = (profile) => {
    // updateDoc(docRef, profile)
  }

  return { user, profile: {}, updateDisplayName, updateUserProfile }
}

export default useCurrentUser
