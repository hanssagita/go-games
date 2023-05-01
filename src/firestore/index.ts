import { DatabaseReference, child, get, ref, set } from 'firebase/database'
import { database } from '../utils/firebaseConf'

export const setData = async (referencePath: string, data: any) => {
  await set(getReference(referencePath), data)
}

export const getReference = (referencePath: string): DatabaseReference => {
  return ref(database, referencePath)
}

export const getData = async (referencePath: string): Promise<unknown> => {
  return get(child(ref(database), referencePath))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot
      } else {
        return null
      }
    })
    .catch((e) => {
      console.error(e)
    })
}
