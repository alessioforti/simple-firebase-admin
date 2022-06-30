<script setup>
import { ref } from 'vue'
import SignUpInVue from './components/SignUpIn.vue'
import User from './components/User.vue'
import Admin from './components/Admin.vue'

import { 
	getAuth, 
	onAuthStateChanged,
	signOut
	} from 'firebase/auth'
import {
	getFirestore,
	doc,
	getDoc
} from 'firebase/firestore'

const auth = getAuth()
const db = getFirestore()
const isSignedIn = ref(null)
let user = null
const userId = ref()
const userRole = ref(null)
const email = ref('')

onAuthStateChanged(auth, (user) => {
	if (user) {
		isSignedIn.value = true
		user = auth.currentUser
		email.value = user.email
		checkUserRole(user)
	} else {
		isSignedIn.value = false
		user = null
	}
})

const signTheUserIn = (user) => {
	user.value = auth.currentUser
}

const logOut = () => {
	signOut(auth).then(() => {
		isSignedIn.value = null
		user = null
	})
}

const checkUserRole = async (user) => {
	userId.value = user.uid
	const docResp = await getDoc(doc(db, "users", user.uid))
	const userData = docResp.data()
	userRole.value = userData.role
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
		
		<h1 
			v-if="userRole == 'user' && isSignedIn" 
			class="text-2xl mb-6 text-center">
			Welcome, please edit your profile
		</h1>
		<User v-if="userRole == 'user' && isSignedIn" :user-id="userId" />
		<Admin v-else-if="userRole == 'admin' && isSignedIn" />
	</main>

</template>

<style>
</style>
