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
            <span class="btn-floating btn-large halfway-fab pink">
                <router-link :to="{ name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug} }">
                    <i class="material-icons edit">edit</i>
                </router-link>
            </span>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line
import db from '@/firebase/init'

export default {
    name: 'Index',
    data () {
        return {
            smoothies: []
        }
    },
    created () {
        // fetch data
        db.collection('smoothies').get()
            .then(snapshot => {
                snapshot.forEach(s => {
                    console.log(s.data(), s.id)
                    let smoothie = s.data()
                    smoothie.id = s.id
                    this.smoothies.push(smoothie)
                })
            })
    },
    methods: {
        deleteCard (id) {
            db.collection('smoothies').doc(id)
                .delete()
                .then(() => {
                    this.smoothies = this.smoothies.filter(s => s.id !== id)
                })
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
