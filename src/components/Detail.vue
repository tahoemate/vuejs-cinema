<template>
    <div>
        <div id="detail" v-if="getMovie">
            <!-- Uses computed field getMmovie -->
            <movie-item v-bind:movie="getMovie">
                <div class="movie-details">
                    <p class="movie-genre">{{ getMovie.Genre }}</p>
                    <p class="movie-plot">{{ getMovie.Plot }}</p>
                    <table>
                        <tr>
                            <td>Released date:</td>
                            <td>{{ getMovie.Released}}</td>
                        </tr>
                        <tr>
                            <td>Running time:</td>
                            <td>{{ getMovie.Runtime}}</td>
                        </tr>
                        <tr>
                            <td>Director:</td>
                            <td>{{ getMovie.Director}}</td>
                        </tr>
                        <tr>
                            <td>Cast:</td>
                            <td>{{ getMovie.Actors}}</td>
                        </tr>
                    </table>
                </div>
            </movie-item>
            <div class="home">
                <router-link v-bind:to="{name: 'home'}">Back to results</router-link>
            </div>
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