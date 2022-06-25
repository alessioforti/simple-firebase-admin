<script setup>
import { ref } from 'vue'
import SignUpInVue from './components/SignUpIn.vue'

import { 
	getAuth, 
	onAuthStateChanged,
	signOut
	} from "firebase/auth";

const auth = getAuth()
const isSignedIn = ref(null)
const user = ref(null)

const signTheUserIn = (user) => {
	onAuthStateChanged(auth, (user) => {
		user ? isSignedIn.value = true : null
		user.value = auth.currentUser
	})
	// console.log(user.value.email)
}


const logOut = () => {
	signOut(auth).then(() => {
		isSignedIn.value = null
	})
}


</script>

<template>
	<header class="container-xl px-4 py-2 bg-sky-900 text-white">
		<div class="flex justify-between items-center">
			<div class="text-2xl py-2">Simple Firebase Admin</div>
			<nav class="flex items-center">
				<!-- <div v-if="isSignedIn">signed in</div> -->
				<button 
					v-if="isSignedIn"
					@click="logOut"
					class="btn ml-5"
				>Logout</button>
			</nav>
		</div>
	</header>

	<main class="container-xl px-4 py-3 pt-12">
		<SignUpInVue v-if="!isSignedIn" @logged-in="signTheUserIn"/>
		<div v-else>hello</div>
	</main>

</template>

<style>
</style>
