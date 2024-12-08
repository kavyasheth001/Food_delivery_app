import './Navbar.css'
import { assets } from "../../assets/assets"
import { useContext, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'




const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("home");
  
  const {getTotalCartAmount,token,setToken}= useContext (StoreContext);



  const navigate = useNavigate()
  
  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  return (
    <div className="navbar"> 
    <Link to='/'><img src={assets.logo} alt="" className='logo'/> </Link>
      <ul className="navbar-menu">
        <Link to='/'  onClick={()=>setMenu("home")} className={`${menu==="home"?"active":""}`}><b>Home</b></Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={`${menu==="menu"?"active":""}`}><b>Menu</b></a>   
        <a href='#app-download' onClick={()=>setMenu("mob-app")} className={`${menu==="mob-app"?"active":""}`}><b>Mobile App</b></a>
        <a href='#footer' onClick={()=>setMenu("contact")} className={`${menu==="contact"?"active":""}`}><b>Contact Us</b></a>
      </ul>
      <div className="navbar-right">
        
       <div className="navbar-search-icon">
       <Link to='/cart'>
        <img src={assets.basket_icon} alt="" />
       </Link>
        <div className={getTotalCartAmount()===0?"":"dot"}>
         
          </div>
       </div>
       {!token?
       <button onClick={()=>setShowLogin(true)}>sign in</button>:
       <div className="navbar-profile">
        <img src={assets.profile_icon} alt="pfp" />
        <ul className="navbar-profile-dropdown">
          <li onClick={()=>navigate('/myorders')} ><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
          <hr />
          <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
        </ul>
       </div>
       }
       
      </div>
    </div>
  )
}

export default Navbar
