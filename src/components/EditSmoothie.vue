<template>
    <div class="edit-smoothies container" v-if = "smoothie">
        <h2 class="center-align indigo-text">Edit the {{ smoothie.title }}!</h2>
        <form @submit.prevent="onSubmit()">
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" id="title" name="title" v-model="smoothieClone.title">
            </div>
            <div class="new-ingredient-wrapper" v-if="smoothieClone.ingredients.length > 0">
                <div class="field add-ingredient" v-for="(ingredient, ind) in smoothieClone.ingredients" :key="ind">
                    <label :for="`add-ingredient-${ind}`">Add an ingredient:</label>
                    <input type="text" :name="`add-ingredient-${ind}`" :id="`add-ingredient-${ind}`" v-model="smoothieClone.ingredients[ind]">
                </div>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient:</label>
                <input type="text" name="add-ingredient" id="add-ingredient" @keydown.enter.prevent="addIngr()" v-model="another">
                <ul class="ingredients" v-if="smoothieClone.ingredients.length > 0">
                    <li v-for="(ingredient, index) in smoothieClone.ingredients" :key="index">
                        <span class="chip">{{ ingredient }}</span>
                        <span class="remove-item" @click="deleteIngredient(index)">Delete</span>
                    </li>
                </ul>
            </div>
            <div class="field center-align">
                <p v-if="errorMsg" class="red-text"> {{ errorMsg }} </p>
                <button class="btn pink">Update Smoothie</button>
                <button type="button" class="btn red" @click = "onReset()">Reset changes</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import createClone from '@/common/helpers/createClone'
import isEqual from '@/common/helpers/checkForEquality'
import slugify from 'slugify'

export default {
    name: 'EditSmoothie',
    data () {
        return {
            smoothieSlug: this.$route.params.smoothie_slug,
            smoothie: null,
            smoothieClone: null,
            another: null,
            errorMsg: ''
        }
    },
    methods: {
        updateSlug () {
            this.smoothieSlug = this.$route.params.smoothie_slug
        },
        onSubmit () {
            if (isEqual(this.smoothieClone, this.smoothie)) {
                // eslint-disable-next-line
                this.$router.push({ name: 'Index' }).catch(err => {})
            }

            if (!this.smoothieClone.title) {
                this.errorMsg = 'You must enter a title!'
            } else if (!this.smoothieClone.ingredients.length > 0) {
                this.errorMsg = 'You must enter at least one value!'
            } else {
                this.errorMsg = ''
                // create a slug
                this.slug = slugify(this.smoothieClone.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })

                db.collection('smoothies').doc(this.smoothieClone.id).update({
                    title: this.smoothieClone.title,
                    ingredients: this.smoothieClone.ingredients,
                    slug: this.smoothieClone.slug
                }).then(() => {
                    // eslint-disable-next-line
                    this.$router.push({ name: 'Index' }).catch(err => {})
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        addIngr () {
            if (this.another) {
                this.smoothieClone.ingredients.push(this.another)
                this.another = null
                this.errorMsg = ''
            } else {
                this.errorMsg = 'You must enter a value!'
            }
        },
        deleteIngredient (index) {
            this.smoothieClone.ingredients.splice(index, 1)
        },
        onReset () {
            this.smoothieClone = createClone(this.smoothie)
            console.log(this.smoothie)
        }
    },
    created () {
        let ref = db.collection('smoothies').where('slug', '==', this.smoothieSlug)
        ref.get().then(s => {
            s.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id

                this.smoothieClone = createClone(this.smoothie)
            })
        })
    },
    watch: {
        $route: 'updateSlug'
    }
}
</script>

<style>
    h2 {
        font-size: 30px;
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
