import { ref, onUnmounted } from 'vue'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  updateDoc as updateFirestoreDoc,
} from 'firebase/firestore'

const makeData = (doc) => {
  const data = { ...doc.data() }
  data.id = doc.id
  return data
}

const useDoc = async (path) => {
  const db = getFirestore()
  const docRef = doc(db, path)

  const data = ref({})

  const unsub = onSnapshot(docRef, (doc) => {
    data.value = makeData(doc)
  })
  onUnmounted(unsub)

  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    data.value = makeData(docSnap)
  } else {
    setDoc(docRef, {})
  }

  const updateDoc = async (data) => {
    return await updateFirestoreDoc(docRef, data)
  }

  return { data, updateDoc }
}

export default useDoc
