export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export interface SolutionVariant {
  fileName: string
  filePath: string
  githubUrl: string
  isSlow: boolean
  variantName: string
  language: string
  linesCount: number
  charCount: number
  code: string
}

export interface ProblemItem {
  id: number
  number: number
  title: string
  slug: string
  difficulty: Difficulty
  topics: string[]
  leetcodeUrl: string
  primaryLanguage: string
  solutions: SolutionVariant[]
}

export interface DatasetStats {
  totalProblems: number
  totalSolutions: number
  easyCount: number
  mediumCount: number
  hardCount: number
  languages: Record<string, number>
  allTopics: string[]
}

export interface SolutionsDataset {
  stats: DatasetStats
  problems: ProblemItem[]
}
