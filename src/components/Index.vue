<template>
    <div class="index container" v-if="smoothies.length > 0">
        <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
            <div class="card-content">
                <i class="material-icons delete" @click="deleteCard(smoothie.id)">delete</i>
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
    },
    methods: {
        deleteCard (id) {
            this.smoothies = this.smoothies.filter(s => s.id !== id)
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

    .material-icons.delete {
        position: absolute;
        top: 4px;
        right: 4px;
        cursor: pointer;
        color: #aaa;
        font-size: 1.4em;
    }

    .material-icons.delete:hover {
        opacity: 0.6;
    }
</style>
