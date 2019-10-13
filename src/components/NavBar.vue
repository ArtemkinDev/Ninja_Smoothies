<template>
<div class="navbar">
    <nav class="nav-extended indigo darken-2">
        <div class="nav-content">
            <router-link :to="{ name: 'Index' }">
                <span class="nav-title">Ninja Smoothies</span>
            </router-link>
            <router-link :to="{ name: 'AddSmoothies' }" class="btn-floating btn-large halfway-fab waves-effect waves-light teal">
                <i class="material-icons">add</i>
            </router-link>
        </div>
    </nav>
</div>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style>
    .navbar .nav-extended {
        margin-bottom: 50px;
    }
</style>
