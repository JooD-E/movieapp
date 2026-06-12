import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuShow = () => setIsMenuOpen(true);
  const menuHide = () => setIsMenuOpen(false);

  return (
    <>
      <div className="header-container">
        <div className="header-wrap">
          <div className="header-left-wrap">
            <Link style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} to="/" onClick={menuHide}>
              <span className="header-logo">Movie Chart</span>
            </Link>
          </div>

          <div className="header-right-wrap">
            {!isMenuOpen && (
              <button className="hamburger-text-btn" onClick={menuShow}>
                ☰
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={`mobile-sidebar-menu ${isMenuOpen ? 'active' : ''}`}>
        
        <div className="sidebar-header">
          <div className="user-profile">
            <div className="profile-avatar">👤</div>
            <div className="profile-info">
              <span className="user-name">VIP 회원님</span>
              <span className="user-email">welcome@movie.com</span>
            </div>
          </div>
          <button className="close-btn" onClick={menuHide}>✕</button>
        </div>

        <div className="sidebar-section">
          <h3>영화 탐색</h3>
          <ul className="menu-list">
            <li><Link className="sidebar-item" to='/movie_now' onClick={menuHide}>현재 상영 영화</Link></li> 
            <li><Link className="sidebar-item" to='/movie_top' onClick={menuHide}>인기 영화</Link></li>
            <li><Link className="sidebar-item" to='/upcoming' onClick={menuHide}>개봉 예정 영화</Link></li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>보관함 & 설정</h3>
          <ul className="menu-list sub-list">
            <li><Link to="/" className="sidebar-item secondary" onClick={menuHide}>찜한 콘텐츠</Link></li>
            <li><Link to="/" className="sidebar-item secondary" onClick={menuHide}>최근 본 작품</Link></li>
            <li><Link to="/" className="sidebar-item secondary" onClick={menuHide}>앱 설정</Link></li>
            <li><Link to="/" className="sidebar-item secondary" onClick={menuHide}>고객센터 / 도움말</Link></li>
          </ul>
        </div>

      </div>
      {isMenuOpen && <div className="sidebar-overlay" onClick={menuHide}></div>}
      
    </>
  );
}