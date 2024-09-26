import { config } from '@/config/firebase';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebase = initializeApp(config);

const storage = getStorage(firebase);
const database = getFirestore(firebase);

export { storage, database };
