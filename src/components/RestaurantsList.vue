<script>
import Categories from '../components/Categories.vue';
import axios from 'axios';
import { store } from '../store'
export default {
    data() {
        return {
            store: store,
            restaurantsArray: [],
        }
    },
    components: {
        Categories
    },
    methods: {
        fetchRestaurants() {
            axios.get('http://127.0.0.1:8000/api/users')
                .then(res => {
                    this.restaurantsArray = res.data.results;
                })
        },
        fetchRestaurantsByName() {
            axios.post('http://127.0.0.1:8000/api/users', this.store.request)
                .then(res => {
                    this.restaurantsArray = res.data.results;
                    console.log(this.store.categories[0].isOn);
                })
        },
        resetFilter() {
            this.store.request.name = '';
            this.store.request.types_id = [];
            this.store.categories.forEach(element => {
                element.isOn = false;
            });
            this.fetchRestaurantsByName()
        }
    },
    created() {
        this.fetchRestaurants();
    }

}
</script>

<template>
    <section class="restaurants-list" id="restaurants-list">
        <input type="text" name="restaurant-name" id="restaurant-name" v-model="store.request.name"
            @keyup="fetchRestaurantsByName">
        <div class="container">
            <h2 class="title">Cosa vuoi mangiare?</h2>
            <Categories @fetch-restaurants="fetchRestaurantsByName()"/>
            <!-- <button class="btn">Cerca</button> -->
            <button class="btn" @click="resetFilter()">Reset</button>
        </div>
        <ul>
            <li v-for="restaurant in restaurantsArray">
                {{ restaurant.business_name }}
            </li>
        </ul>
    </section>
</template>

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