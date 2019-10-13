<template>
<div class="add-smoothies container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe!</h2>
    <form @submit.prevent="onSubmit()">
        <div class="field title">
            <label for="title">Smoothie Title:</label>
            <input type="text" id="title" name="title" v-model="title">
        </div>
        <div class="new-ingredient-wrapper" v-if="ingredients.length > 0">
            <div class="field add-ingredient" v-for="(ingredient, ind) in ingredients" :key="ind">
                <label :for="`add-ingredient-${ind}`">Add an ingredient:</label>
                <input type="text" :name="`add-ingredient-${ind}`" :id="`add-ingredient-${ind}`" v-model="ingredients[ind]">
            </div>
        </div>
        <div class="field add-ingredient">
            <label for="add-ingredient">Add an ingredient:</label>
            <input type="text" name="add-ingredient" id="add-ingredient" @keydown.enter.prevent="addIngr()" v-model="another">
            <ul class="ingredients" v-if="ingredients.length > 0">
                <li v-for="(ingredient, index) in ingredients" :key="index">
                    <span class="chip">{{ ingredient }}</span>
                    <span class="remove-item" @click="deleteIngredient(index)">Delete</span>
                </li>
            </ul>
        </div>
        <div class="field center-align">
            <p v-if="errorMsg" class="red-text"> {{ errorMsg }} </p>
            <button class="btn pink">Add Smoothie</button>
        </div>
    </form>
</div>
</template>

<script>
// eslint-disable-next-line
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'AddSmoothies',
    data () {
        return {
            title: null,
            another: null,
            ingredients: [],
            errorMsg: '',
            slug: null
        }
    },
    methods: {
        onSubmit () {
            if (!this.title) {
                this.errorMsg = 'You must enter a title!'
            } else if (!this.ingredients.length > 0) {
                this.errorMsg = 'You must enter at least one value!'
            } else {
                this.errorMsg = ''
                // create a slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })

                db.collection('smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
                }).then(() => {
                    this.$router.push({ name: 'Index' })
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        addIngr () {
            if (this.another) {
                this.ingredients.push(this.another)
                this.another = null
                this.errorMsg = ''
            } else {
                this.errorMsg = 'You must enter a value!'
            }
        },
        deleteIngredient (index) {
            this.ingredients.splice(index, 1)
        }
    }
}
</script>

<style>
.add-smoothies {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}

h2 {
    font-size: 30px;
}

.add-smoothies .fierld {
    margin: 20px auto;
}

.ingredients {
    display: flex;
}

.ingredients li {
    position: relative;
    overflow: hidden;
}

.ingredients .remove-item {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: rgba(0, 0, 0, .6);
    display: none;
    font-size: 13px;
    color: white;
    border-radius: 16px;
    cursor: pointer;
}

.ingredients li:hover .remove-item {
    display: block;
}
</style>
