<script>
export default {
    props: {
        restaurant: Object
    }
}
</script>

<template>
    <section class="profile">
        <div class="container">
            <div class="row">
                <div class="restaurant-name">{{ restaurant.business_name }}</div>
                <div class="restaurant-detail">
                    <font-awesome-icon :icon="['fas', 'location-dot']" />
                    <div>{{ restaurant.address }}</div>
                </div>
                <div class="restaurant-detail">
                    <font-awesome-icon :icon="['fas', 'envelope']" />
                    <div>{{ restaurant.email }}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
.profile {
    height: 500px;
    background-image: url('/restaurant-bg.jpg');
    background-size: cover;

    .row {
        padding-left: 20%;
        height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: white;
        gap: 1rem;

        .restaurant-name {
            font-size: 2rem;
            font-weight: 600;
        }

        .restaurant-detail {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
    }
}
</style>