<template>
    <header>
        <nav class="container">
            <div class="logo">
                <router-link :to="{ name: 'home' }">
                    <!-- <a href="#home"> -->
                    
                    <img src="../assets/img/Logo 1.png" alt="" class="logo-small">
                    <img src="../assets/img/Logo 3.png" alt="" class="logo-big">
                <!-- </a> -->
                </router-link>
                


            </div>
            <ul class="list">
                <li class="item">
                    <a href="" class="link">Login</a>
                </li>
                <li class="item">
                    <a href="" class="link">Registrati</a>
                </li>
            </ul>
             
        </nav>
    </header>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

@use '../scss/partials/variables' as *;

header {
    position: fixed;
    width: 100%;
    top: 0;
    background-color: $orange;
    color: $white;
    height: $height-header;
    display: flex;
    align-items: center;
    z-index: 1000;

    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .logo {
            max-width: 200px;
            .logo-small {
                display: none;
            }
        }
        .list {
            display: flex;
            gap: 2rem;
        }
    }
}

</style>