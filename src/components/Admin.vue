<script setup>
import { onBeforeMount, ref } from 'vue'
import User from './User.vue'
import Modal from './Modal.vue'
import Close from './icons/close.vue'
import Edit from './icons/Edit.vue'
import Delete from './icons/Delete.vue'

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
	})
}

</script>

<template>
	<h1 class="text-2xl mb-6">Manage users</h1>
	<div class="flex flex-col divide-y-[1px] divide-solid">
		<div v-for="(user, index) in users" 
			:key="user.uid"
			class="flex items-center py-3"
		>
			<span>{{user.data.email}}</span>
			<span class="ml-auto">
				<button 
					@click="showModal = true; currentlyEditing = user.uid" 
					class="btn mr-2">
					<Edit width="18" height="18"/>
				</button>
				<button 
					@click="deleteUser(user.uid)"
					class="btn bg-red-500 hover:bg-red-600">
					<Delete width="18" height="18" />
				</button>
			</span>
		</div>
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