<template>
    <div class="categories-list"> 
       
        <div class="category" v-for="category in categories">
            <input type="checkbox" :name="category.name" :id="category.name" class="my-checkbox">
            <label :for="category.name">
                <img :src="category.img" alt="image">
                <span>{{ category.name }}</span>
            </label>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                categories: [
                    {
                        img: 'src/assets/img/italiano.jpg',
                        name: 'Italiano'
                    },
                    {
                        img: 'src/assets/img/francese.jpg',
                        name: 'Francese'
                    },
                    {
                        img: 'src/assets/img/spagnolo.jpg',
                        name: 'Spagnolo'
                    },
                    {
                        img: 'src/assets/img/greco.jpg',
                        name: 'Greco'
                    },
                    {
                        img: 'src/assets/img/messicano.jpg',
                        name: 'Messicano'
                    },
                    {
                        img: 'src/assets/img/cinese.jpg',
                        name: 'Cinese'
                    },
                    {
                        img: 'src/assets/img/giapponese.jpg',
                        name: 'Giapponese'
                    },
                    {
                        img: 'src/assets/img/vegetariano.jpg',
                        name: 'Vegetariano'
                    },
                    {
                        img: 'src/assets/img/pizzeria.jpg',
                        name: 'pizzeria'
                    },
                ]

            }
                
        }
        
    }
</script>

<style lang="scss" scoped>

@use '../scss/partials/variables' as *;
.categories-list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;

    .category {
        position: relative;
        display: flex;
        
        
       
        input {
            appearance: none;
        }
        
        label {
            display: block;
            position: relative;
            height: 100px;
            aspect-ratio: 16 /9;
            border-radius: 0.25rem;
            overflow: hidden;
            transition: $transition;

            &:hover {
                box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
                img {
                    transform: scale(1.1);
                }

            }
            &::after {
                content: '';
                position: absolute;
                inset: 0;
                background-color: rgba($color: $black, $alpha: 0.1);
            }
            img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            transition: $transition;
        }
            
            span {
                position: absolute;
                right: 0.5rem;
                top: 0.5rem;
                background-color: $orange;
                color: $white;
                padding: 0.25rem 0.5rem;
                border-radius: 5rem;
                z-index: 10;
                transition: $transition;
            }
            
        }
        input:checked~label span {
            background-color: $charcoal;
        }
    }
}

</style>