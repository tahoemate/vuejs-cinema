import Vue from 'vue';
import './style.scss';
import genres from './util/genres';

new Vue({
    el: '#app',
    data: {
        msg: 'Hello Suckas'
    },
    methods: {
        checkFilter() {
            console.log( 'app - checkFilter' );
        }
    },
    components: {
        'movie-list' : { 
            template: `<div id="movie-list">
                <div v-for="movie in movies" class="movie">{{movie.title}}</div>
                </div>`,
            data() {
                return { 
                    movies: [
                        {title: 'Destry Rides Again'},
                        {title: 'Blue Angle'},
                        {title: 'Seven Sinners'}
                    ]
                };
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
                checkFilter () {
                    console.log('movie-filter check-filter');
                    this.$emit( 'check-filter' );
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
                            this.$emit('check-filter');
                        }
                    }
                }
            }                                             
        }
    }
});