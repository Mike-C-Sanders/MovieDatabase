select reviews.id as id, movies.movie_name as Movie, reviews.movie_review
from reviews
join movies
on reviews.movie_id = movies.id