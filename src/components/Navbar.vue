<script setup lang="ts">
import { Code2, Github, ExternalLink } from 'lucide-vue-next'

defineProps<{
  totalCount: number
}>()
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-leetcode-border/80 bg-leetcode-bg/90 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      
      <!-- Brand -->
      <a href="#" class="flex items-center gap-3 group">
        <div class="w-9 h-9 rounded-lg bg-leetcode-card border border-leetcode-border flex items-center justify-center text-leetcode-orange group-hover:border-leetcode-orange/50 transition-colors shadow-xs">
          <Code2 class="w-5 h-5" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-mono text-base font-bold text-white tracking-tight">
              LeetCode<span class="text-leetcode-orange">Done</span>
            </span>
            <span class="text-[11px] font-mono px-2 py-0.5 rounded-full bg-leetcode-card border border-leetcode-border text-slate-300">
              v1.0
            </span>
          </div>
          <span class="text-2xs text-slate-400 block font-mono">
            Archivio Algoritmi • Edoardo Pippi
          </span>
        </div>
      </a>

      <!-- Right Actions -->
      <div class="flex items-center gap-3">
        <!-- GitHub Repository Button -->
        <a
          href="https://github.com/MCR300400/LeetCodeDone"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-leetcode-border bg-leetcode-card hover:bg-leetcode-cardHover text-slate-200 hover:text-white text-xs font-medium transition-colors"
        >
          <Github class="w-4 h-4" />
          <span class="hidden sm:inline">MCR300400/LeetCodeDone</span>
          <ExternalLink class="w-3 h-3 text-slate-500" />
        </a>
      </div>

    </div>
  </header>
</template>
