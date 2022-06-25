<script setup>
import { ref } from 'vue'
import { 
	getAuth, 
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signOut
	} from "firebase/auth";

const email = ref('')
const pass = ref('')
const auth = getAuth()
const user = ref(null)
const isSignedIn = ref(null)

const signUp = () => {
	createUserWithEmailAndPassword(auth, email.value, pass.value)
	.then((userCredential) => {
		user.value = userCredential.user
		isSignedIn.value = true
		email.value = ''
		pass.value = ''
		console.log(user);
	})
	.catch((error) => {
		console.log(error.code, error.message);
	})
	// console.log( email.value, pass.value );
}

onAuthStateChanged(auth, (user) => {
	user ? isSignedIn.value = true : null
})

const logOut = () => {
	signOut(auth).then(() => {
		isSignedIn.value = null
	})
}

</script>

<template>
	<header class="container-xl px-4 py-3 bg-sky-900 text-white">
		<div class="flex justify-between items-center">
			<div class="text-2xl">Firebase Simple Admin</div>
			<nav class="flex items-center">
				<div v-if="isSignedIn">signed in</div>
				<div v-else>not signed in</div>
				<button 
					v-if="isSignedIn"
					@click="logOut"
					class="btn ml-5"
				>Logout</button>
			</nav>
		</div>
	</header>

	<main class="container-xl px-4 py-3 pt-12">
		<div class="w-1/3 mx-auto">
			<p class="text-2xl mb-4">Sign Up</p>
			<form @submit.prevent="signUp">
				<input 
					v-model="email"
					type="email" 
					placeholder="Email"
					class="w-full mb-3 rounded-md"
				>
				
				<input 
					v-model="pass" 
					type="password" 
					placeholder="Password"
					class="w-full mb-3 rounded-md"
				>
				<p class="text-sm text-right mb-3">
					Already among us? 
					<a href="#">Log In</a>
				</p>

				<p class="text-right">
					<button class="btn">Register</button>
				</p>
			</form>
		</div>
	</main>

</template>

<style>
</style>
