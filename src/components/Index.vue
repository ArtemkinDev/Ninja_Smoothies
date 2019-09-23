<template>
    <div class="index container" v-if="smoothies.length > 0">
        <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
            <div class="card-content">
                <h3 class="indigo-text">
                    {{ smoothie.title }}
                </h3>
                <ul class="ingredients">
                    <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
                        <span class="chip">{{ ingredient }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Index',
    data () {
        return {
            smoothies: [
                {
                    title: 'Ninja Brew',
                    slug: 'ninja-brew',
                    ingredients: [
                        'bannanas',
                        'coffe',
                        'milk'
                    ],
                    id: 1
                },
                {
                    title: 'Morning Mood',
                    slug: 'morning-mood',
                    ingredients: [
                        'mango',
                        'lime',
                        'juice'
                    ],
                    id: 2
                }
            ]
        }
    }
}
</script>

<style scoped>
    .index {
        display: flex;
        flex-wrap: wrap;
    }

    .index .card {
        flex-basis: calc(33% - 15px);
    }

    .index .card:not(:last-child) {
        margin-right: 15px;
    }

    .index h3 {
        font-size: 1.8rem;
    }

    .index ul {
        display: flex;
        flex-wrap: wrap;
    }
</style>
