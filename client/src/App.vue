<template lang="pug">
    div.root
        img.logo(src="./assets/logo.png")
        h1 Todo List
        span.small-text MongoDB, Express, VueJS, NodeJS
        router-view
</template>

<script>
export default {
    data: () => ({
    })
}
</script>

<style lang="scss">
body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

h1 { display: inline-block; font-weight: normal; }
ul { list-style-type: none; padding: 0; }
li { border-bottom: 1px dashed #42b983; }
a { color: #42b983; }

.root { text-align: center; }
.logo { width: 100px; }
.small-text {
    display: block;
    margin-bottom: 10px;
    font-size: 12px;
}
</style>
