import Movie from "../components/Movie";
import {dummy2} from '../movieDummy2'

export default function TopMovies() {
  return (
    <div>
      <div className='movies-container'>
        {
          dummy2.results.map((item) => {
            return (
              <Movie
                key={item.id}
                title={item.title}
                poster_path={item.poster_path}
                vote_average={item.vote_average}
                overview={item.overview}
              />
            )
          })
        }
      </div>
    </div>
  )
}