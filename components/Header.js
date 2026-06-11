import { Link } from "react-router-dom";
import menu from '../img/menu.png'
import $ from 'jquery'

export default function Header() {

 const MenuShow = () => {
    $('.hamburger').stop().fadeOut()
    $('.menu').addClass('active')
  }

   const MenuHide = () => {
      $('.menu').removeClass('active')
      $('.hamburger').stop().fadeIn()
  }

  return (
    <div className="header-container">
      <div className="header-wrap">
       <div className="header-left-wrap">
 <Link 
style={{display:'flex', alignItems: 'center'}} to="/">
  <span className="header-logo">Movie Chart</span>
 </Link>
 <ul>
 <li>
  <Link className="header-nav-item" to='/movie_now'>
                현재 상영 영화
  </Link>
 </li> 
 <li>
 <Link className="header-nav-item" to='/movie_top'>
  인기 영화
 </Link>
 </li>
<li>
 <Link className="header-nav-item" to='/upcoming'>
       개봉 예정 영화
 </Link>
 </li>
 </ul>
</div>
<div className="header-right-wrap">
<img className="hamburger" src={menu}
            alt="hamburger" onClick={MenuShow}/>
<ul className="menu">
 <li>
 <Link className="header-nav-item" 
 to='/movie_now' onClick={MenuHide}>현재 상영 영화
 </Link> 
 </li> 
 <li>
 <Link className="header-nav-item" 
 to='/movie_top' onClick={MenuHide}>인기 영화
 </Link>
 </li>
 <li>
  <Link className="header-nav-item" 
  to='/upcoming' onClick={MenuHide}>개봉 예정 영화
  </Link>
 </li>
</ul>
</div>
      </div>
    </div>
  )
}