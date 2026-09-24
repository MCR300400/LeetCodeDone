<script setup lang="ts">
import type { ProblemItem } from '@/types'
import { Code, AlertCircle, FileCode } from 'lucide-vue-next'

const props = defineProps<{
  problem: ProblemItem
}>()

const emit = defineEmits<{
  (e: 'select', problem: ProblemItem): void
}>()

const hasMultipleSolutions = props.problem.solutions.length > 1
const hasSlowVariant = props.problem.solutions.some(s => s.isSlow)
const primarySolution = props.problem.solutions.find(s => !s.isSlow) || props.problem.solutions[0]

function getCodePreview(code: string): string {
  const lines = code.trim().split('\n').filter(l => l.trim().length > 0)
  return lines.slice(0, 4).join('\n')
}
</script>

<template>
  <div
    class="rounded-lg bg-leetcode-card border border-leetcode-border/90 hover:border-leetcode-orange/50 p-4 sm:p-5 flex flex-col justify-between group transition-colors overflow-hidden min-w-0"
  >
    <div class="min-w-0">
      <!-- Card Top: Number, Difficulty & Multi-solution badge -->
      <div class="flex items-center justify-between gap-2 mb-3">
        <div class="flex items-center gap-1.5 sm:gap-2 min-w-0">
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
        </div>

        <div class="flex items-center gap-1.5 shrink-0">
          <span
            v-if="hasSlowVariant"
            class="inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/50 text-amber-400 border border-amber-800/40"
            title="Include versione non ottimale / TLE per confronto"
          >
            <AlertCircle class="w-3 h-3" />
            <span>+TLE</span>
          </span>

          <span
            v-if="hasMultipleSolutions"
            class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-950/50 text-blue-400 border border-blue-800/40"
          >
            {{ problem.solutions.length }} sol.
          </span>
        </div>
      </div>

      <!-- Problem Title -->
      <h3
        @click="emit('select', problem)"
        class="text-sm sm:text-base font-semibold text-white group-hover:text-leetcode-orange transition-colors cursor-pointer mb-2.5 line-clamp-2 leading-snug break-words"
        :title="problem.title"
      >
        {{ problem.title }}
      </h3>

      <!-- Topic Tags -->
      <div class="flex flex-wrap items-center gap-1.5 mb-3 sm:mb-4">
        <span
          v-for="topic in problem.topics"
          :key="topic"
          class="text-[10px] font-mono px-2 py-0.5 rounded bg-leetcode-bg text-slate-400 border border-leetcode-border/60"
        >
          {{ topic }}
        </span>
      </div>

      <!-- Code Preview Block -->
      <div
        @click="emit('select', problem)"
        class="p-2.5 sm:p-3 rounded-lg bg-leetcode-bg/90 border border-leetcode-border/60 font-mono text-2xs text-slate-300 overflow-hidden cursor-pointer hover:border-slate-600 transition-colors mb-3 sm:mb-4 relative min-w-0"
      >
        <pre class="leading-relaxed opacity-85 select-none overflow-hidden text-ellipsis whitespace-pre max-w-full"><code>{{ getCodePreview(primarySolution.code) }}</code></pre>
        <div class="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-leetcode-bg to-transparent pointer-events-none"></div>
      </div>
    </div>

    <!-- Card Bottom: Language, Lines Count & Actions -->
    <div class="pt-3 border-t border-leetcode-border/60 flex items-center justify-between text-xs font-mono text-slate-400 gap-2">
      <div class="flex items-center gap-1.5 sm:gap-2 truncate min-w-0">
        <span class="inline-flex items-center gap-1 text-slate-300 shrink-0">
          <FileCode class="w-3.5 h-3.5 text-leetcode-orange shrink-0" />
          <span class="truncate">{{ problem.primaryLanguage }}</span>
        </span>
        <span class="text-slate-600 shrink-0">•</span>
        <span class="truncate shrink-0">{{ primarySolution.linesCount }} righe</span>
      </div>

      <button
        type="button"
        @click="emit('select', problem)"
        class="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded bg-leetcode-cardHover hover:bg-leetcode-orange hover:text-slate-950 text-slate-200 text-xs font-medium transition-all shrink-0"
      >
        <span>Vedi Codice</span>
        <Code class="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
</template>
