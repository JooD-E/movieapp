import React, { useState } from 'react';
import Movie from "../components/Movie";
import { dummy } from '../movieDummy';
import { dummy2 } from '../movieDummy2';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Home() {
  const heroMovie = dummy.results[0];
  const tags = ["#ALL", "#최신개봉", "#액션", "#스릴러", "#인기폭발", "#로맨스", "#SF/판타지"];
  const [activeTag, setActiveTag] = useState("#ALL");

  const [bookingMovie, setBookingMovie] = useState("");
  const [bookingTheater, setBookingTheater] = useState("");
  const [bookingDate, setBookingDate] = useState("오늘");

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

  return (
    <div className="page-container">

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
                  key={date}
                  type="button"
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

      <div className="tag-scroll-zone">
        <Swiper 
          slidesPerView="auto" 
          spaceBetween={10} 
          slidesOffsetBefore={20} 
          slidesOffsetAfter={20}
        >
          {tags.map((tag, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              <button 
                className={`genre-tag ${activeTag === tag? "active" :""}`}
                onClick ={() => setActiveTag(tag)}>
                  {tag}
                  </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="movie_box now_box">
        <h2>Now playing</h2>
          {filteredMovies.length === 0 ? (
            <p style = {{paddingLeft: '20px', color:'#8e8e93', fontSize: '14px'}}>
              해당 태그의 영화가 없습니다
            </p>
          ) : (
            <Swiper spaceBetween={15} slidesPerView={2.5} slidesOffsetBefore={20} slidesOffsetAfter={20}>
              {filteredMovies.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <Movie
                    title={movie.title}
                    poster_path={movie.poster_path}
                    vote_average={movie.vote_average}
                    overview={movie.overview}
                  />
                </SwiperSlide>
              ))}
              </Swiper>
          )}
          </div>

      <div className="movie_box top_box">
        <h2>Top Rated</h2>
        <Swiper spaceBetween={15} slidesPerView={2.5} slidesOffsetBefore={20} slidesOffsetAfter={20}>
          {dummy2.results.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Movie
                title={movie.title}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
                overview={movie.overview}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
    
  );
}