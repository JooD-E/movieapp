import Movie from "../components/Movie";
import {dummy} from '../movieDummy'
export default function Movies() {
  return (
    <div>
      <div className='movies-container'>
        {
          dummy.results.map((item) => {
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