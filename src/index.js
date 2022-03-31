
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import {initializeApp} from "firebase/app"
import {
  getFirestore,collection,getDocs,
  onSnapshot,
  addDoc,deleteDoc,doc,getDoc,
  query,where,orderBy,serverTimestamp,updateDoc

}from "firebase/firestore"

import {
  getAuth,
  createUserWithEmailAndPassword
}from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDgIg4pSTuOAdXLELRWE9FU53hO1-3QOn0",
  authDomain: "fir-9-santra.firebaseapp.com",
  projectId: "fir-9-santra",
  storageBucket: "fir-9-santra.appspot.com",
  messagingSenderId: "71409882197",
  appId: "1:71409882197:web:bb833126d746c66aefb0dc",
  measurementId: "G-VNX4DE3RDW"
};

initializeApp(firebaseConfig)
// init service
const db=getFirestore()
// collection ref
const colRef=collection(db,"books")
const authRef=getAuth()
// get the collection
// getDocs(colRef).then((snapshot)=>{
//   let books=[]
//   console.log(snapshot.docs)
//   snapshot.docs.forEach((doc)=>{
//     books.push({...doc.data(),id:doc.id})
//   })
//   console.log(books)
// }).catch(err=>{
//   console.log(err.message)
// })


//  realtime snapshot data
onSnapshot(colRef,(snapshot)=>{
  let books=[]
  snapshot.docs.forEach((doc)=>{
    books.push({...doc.data(),id:doc.id})
  })
  console.log(books)
})

// adding data
const addBooksForm=document.querySelector(".add")
addBooksForm.addEventListener("submit",(e)=>{
  e.preventDefault()
  addDoc(colRef,{
     booksName:addBooksForm.booksName.value,
     author:addBooksForm.author.value,
     isbn:parseInt(addBooksForm.isbn.value),
     price:parseInt(addBooksForm.price.value),
     createdAt:serverTimestamp()

   }).then(()=>{
   addBooksForm.reset()
   alert("data saved successfully")
 })
 .catch(err=>{
   console.log("error",err.message)
 })

})

//  queries data
const myquery=query(colRef,where("author","!=","manoj santra"),orderBy("author"))

// deleting  data
const deleteBooksForm=document.querySelector(".delete")
deleteBooksForm.addEventListener("submit",(e)=>{
  e.preventDefault()
  const docRef=doc(db,"books",deleteBooksForm.id.value)
  deleteDoc(docRef)
  .then(()=>deleteBooksForm.reset())
  .catch((err)=>console.log(err.message))
})

//  specific data
onSnapshot(myquery,(snapshot)=>{
  let books=[]

  snapshot.docs.forEach((doc)=>{
    books.push({...doc.data(),id:doc.id})
  })
  console.log("manoj books",books)
})


//  get a single document

const docRef=doc(db,"books","AAbpr1Xlxm7wxfu2Zs5k")
getDoc(docRef)
.then((doc)=>{
  console.log(doc.data(),doc.id,doc.createdAt)
})

onSnapshot(docRef,(snapshot)=>{
  console.log(snapshot.data(),snapshot.id)
})



//  update data
const updateForm=document.querySelector(".update")
updateForm.addEventListener("submit",(event)=>{
  event.preventDefault()
  const docRef=doc(db,"books",updateForm.updateId.value)
  updateDoc(docRef,{
    booksName:"updated title",
  })
  .then(()=>{
    updateForm.reset()
  })


})


//  sign up data

const signupForm=document.querySelector(".auth")
signupForm.addEventListener("submit",(event)=>{
  event.preventDefault()
  const email=signupForm.email.value
  const password=signupForm.password.value
  createUserWithEmailAndPassword(authRef,email,password)
  .then((cred)=>{
    console.log(cred.user)
  }).catch(err=>{
    console.log(`firebase ${err}`)
  })
})
