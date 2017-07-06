<template>
    <div id='overview'>
        <day-select v-bind:selected="day"></day-select>
        <div class='main'>
            <!-- use v-bind to pass parent data to child props -->
            <movie-list v-bind:genre="genre" v-bind:time="time" v-bind:movies="movies" v-bind:day="day"></movie-list>
            <movie-filter></movie-filter>
        </div>
    </div>
</template>

<script>

import DaySelect from './DaySelect.vue';
import MovieList from './MovieList.vue';
import MovieFilter from './MovieFilter.vue';

export default {
    props: ['genre', 'time', 'movies', 'day'],    
    components: {
        DaySelect,  // Day selection bar
        MovieList,  // auto converts to movie-list
        MovieFilter  // auto converts to movie-filter 
    }
}
</script>