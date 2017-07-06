<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length">
            <movie-item v-for="movie in filteredMovies" v-bind:movie="movie.movie">
                <!-- fills in a slot -->
                <div class="movie-sessions">
                    <div 
                        v-for="session in filteredSessions(movie.sessions)" 
                        class="session-time-wrapper tooltip-wrapper"
                        v-tooltip="{seats: session.seats}">  <!-- custom tooltip -->
                        <div class="session-time">{{ formatSessionTime(session.time) }}</div>
                    </div>
                </div>
            </movie-item>
        </div>
        <div v-else-if="movies.length" class="no-results">
            {{ noResults }}
        </div>
        <div v-else  class="no-results">
            Loading...
        </div>
    </div>
</template>

<script>
    import times from '../util/times';
    import genres from '../util/genres';
    import MovieItem from './MovieItem.vue';

    export default { 
        // genre: list of checked genres frmom movieFilter
        // time: list of checked time periods from movieFilter
        props: ['genre', 'time', 'movies', 'day'],
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
            },
            movieTimeFilter(session) {
                let aout = true;
                // console.log( session );
                if ( !this.day.isSame(this.$moment(session.time), 'day')) {
                    // console.log('false wrong day');
                    aout = false;
                }
                else if(this.time.length != 1) {
                    // console.log('true on time length');
                }
                else if(this.time[0] == times.BEFORE_6PM) {  // before 6
                    // console.log(this.$moment(session.time).hour());
                    aout = this.$moment(session.time).hour() < 18;
                    // if (aout) console.log('true before 6');
                }
                else { // after 6 pm
                    // console.log(this.$moment(session.time).hour());
                    aout = this.$moment(session.time).hour() >= 18;
                    // if (aout) console.log('true after 6');
                }
                return aout;
            },
            formatSessionTime(raw) {
                return this.$moment(raw).format('h:mm A');
            },
            filteredSessions(sessions) {
                return sessions
                    // .filter( session => {
                    //     return this.$moment(session.time).isSame(this.day, 'day')
                    // })
                    .filter( session => { return this.movieTimeFilter(session) } );
            }
        },
        computed: {
            filteredMovies() {
                // filter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
                // find: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
                return this.movies
                    .filter( this.movieGenreFilter )  // shorthand: movie => this.movieGenreFilter(movie)
                    .filter( movie => movie.sessions.find( session => this.movieTimeFilter(session)) );
            },
            noResults() {
                let msg = this.time.concat(this.genre).join(', ')
                return `No results for ${msg}`;
            }
        },
        created() {
            // console.log(this.$moment);
        }
    }
</script>