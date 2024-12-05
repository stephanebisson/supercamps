import { ref } from 'vue'
import { collection, query, where, setDoc, doc } from 'firebase/firestore'
import { useFirestore, useDocument } from 'vuefire'

const useProfile = (email, readyCallback) => {
  const db = useFirestore()
  const colRef = collection(db, 'profiles')
  const q = query(colRef, where('email', '==', email))
  const profile = ref({})
  const { promise } = useDocument(q, { ssrKey: 'no warning please' })
  promise.value.then((data) => {
    profile.value = data[0]
    readyCallback && readyCallback()
  })

  const updateProfile = async (data) => {
    data.email = email
    const result = await setDoc(doc(db, '/profiles/' + profile.value.id), data)
    return result
  }

  return { profile, updateProfile }
}

export default useProfile
