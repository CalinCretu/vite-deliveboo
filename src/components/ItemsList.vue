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
                                    @click="store.addToCart(item.id, item.name, item.price, items.length, item.user_id)"><font-awesome-icon
                                        :icon="['fas', 'plus']" /></button>
                                <div class="quantity" v-show="store.returnQty(item.id) > 0">X {{ store.returnQty(item.id) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="store.showWarning" class="bg-warning-card">
            <div class="warning-card-body">
                <div @click="store.showWarning = false" class="warning-close-btn">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </div>
                <div class="warning-card">
                    <h1 class="warning-title">Attenzione!!</h1>
                    <p class="warning-text">Puoi ordinare solo da un ristorante alla volta. Vuoi mantenere l'ordine attuale
                        e
                        procedere al pagamento
                        oppure svuotare il carrello e aggiungere il nuovo piatto?
                    </p>
                    <div class="btn-warning">
                        <button class="btn-confrim">
                            Procedi al pagamento
                        </button>
                        <button @click="store.emptyCart" class="btn-confrim btn-delete">
                            Svuota e Aggiungi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../scss/partials/variables' as *;


.items-list {
    padding: 100px 0;

    .bg-warning-card {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.757);
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $orange;
        text-align: center;

        .warning-close-btn {
            align-self: flex-end;
            font-size: 1.2rem;
            background-color: $orange;
            color: $linen;
            border-radius: 50px;
            margin: 20px;
            width: 35px;
            aspect-ratio: 1/1;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 250ms linear;

            &:hover {
                color: $orange;
                background-color: $linen;
                rotate: 90deg;
                cursor: pointer;
            }

            &:active {
                background-color: $orange;
                color: $linen;
            }
        }

        .warning-card-body {
            max-width: 800px;
            display: flex;
            flex-direction: column;
            padding: 80px;
            border: 2px solid $orange;
            border-radius: 50px;
            padding: 20px;
        }

        .warning-card {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 50px;
            border-radius: 50px;
        }

        .warning-title {
            font-size: 50px;
        }

        .warning-text {
            font-size: 20px;
        }

        .btn-confrim {
            text-align: center;
            margin: 0px 10px 15px;
            padding: 10px 15px;
            color: white;
            border-radius: 25px;
            background-color: $orange;
            transition: 250ms linear;

            &:hover {
                cursor: pointer;
                transform: scale(1.1);
            }

            &:active {
                background-color: $linen;
                color: black;
            }
        }

        .btn-delete {
            background-color: red;
        }


    }

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
                            gap: 5px;
                            ;
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