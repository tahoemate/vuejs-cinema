import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

new Vue({
    el: '#app',
    data: {
        msg: 'Hello Suckas',
        genre: [],
        time: [],
        movies: []
    },
    methods: {
        checkFilter(category, title, checked) {
            // console.log( 'app - checkFilter ' + title );
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
        MovieList,  // auto converts to movie-list
        MovieFilter  // auto converts to movie-filter
    },
    created() {  // lifecycle hook
        // console.log(this.$http);  // came in from vue-resource
        this.$http.get('/api').then( response => {
            console.log(response.data);
            this.movies = response.data;
        }, err => {console.log(err)} );
    }
});