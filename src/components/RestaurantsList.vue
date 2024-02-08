<template>

    <section class="restaurants-list" id="restaurants-list">

        <div class="container">
            <h2 class="title">Cosa vuoi mangiare?</h2>

            <Categories />
            <button class="btn">Cerca</button>
        </div>



    </section>
</template>

<script>
import Categories from '../components/Categories.vue';
    export default {
        components: {
            Categories
        }
        
    }
</script>

<style lang="scss" scoped>

@use '../scss/partials/variables' as *;
section.restaurants-list {
    padding-top: 6rem;
    min-height: 100vh;

    .title {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 2rem;
    }
    .btn {
        display: block;
        background-color: $orange;
        color: $white;
        padding: 1rem 2rem;
        font-size: 1rem;
        border-radius: 5rem;
        cursor: pointer;
        margin-inline: auto;
    }
}

</style>