<script setup>
import { ref, onBeforeMount } from 'vue'
import Close from './icons/close.vue';

import {
	getFirestore,
	doc,
	getDoc,
	updateDoc
} from 'firebase/firestore'

const db = getFirestore()
const props = defineProps({
	userId: String
})
const nome = ref()
const cognome = ref()
const dataNascita = ref()
const via = ref()
const citta = ref()
const prov = ref()
const cittadinanza = ref()
const professione = ref()
const altezza = ref()
const statoCivile = ref()
const occhi = ref()
const showAlert = ref(false)

onBeforeMount( async () => {
	const docResp = await getDoc(doc(db, "users", props.userId))
	const userData = docResp.data()
	nome.value = userData.nome
	cognome.value = userData.cognome
	dataNascita.value = userData.dataNascita
	via.value = userData.via
	citta.value = userData.citta
	prov.value = userData.prov
	cittadinanza.value = userData.cittadinanza
	professione.value = userData.professione
	altezza.value = userData.altezza
	statoCivile.value = userData.statoCivile
	occhi.value = userData.occhi
})

const updateData = async () => {
	const docRef = await updateDoc(doc(db, 'users', props.userId), {
		nome: nome.value,
		cognome: cognome.value,
		dataNascita: dataNascita.value,
		via: via.value,
		citta: citta.value,
		prov: prov.value,
		cittadinanza: cittadinanza.value,
		professione: professione.value,
		altezza: altezza.value,
		statoCivile: statoCivile.value,
		occhi: occhi.value
	}).then(() => {
		showAlert.value = true
		setTimeout(() => {
			showAlert.value = false
		}, 3000)
		console.log('updated')
	})
}

</script>


<template>
	<div class="w-2/3 mx-auto">
		<form 
			@submit.prevent="updateData"
			class="mb-8"
		>
			<div class="w-full text-xl pb-2 my-4 border-b-2 border-sky-500">Name and Date of birth</div>
			<div class="grid grid-cols-3 gap-3">
				<input 
					type="text" 
					v-model="nome" 
					placeholder="Nome"
				>
				<input 
					type="text" 
					v-model="cognome" 
					placeholder="Cognome"
				>
				<input 
					type="date" 
					v-model="dataNascita"
				>
			</div>
			<div class="w-full text-xl pb-2 my-4 border-b-2 border-sky-500">Address</div>
			<div class="grid grid-cols-4 gap-3">
				<input 
					type="text" 
					v-model="via" 
					placeholder="Via"
				>
				<input 
					type="text" 
					v-model="citta" 
					placeholder="Città"
				>
				<input 
					type="text" 
					v-model="prov" 
					placeholder="Provincia"
				>
				<input 
					type="text" 
					v-model="cittadinanza" 
					placeholder="Cittadinanza"
				>
			</div>
			<div class="w-full text-xl pb-2 my-4 border-b-2 border-sky-500">About you</div>
			<div class="grid grid-cols-4 gap-3">
				<input 
					type="text" 
					v-model="statoCivile" 
					placeholder="Stato Civile"
				>
				<input 
					type="text" 
					v-model="professione" 
					placeholder="Professione"
				>
				<input 
					type="text" 
					v-model="altezza" 
					placeholder="Altezza"
				>
				<input 
					type="text" 
					v-model="occhi" 
					placeholder="Occhi"
				>
			</div>

			<p class="w-full text-right mt-4">
				<button class="btn">Save</button>
			</p>
		</form>
		<Transition name="fade">
			<div 
			v-if="showAlert"
			class="relative text-green-500 text-center py-4 border-green-500 border-2 rounded-md bg-green-200"
			>Saved!
				<Close 
					@click="showAlert = false"
					class="absolute top-0 right-0 p-1 rounded-bl-md bg-green-100 hover:bg-green-500 hover:text-white cursor-pointer"
				/>
			</div>
		</Transition>
	</div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>