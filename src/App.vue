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
	<div>
		<p>Sign Up</p>
		<form @submit.prevent="signUp">
			<label for="email">Email</label>
			<input v-model="email" type="email">

			<label for="password">Password</label>
			<input v-model="pass" type="password">

			<button>Register</button>
		</form>
	</div>
	<div v-if="isSignedIn">signed in</div>
	<div v-else>not signed in</div>
	<button @click="logOut">Sign Out</button>
</template>

<style>
/* @import './assets/base.css'; */

#app {

}

</style>
