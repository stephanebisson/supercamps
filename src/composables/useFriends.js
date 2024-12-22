import { computed } from 'vue'
import { collection, doc, query, where, setDoc, deleteDoc } from 'firebase/firestore'
import { getCurrentUser, useCollection, useFirestore } from 'vuefire'
import useProfile from './useProfile'

const useFriends = async () => {
  const db = useFirestore()
  const user = await getCurrentUser()
  const { profile, updateProfile } = await useProfile(user.email)
  const requestsColRef = collection(db, 'friend_requests')
  const { data: profiles } = useCollection(collection(db, 'profiles'))

  const friends = computed(() => profile.value?.friends || [])
  const incomings = useCollection(query(requestsColRef, where('to', '==', user.email)))
  const outgoings = useCollection(query(requestsColRef, where('from', '==', user.email)))

  const people = computed(() => {
    if (!profiles.value) {
      return []
    }
    return profiles.value.map((p) => ({ email: p.id, name: p.name }))
  })

  const hasOutgoing = (email) => {
    if (!outgoings.value) {
      return false
    }
    return outgoings.value.some((o) => o.to === email)
  }

  const hasIncoming = (email) => {
    if (!incomings.value) {
      return false
    }
    return incomings.value.some((o) => o.from === email)
  }

  const searchCandidates = computed(() => {
    if (!people.value) {
      return []
    }
    return people.value
      .filter(
        (p) => (profile.value.friends || []).indexOf(p.email) === -1 && p.email !== user.email,
      )
      .map((p) => {
        if (hasOutgoing(p.email)) {
          p.outgoing = true
        }

        if (hasIncoming(p.email)) {
          p.incoming = true
        }

        return p
      })
  })

  const search = (str) => {
    if (str) {
      str = str.toLowerCase()
      return searchCandidates.value.filter((p) => p.name.toLowerCase().indexOf(str) !== -1)
    } else {
      return searchCandidates.value
    }
  }

  const request = (email) => {
    const path = `/friend_requests/${user.email}-${email}`
    const data = { from: user.email, to: email }
    return setDoc(doc(db, path), data)
  }

  const addFriend = (profile, friendEmail, updateProfile) => {
    const friends = profile.friends || []
    if (friends.indexOf(friendEmail) === -1) {
      friends.push(friendEmail)
      updateProfile({ friends })
    }
  }

  const accept = async (email) => {
    // Add email to my friends
    addFriend(profile.value, email, updateProfile)

    // add my email to friend's profile
    const { profile: friendProfile, updateProfile: updateFriendProfile } = await useProfile(email)
    addFriend(friendProfile, user.email, updateFriendProfile)

    // delete the request
    const path = `/friend_requests/${email}-${user.email}`
    return deleteDoc(doc(db, path))
  }
  const ignore = (email) => {
    const path = `/friend_requests/${email}-${user.email}`
    return deleteDoc(doc(db, path))
  }

  const cancel = (email) => {
    const path = `/friend_requests/${user.email}-${email}`
    return deleteDoc(doc(db, path))
  }

  return { friends, search, incomings, outgoings, request, accept, ignore, cancel }
}

export default useFriends
