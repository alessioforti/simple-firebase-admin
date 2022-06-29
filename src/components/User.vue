<script setup>
import { ref, onBeforeMount } from 'vue'

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
	})
}

</script>


<template>
	<form 
		@submit.prevent="updateData"
		class="grid "
	>
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
			placeholder="Data di nascita"
		>
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
		<p class="text-right">
			<button class="btn">Save</button>
		</p>
	</form>


	<p>	dsfaws {{userId}}

	{{nome}}</p>
</template>