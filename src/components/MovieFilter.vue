<template>
    <div id="movie-filter">
        <h2>Filter Results</h2>
        <h3>By time of day</h3>
        <div class="filter-group">
            <!-- category passed as non-bound prop to check-filter -->
            <check-filter v-for="time in times" category="time" v-bind:title="time"></check-filter>
        </div>
        <h3>By genre</h3>
        <div class="filter-group">
            <check-filter v-for="genre in genres" category="genre" v-bind:title="genre"></check-filter>
        </div>
    </div>
</template>

<script>
    import times from '../util/times';
    import genres from '../util/genres';
    import CheckFilter from './CheckFilter.vue';

    export default  { 
        data() {
            return { genres, times };
        },
        methods: {
            // checkFilter (category, title, checked) {
            //     console.log('movie-filter check-filter');
            //     // this.$emit( 'check-filter', category, title, checked );
            // }
        },
        components: {
            CheckFilter   // converts to component check-filter
        }
    }    
</script>