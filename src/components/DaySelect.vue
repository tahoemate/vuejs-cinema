<template>
    <div id="day-select">
        <ul class="days">
            <li v-bind:class="{ day:true, active: isActive(day) }" v-for="day in days" v-on:click="selectDay(day)">
                {{ formatDay(day) }}
            </li>
            <li class="day-selector">
                <span class="dec" v-on:click="changeDay(-1)"></span>
                <span class="inc" v-on:click="changeDay(+1)"></span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['selected'],
        data () {
            return {
                days: [0,1,2,3,4,5,6].map( num => this.$moment().add(num,'days') )
            };
        },
        methods: {
            formatDay(raw) {
                let aout = (raw.isSame(this.$moment(),'day')) ? 'Today' : raw.format('ddd DD/MM');
                return aout;
            },
            isActive (day) {
                return day.isSame( this.selected, 'day' );
            },
            selectDay(day) {
                this.$bus.$emit('set-day', day);
            },
            changeDay(delta) {
                let newDay = this.$moment(this.selected).add(delta, 'days');
                // is newDay one of acceptable days?
                if ( this.days.find( day => newDay.isSame(day, 'day'))) {
                    this.selectDay(newDay);
                }
            }
        },
        created() {
            console.log()
        }
    }
</script>