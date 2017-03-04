<template>
    <div class="search">
        <autocomplete 
            :anchor="anchor"
            :url="searchUrl"
            :on-select="select"
            :placeholder="placeholder"
            :min="min"/>
    </div>
</template>

<script>
    import Vue2AutoComplete from 'vue2-autocomplete-js';

    export default {
        components: {
            autocomplete: Vue2AutoComplete
        },
        props: ['searchUrl', 'placeholder', 'anchor', 'min', 'select']
    };
</script>

<style>
.truncate {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.artwork{
  width:32px;
  display:inline-block;
  margin:5px 0 2px 5px;
}

.text {
  font-size:18px;
  float:right;
  margin:10px 10px 0 0;
}

input.autocomplete-input {
    width: 100%;
    top: 0;
    position: fixed;
    left: 0;
}

.autocomplete ul li a{
    color: black;
    text-decoration: none;
    list-style-type: none;
    float: left;
    width: 100%;
}

.autocomplete ul {
    background:rgba(255,255,255, 0.5);
    margin-top: -40px;
    list-style-type: none;
    float: left;
    width: 100%;
}

.autocomplete ul li {
    text-align: start;
    font-size: 14px;
    left: -30px;
    position: relative;
}


</style>