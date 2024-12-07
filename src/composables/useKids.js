import { collection, query, where, addDoc, setDoc, doc } from 'firebase/firestore'
import { useCollection, useFirestore } from 'vuefire'

const useKids = (parentEmail) => {
  const db = useFirestore()
  const colRef = collection(db, 'kids')
  const q = query(colRef, where('parentEmail', '==', parentEmail))
  const kids = useCollection(q, { ssrKey: 'no warning please' })

  const addKid = (name, dob) => {
    addDoc(colRef, { parentEmail, name, dob })
  }

  const updateKid = (kidId, name, dob) => {
    setDoc(doc(colRef, kidId), { parentEmail, name, dob })
  }

  return { kids, addKid, updateKid }
}

export default useKids
