<script setup>
import { ref } from 'vue'
import { 
	getAuth, 
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	setPersistence,
	browserLocalPersistence
	} from 'firebase/auth'
import {
	getFirestore,
	doc,
	setDoc
} from 'firebase/firestore'

const auth = getAuth()
const db = getFirestore()
const email = ref('')
const pass = ref('')
let user = null
const isSignedIn = ref(null)
const showLogInForm = ref(true)

const emit = defineEmits(['loggedIn'])

const signUp = () => {
	setPersistence(auth, browserLocalPersistence)
		.then(() => {
		   	return createUserWithEmailAndPassword(auth, email.value, pass.value)
			.then((userCredential) => {
				user = userCredential.user
				isSignedIn.value = true
				emit('loggedIn', user)
				email.value = ''
				pass.value = ''
				showLogInForm.value = true
				return user
			})
			.then((user) => {
				return setUser(user)
			})
			.catch((error) => {
				console.log(error.code, error.message)
			})
		})
	.catch((error) => {
		console.log(error.code, error.message)
	})
}

const signIn = () => {
	setPersistence(auth, browserLocalPersistence)
	.then(() => {
		signInWithEmailAndPassword(auth, email.value, pass.value)
		.then((userCredential) => {
			user = userCredential.user
			isSignedIn.value = true
			emit('loggedIn', user)
			email.value = ''
			pass.value = ''
		})
		.catch((error) => {
			console.log(error.code, error.message)
		})
	})
	.catch((error) => {
		console.log(error.code, error.message)
	})
}

const setUser = async (user) => {
	await setDoc(doc(db, "users", user.uid), {
		email: user.email,
		role: 'user',
		nome: '',
		cognome: '',
		dataNascita: '',
		via: '',
		citta: '',
		prov: '',
		cittadinanza: '',
		statoCivile: '',
		professione: '',
		altezza: '',
		occhi: ''
	})
}

const toggleForms = () => {
	showLogInForm.value = !showLogInForm.value
}
</script>

<template>
	<div class="w-1/3 mx-auto" v-show="!showLogInForm">
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
				<a href="#" @click="toggleForms">Log In</a>
			</p>

			<p class="text-right">
				<button class="btn">Register</button>
			</p>
		</form>
	</div>

	<div class="w-1/3 mx-auto" v-show="showLogInForm">
		<p class="text-2xl mb-4">Log In</p>
		<form @submit.prevent="signIn">
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
				Not registerd yet? 
				<a href="#" @click="toggleForms">Register now</a>
			</p>

			<p class="text-right">
				<button class="btn">Log In</button>
			</p>
		</form>
	</div>
</template>