<script>
export default {
    props: {
        restaurant: Object
    }
}
</script>

<template>
    <section class="profile">
        <!-- <div>{{restaurant.business_name}}</div> -->
        <!-- <img :src="`http://127.0.0.1:8000/storage/${restaurant.restaurant_img}`" alt=""> -->
    </section>
</template>

<style lang="scss">
.profile {
    height: 400px;
}
</style>