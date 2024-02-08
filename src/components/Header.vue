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
                <li class="header-btn">
                    <font-awesome-icon :icon="['fab', 'opencart']" />
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
                <h2>Se sei il ristoratore oppure vuoi apprire il tuo account clicca</h2>
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
    </header>
</template>

<script>
export default {


    data() {
        return {
            active: false,
            headerBtn: false
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
        }
    }
}
</script>

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