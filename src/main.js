import Vue from 'vue';
import './style.scss';
import genres from './util/genres';

new Vue({
    el: '#app',
    data: {
        msg: 'Hello Suckas',
        genre: [],
        time: []
    },
    methods: {
        checkFilter(category, title, checked) {
            console.log( 'app - checkFilter ' + title );
            if (checked) {
                this[category].push(title);
            } 
            else {
                let index = this[category].indexOf(title);  // returns -1 if not found
                if (index >= 0) {
                    this[category].splice(index,1);  // remove item at index
                }
            }
        }
    },
    components: {
        'movie-list' : { 
            template: `<div id="movie-list">
                <div v-for="movie in filteredMovies" class="movie">{{movie.title}}</div>
                </div>`,
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
        },
        'movie-filter' : { 
            data() {
                return { genres };
            },
            template: `<div id="movie-filter">
                            <h2>Filter Results</h2>
                            <div class="filter-group">
                                <check-filter v-for="genre in genres" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
                            </div>
                        </div>`,
            methods: {
                checkFilter (category, title, checked) {
                    console.log('movie-filter check-filter');
                    this.$emit( 'check-filter', category, title, checked );
                }
            },
            components: {
                'check-filter': {
                    data () {
                        return { checked: false };
                    },
                    props: ['title'],
                    template: `<div v-bind:class="{ 'check-filter': true, active: checked }" v-on:click="checkFilter">
                                    <span class="checkbox"></span>
                                    <span class="check-filter-title">{{title}}</span>
                                </div>`,
                    methods: {
                        checkFilter () {
                            console.log('check-filter check-filter');
                            this.checked = !this.checked;
                            this.$emit('check-filter', 'genre', this.title, this.checked);
                        }
                    }
                }
            }                                             
        }
    }
});