import { collection, updateDoc, doc } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

const useCamps = () => {
  const db = useFirestore()
  const colRef = collection(db, 'camps')
  const camps = useCollection(colRef)

  const updateCamp = (id, data) => {
    const docRef = doc(colRef, id)
    updateDoc(docRef, data)
  }

  return { camps, updateCamp }
}

export default useCamps
