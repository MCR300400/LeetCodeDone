<script setup lang="ts">
import { ref } from 'vue'
import { Search, X, ArrowUpDown, Tag } from 'lucide-vue-next'

defineProps<{
  searchQuery: string
  selectedDifficulty: string
  selectedLanguage: string
  selectedTopic: string
  sortOrder: 'asc' | 'desc'
  allTopics: string[]
  languages: string[]
  totalFiltered: number
  totalAll: number
}>()

const emit = defineEmits<{
  (e: 'update:searchQuery', val: string): void
  (e: 'update:selectedDifficulty', val: string): void
  (e: 'update:selectedLanguage', val: string): void
  (e: 'update:selectedTopic', val: string): void
  (e: 'toggleSort'): void
  (e: 'resetFilters'): void
}>()

const searchInput = ref<HTMLInputElement | null>(null)

function clearSearch() {
  emit('update:searchQuery', '')
  searchInput.value?.focus()
}
</script>

<template>
  <div class="p-4 sm:p-6 rounded-2xl bg-leetcode-card/90 border border-leetcode-border space-y-4">
    
    <!-- Top Row: Search Input & Sort & Reset -->
    <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
      
      <!-- Search Input -->
      <div class="relative flex-1">
        <Search class="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          ref="searchInput"
          type="text"
          :value="searchQuery"
          @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
          placeholder="Cerca per numero (es. 1, 121) o titolo (es. Two Sum, Anagram)..."
          class="w-full pl-10 pr-10 py-2.5 rounded-lg bg-leetcode-bg border border-leetcode-border/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-leetcode-orange/60 focus:ring-1 focus:ring-leetcode-orange/30 font-mono transition-colors"
        />
        <button
          v-if="searchQuery"
          type="button"
          @click="clearSearch"
          class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
        >
          <X class="w-3.5 h-3.5" />
        </button>
      </div>

      <!-- Right controls: Sort order & Active count -->
      <div class="flex items-center gap-2.5">
        <button
          type="button"
          @click="emit('toggleSort')"
          class="inline-flex items-center gap-2 px-3 py-2.5 rounded-lg border border-leetcode-border bg-leetcode-bg hover:bg-leetcode-border/40 text-xs font-mono text-slate-200 transition-colors"
          :title="sortOrder === 'asc' ? 'Ordinamento Crescente' : 'Ordinamento Decrescente'"
        >
          <ArrowUpDown class="w-3.5 h-3.5 text-leetcode-orange" />
          <span>{{ sortOrder === 'asc' ? '# Crescente' : '# Decrescente' }}</span>
        </button>

        <span class="text-xs font-mono text-slate-400 whitespace-nowrap pl-1">
          <strong class="text-white">{{ totalFiltered }}</strong> / {{ totalAll }}
        </span>
      </div>

    </div>

    <!-- Middle Row: Difficulty & Language Filter Pills -->
    <div class="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 border-t border-leetcode-border/60">
      
      <!-- Difficulty Tabs -->
      <div class="inline-flex p-1 rounded-lg bg-leetcode-bg border border-leetcode-border text-xs font-medium">
        <button
          type="button"
          @click="emit('update:selectedDifficulty', 'All')"
          :class="[
            selectedDifficulty === 'All'
              ? 'bg-leetcode-card text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          ]"
          class="px-2.5 py-1 rounded-md transition-colors"
        >
          Tutte
        </button>
        <button
          type="button"
          @click="emit('update:selectedDifficulty', 'Easy')"
          :class="[
            selectedDifficulty === 'Easy'
              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 shadow-xs'
              : 'text-slate-400 hover:text-emerald-400'
          ]"
          class="px-2.5 py-1 rounded-md transition-colors"
        >
          Easy
        </button>
        <button
          type="button"
          @click="emit('update:selectedDifficulty', 'Medium')"
          :class="[
            selectedDifficulty === 'Medium'
              ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40 shadow-xs'
              : 'text-slate-400 hover:text-amber-400'
          ]"
          class="px-2.5 py-1 rounded-md transition-colors"
        >
          Medium
        </button>
        <button
          type="button"
          @click="emit('update:selectedDifficulty', 'Hard')"
          :class="[
            selectedDifficulty === 'Hard'
              ? 'bg-rose-950/60 text-rose-400 border border-rose-800/40 shadow-xs'
              : 'text-slate-400 hover:text-rose-400'
          ]"
          class="px-2.5 py-1 rounded-md transition-colors"
        >
          Hard
        </button>
      </div>

      <!-- Language Selector -->
      <div class="inline-flex p-1 rounded-lg bg-leetcode-bg border border-leetcode-border text-xs font-mono">
        <button
          type="button"
          @click="emit('update:selectedLanguage', 'All')"
          :class="[
            selectedLanguage === 'All'
              ? 'bg-leetcode-card text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          ]"
          class="px-2.5 py-1 rounded-md transition-colors"
        >
          Tutti i Linguaggi
        </button>
        <button
          v-for="lang in languages"
          :key="lang"
          type="button"
          @click="emit('update:selectedLanguage', lang)"
          :class="[
            selectedLanguage === lang
              ? 'bg-leetcode-card text-leetcode-orange shadow-xs font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          ]"
          class="px-2.5 py-1 rounded-md transition-colors"
        >
          {{ lang }}
        </button>
      </div>

      <!-- Reset button if any filter is active -->
      <button
        v-if="searchQuery || selectedDifficulty !== 'All' || selectedLanguage !== 'All' || selectedTopic !== 'All'"
        type="button"
        @click="emit('resetFilters')"
        class="text-xs text-leetcode-orange hover:underline font-mono px-2 py-1 ml-auto"
      >
        Azzera Filtri
      </button>

    </div>

    <!-- Bottom Row: Topic Tags Horizontal Scroll -->
    <div class="pt-2 border-t border-leetcode-border/40">
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin text-2xs font-mono">
        <span class="text-slate-500 shrink-0 pr-1 flex items-center gap-1">
          <Tag class="w-3 h-3" />
          <span>Topic:</span>
        </span>

        <button
          type="button"
          @click="emit('update:selectedTopic', 'All')"
          :class="[
            selectedTopic === 'All'
              ? 'bg-white text-slate-900 font-semibold'
              : 'bg-leetcode-bg border border-leetcode-border text-slate-400 hover:text-slate-200'
          ]"
          class="px-2.5 py-1 rounded-md shrink-0 transition-colors"
        >
          Tutti ({{ allTopics.length }})
        </button>

        <button
          v-for="topic in allTopics"
          :key="topic"
          type="button"
          @click="emit('update:selectedTopic', topic)"
          :class="[
            selectedTopic === topic
              ? 'bg-leetcode-orange text-slate-950 font-bold'
              : 'bg-leetcode-bg border border-leetcode-border text-slate-400 hover:text-slate-200'
          ]"
          class="px-2.5 py-1 rounded-md shrink-0 transition-colors"
        >
          {{ topic }}
        </button>
      </div>
    </div>

  </div>
</template>
