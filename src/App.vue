<script setup lang="ts">
import { ref, computed } from 'vue'
import rawData from '@/data/solutionsData.json'
import type { SolutionsDataset, ProblemItem } from '@/types'
import Navbar from '@/components/Navbar.vue'
import StatsOverview from '@/components/StatsOverview.vue'
import FilterBar from '@/components/FilterBar.vue'
import ProblemCard from '@/components/ProblemCard.vue'
import CodeModal from '@/components/CodeModal.vue'
import { Terminal, Code2, ArrowUpRight } from 'lucide-vue-next'

const dataset = ref<SolutionsDataset>(rawData as unknown as SolutionsDataset)

const searchQuery = ref('')
const selectedDifficulty = ref('All')
const selectedLanguage = ref('All')
const selectedTopic = ref('All')
const sortOrder = ref<'asc' | 'desc'>('asc')
const selectedProblem = ref<ProblemItem | null>(null)

const languagesList = computed(() => {
  return Object.keys(dataset.value.stats.languages)
})

const filteredProblems = computed(() => {
  let list = dataset.value.problems

  // Search filter
  const query = searchQuery.value.trim().toLowerCase()
  if (query) {
    list = list.filter(p => {
      const matchNum = p.number.toString().includes(query)
      const matchTitle = p.title.toLowerCase().includes(query)
      const matchSlug = p.slug.toLowerCase().includes(query)
      const matchTopic = p.topics.some(t => t.toLowerCase().includes(query))
      return matchNum || matchTitle || matchSlug || matchTopic
    })
  }

  // Difficulty filter
  if (selectedDifficulty.value !== 'All') {
    list = list.filter(p => p.difficulty === selectedDifficulty.value)
  }

  // Language filter
  if (selectedLanguage.value !== 'All') {
    list = list.filter(p => p.primaryLanguage === selectedLanguage.value)
  }

  // Topic filter
  if (selectedTopic.value !== 'All') {
    list = list.filter(p => p.topics.includes(selectedTopic.value))
  }

  // Sorting
  list = [...list].sort((a, b) => {
    return sortOrder.value === 'asc' ? a.number - b.number : b.number - a.number
  })

  return list
})

function toggleSort() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

function resetFilters() {
  searchQuery.value = ''
  selectedDifficulty.value = 'All'
  selectedLanguage.value = 'All'
  selectedTopic.value = 'All'
}

function openProblem(problem: ProblemItem) {
  selectedProblem.value = problem
}

function closeProblem() {
  selectedProblem.value = null
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-leetcode-bg text-slate-100 font-sans selection:bg-leetcode-orange/30 selection:text-white">
    <!-- Navbar -->
    <Navbar :total-count="dataset.stats.totalProblems" />

    <!-- Main Content Container -->
    <main class="flex-grow max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-10 space-y-6 sm:space-y-8 w-full min-w-0">
      
      <!-- Hero Intro Header -->
      <section class="space-y-3 sm:space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-leetcode-card border border-leetcode-border text-xs font-mono text-leetcode-orange max-w-full">
          <Terminal class="w-3.5 h-3.5 shrink-0" />
          <span class="truncate">Edoardo Pippi • LeetCode Solutions Catalog</span>
        </div>

        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
          <div class="min-w-0">
            <h1 class="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-mono break-words">
              Algoritmi & Problem Solving
            </h1>
            <p class="text-xs sm:text-base text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Raccolta interattiva delle sfide e algoritmi LeetCode risolti, con codice sorgente completo, categorizzazione per topic, livello di difficoltà e ricerca istantanea.
            </p>
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-leetcode-card border border-leetcode-border hover:border-leetcode-orange/50 text-xs font-mono text-slate-300 transition-colors"
            >
              <span>LeetCode Official</span>
              <ArrowUpRight class="w-3.5 h-3.5 text-slate-500 shrink-0" />
            </a>
          </div>
        </div>
      </section>

      <!-- Stats Overview -->
      <StatsOverview :stats="dataset.stats" />

      <!-- Interactive Filters & Search -->
      <FilterBar
        :search-query="searchQuery"
        :selected-difficulty="selectedDifficulty"
        :selected-language="selectedLanguage"
        :selected-topic="selectedTopic"
        :sort-order="sortOrder"
        :all-topics="dataset.stats.allTopics"
        :languages="languagesList"
        :total-filtered="filteredProblems.length"
        :total-all="dataset.stats.totalProblems"
        @update:search-query="searchQuery = $event"
        @update:selected-difficulty="selectedDifficulty = $event"
        @update:selected-language="selectedLanguage = $event"
        @update:selected-topic="selectedTopic = $event"
        @toggle-sort="toggleSort"
        @reset-filters="resetFilters"
      />

      <!-- Problems Grid -->
      <section v-if="filteredProblems.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
        <ProblemCard
          v-for="problem in filteredProblems"
          :key="problem.id"
          :problem="problem"
          @select="openProblem"
        />
      </section>

      <!-- Empty State when filters yield no results -->
      <section
        v-else
        class="py-12 sm:py-16 text-center rounded-2xl bg-leetcode-card border border-leetcode-border/80 p-6 sm:p-8 space-y-4"
      >
        <div class="w-12 h-12 rounded-xl bg-leetcode-bg border border-leetcode-border flex items-center justify-center text-slate-500 mx-auto">
          <Code2 class="w-6 h-6" />
        </div>
        <h3 class="text-base sm:text-lg font-semibold text-white font-mono">
          Nessuna soluzione corrisponde ai criteri
        </h3>
        <p class="text-xs text-slate-400 font-mono max-w-md mx-auto">
          Prova a modificare la ricerca per numero o parola chiave, oppure reimposta i filtri di difficoltà e topic.
        </p>
        <button
          type="button"
          @click="resetFilters"
          class="px-4 py-2 rounded-lg bg-leetcode-orange text-slate-950 text-xs font-mono font-bold hover:bg-leetcode-yellow transition-colors"
        >
          Azzera Tutti i Filtri
        </button>
      </section>

    </main>

    <!-- Code Viewer Modal -->
    <CodeModal
      :problem="selectedProblem"
      @close="closeProblem"
    />

    <!-- Footer -->
    <footer class="border-t border-leetcode-border/80 bg-leetcode-card/40 py-6 sm:py-8 text-xs font-mono text-slate-400">
      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
        <div>
          <span class="text-slate-300 font-semibold">LeetCodeDone</span> • Edoardo Pippi &copy; {{ new Date().getFullYear() }}
        </div>
        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-2xs text-slate-500">
          <span>Static Generation • Cloudflare Pages</span>
          <span class="hidden xs:inline">•</span>
          <a
            href="https://github.com/MCR300400/LeetCodeDone"
            target="_blank"
            rel="noopener noreferrer"
            class="text-leetcode-orange hover:underline"
          >
            GitHub Repository
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
