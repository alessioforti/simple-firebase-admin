<script setup>
import { onBeforeMount, ref } from 'vue'
import User from './User.vue'
import Modal from './Modal.vue'
import Close from './icons/close.vue'

import { getAuth } from 'firebase/auth'
import {
	getFirestore,
	getDocs,
	collection,
	deleteDoc,
	doc
} from 'firebase/firestore'

const db = getFirestore()
const users = ref([])
const showModal = ref(false)
const currentlyEditing = ref('')

onBeforeMount( async () => {
	const docs = await getDocs(collection(db, "users"))

	docs.forEach((doc) => {
		users.value.push({
			uid: doc.id,
			data: doc.data()
		})
	})
})

const deleteUser = async (userId) => {
	await deleteDoc(doc(db, 'users', userId))
	.then(() => {
		users.value = users.value.filter(user => user.uid != userId)
		console.log(users.value)
	})
}

</script>

<template>
	<h1 class="text-2xl mb-6">Manage users</h1>
	<div v-for="(user, index) in users" 
		:key="user.uid"
		class="flex items-center mb-3"
	>
		<span>{{user.data.email}}</span>
		<span class="ml-auto">
			<button 
				@click="showModal = true; currentlyEditing = user.uid" 
				class="btn bg-red-500 mr-2">
				edit
			</button>
			<button 
				@click="deleteUser(user.uid)"
				class="btn bg-red-500">
				x
			</button>
		</span>
		
	</div>

	<Teleport to="body">
		<!-- use the modal component, pass in the prop -->
		<modal 
			:show="showModal" 
			@close="showModal = false" 
			:user-to-edit="currentlyEditing" 
		/>
	</Teleport>
</template>