import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Movie from "../components/Movie";
import { dummy } from '../movieDummy';
import { dummy2 } from '../movieDummy2';
import { dummy3 } from '../movieDummy3';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Home() {
  const navigate = useNavigate();
  const heroMovie = dummy.results[0];
  const tags = ["#ALL", "#최신개봉", "#액션", "#스릴러", "#인기폭발", "#로맨스", "#SF/판타지"];
  const [activeTag, setActiveTag] = useState("#ALL");

  const [bookingMovie, setBookingMovie] = useState("");
  const [bookingTheater, setBookingTheater] = useState("");
  const [bookingDate, setBookingDate] = useState("오늘");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendedMovie, setRecommendedMovie] = useState(null);

  const topRankMovies = [...dummy3.results]
    .filter((movie) => movie.vote_average > 0)
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 5);

  const enrichedMovies = dummy.results.map((movie, index) =>{
    let movieTags = [];
    if (index % 2 === 0) movieTags.push("#최신개봉");
    if (index % 3 === 0) movieTags.push("#액션");
    if (index % 4 === 0) movieTags.push("#스릴러");
    if (index % 5 === 0) movieTags.push("#로맨스");
    if (index % 7 === 0) movieTags.push("#SF/판타지");
    if (movieTags.length === 0) movieTags.push("#인기폭발");
    return {...movie, tags: movieTags};
  });

  const filteredMovies = activeTag === "#ALL"
  ? enrichedMovies
  : enrichedMovies.filter((movie) => movie.tags.includes(activeTag));

  const handleBookingSubmit = () => {
    if (!bookingMovie || !bookingTheater) {
      alert("영화와 극장을 모두 선택해주세요.");
      return;
    }
    alert(`🎬 예매 완료!\n영화: ${bookingMovie}\n극장: ${bookingTheater}\n날짜: ${bookingDate}\n\n티켓이 발급되었습니다!`);
  };

  const handleRandomPick = () => {
    const randomIndex = Math.floor(Math.random() * dummy.results.length);
    setRecommendedMovie(dummy.results[randomIndex]);
    setIsModalOpen(true);
  };

  return (
    <div className="page-container">

      {/* 히어로 배너 */}
      <div className="hero-banner">
        <div className="hero-img-wrap">
          <img src={"https://image.tmdb.org/t/p/w500" + heroMovie.backdrop_path} alt="main-banner" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <p className="hero-tag">오늘의 추천 영화</p>
          <h1 className="hero-title">{heroMovie.title}</h1>
          <div className="hero-buttons">
            <button className="btn-play">▶ 재생</button>
            <button className="btn-info">ℹ️ 정보</button>
          </div>
        </div>
      </div>
      
      {/* 빠른 예매 위젯 */}
      <div className="booking-widget-box">
        <h3>⚡ 빠른 예매하기</h3>
        <div className="booking-form">
          <div className="booking-select-row">
            <label>영화</label>
            <select value={bookingMovie} onChange={(e) => setBookingMovie(e.target.value)}>
              <option value="">영화 선택</option>
              {dummy.results.slice(0, 10).map((movie) => (
                <option key={movie.id} value={movie.title}>{movie.title}</option>
              ))}
            </select>
          </div>
          <div className="booking-select-row">
            <label>극장</label>
            <select value={bookingTheater} onChange={(e) => setBookingTheater(e.target.value)}>
              <option value="">극장 선택</option>
              <option value="CGV 강남">CGV 강남</option>
              <option value="CGV 홍대">CGV 홍대</option>
              <option value="CGV 신촌">CGV 신촌</option>
              <option value="메가박스 코엑스">메가박스 코엑스</option>
            </select>
          </div>
          <div className="booking-date-row">
            <label>날짜</label>
            <div className="date-chips">
              {["오늘", "내일", "모레", "주말"].map((date) => (
                <button
                  key={date} type="button"
                  className={`date-chip ${bookingDate === date ? "active" : ""}`}
                  onClick={() => setBookingDate(date)}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>
          <button className="booking-submit-btn" onClick={handleBookingSubmit}>
            인원/좌석 선택하러 가기 →
          </button>
        </div>
      </div>

      {/* 랜덤 영화 추천 배너 */}
      <div className="random-pick-banner" onClick={handleRandomPick}>
        <div className="random-text">
          <p className="random-sub">선택 장애가 왔다면?</p>
          <h3 className="random-title">🤔 오늘 뭐 보지? 클릭해서 랜덤 뽑기 →</h3>
        </div>
        <div className="random-icon">🎰</div>
      </div>

      {/*실시간 박스오피스*/}
      <div className="movie_box top_rank_box">
        <h2>🔥 실시간 박스오피스 TOP 5</h2>
        <Swiper 
          centeredSlides={true} 
          slidesPerView={1.6}
          spaceBetween={20} 
          loop={true} 
          className="centered-rank-swiper"
        >
          {topRankMovies.map((movie, index) => (
            <SwiperSlide key={movie.id + "_rank"}>
              <div className="rank-card-wrapper" onClick={() => navigate(`/movie/${movie.title}`, { state: movie })}>
                <span className="huge-rank-number">{index + 1}</span>
                <div className="rank-movie-poster">
                  <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} />
                  <div className="rating">★ {movie.vote_average}</div>
                </div>
                <div className="movie-info">
                  <h4 className="movie-title">{movie.title}</h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 태그 스크롤 */}
      <div className="tag-scroll-zone">
        <Swiper slidesPerView="auto" spaceBetween={10} slidesOffsetBefore={20} slidesOffsetAfter={20}>
          {tags.map((tag, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              <button 
                className={`genre-tag ${activeTag === tag ? "active" : ""}`}
                onClick={() => setActiveTag(tag)}>
                  {tag}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 현재 상영작 */}
      <div className="movie_box now_box">
        <h2>Now playing</h2>
          {filteredMovies.length === 0 ? (
            <p className="empty-message">해당 태그의 영화가 없습니다</p>
          ) : (
            <Swiper spaceBetween={15} slidesPerView={2.5} slidesOffsetBefore={20} slidesOffsetAfter={20}>
              {filteredMovies.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <Movie title={movie.title} poster_path={movie.poster_path} vote_average={movie.vote_average} overview={movie.overview} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
      </div>

      {/* 이벤트 배너 */}
      <div className="event-banner">
        <h3 className="event-title">🍿 팝콘 러버들을 위한 특급 이벤트!</h3>
        <p className="event-desc">지금 예매하면 팝콘 콤보 50% 할인 쿠폰 증정</p>
      </div>

      {/* 최고 평점 영화 */}
      <div className="movie_box top_box">
        <h2>Top Rated</h2>
        <Swiper spaceBetween={15} slidesPerView={2.5} slidesOffsetBefore={20} slidesOffsetAfter={20}>
          {dummy2.results.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Movie title={movie.title} poster_path={movie.poster_path} vote_average={movie.vote_average} overview={movie.overview} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 앱 하단 푸터 */}
      <footer className="app-footer">
        <div className="footer-links">
          <span>이용약관</span> | 
          <span className="footer-privacy">개인정보처리방침</span> | 
          <span>고객센터</span>
        </div>
        <p className="footer-copy">ⓒ 2026 Cinema App. All rights reserved.</p>
        <p className="footer-info">대표: 조대성 | 사업자등록번호: 123-45-67890</p>
      </footer>

      {/* 랜덤 추천 모달창 */}
      {isModalOpen && recommendedMovie && (
        <div className="random-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="random-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            <h3 className="modal-top-text">🎉 무비로그의 추천작! 🎉</h3>
            <img src={"https://image.tmdb.org/t/p/w500" + recommendedMovie.poster_path} alt="추천영화" className="modal-poster" />
            <h2 className="modal-movie-title">{recommendedMovie.title}</h2>
            <p className="modal-movie-rating">평점: ★ {recommendedMovie.vote_average}</p>
            <button 
              className="modal-detail-btn"
              onClick={() => {
                setIsModalOpen(false);
                navigate(`/movie/${recommendedMovie.title}`, { state: recommendedMovie });
              }}
            >
              줄거리 상세보기
            </button>
          </div>
        </div>
      )}

    </div>
  );
}