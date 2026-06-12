import Movie from "../components/Movie";
import {dummy3} from '../movieDummy3'
export default function Upcoming() {
  return (
    <div>
       <div className='movies-container'>
        {
          dummy3.results.map((item) => {
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