<script>
import { store } from '../store';
export default {
    data() {

        return {
            active: false,
            headerBtn: false,
            dropdown: false,
            store
        }
    },
    methods: {
        getAdminBtn() {
            this.active = !this.active
            // console.log(this.active);
        },
        getHeaderBtn() {
            this.headerBtn = !this.headerBtn
            // console.log(this.headerBtn);
        },
        getCartDropdown() {
            this.dropdown = !this.dropdown
        }
    }
}
</script>

<template>
    <header>
        <nav class="container">
            <div class="logo">
                <router-link :to="{ name: 'home' }">
                    <!-- <a href="#home"> -->
                    <img src="../assets/img/Risorsa 1.png" alt="" class="logo-small">
                    <img src="../assets/img/Risorsa 3.png" alt="" class="logo-big">
                    <!-- </a> -->
                </router-link>
            </div>
            <div>
                <ul class="header-btn-group">
                    <li class="header-btn"><router-link :to="{ name: 'home' }">Home</router-link></li>
                    <li class="header-btn">About us</li>
                    <li class="header-btn">Catalogo</li>
                    <li class="header-btn">Contatta</li>
                </ul>
            </div>
            <ul class="list">
                <li @click="getCartDropdown()" class="header-btn cart-btn">
                    <font-awesome-icon :icon="['fab', 'opencart']" />
                    <div class="cart-quantity" v-show="store.cart.length">
                        {{ store.cartQuantity() }}
                    </div>
                </li>
                <li @click="getAdminBtn()" class="admin header-btn">
                    <font-awesome-icon :icon="['fas', 'user-tie']" />
                </li>
                <li @click="getHeaderBtn()" class="header-btn btn-mobile">
                    <font-awesome-icon :icon="['fas', 'bars-staggered']" />
                </li>
            </ul>
        </nav>
        <div :class="active ? 'active' : ''" class="bg-admin-btn-card">
            <div class="admin-btn-card">
                <h2>Se sei il ristoratore oppure vuoi aprire il tuo account clicca</h2>
                <a @click="getAdminBtn()" href="http://127.0.0.1:8000/login" class="admin-btn">Login</a>
                <a @click="getAdminBtn()" href="http://127.0.0.1:8000/register" class="admin-btn">Registrati</a>
            </div>
            <div @click="getAdminBtn()" class="close-btn">
                <font-awesome-icon :icon="['fas', 'xmark']" />
            </div>
        </div>
        <div v-if="headerBtn" class="bg-mobile-btn">
            <ul class="header-btn-mobile">
                <li @click="getHeaderBtn()" class="header-btn"><router-link :to="{ name: 'home' }">Home</router-link></li>
                <li @click="getHeaderBtn()" class="header-btn">About us</li>
                <li @click="getHeaderBtn()" class="header-btn">Catalogo</li>
                <li @click="getHeaderBtn()" class="header-btn">Contatta</li>
            </ul>
            <div @click="getHeaderBtn()" class="close-btn">
                <font-awesome-icon :icon="['fas', 'xmark']" />
            </div>
        </div>
        <div v-if="dropdown" class="cart-dropdown">
            <div @click="getCartDropdown()" class="cart-close-btn">
                <font-awesome-icon :icon="['fas', 'xmark']" />
            </div>
            <div class="cart-body">
                <div class="cart-card" v-for="card in store.cart">
                    <div class="cart-card-name">
                        <div>{{ card.item_name }}</div>
                        <div>€ {{ store.calcPartial(card.item_id) }}</div>
                    </div>
                    <div class="cart-item-delete" @click="store.deleteItem(card.item_id)">
                        <font-awesome-icon :icon="['fas', 'trash-can']" />
                    </div>
                    <div class="cart-card-counter">
                        <button @click="store.removeItem(card.item_id)"><font-awesome-icon
                                :icon="['fas', 'minus']" /></button>
                        <div class="counter">{{ card.quantity }}</div>
                        <button @click="store.addQuantity(card.item_id)"><font-awesome-icon
                                :icon="['fas', 'plus']" /></button>
                    </div>
                </div>
            </div>
            <div class="cart-total">
                Totale: &euro; &nbsp;{{ store.calcTotal() }}
            </div>
            <div class="cart-confrim">
                Procedi con l'ordine
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '../scss/partials/variables' as *;

header {
    position: fixed;
    width: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.18);
    backdrop-filter: blur(7px);
    color: $white;
    height: $height-header;
    display: flex;
    align-items: center;
    z-index: 1000;
    font-size: 16px;


    .bg-mobile-btn {
        background-color: rgba(0, 0, 0, 0.831);
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: -1000%;
    }

    .header-btn-mobile {
        display: flex;
        flex-direction: column;
        gap: 40px;
        font-size: 40px;
        align-items: center;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, 30%);
    }

    .close-btn {
        position: fixed;
        right: 40px;
        top: 70px;
        font-size: 2rem;
        background-color: $orange;
        border-radius: 50px;
        width: 50px;
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
    }

    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .logo {
            max-width: 200px;

            .logo-small {
                display: block;
                max-height: 45px;
            }

            .logo-big {
                display: none;
            }
        }

        .list {
            display: flex;
            gap: 2rem;
            font-size: 22px;

        }
    }

    .header-btn-group {
        display: none;
        gap: 50px;
    }

    .header-btn {

        border: 1px solid $orange;
        padding: 7px 18px;
        border-radius: 50px;

        &:hover {
            // color: $orange;
            background-color: $orange;
            cursor: pointer;

            .cart-quantity {
                background-color: $linen;
                color: $orange;
            }
        }
    }


    .cart-btn {
        position: relative;

        .cart-quantity {
            position: absolute;
            top: -8px;
            right: -3px;
            background-color: $orange;
            aspect-ratio: 1/1;
            width: 22px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
        }
    }

    .slide-enter-active,
    .slide-leave-active {
        transition: transform 0.3s ease;
    }

    .slide-enter,
    .slide-leave-to {
        transform: translateY(-100%);
    }

    .cart-dropdown {
        position: fixed;
        right: 40px;
        top: 90px;
        width: 300px;
        background-color: $linen;
        border-radius: 25px;
        color: black;
        display: flex;
        flex-direction: column;

        .cart-close-btn {
            align-self: flex-end;
            margin: 10px 10px 0px 0px;
            font-size: 1.2rem;
            background-color: $linen;
            border-radius: 50px;
            width: 35px;
            aspect-ratio: 1/1;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 250ms linear;

            &:hover {
                color: $linen;
                background-color: $orange;
                rotate: 90deg;
                cursor: pointer;
            }

            &:active {
                background-color: $linen;
                color: $orange;
            }
        }

        ::-webkit-scrollbar {
            width: 8px;
        }

        ::-webkit-scrollbar-thumb {
            background: rgb(255, 191, 72);
            border-radius: 50px;

            &:hover {
                background: $orange;
                width: 25px;
            }
        }

        .cart-body {
            overflow: auto;
            max-width: 800px;
            height: 60vh;
            padding: 18px;

            .cart-card {
                position: relative;
                // border-bottom: 1px solid rgba($orange, 0.5);
                padding: 15px 10px;
                margin-bottom: 15px;
                background-color: rgba($orange, 0.2);
                border-radius: 25px;

                .cart-card-name {
                    font-size: 18px;
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

        .cart-confrim {
            text-align: center;
            margin: 0px 10px 15px;
            padding: 10px;
            color: white;
            border-radius: 25px;
            background-color: $orange;

            &:hover {
                cursor: pointer;
            }

            &:active {
                background-color: $linen;
                color: black;
            }
        }
    }

    .admin {
        cursor: pointer;
    }

    .bg-admin-btn-card {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        height: 100vh;
        backdrop-filter: blur(7px);
        background-color: rgba(0, 0, 0, 0.735);
        display: none;

        &.active {
            display: block;
        }

        .admin-btn-card {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            text-align: center;
            gap: 50px;
            font-size: 25px;
        }

        .admin-btn {
            background-color: $orange;
            border-radius: 50px;
            padding: 25px 40px;
            transition: $transition;
            overflow: hidden;
            color: $linen;
            transition: 250ms linear;

            &:hover {
                color: $orange;
                background-color: $linen;
            }
        }
    }
}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
    .btn-mobile {
        display: none;
    }

    header {
        .header-btn-group {
            display: flex;
        }

        nav {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .logo {
                max-width: 200px;

                .logo-small {
                    display: none;
                }

                .logo-big {
                    display: block;
                }

            }
        }
    }
}

// X-Large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {}
</style>