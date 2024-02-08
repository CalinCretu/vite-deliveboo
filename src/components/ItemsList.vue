<script>
export default {
    props: {
        items: Array
    }
}
</script>


<template>
    <section class="items-list">
        <div class="container">
            <div class="menu-title">Menu</div>
            <div class="row">
                <div class="col-card" v-for="item in items">
                    <div class="card">
                        <img class="item-img" :src="`http://127.0.0.1:8000/storage/${item.item_img}`" alt="">
                        <div class="item-name">{{ item.name }}</div>
                        <div class="item-text">{{ item.description }}</div>
                        <div class="labels">
                            <div class="label spicy" v-show="item.is_spicy">
                                <font-awesome-icon :icon="['fas', 'pepper-hot']" />
                                Piccante
                            </div>
                            <div class="label veg" v-show="item.is_vegan">
                                <font-awesome-icon :icon="['fas', 'seedling']" />
                                Vegano
                            </div>
                            <div class="label gf" v-show="item.is_gluten_free">
                                <font-awesome-icon :icon="['fas', 'wheat-awn-circle-exclamation']" />
                                Senza Glutine
                            </div>
                        </div>
                        <div class="add-item">
                            <font-awesome-icon :icon="['fas', 'cart-plus']" />
                            <div class="price">&euro; &nbsp;{{ item.price }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
@use '../scss/partials/variables' as *;

.items-list {
    padding: 100px 0;

    .menu-title {
        text-align: center;
        font-weight: 600;
        font-size: 2rem;
        margin-bottom: 2rem;
    }

    .row {
        display: flex;
        flex-wrap: wrap;
        row-gap: 40px;

        .col-card {
            flex-basis: calc(100% / 12 * 4);
            display: flex;
            justify-content: center;

            @media (max-width: 991px) {
                flex-basis: calc(100% / 12 * 6);
            }

            @media (max-width: 768px) {
                flex-basis: 100%;
            }

            .card {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 20px 0;
                aspect-ratio: 1 / 1;
                width: 350px;
                gap: 15px;
                border-radius: 50px;
                transition: $transition;
                overflow: hidden;
                background-color: $linen;

                @media (max-width: 1200px) {
                    width: 280px;
                    gap: 5px;
                }

                @media (max-width: 991px) {
                    width: 320px;
                    gap: 12px;
                }

                &:hover {
                    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
                    transform: scale(1.05);

                    .item-text {
                        display: block;
                    }
                }

                .item-img {
                    height: 150px;
                    aspect-ratio: 1 / 1;
                    border-radius: 50px;
                    object-fit: cover;
                }

                .item-name {
                    font-weight: 600;
                    font-size: 18px;
                    flex-grow: 1;
                }

                .item-text {
                    font-size: 12px;
                    display: none;
                    flex-grow: 2;
                }

                .labels {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    width: 100%;

                    .label {
                        border-radius: 999px;
                        border: 1px solid black;
                        padding: 0 5px;
                        line-height: 30px;
                        font-size: 10px;
                    }

                    .spicy {
                        color: red;
                        border-color: red;
                    }

                    .veg {
                        color: green;
                        border-color: green;
                    }

                    .gf {
                        color: darkgoldenrod;
                        border-color: darkgoldenrod;
                    }
                }

                .add-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background-color: $orange;
                    color: white;
                    font-weight: 600;
                    padding: 0 15px;
                    line-height: 30px;
                    border-radius: 999px;
                    cursor: pointer;

                    &:hover {
                        background-color: $linen;
                        color: $orange;
                        border: 1px solid $orange;
                    }

                    &:active {
                        transform: scale(0.9);
                    }
                }
            }
        }
    }
}
</style>