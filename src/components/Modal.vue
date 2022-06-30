<script setup>
import User from './User.vue'
import Close from './icons/close.vue'

const props = defineProps({
  show: Boolean,
  userToEdit: String
})
</script>

<template>
  <Transition name="modal">
	<div v-if="show" class="modal-mask">
	  <div class="modal-wrapper">
		<div class="relative w-3/4 bg-white mx-auto p-8 pt-14 rounded-md">
			<button
				class="absolute top-0 right-0 p-2 bg-gray-50 rounded-md hover:bg-gray-100"
				@click="$emit('close')"
			  >
			  <Close/>
			</button>
			<User :user-id="userToEdit"/>
		</div>
	  </div>
	</div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>