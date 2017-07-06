<template>
    <div>
        <div id="detail" v-if="getMovie">
            <!-- Uses computed field movie -->
            <movie-item v-bind:movie="getMovie" v-bind:sessions="[]"></movie-item>
        </div>
        <div v-else>
            <h3>No movie found matching {{this.$route.params.id}}</h3>
        </div>
    </div>
</template>

<script>
    import MovieItem from './MovieItem.vue';

    export default {
        props: ['movies'],
        computed: {
            getMovie() {
                // console.log( 'param: '+this.$route.params.id+'  '+this.movies.length);
                let aout = this.movies.find( movie => movie.id === this.$route.params.id);
                // console.log(aout);
                return aout ? aout.movie : null;
            }
        },
        components: {
            MovieItem
        },
        created () {
            // console.log( 'param: '+this.$route.params.id );
        }
    }
</script>