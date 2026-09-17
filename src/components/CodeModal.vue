<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import type { ProblemItem, SolutionVariant } from '@/types'
import { X, Copy, Check, ExternalLink, Github, AlertTriangle, FileCode } from 'lucide-vue-next'
import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-sql'

const props = defineProps<{
  problem: ProblemItem | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const selectedVariantIndex = ref(0)
const copied = ref(false)

watch(
  () => props.problem,
  () => {
    selectedVariantIndex.value = 0
    copied.value = false
  }
)

const currentSolution = computed<SolutionVariant | null>(() => {
  if (!props.problem || !props.problem.solutions.length) return null
  return props.problem.solutions[selectedVariantIndex.value] || props.problem.solutions[0]
})

const highlightedCode = computed(() => {
  if (!currentSolution.value) return ''
  const lang = currentSolution.value.language.toLowerCase()
  const grammar = Prism.languages[lang] || Prism.languages.python || Prism.languages.clike
  return Prism.highlight(currentSolution.value.code, grammar, lang)
})

async function copyCode() {
  if (!currentSolution.value) return
  try {
    await navigator.clipboard.writeText(currentSolution.value.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy', err)
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div
    v-if="problem && currentSolution"
    class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-sm"
    @click.self="emit('close')"
  >
    <div
      class="w-full max-w-4xl max-h-[94vh] sm:max-h-[90vh] bg-leetcode-card border border-leetcode-border rounded-xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
    >
      <!-- Modal Header -->
      <div class="p-3 sm:p-6 border-b border-leetcode-border flex items-start justify-between gap-3 sm:gap-4 bg-leetcode-card/90">
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2 mb-2 flex-wrap">
            <span class="font-mono text-xs px-2 py-0.5 rounded bg-leetcode-bg border border-leetcode-border text-slate-300 font-semibold shrink-0">
              #{{ problem.number }}
            </span>
            <span
              class="text-2xs font-mono font-semibold px-2 py-0.5 rounded uppercase tracking-wider shrink-0"
              :class="{
                'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40': problem.difficulty === 'Easy',
                'bg-amber-950/60 text-amber-400 border border-amber-800/40': problem.difficulty === 'Medium',
                'bg-rose-950/60 text-rose-400 border border-rose-800/40': problem.difficulty === 'Hard'
              }"
            >
              {{ problem.difficulty }}
            </span>
            <span class="text-xs text-slate-400 font-mono">
              {{ problem.primaryLanguage }}
            </span>
          </div>

          <h2 class="text-lg sm:text-2xl font-bold text-white tracking-tight break-words">
            {{ problem.title }}
          </h2>

          <!-- Topic Pills -->
          <div class="flex flex-wrap items-center gap-1.5 mt-2">
            <span
              v-for="topic in problem.topics"
              :key="topic"
              class="text-2xs font-mono px-2 py-0.5 rounded bg-leetcode-bg text-slate-400 border border-leetcode-border"
            >
              {{ topic }}
            </span>
          </div>
        </div>

        <button
          type="button"
          @click="emit('close')"
          class="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-white hover:bg-leetcode-border/60 transition-colors shrink-0"
          title="Chiudi (Esc)"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Multiple Solution Tabs (if > 1 variant, like Optimal vs TLE) -->
      <div
        v-if="problem.solutions.length > 1"
        class="px-3 sm:px-6 py-2 bg-leetcode-bg border-b border-leetcode-border flex items-center gap-2 text-xs font-mono overflow-x-auto scrollbar-none"
      >
        <span class="text-slate-500 mr-1 shrink-0">Approcci:</span>
        <button
          v-for="(sol, idx) in problem.solutions"
          :key="idx"
          type="button"
          @click="selectedVariantIndex = idx"
          :class="[
            selectedVariantIndex === idx
              ? 'bg-leetcode-card text-white border-leetcode-orange/60 shadow-xs'
              : 'bg-leetcode-card/40 text-slate-400 border-leetcode-border hover:text-slate-200'
          ]"
          class="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border transition-all shrink-0"
        >
          <AlertTriangle v-if="sol.isSlow" class="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <Check v-else class="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{{ sol.variantName }}</span>
        </button>
      </div>

      <!-- Action Bar: File path, lines, Copy, LeetCode & GitHub buttons -->
      <div class="px-3 sm:px-6 py-2 sm:py-2.5 bg-leetcode-bg/80 border-b border-leetcode-border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 text-xs font-mono">
        <div class="flex items-center gap-2 text-slate-400 min-w-0">
          <FileCode class="w-3.5 h-3.5 text-leetcode-orange shrink-0" />
          <span class="text-slate-300 truncate max-w-[200px] xs:max-w-xs sm:max-w-sm md:max-w-md" :title="currentSolution.filePath">{{ currentSolution.filePath }}</span>
          <span class="text-slate-600 shrink-0">•</span>
          <span class="shrink-0 whitespace-nowrap">{{ currentSolution.linesCount }} righe</span>
        </div>

        <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <!-- Copy Button -->
          <button
            type="button"
            @click="copyCode"
            class="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-leetcode-border bg-leetcode-card hover:bg-leetcode-cardHover text-slate-200 text-xs font-mono transition-colors shrink-0"
          >
            <Check v-if="copied" class="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <Copy v-else class="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{{ copied ? 'Copiato!' : 'Copia' }}</span>
          </button>

          <!-- LeetCode Problem Link -->
          <a
            :href="problem.leetcodeUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-leetcode-orange/30 bg-leetcode-orange/10 hover:bg-leetcode-orange/20 text-leetcode-orange text-xs font-mono transition-colors shrink-0"
          >
            <span>LeetCode</span>
            <ExternalLink class="w-3 h-3 shrink-0" />
          </a>

          <!-- GitHub Source Link -->
          <a
            :href="currentSolution.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-leetcode-border bg-leetcode-card hover:bg-leetcode-cardHover text-slate-200 text-xs font-mono transition-colors shrink-0"
          >
            <Github class="w-3.5 h-3.5 shrink-0" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      <!-- Code Block Body with Syntax Highlighting -->
      <div class="flex-1 overflow-auto p-3 sm:p-6 bg-[#0B0F17] font-mono text-[11px] sm:text-xs md:text-sm">
        <pre class="language-python overflow-x-auto"><code v-html="highlightedCode"></code></pre>
      </div>

      <!-- Modal Footer Note -->
      <div class="px-3 sm:px-6 py-2.5 sm:py-3 border-t border-leetcode-border bg-leetcode-card flex items-center justify-between text-2xs font-mono text-slate-500">
        <span class="truncate">Soluzione verificata e accettata su LeetCode</span>
        <span class="hidden sm:inline shrink-0">Premi <kbd class="px-1.5 py-0.5 rounded bg-leetcode-bg border border-leetcode-border text-slate-400">Esc</kbd> per chiudere</span>
      </div>
    </div>
  </div>
</template>
