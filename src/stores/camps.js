// import { collection } from 'firebase/firestore'
// import { useCollection, useFirestore } from 'vuefire'
import { ref } from 'vue'
import campsData from '@/data/camps.json'

const useCampsStore = () => {
  // const firestore = useFirestore()
  // const campsRef = collection(firestore, 'camps')
  // const camps = useCollection(campsRef)
  const camps = ref(campsData)
  function findById(id) {
    return camps.value.find((c) => c.id === id)
  }

  return { camps, findById }
}

export default useCampsStore
