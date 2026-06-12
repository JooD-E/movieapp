import {useNavigate } from "react-router-dom";
export const img_base_url ="https://image.tmdb.org/t/p/w1280/"
export default function Movie(props) {
     const navigate = useNavigate();
     const onClickMovieItem = () => {
      navigate(`/movie/${props.title}`, {
      state: props
     })
    }
  return (
<div className="movie_container" 
                     onClick={onClickMovieItem}>
 <img src={img_base_url + props.poster_path}
         alt="영화포스터"/>   
  <div className="movie-info">
        <h4>{props.title}</h4>
        <span>{props.vote_average}</span>
  </div>
</div>
  )

}