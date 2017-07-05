<template>
    <div class="movie">
        <div class="movie-col-left">
            <img v-bind:src="movie.Poster">
        </div>
        <div class="movie-col-right">
            <div class="movie-title">
                <h2>{{ movie.Title }}</h2>
                <span class="movie-rating">{{ movie.Rated }}</span>
            </div>
            <div class="movie-sessions">
                <div v-for="session in filteredSessions(sessions)" class="session-time-wrapper">
                    <div class="session-time">{{ formatSessionTime(session.time) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import times from '../util/times'

    export default {
        props: ['movie', 'sessions', 'day', 'time'],
        methods: {
            formatSessionTime(raw) {
                return this.$moment(raw).format('h:mm A');
            },
            filteredSessions(sessions) {
                return sessions
                    // .filter( session => {
                    //     return this.$moment(session.time).isSame(this.day, 'day')
                    // })
                    .filter( session => { return this.movieTimeFilter(session) } );
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
                    if (aout) console.log('true before 6');
                }
                else { // after 6 pm
                    // console.log(this.$moment(session.time).hour());
                    aout = this.$moment(session.time).hour() >= 18;
                    if (aout) console.log('true after 6');
                }
                return aout;
            }            
        }
    }
</script>