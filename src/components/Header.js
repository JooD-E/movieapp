import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const menuShow = () => setIsMenuOpen(true);
  const menuHide = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 60) {
          setShowHeader(false);
        } else {
          setShowHeader(true);
        }
        
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <div 
        className="header-container"
        style={{
          position: "fixed",
          width: "100%",
          transform: showHeader ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease-in-out"
        }}
      >
        <div className="header-wrap">
          <div className="header-left-wrap">
            <Link style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} to="/" onClick={menuHide}>
              <span className="header-logo">MOVIELOG</span>
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
          <ul className="menu-list" style={{ listStyle: 'none', padding: 0 }}>
            <li><Link className="sidebar-item" to='/movie_now' onClick={menuHide}>현재 상영 영화</Link></li> 
            <li><Link className="sidebar-item" to='/movie_top' onClick={menuHide}>인기 영화</Link></li>
            <li><Link className="sidebar-item" to='/upcoming' onClick={menuHide}>개봉 예정 영화</Link></li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3>보관함 & 설정</h3>
          <ul className="menu-list sub-list" style={{ listStyle: 'none', padding: 0 }}>
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