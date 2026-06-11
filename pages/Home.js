import Movie from "../components/Movie";
import {dummy} from '../movieDummy';
import {dummy2} from '../movieDummy2';
export default function Home() {
  const nowMovie1 = dummy.results[0]
  const nowMovie2 = dummy.results[1]
  const nowMovie3 = dummy.results[2]
  const nowMovie4 = dummy.results[3]

  const topMovie1 = dummy2.results[0]
  const topMovie2 = dummy2.results[1]
  const topMovie3 = dummy2.results[2]
  const topMovie4 = dummy2.results[3]
  const topMovie5 = dummy2.results[4]
  return (
    <div className="page-container">
      <div className="movie_box now_box">
        <h2>Now playing</h2>
        <div className="now movie_section">
          {
            <Movie
            key={nowMovie1.id}
            title={nowMovie1.title}
            poster_path={nowMovie1.poster_path}
            vote_average={nowMovie1.vote_average}
            overview={nowMovie1.overview}
          />
          }
           {
            <Movie
            key={nowMovie2.id}
            title={nowMovie2.title}
            poster_path={nowMovie2.poster_path}
            vote_average={nowMovie2.vote_average}
            overview={nowMovie2.overview}
          />
          }
          {
            <Movie
            key={nowMovie3.id}
            title={nowMovie3.title}
            poster_path={nowMovie3.poster_path}
            vote_average={nowMovie3.vote_average}
            overview={nowMovie3.overview}
          />
          }
          {
            <Movie
            key={nowMovie4.id}
            title={nowMovie4.title}
            poster_path={nowMovie4.poster_path}
            vote_average={nowMovie4.vote_average}
            overview={nowMovie4.overview}
          />
          }
        </div>
      </div>
      <div className="movie_box">
       <h2>Top Rated</h2>
        <div className="top movie_section">
          {
          <Movie
          key={topMovie1.id}
          title={topMovie1.title}
          poster_path={topMovie1.poster_path}
          vote_average={topMovie1.vote_average}
          overview={topMovie1.overview}
         />
         } 
         {
          <Movie
          key={topMovie2.id}
          title={topMovie2.title}
          poster_path={topMovie2.poster_path}
          vote_average={topMovie2.vote_average}
          overview={topMovie2.overview}
        />
        }
        {
          <Movie
          key={topMovie3.id}
          title={topMovie3.title}
          poster_path={topMovie3.poster_path}
          vote_average={topMovie3.vote_average}
          overview={topMovie3.overview}
        />
        }
        {
          <Movie
          key={topMovie4.id}
          title={topMovie4.title}
          poster_path={topMovie4.poster_path}
          vote_average={topMovie4.vote_average}
          overview={topMovie4.overview}
        />
        }
        </div>
      </div>
    </div>
  )

}