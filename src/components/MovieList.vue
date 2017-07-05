<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length">
            <movie-item v-for="movie in filteredMovies" v-bind:movie="movie.movie" v-bind:sessions="movie.sessions"></movie-item>
        </div>
        <div v-else-if="movies.length" class="no-results">
            No results.
        </div>
        <div v-else  class="no-results">
            Loading...
        </div>
    </div>
</template>

<script>
    import genres from '../util/genres';
    import MovieItem from './MovieItem.vue';

    export default { 
        props: ['genre', 'time', 'movies'],
        components: {
            MovieItem
        },
        methods: {
            movieGenreFilter(movie) {
                // genre is a prop of selected genres
                if ( !this.genre.length ) return true;  // no genre filter - show all
                let movieGenres = movie.movie.Genre.split(', ')
                let matched = true;
                this.genre.forEach(genre => {
                    if (movieGenres.indexOf(genre) === -1 ) {
                        matched = false;   // movie genre does not match filter
                    }
                });
                return matched;
            }
        },
        computed: {
            filteredMovies() {
                return this.movies.filter(this.movieGenreFilter);
            }
        },
        created() {
            // console.log(this.$moment);
        }
    }
</script>