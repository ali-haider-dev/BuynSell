import './App.css';
import {useEffect,useState} from 'react'
import {auth} from './Config/firebase'
import ViewsNavigation from './Config/router'
import PostAdView from '../src/Views/PostAd'
function App() {
  const [currentUser, setCurrentUser]=useState()
  const [loadingView, setLoadingView] = useState(true)
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        setCurrentUser(user)
        setLoadingView(false)
      } else{
        setCurrentUser(null)
        setLoadingView(false)
      }
      
    
    })
  },[])
  return <>
      { loadingView ? <div className="loadingView">
        <h1 className="logo">BUYN<span className="color-style">SELL.</span></h1>
      </div> : <ViewsNavigation currentUser={currentUser} />  }
  
  </>
      
   
  
}

export default App;
