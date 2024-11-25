import { ref } from 'vue'
import { defineStore } from 'pinia'
import campsFile from '../data/camps.json'

const useCampsStore = defineStore('camps', () => {
  const camps = ref(campsFile)
  function findByName(name) {
    return camps.value.find((c) => c.name === name)
  }

  return { camps, findByName }
})

export default useCampsStore
