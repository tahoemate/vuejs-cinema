import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

new Vue({
    el: '#app',
    data: {
        msg: 'Hello Suckas',
        genre: [],
        time: []
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
    }
});