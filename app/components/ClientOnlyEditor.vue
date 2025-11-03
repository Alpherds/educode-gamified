<template>
  <client-only>
    <CodeEditor v-model="localCode" :language="language" />
  </client-only>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import CodeEditor from '~/components/CodeEditor.vue'

interface Props {
  modelValue?: string
  language?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const localCode = ref<string>(props.modelValue ?? '')

watch(
  () => props.modelValue,
  (newValue) => {
    if (typeof newValue === 'string' && newValue !== localCode.value) {
      localCode.value = newValue
    }
  }
)

watch(localCode, (val) => emit('update:modelValue', val))
</script>
