<script setup lang="ts">
import type { DatasetStats } from '@/types'
import { CheckCircle } from 'lucide-vue-next'

const props = defineProps<{
  stats: DatasetStats
}>()

function percent(count: number): number {
  if (!props.stats.totalProblems) return 0
  return Math.round((count / props.stats.totalProblems) * 100)
}

function getLangColor(lang: string | number): string {
  const l = String(lang)
  if (l === 'Python') return 'bg-blue-400'
  if (l === 'Java') return 'bg-amber-500'
  if (l === 'SQL') return 'bg-emerald-400'
  return 'bg-slate-400'
}
</script>

<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Main stats banner -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      
      <!-- Total Card -->
      <div class="p-3 sm:p-5 rounded-xl bg-leetcode-card border border-leetcode-border/80 relative overflow-hidden group hover:border-leetcode-orange/40 transition-colors">
        <div class="flex items-center justify-between mb-1.5 sm:mb-2">
          <span class="text-xs text-slate-400 font-medium">Totale risolti</span>
          <CheckCircle class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-leetcode-orange shrink-0" />
        </div>
        <div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span class="text-2xl sm:text-4xl font-mono font-bold text-white tracking-tight">
            {{ stats.totalProblems }}
          </span>
          <span class="text-[11px] sm:text-xs text-slate-400 font-mono">
            ({{ stats.totalSolutions }} sol.)
          </span>
        </div>
        <div class="mt-2.5 sm:mt-3 w-full bg-slate-800/60 h-1.5 rounded-full overflow-hidden">
          <div class="bg-leetcode-orange h-full rounded-full w-full"></div>
        </div>
      </div>

      <!-- Easy Card -->
      <div class="p-3 sm:p-5 rounded-xl bg-leetcode-card border border-leetcode-border/80 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
        <div class="flex items-center justify-between mb-1.5 sm:mb-2">
          <span class="text-[11px] sm:text-xs uppercase tracking-wider text-emerald-400 font-medium">Easy</span>
          <span class="text-[11px] sm:text-xs font-mono text-emerald-400 font-semibold">{{ percent(stats.easyCount) }}%</span>
        </div>
        <div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span class="text-2xl sm:text-4xl font-mono font-bold text-emerald-400 tracking-tight">
            {{ stats.easyCount }}
          </span>
          <span class="text-[11px] sm:text-xs text-slate-400 font-mono">/ {{ stats.totalProblems }}</span>
        </div>
        <div class="mt-2.5 sm:mt-3 w-full bg-slate-800/60 h-1.5 rounded-full overflow-hidden">
          <div
            class="bg-emerald-500 h-full rounded-full transition-all duration-700"
            :style="{ width: `${percent(stats.easyCount)}%` }"
          ></div>
        </div>
      </div>

      <!-- Medium Card -->
      <div class="p-3 sm:p-5 rounded-xl bg-leetcode-card border border-leetcode-border/80 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
        <div class="flex items-center justify-between mb-1.5 sm:mb-2">
          <span class="text-[11px] sm:text-xs uppercase tracking-wider text-amber-400 font-medium">Medium</span>
          <span class="text-[11px] sm:text-xs font-mono text-amber-400 font-semibold">{{ percent(stats.mediumCount) }}%</span>
        </div>
        <div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span class="text-2xl sm:text-4xl font-mono font-bold text-amber-400 tracking-tight">
            {{ stats.mediumCount }}
          </span>
          <span class="text-[11px] sm:text-xs text-slate-400 font-mono">/ {{ stats.totalProblems }}</span>
        </div>
        <div class="mt-2.5 sm:mt-3 w-full bg-slate-800/60 h-1.5 rounded-full overflow-hidden">
          <div
            class="bg-amber-500 h-full rounded-full transition-all duration-700"
            :style="{ width: `${percent(stats.mediumCount)}%` }"
          ></div>
        </div>
      </div>

      <!-- Hard Card -->
      <div class="p-3 sm:p-5 rounded-xl bg-leetcode-card border border-leetcode-border/80 relative overflow-hidden group hover:border-rose-500/40 transition-colors">
        <div class="flex items-center justify-between mb-1.5 sm:mb-2">
          <span class="text-[11px] sm:text-xs uppercase tracking-wider text-rose-400 font-medium">Hard</span>
          <span class="text-[11px] sm:text-xs font-mono text-rose-400 font-semibold">{{ percent(stats.hardCount) }}%</span>
        </div>
        <div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span class="text-2xl sm:text-4xl font-mono font-bold text-rose-400 tracking-tight">
            {{ stats.hardCount }}
          </span>
          <span class="text-[11px] sm:text-xs text-slate-400 font-mono">/ {{ stats.totalProblems }}</span>
        </div>
        <div class="mt-2.5 sm:mt-3 w-full bg-slate-800/60 h-1.5 rounded-full overflow-hidden">
          <div
            class="bg-rose-500 h-full rounded-full transition-all duration-700"
            :style="{ width: `${percent(stats.hardCount)}%` }"
          ></div>
        </div>
      </div>

    </div>

    <!-- Secondary details: Languages & Top Topics -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 text-xs text-slate-400 py-2 border-y border-leetcode-border/60">
      <!-- Languages breakdown -->
      <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <span class="font-mono text-slate-500">Linguaggi:</span>
        <span
          v-for="(count, lang) in stats.languages"
          :key="lang"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-leetcode-card border border-leetcode-border text-slate-200 font-mono text-2xs"
        >
          <span class="w-1.5 h-1.5 rounded-full" :class="getLangColor(lang)"></span>
          <span>{{ lang }}</span>
          <span class="text-slate-500">({{ count }})</span>
        </span>
      </div>

      <!-- Live performance note -->
      <div class="flex items-center gap-1.5 text-2xs font-mono text-slate-400">
        <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span>Archivio indicizzato • Risposta istantanea</span>
      </div>
    </div>
  </div>
</template>
