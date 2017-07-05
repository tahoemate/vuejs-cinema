<template>
    <div id="movie-list">
        <div v-for="movie in filteredMovies" class="movie">{{movie.title}}</div>
    </div>
</template>

<script>
    import genres from '../util/genres';

    export default { 
        data() {
            return { 
                movies: [
                    {title: 'Destry Rides Again', genre: genres.ANIMATION },
                    {title: 'Blue Angle', genre: genres.COMEDY},
                    {title: 'Seven Sinners', genre: genres.COMEDY}
                ]
            };
        },
        props: ['genre', 'time'],
        methods: {
            movieGenreFilter(movie) {
                if ( !this.genre.length ) return true;
                let aout = this.genre.find( genre => movie.genre === genre );
                return aout;
            }
        },
        computed: {
            filteredMovies() {
                return this.movies.filter(this.movieGenreFilter);
            }
        }
    }
</script>