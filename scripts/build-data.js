import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

// Known metadata mapping for LeetCode problems
const problemMeta = {
  1: { slug: 'two-sum', title: 'Two Sum', difficulty: 'Easy', topics: ['Array', 'Hash Table'] },
  2: { slug: 'add-two-numbers', title: 'Add Two Numbers', difficulty: 'Medium', topics: ['Linked List', 'Math', 'Recursion'] },
  3: { slug: 'longest-substring-without-repeating-characters', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', topics: ['Hash Table', 'String', 'Sliding Window'] },
  4: { slug: 'median-of-two-sorted-arrays', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', topics: ['Array', 'Binary Search', 'Divide and Conquer'] },
  5: { slug: 'longest-palindromic-substring', title: 'Longest Palindromic Substring', difficulty: 'Medium', topics: ['Two Pointers', 'String', 'Dynamic Programming'] },
  6: { slug: 'zigzag-conversion', title: 'Zigzag Conversion', difficulty: 'Medium', topics: ['String'] },
  7: { slug: 'reverse-integer', title: 'Reverse Integer', difficulty: 'Medium', topics: ['Math'] },
  8: { slug: 'string-to-integer-atoi', title: 'String to Integer (atoi)', difficulty: 'Medium', topics: ['String'] },
  9: { slug: 'palindrome-number', title: 'Palindrome Number', difficulty: 'Easy', topics: ['Math'] },
  11: { slug: 'container-with-most-water', title: 'Container With Most Water', difficulty: 'Medium', topics: ['Array', 'Two Pointers', 'Greedy'] },
  12: { slug: 'integer-to-roman', title: 'Integer to Roman', difficulty: 'Medium', topics: ['Hash Table', 'Math', 'String'] },
  13: { slug: 'roman-to-integer', title: 'Roman to Integer', difficulty: 'Easy', topics: ['Hash Table', 'Math', 'String'] },
  14: { slug: 'longest-common-prefix', title: 'Longest Common Prefix', difficulty: 'Easy', topics: ['String', 'Trie'] },
  15: { slug: '3sum', title: '3Sum', difficulty: 'Medium', topics: ['Array', 'Two Pointers', 'Sorting'] },
  16: { slug: '3sum-closest', title: '3Sum Closest', difficulty: 'Medium', topics: ['Array', 'Two Pointers', 'Sorting'] },
  17: { slug: 'letter-combinations-of-a-phone-number', title: 'Letter Combinations of a Phone Number', difficulty: 'Medium', topics: ['Hash Table', 'String', 'Backtracking'] },
  20: { slug: 'valid-parentheses', title: 'Valid Parentheses', difficulty: 'Easy', topics: ['String', 'Stack'] },
  21: { slug: 'merge-two-sorted-lists', title: 'Merge Two Sorted Lists', difficulty: 'Easy', topics: ['Linked List', 'Recursion'] },
  22: { slug: 'generate-parentheses', title: 'Generate Parentheses', difficulty: 'Medium', topics: ['String', 'Dynamic Programming', 'Backtracking'] },
  26: { slug: 'remove-duplicates-from-sorted-array', title: 'Remove Duplicates from Sorted Array', difficulty: 'Easy', topics: ['Array', 'Two Pointers'] },
  27: { slug: 'remove-element', title: 'Remove Element', difficulty: 'Easy', topics: ['Array', 'Two Pointers'] },
  28: { slug: 'find-the-index-of-the-first-occurrence-in-a-string', title: 'Find the Index of the First Occurrence in a String', difficulty: 'Easy', topics: ['Two Pointers', 'String', 'String Matching'] },
  33: { slug: 'search-in-rotated-sorted-array', title: 'Search in Rotated Sorted Array', difficulty: 'Medium', topics: ['Array', 'Binary Search'] },
  34: { slug: 'find-first-and-last-position-of-element-in-sorted-array', title: 'Find First and Last Position of Element in Sorted Array', difficulty: 'Medium', topics: ['Array', 'Binary Search'] },
  35: { slug: 'search-insert-position', title: 'Search Insert Position', difficulty: 'Easy', topics: ['Array', 'Binary Search'] },
  36: { slug: 'valid-sudoku', title: 'Valid Sudoku', difficulty: 'Medium', topics: ['Array', 'Hash Table', 'Matrix'] },
  38: { slug: 'count-and-say', title: 'Count and Say', difficulty: 'Medium', topics: ['String'] },
  41: { slug: 'first-missing-positive', title: 'First Missing Positive', difficulty: 'Hard', topics: ['Array', 'Hash Table'] },
  43: { slug: 'multiply-strings', title: 'Multiply Strings', difficulty: 'Medium', topics: ['Math', 'String', 'Simulation'] },
  46: { slug: 'permutations', title: 'Permutations', difficulty: 'Medium', topics: ['Array', 'Backtracking'] },
  47: { slug: 'permutations-ii', title: 'Permutations II', difficulty: 'Medium', topics: ['Array', 'Backtracking', 'Sorting'] },
  50: { slug: 'powx-n', title: 'Pow(x, n)', difficulty: 'Medium', topics: ['Math', 'Recursion'] },
  51: { slug: 'n-queens', title: 'N-Queens', difficulty: 'Hard', topics: ['Array', 'Backtracking'] },
  52: { slug: 'n-queens-ii', title: 'N-Queens II', difficulty: 'Hard', topics: ['Backtracking'] },
  54: { slug: 'spiral-matrix', title: 'Spiral Matrix', difficulty: 'Medium', topics: ['Array', 'Matrix', 'Simulation'] },
  58: { slug: 'length-of-last-word', title: 'Length of Last Word', difficulty: 'Easy', topics: ['String'] },
  66: { slug: 'plus-one', title: 'Plus One', difficulty: 'Easy', topics: ['Array', 'Math'] },
  67: { slug: 'add-binary', title: 'Add Binary', difficulty: 'Easy', topics: ['Math', 'String', 'Bit Manipulation', 'Simulation'] },
  69: { slug: 'sqrtx', title: 'Sqrt(x)', difficulty: 'Easy', topics: ['Math', 'Binary Search'] },
  70: { slug: 'climbing-stairs', title: 'Climbing Stairs', difficulty: 'Easy', topics: ['Math', 'Dynamic Programming', 'Memoization'] },
  73: { slug: 'set-matrix-zeroes', title: 'Set Matrix Zeroes', difficulty: 'Medium', topics: ['Array', 'Hash Table', 'Matrix'] },
  75: { slug: 'sort-colors', title: 'Sort Colors', difficulty: 'Medium', topics: ['Array', 'Two Pointers', 'Sorting'] },
  77: { slug: 'combinations', title: 'Combinations', difficulty: 'Medium', topics: ['Backtracking'] },
  78: { slug: 'subsets', title: 'Subsets', difficulty: 'Medium', topics: ['Array', 'Backtracking', 'Bit Manipulation'] },
  83: { slug: 'remove-duplicates-from-sorted-list', title: 'Remove Duplicates from Sorted List', difficulty: 'Easy', topics: ['Linked List'] },
  88: { slug: 'merge-sorted-array', title: 'Merge Sorted Array', difficulty: 'Easy', topics: ['Array', 'Two Pointers', 'Sorting'] },
  96: { slug: 'unique-binary-search-trees', title: 'Unique Binary Search Trees', difficulty: 'Medium', topics: ['Math', 'Dynamic Programming', 'Tree', 'Binary Search Tree'] },
  100: { slug: 'same-tree', title: 'Same Tree', difficulty: 'Easy', topics: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'] },
  102: { slug: 'binary-tree-level-order-traversal', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', topics: ['Tree', 'Breadth-First Search', 'Binary Tree'] },
  103: { slug: 'binary-tree-zigzag-level-order-traversal', title: 'Binary Tree Zigzag Level Order Traversal', difficulty: 'Medium', topics: ['Tree', 'Breadth-First Search', 'Binary Tree'] },
  104: { slug: 'maximum-depth-of-binary-tree', title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', topics: ['Tree', 'Depth-First Search', 'Binary Tree'] },
  107: { slug: 'binary-tree-level-order-traversal-ii', title: 'Binary Tree Level Order Traversal II', difficulty: 'Medium', topics: ['Tree', 'Breadth-First Search', 'Binary Tree'] },
  111: { slug: 'minimum-depth-of-binary-tree', title: 'Minimum Depth of Binary Tree', difficulty: 'Easy', topics: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'] },
  112: { slug: 'path-sum', title: 'Path Sum', difficulty: 'Easy', topics: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'] },
  118: { slug: 'pascals-triangle', title: "Pascal's Triangle", difficulty: 'Easy', topics: ['Array', 'Dynamic Programming'] },
  119: { slug: 'pascals-triangle-ii', title: "Pascal's Triangle II", difficulty: 'Easy', topics: ['Array', 'Dynamic Programming'] },
  120: { slug: 'triangle', title: 'Triangle', difficulty: 'Medium', topics: ['Array', 'Dynamic Programming'] },
  121: { slug: 'best-time-to-buy-and-sell-stock', title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', topics: ['Array', 'Dynamic Programming'] },
  125: { slug: 'valid-palindrome', title: 'Valid Palindrome', difficulty: 'Easy', topics: ['Two Pointers', 'String'] },
  136: { slug: 'single-number', title: 'Single Number', difficulty: 'Easy', topics: ['Array', 'Bit Manipulation'] },
  137: { slug: 'single-number-ii', title: 'Single Number II', difficulty: 'Medium', topics: ['Array', 'Bit Manipulation'] },
  169: { slug: 'majority-element', title: 'Majority Element', difficulty: 'Easy', topics: ['Array', 'Hash Table', 'Divide and Conquer', 'Sorting', 'Counting'] },
  191: { slug: 'number-of-1-bits', title: 'Number of 1 Bits', difficulty: 'Easy', topics: ['Divide and Conquer', 'Bit Manipulation'] },
  217: { slug: 'contains-duplicate', title: 'Contains Duplicate', difficulty: 'Easy', topics: ['Array', 'Hash Table', 'Sorting'] },
  231: { slug: 'power-of-two', title: 'Power of Two', difficulty: 'Easy', topics: ['Math', 'Bit Manipulation', 'Recursion'] },
  242: { slug: 'valid-anagram', title: 'Valid Anagram', difficulty: 'Easy', topics: ['Hash Table', 'String', 'Sorting'] },
  258: { slug: 'add-digits', title: 'Add Digits', difficulty: 'Easy', topics: ['Math', 'Simulation', 'Number Theory'] },
  263: { slug: 'ugly-number', title: 'Ugly Number', difficulty: 'Easy', topics: ['Math'] },
  1512: { slug: 'number-of-good-pairs', title: 'Number of Good Pairs', difficulty: 'Easy', topics: ['Array', 'Hash Table', 'Math', 'Counting'] },
  1517: { slug: 'find-users-with-valid-e-mails', title: 'Find Users With Valid E-Mails', difficulty: 'Easy', topics: ['Database'] },
  1518: { slug: 'water-bottles', title: 'Water Bottles', difficulty: 'Easy', topics: ['Math', 'Simulation'] }
}

function detectLanguage(code, filename) {
  if (filename.endsWith('.py')) return 'Python'
  if (filename.includes('1517') || code.trim().toUpperCase().startsWith('SELECT')) return 'SQL'
  if (code.includes('public int') || code.includes('class Solution {') || filename.includes('A 01-10')) return 'Java'
  return 'Python'
}

function scanSolutions() {
  const problemsMap = new Map()

  function walk(dir) {
    const list = fs.readdirSync(dir)
    for (const item of list) {
      if (['.git', 'node_modules', 'dist', 'src', 'scripts', 'public'].includes(item)) continue
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        walk(fullPath)
      } else {
        processFile(fullPath, item)
      }
    }
  }

  function processFile(filePath, fileName) {
    const relPath = path.relative(rootDir, filePath)
    let code = ''
    try {
      code = fs.readFileSync(filePath, 'utf-8')
    } catch {
      return
    }

    let problemNumber = null
    let title = ''
    const isSlow = fileName.includes('SLOW') || fileName.includes('TOO')

    const match = fileName.match(/^(\d+)\.\s*(.*)/)
    if (match) {
      problemNumber = parseInt(match[1], 10)
      title = match[2]
        .replace(/[\\]+TOO[\\]+SLOW[\\]*/g, '')
        .replace(/\.py$/g, '')
        .trim()
    } else if (fileName === 'A 01-10') {
      problemNumber = 1512
      title = 'Number of Good Pairs'
    } else {
      return
    }

    const meta = problemMeta[problemNumber] || {
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: title,
      difficulty: 'Easy',
      topics: ['Algorithms']
    }

    const lang = detectLanguage(code, fileName)

    if (!problemsMap.has(problemNumber)) {
      problemsMap.set(problemNumber, {
        id: problemNumber,
        number: problemNumber,
        title: meta.title || title,
        slug: meta.slug,
        difficulty: meta.difficulty,
        topics: meta.topics,
        leetcodeUrl: `https://leetcode.com/problems/${meta.slug}/`,
        primaryLanguage: lang,
        solutions: []
      })
    }

    const problem = problemsMap.get(problemNumber)
    problem.solutions.push({
      fileName: fileName,
      filePath: relPath,
      githubUrl: `https://github.com/MCR300400/LeetCodeDone/blob/main/${encodeURI(relPath).replace(/%5C/g, '%5C%5C')}`,
      isSlow: isSlow,
      variantName: isSlow ? 'Approccio Naive / Too Slow' : (problem.solutions.length > 0 ? 'Approccio Ottimizzato' : 'Soluzione Ottimale'),
      language: lang,
      linesCount: code.split('\n').length,
      charCount: code.length,
      code: code
    })
  }

  walk(rootDir)

  // Sort problems by number
  const problems = Array.from(problemsMap.values()).sort((a, b) => a.number - b.number)

  // Sort solutions within each problem so that optimal is first
  problems.forEach(p => {
    p.solutions.sort((a, b) => (a.isSlow === b.isSlow ? 0 : a.isSlow ? 1 : -1))
  })

  // Compute statistics
  const stats = {
    totalProblems: problems.length,
    totalSolutions: problems.reduce((acc, p) => acc + p.solutions.length, 0),
    easyCount: problems.filter(p => p.difficulty === 'Easy').length,
    mediumCount: problems.filter(p => p.difficulty === 'Medium').length,
    hardCount: problems.filter(p => p.difficulty === 'Hard').length,
    languages: {},
    allTopics: []
  }

  const topicSet = new Set()
  problems.forEach(p => {
    stats.languages[p.primaryLanguage] = (stats.languages[p.primaryLanguage] || 0) + 1
    p.topics.forEach(t => topicSet.add(t))
  })
  stats.allTopics = Array.from(topicSet).sort()

  const outDir = path.resolve(rootDir, 'src', 'data')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  const outJson = path.resolve(outDir, 'solutionsData.json')
  fs.writeFileSync(outJson, JSON.stringify({ stats, problems }, null, 2), 'utf-8')
  console.log(`Generated solutionsData.json: ${problems.length} problems, ${stats.totalSolutions} solutions`)
}

scanSolutions()
