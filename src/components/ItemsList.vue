<script>
import { store } from '../store';
export default {
    data() {
        return {
            store: store,
            CartMobileOrder: false,
        }
    },
    methods: {
        showCartMobileOrder() {
            this.CartMobileOrder = true;
        },
        closeCartMobileOrder() {
            this.CartMobileOrder = false;
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
            <div class="grid">
                <div class="menu-title">Menu</div>
                <div class="grid-card">
                    <div class="card" :class="store.returnQty(item.id) > 0 ? 'in-cart' : ''" v-for="(item, index) in items">
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
                <div class="cart">
                    <h4>Il tuo ordine</h4>
                    <div class="cart-body" >
                        <p v-if="store.cart.length === 0">Il tuo carrello è vuoto</p>   

                    <div class="cart-card" v-for="card in store.cart">
                        <div class="cart-card-name">
                            <div>{{card.item_name}}</div>
                            <div>€ {{store.calcPartial(card.item_id)}}</div>
                        </div>
                        <div class="cart-item-delete" @click="store.deleteItem(card.item_id)">
                            <font-awesome-icon :icon="['fas', 'trash-can']" />
                        </div>
                        <div class="cart-card-counter">
                            <button @click="store.removeItem(card.item_id)"><font-awesome-icon :icon="['fas', 'minus']" /></button>
                            <div class="counter">{{card.quantity}}</div>
                            <button @click="store.addQuantity(card.item_id)"><font-awesome-icon :icon="['fas', 'plus']" /></button>
                        </div>
                    </div>
                </div>
                <div class="cart-total">
                    Totale: &euro; &nbsp;{{ store.calcTotal() }}
                </div>
                <div class="cart-confirm" :class="store.cart.length === 0 ? 'disable' : ''">
                    Procedi con l'ordine
                </div>
                </div>
                <div class="cart-mobile" :class="CartMobileOrder ? 'active' : ''">
                    <div class="title">
                        <h4 >Il tuo ordine</h4>
                        <font-awesome-icon :icon="['fas', 'arrow-left']" class="icon" @click="closeCartMobileOrder"/>
                    </div>
                    <div class="cart-body" >
                        <p v-if="store.cart.length === 0">Il tuo carrello è vuoto</p>   

                    <div class="cart-card" v-for="card in store.cart">
                        <div class="cart-card-name">
                            <div>{{card.item_name}}</div>
                            <div>€ {{store.calcPartial(card.item_id)}}</div>
                        </div>
                        <div class="cart-item-delete" @click="store.deleteItem(card.item_id)">
                            <font-awesome-icon :icon="['fas', 'trash-can']" />
                        </div>
                        <div class="cart-card-counter">
                            <button @click="store.removeItem(card.item_id)"><font-awesome-icon :icon="['fas', 'minus']" /></button>
                            <div class="counter">{{card.quantity}}</div>
                            <button @click="store.addQuantity(card.item_id)"><font-awesome-icon :icon="['fas', 'plus']" /></button>
                        </div>
                    </div>
                </div>
                <div class="cart-total">
                    Totale: &euro; &nbsp;{{ store.calcTotal() }}
                </div>
                <div class="cart-confirm" :class="store.cart.length === 0 ? 'disable' : ''">
                    Procedi con l'ordine
                </div>
                </div>
                
                <div class="cart-mobile-preview" :class="store.calcTotalQuantity() > 0 ? 'show' : ''">
                   <div class="left">
                       <div class="cart-mobile-icon">
                        <font-awesome-icon :icon="['fab', 'opencart']" />
                        <span class="quantity"> {{ store.calcTotalQuantity() }}</span>
                       </div>
                       <div class="cart-mobile-total">
                            &euro; &nbsp;{{ store.calcTotal() }}
                        </div>
                   </div>
                   <div class="right" @click="showCartMobileOrder">
                    Vedi dettagli dell'ordine
                   </div>

                </div>
                
            </div>
            <!-- <div class="row">
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
            </div> -->
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

    .grid {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 2rem;

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
        }

        .grid-card {
            grid-column: 1 / 2;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-template-rows: repeat(auto-fill, 140px);
            gap: 2rem;
            .card {
            display: flex;
            height: 140px;
            gap: 15px;
            border-radius: 1rem;
            transition: $transition;
            overflow: hidden;
            background-color: $linen;

            &.in-cart {
                border: 3px solid $orange;
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
                    // border-radius: 1rem 0 0;
                    object-fit: cover;
                    transition: $transition;
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

    .cart {
        background-color: $linen;
        border-radius: 1rem;
        padding: 1rem;
        h4 {
            text-align: center;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        @media (max-width:768px){
            display: none;
        }
    }

    .cart-mobile {
        position: fixed;
        inset: 0;
        transform: translateX(100%);
        z-index: 1000;
        background-color: $linen;
        padding: 1rem;
        transition: $transition;
        &.active {
            transform: translateX(0);
        }
        .title {
            text-align: center;
            font-size: 1.5rem;
            margin-bottom: 1rem;
            position: relative;
            .icon {
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                cursor: pointer;
            }
        }
    }

    .cart-mobile-preview {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: space-between;
        bottom: 0;
        transform: translateY(100%);
        left: 0;
        width: 100%;
        padding: 1rem;
        background-color: $orange;
        color: $white;
        transition: $transition;

        @media (min-width:768px) {
            display: none;
        }
        &.show {
            transform: translateY(0);
        }
        .left {
            display: flex;
            align-items: center;
            gap: 1rem;

            .cart-mobile-icon {
            position: relative;
            font-size: 1.75rem;
            .quantity {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                top: 0;
                right: 0;
                transform: translateY(-50%);
                width: 1rem;
                aspect-ratio: 1;
                background-color: $white;
                color: $orange;
                font-size: 0.75rem;
                border-radius: 50%;
            }
            }
            .cart-mobile-total {
                font-weight: 600;
                font-size: 1.125rem;
            }
        }
        .right {
            cursor: pointer;
        }
        
    }

   

    .cart-body {
            overflow: auto;
            // max-width: 800px;
            // height: 60vh;
            // padding: 18px;

            .cart-card {
                position: relative;
                // border-bottom: 1px solid rgba($orange, 0.5);
                padding: 1rem 0.75rem;
                margin-bottom: 15px;
                background-color: rgba($orange, 0.2);
                border-radius: 1rem;

                .cart-card-name {
                    font-size: 1rem;
                    font-weight: 600;
                    display: flex;
                    justify-content: space-between;
                }

                .cart-item-delete {
                    background-color: red;
                    position: absolute;
                    right: 8px;
                    bottom: 8px;
                    color: $linen;
                    border-radius: 50px;
                    aspect-ratio: 1/1;
                    width: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: 100ms linear;

                    &:hover {
                        transform: scale(1.1);
                        cursor: pointer;
                    }

                    &:active {
                        transform: scale(1);
                    }
                }

                .cart-card-counter {
                    display: flex;
                    gap: 10px;
                    margin-top: 20px;

                    .counter {
                        background-color: $orange;
                        padding: 0px 15px;
                        border-radius: 25px;
                        color: white;
                        font-weight: 600;
                        font-size: 1rem;
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
            }
        }

        .cart-total {
            text-align: start;
            margin: 10px;
            padding: 10px;
            color: black;
            border-radius: 25px;
            background-color: $white;
        }

        .cart-confirm { 
            text-align: center;
            margin: 0px 10px 15px;
            padding: 10px;
            color: white;
            border-radius: 25px;
            background-color: $orange;

            &:hover {
                cursor: pointer;
            }
            &.disable {
                color: $silver;
                background-color: $light-silver;
                cursor: not-allowed;
            }

            &:active {
                background-color: $linen;
                color: black;
            }
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