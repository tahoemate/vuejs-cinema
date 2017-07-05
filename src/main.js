import Vue from 'vue';
import './style.scss';

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } })

import Overview from './components/Overview.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.filter('dateTransform', function (raw) {
    // console.log(this);  // is always undefined?
    // return this.$moment(raw).format('h:mm A');
    return 'howdy';
});

// import statement
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
import { checkFilter } from './util/bus'
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

new Vue({  // root instance
    el: '#app',
    data: {
        msg: 'Hello Suckas',
        genre: [],
        time: [],
        movies: [],
        moment,  // for using moment timezone, accessible in children via this.$moment
        day: moment(),
        bus
    },
    methods: {
    },
    components: {
        Overview
    },
    created() {  // lifecycle hook
        // console.log(this.$bus);  
        this.$http.get('/api').then( response => {
            // console.log(response.data);
            this.movies = response.data;
        }, err => {console.log(err)} );
        this.$bus.$on( 'check-filter', checkFilter.bind(this) );  // note bind to establish this
    }
});