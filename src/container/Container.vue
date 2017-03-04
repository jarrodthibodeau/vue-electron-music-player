<template>
    <div :style="backgroundStyle" class="container">
        <Search :searchUrl="searchUrl" :select="handleUpdate" anchor="title" placeholder="Find a track" min="3"/>
        <MusicDetails :title="track.title" />
        <Player :random="handleRandom" :backward="backward" :forward="forward" :togglePlay="togglePlay" :paused="paused" :stop="stop"/>
        <MusicProgress :elapsed="elapsed" :total="total" :position="position" />
        <MusicFooter />
    </div>
</template>

<script>
    import '../../node_modules/font-awesome/css/font-awesome.min.css';
    import MusicDetails from '../components/MusicDetails';
    import MusicFooter from '../components/MusicFooter';
    import Player from '../components/Player';
    import MusicProgress from '../components/MusicProgress';
    import Search from '../components/Search';
    import axios from 'axios';

    export default {
        components: {
            MusicDetails,
            MusicFooter,
            Player,
            MusicProgress,
            Search
        },
        methods: {
            randomTrack: function randomTrack(tracks) {
                const trackLength = this.tracks.length;

                const randomNumber = Math.floor((Math.random() * trackLength) + 1);

                return this.tracks[randomNumber];

            },
            handleRandom: function handleRandom() {
                const randomTrack = this.randomTrack(this.tracks);

                this.play(randomTrack.stream_url);

                this.track.title = randomTrack.title;

                this.backgroundStyle = this.composeBackgroundStyle(randomTrack.artwork_url);
            },
            prepareUrl: function prepareUrl(url) {
                return `${url}?client_id=${this.client_id}`;
            },
            handleSongFinish: function handleSongFinish(e) {
                this.randomTrack();
            },
            handleTimeUpdate: function handleTimeUpdate(e) {
                 const elapsed = this.audio.currentTime;
                 const total= this.audio.duration;

                 this.position = elapsed / total;

                 this.elapsed = this.formatMilliseconds(elapsed);
                 this.total = this.formatMilliseconds(total);
            },
            formatMilliseconds: function(seconds) {
                let minutes= Math.floor(seconds / 60);

                minutes = (minutes >= 10) ? minutes : "0" + minutes;
                seconds = Math.floor(seconds % 60);
                seconds = (seconds >= 10) ? seconds : "0" + seconds;
                return minutes + ":" + seconds;
            },
            togglePlay: function() {
                if (this.audio.paused) {
                    this.paused = true;
                    this.audio.play();
                } else {
                    this.paused = false;
                    this.audio.pause();
                }
            },
            stop: function stop() {
                this.audio.pause();
                this.audio.currentTime = 0;
                this.paused = false;
            },
            forward: function() {
                this.audio.currentTime = this.audio.currentTime += 1;
            },
            backward: function() {
                let elapsed = this.audio.currentTime -= 1;

                if (elapsed >= 5) {
                    this.audio.currentTime = elapsed - 5;
                }
            },
            play: function play(url) {
                this.load(url);
                this.audio.play();
            },
            load: function load(url) {
                this.audio.src = this.prepareUrl(url);
                this.audio.load();
            },
            xlArtwork: function(url) {
                return url.replace(/large/, 't500x500');
            },
            getTracks: function getTracks() {
                let playlistUrl = this.prepareUrl('https://api.soundcloud.com/playlists/209262931');
                return axios.get(playlistUrl);
            },
            handleUpdate: function handleUpdate(track) {
                this.play(track.stream_url);
                this.track.title = track.title;
                this.backgroundStyle = this.composeBackgroundStyle(track.artwork_url)
            },
            composeBackgroundStyle: function composeBackgroundStyle(url) {
                return {
                    width: '100%',
                    height: '600px',
                    backgroundSize: 'cover',
                    backgroundImage: `linear-gradient(
                        rgba(0,0,0,0.7),
                        rgba(0,0,0,0.7)
                    ), url(${this.xlArtwork(url)})`
                }
            }
        },
        data: function() {
            return {
                track: {
                    stream_url: '',
                    title: '',
                    artwork_url: ''
                },
                paused: true,
                elapsed: '00:00',
                total: '00:00',
                position: 0,
                playFromPosition: 9,
                tracks: [],
                client_id: 'ec753ed8093e50f4835c17ba02dcaae9',
                url: '',
                searchUrl: '',
                audio: new Audio(),
                backgroundStyle: ''
            }
        },
        created: function() {
            let vm = this;

            this.getTracks()
                .then(function(res) {
                    vm.tracks = res.data.tracks;
                    vm.handleRandom();
                });

            this.searchUrl = this.prepareUrl('https://api.soundcloud.com/tracks') + '&q=';
            this.audio.onended = this.handleSongFinish.bind(this);
            this.audio.ontimeupdate = this.handleTimeUpdate.bind(this);
        }
    }
</script>

<style>
body {
    background-color: black;
}

.container {
    z-index: -1;
}
</style>