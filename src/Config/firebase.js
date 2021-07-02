import firebase from '../../node_modules/firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDQ1WnHWg9Tawvb0dqcOGLLogAJR2CqO80",
    authDomain: "loginform-ecd04.firebaseapp.com",
    projectId: "loginform-ecd04",
    storageBucket: "loginform-ecd04.appspot.com",
    messagingSenderId: "71572281920",
    appId: "1:71572281920:web:a27869cf2dfad8269a9da5",
    measurementId: "G-S7LXXPWF86"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage();

// calling firebase method for registering user
const signUp = (email, password) => { return auth.createUserWithEmailAndPassword(email, password) }

// storing user detail 
const storeUserDetail = (name, email, userContactNumber, userID) => {
    return db.collection('UsersDetails').add(
        {
            userName: name,
            userEmail: email,
            userContactNumber,
            userID
        })
}

// calling firebase method for signing user
const signIn = (email, password) => { return auth.signInWithEmailAndPassword(email, password) }

// signing out 
const signOut = () => { return auth.signOut() }

// uploading file to firebase storage
const uploadFile = (files) => {

    return new Promise((resolve, reject) => {
        console.log(files)

        const file = files[0]
        const ref = storage.ref(`/adsImages/${file.name}`)
        console.log('start uploading....')
        ref.put(file)
            .then(snapshot => {
                ref.getDownloadURL()
                .then(url => {
                    resolve(url)
                    console.log(`uploaded !! url == ${url}`)
                })


            })
            .catch(error => {
                reject(error.message)
            })




    })
}

// storing ads details to firebase db 
const storeAdDetails = (adImgUrl, adTitle, adDescription, adPrice, cityName, userContactNumber, userName, userID) => {
    return db.collection('AdsDetails').add(
        { adImgUrl, adTitle, adDescription, adPrice, cityName, userContactNumber, userName, userID })
}

// getting ads details from firebase db 
const getAdPostDetails = () => {
    return new Promise((resolve, reject) => {
        db.collection('AdsDetails').get()
            .then(snapshot => {
                var arr = []
                snapshot.forEach(doc => {
                    arr.push({ ...doc.data(), adsID: doc.id })
                })
                resolve(arr)
            })
            .catch(error => {
                reject(error.message)
                console.log(error.message)
            })

    })
}

// getting specified ad details 
const getSpecifiedAdDetail = (adID) => {
    return new Promise((resolve, reject) => {
        db.collection('AdsDetails').doc(adID).get()
            .then(doc => { resolve([doc.data()]) })
            .catch(error => { reject(error.message) })
    }
    )
}

// getting current user data for profile 
const getCurrentUserDetails = (currentUserID) => {

    return new Promise((resolve, reject) => {
        db.collection('UsersDetails').onSnapshot((snapshot) => {
            var currentUserData = []
            snapshot.forEach(users => {
                if (users.data().userID === currentUserID) {
                    currentUserData.push(users.data(), users.id)
                }
            })
            resolve(currentUserData)
        })

    })
}
//  updating  user's data 
const updatingUserData = (name, contactNo, userDocID) => {
    console.log(`Name : ${name} Contact No ${contactNo} ID ${userDocID}`)
    return db.collection('UsersDetails').doc(userDocID).update({
        userName: firebase.firestore.FieldValue = (name),
        userContactNumber: firebase.firestore.FieldValue = (contactNo)
    })
}
// upload User Profile Img to firebase storage
const uploadUserProfileImg = (files) => {

    return new Promise((resolve, reject) => {
        console.log(files)

        const file = files[0]
        const ref = storage.ref(`/usersprofileimages/${file.name}`)
        console.log('start uploading....')
        ref.put(file)
            .then(snapshot => {
                ref.getDownloadURL()
                .then(url => {
                    resolve(url)
                    console.log(`uploaded !! url == ${url}`)
                })


            })
            .catch(error => {
                reject(error.message)
            })




    })
}

//  update user's data with new key for profile img  
const storingUserProfileImg = (url, userDocID) => {

    return db.collection('UsersDetails').doc(userDocID).update({
        profileImg: url
    })
}

// getting current user ads 
const gettingCurrentUserAds = (userID) => {
    return new Promise((resolve, reject) => {
        db.collection('AdsDetails').onSnapshot((snapshot) => {
            var currentUserAd = []
            snapshot.forEach(users => {
                if (users.data().userID === userID) {

                    currentUserAd.push(users.data(), users.id)
                }
            })
            resolve(currentUserAd)
        })

    })


}
export {
    signUp,
    signIn,
    storeUserDetail,
    auth,
    signOut,
    uploadFile,
    storeAdDetails,
    getAdPostDetails,
    getSpecifiedAdDetail,
    getCurrentUserDetails,
    updatingUserData,
    uploadUserProfileImg,
    storingUserProfileImg,
    gettingCurrentUserAds
}