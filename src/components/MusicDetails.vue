<template>
    <div class="details">
        <h3> {{title}} </h3>
    </div>
</template>

<script>
    export default {
        props: ['title']
    };
</script>

<style>
.details h3 {
    text-align: center;
    padding: 70px 10px;
    margin: 0;
    color: white;
}
</style>