import useDoc from './useDoc'

const useProfile = async (email) => {
  const { data: profile, updateDoc } = await useDoc('profiles/' + email)

  const updateProfile = async (data) => {
    return await updateDoc(data)
  }

  return { profile, updateProfile }
}

export default useProfile
