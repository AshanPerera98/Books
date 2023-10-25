// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQymn-Lpvazlfj1nvpnKS1LEH4KftnNag",
  authDomain: "books-e9933.firebaseapp.com",
  projectId: "books-e9933",
  storageBucket: "books-e9933.appspot.com",
  messagingSenderId: "203860906310",
  appId: "1:203860906310:web:2b3974fe65c2a9e2195547",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const booksCollection = collection(db, "books");
const cartCollection = collection(db, "cart");

export async function getFeatured() {
  const q = query(booksCollection, where("featured", "==", true));
  const featuredSnapshot = await getDocs(q);
  const featuredList = featuredSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return featuredList;
}

export async function getFiltered(category, subCategory) {
  let q;
  if (category === "all" && subCategory === "all") {
    return await getAllBooks();
  } else if (category !== "all" && subCategory === "all") {
    q = query(
      booksCollection,
      category !== "all" && where("category", "==", category)
    );
  } else if (category === "all" && subCategory !== "all") {
    q = query(
      booksCollection,
      subCategory !== "all" && where("subCategory", "==", subCategory)
    );
  } else {
    q = query(
      booksCollection,
      category !== "all" && where("category", "==", category),
      subCategory !== "all" && where("subCategory", "==", subCategory)
    );
  }

  const filteredSnapshot = await getDocs(q);
  const filteredList = filteredSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return filteredList;
}

export async function getAllBooks() {
  const allBooksSnapshot = await getDocs(booksCollection);
  const allBooksList = allBooksSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return allBooksList;
}

export async function getBook(bookId) {
  const bookSnapshot = await getDoc(doc(db, "books", bookId));
  const book = bookSnapshot.exists()
    ? {
        ...bookSnapshot.data(),
        id: bookSnapshot.id,
      }
    : null;
  return book;
}

export async function addBookToCart(bookId, price) {
  await addDoc(cartCollection, {
    bookId: bookId,
    price: price,
    quantity: 1,
  });
}

export async function isBookInCart(bookId) {
  const q = query(cartCollection, where("bookId", "==", bookId));
  const filteredSnapshot = await getDocs(q);
  const filteredBook = filteredSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return filteredBook.length ? true : false;
}

export async function getBookCart() {
  const allCartSnapshot = await getDocs(cartCollection);
  const allCartList = allCartSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return allCartList;
}

export async function modifyCart(cartId, operation) {
  const bookRef = await getDoc(doc(db, "cart", cartId));
  let modifyRef = {};
  operation
    ? (modifyRef = {
        ...bookRef.data(),
        quantity: bookRef.data().quantity + 1,
        id: bookRef.id,
      })
    : (modifyRef = {
        ...bookRef.data(),
        quantity: bookRef.data().quantity - 1,
        id: bookRef.id,
      });

  return await setDoc(doc(db, "cart", cartId), modifyRef);
}

export async function removeCart(cartId) {
  await deleteDoc(doc(db, "cart", cartId));
}
