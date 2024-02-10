<script>
import { store } from '../store';
export default {
    data() {
        return {
            store: store,
        }
    },
    props: {
        items: Array
    },
}
</script>

<template>
    <section class="items-list">
        <div class="container">
            <div class="menu-title">Menu</div>
            <div class="row">
                <div class="col-card" v-for="(item, index) in items">
                    <div class="card" :class="store.returnQty(item.id) > 0 ? 'in-cart' : ''">
                        <img class="item-img" :src="`http://127.0.0.1:8000/storage/${item.item_img}`" alt="">
                        <div class="item-info">
                            <div class="item-name">{{ item.name }}</div>
                            <div class="labels">
                                <div class="label spicy" v-show="item.is_spicy">
                                    <font-awesome-icon :icon="['fas', 'pepper-hot']" />
                                </div>
                                <div class="label veg" v-show="item.is_vegan">
                                    <font-awesome-icon :icon="['fas', 'seedling']" />
                                </div>
                                <div class="label gf" v-show="item.is_gluten_free">
                                    <font-awesome-icon :icon="['fas', 'wheat-awn-circle-exclamation']" />
                                </div>
                            </div>
                            <div class="cart-card-counter">
                                <button @click="store.removeItem(item.id)"
                                    v-show="store.returnQty(item.id) > 0"><font-awesome-icon
                                        :icon="['fas', 'minus']" /></button>
                                <div class="price">&euro; &nbsp;{{ item.price }}</div>
                                <button
                                    @click="store.addToCart(item.id, item.name, item.price, items.length, index)"><font-awesome-icon
                                        :icon="['fas', 'plus']" /></button>
                                <div class="quantity" v-show="store.returnQty(item.id) > 0">X {{ store.returnQty(item.id) }}</div>
                            </div>
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

            .in-cart {
                border: 3px solid $orange;
            }

            .card {
                display: flex;
                // align-items: center;
                height: 140px;
                width: 360px;
                gap: 15px;
                border-radius: 20px;
                transition: $transition;
                overflow: hidden;
                background-color: $linen;

                @media (max-width: 1200px) {
                    width: 300px;
                    gap: 5px;
                }

                @media (max-width: 991px) {
                    width: 320px;
                    gap: 12px;
                }

                &:hover {
                    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
                    // transform: scale(1.05);
                    // height: 100%;
                    // padding: 10px 0;

                    .item-img {
                        transform: scale(1.05);
                    }
                }

                .item-img {
                    height: 140px;
                    aspect-ratio: 1 / 1;
                    border-radius: 20px;
                    object-fit: cover;
                }

                .item-info {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 5px;
                    padding: 10px 10px 20px;

                    .item-name {
                        font-weight: 600;
                        font-size: 16px;
                    }

                    .cart-card-counter {
                        display: flex;
                        gap: 10px;
                        margin-top: 20px;
                        align-items: center;

                        @media (max-width: 1200px) {
                                gap: 5px;;
                            }

                        .price {
                            font-weight: 600;
                            font-size: 0.9rem;

                            @media (max-width: 1200px) {
                                font-size: 0.8rem;
                            }
                        }

                        .quantity {
                            font-size: 0.8rem;
                            font-weight: 600;
                            color: $orange;
                        }

                        button {
                            background-color: $orange;
                            color: $linen;
                            border-radius: 50px;
                            aspect-ratio: 1/1;
                            width: 20px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: 100ms linear;
                            cursor: pointer;

                            &:hover {
                                background-color: $orange;
                            }

                            &:active {
                                background-color: white;
                                color: $orange;
                            }
                        }
                    }

                    .labels {
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        width: 100%;
                        flex-grow: 1;

                        .label {
                            border-radius: 999px;
                            border: 1px solid black;
                            padding: 3px 10px;
                            line-height: 15px;
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
}

.inactive {
    display: none;
}
</style>