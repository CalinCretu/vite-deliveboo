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

            <div class="grid">
                <div class="restaurant-card" v-for="n in 10">
                    <div class="restaurant-card-image">
                        <img src="../assets/img/cover-ristorante.jpg" alt="cover">
                    </div>
                    <div class="restaurant-card-body">
                        <h4 class="name">Nome ristorante</h4>
                        <p class="address">Indirizzo ristorante</p>
                        <div class="categories">
                            <span class="category">Categoria 1</span>
                            <span class="category">Categoria 2</span>
                            <span class="category">Categoria 3</span>
                        </div>
                        <a href="" class="link">
                            Guarda il menù
                        </a>


                    </div>
                </div>
            </div>

            
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

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 2rem;
        margin-block: 3rem;
    }

    .restaurant-card {
        border-radius: 1rem;
        overflow: hidden;
        background-color: $linen;
        transition: $transition;
        &:hover {
            box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    }
        .restaurant-card-image {
            height: 250px;
            transform: scale(1);
            overflow: hidden;
            
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
                transform: scale(1);
                transition: $transition;

                &:hover {
                    transform: scale(1.1);
                }
            }
        }
        .restaurant-card-body {
            padding: 2rem;

            .name {
                font-size: 1.5rem;
                margin-bottom: 1rem;
                cursor: pointer;
                color: $charcoal;
                transition: $transition;
                &:hover {
                    color: $orange;
                }
            }
            .address {
                margin-bottom: 1rem;
                font-weight: 300;
                color: $charcoal;
            }

            .categories {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                gap: 0.5rem;
                font-size: 0.75rem;
                font-weight: 600;
                margin-bottom: 1rem;
                .category {
                    background-color: transparent;
                    border: 1px solid $silver;
                    color: $silver;
                    padding: 0.25rem 0.5rem;
                    border-radius: 2rem;
                }
            }

            .link {
                display: inline-block;
                
                background-color: $orange;
                
                border-radius: 5rem;
                transform: scale(1);
                transition: $transition;
                cursor: pointer;
                color: $white;
                padding: 0.5rem 1rem;
            
                
                
                }
            

        }
    }
    
}
</style>