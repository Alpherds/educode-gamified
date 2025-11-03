<template>
  <div ref="container" class="editor-container"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as monaco from 'monaco-editor'

interface Props {
  modelValue?: string
  language?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const container = ref<HTMLDivElement | null>(null)
let editor: monaco.editor.IStandaloneCodeEditor | null = null

onMounted(async () => {
  if (!container.value) return

  // Initialize Monaco editor
  editor = monaco.editor.create(container.value, {
    value: props.modelValue ?? '',
    language: props.language ?? 'javascript',
    theme: 'vs-dark',
    automaticLayout: true,
    minimap: { enabled: false },
    fontSize: 15,
    scrollBeyondLastLine: false,
  })

  // Listen to user input
  editor.onDidChangeModelContent(() => {
    const newVal = editor?.getValue() ?? ''
    emit('update:modelValue', newVal)
  })
})

// Watch for external prop changes
watch(
  () => props.modelValue,
  (newVal) => {
    if (editor && typeof newVal === 'string' && newVal !== editor.getValue()) {
      editor.setValue(newVal)
    }
  }
)

onBeforeUnmount(() => {
  editor?.dispose()
})
</script>

<style scoped>
.editor-container {
  width: 100%;
  height: 500px;
  border-radius: 10px;
  overflow: hidden;
}
</style>
