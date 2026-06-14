import { useLocation, useParams, useNavigate } from "react-router-dom";
import { img_base_url } from "../components/Movie";

export default function MovieDetail() {
  const { title } = useParams(); // URL에 있는 값을 가져옴
  const { state } = useLocation(); // 페이지 이동 시 전달한 state 값을 꺼냄
  const navigate = useNavigate();

  return (
    <div className="page-container">
      

      <div className="detail_box">
        <div className="img_box">
          <img 
            src={img_base_url + state.poster_path} 
            alt="영화포스터이미지"
          />
        </div>
        <div className="content_box">
          <div className="title_box">
            <span className="title">{title}</span>
            <span className="average">
              평점 : {state.vote_average}
            </span>
          </div> 
          <div className="overview">{state.overview}</div>
          <div className="detail_navigate">
            <button 
              onClick={() => navigate(-1)} 
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '28px',
                cursor: 'pointer',
                padding: '5px'
              }}
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}