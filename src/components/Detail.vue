<template>
    <div id="detail" v-if="movie">
        <!-- Uses computed field movie -->
        <movie-item v-bind:movie="movie" v-bind:sessions="[]"></movie-item>
    </div>
</template>

<script>
    import MovieItem from './MovieItem.vue';

    export default {
        props: ['movies'],
        computed: {
            movie() {
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