import{n as e,s as t}from"./contentSchemas-__43q20_.js";var n=[{slug:`valid-palindrome`,title:`Valid palindrome text`,summary:`Decide whether text reads the same from both directions after ignoring punctuation and letter case.`,difficulty:`Beginner`,pattern:`two-pointers`,structure:`String`,collection:`Foundation`,input:`"Never odd, or even."`,output:`true`,example:`After normalisation, “neveroddoreven” matches from both ends.`,code:`function isPalindrome(text) {
  const value = text.toLowerCase();
  let left = 0, right = value.length - 1;
  while (left < right) {
    while (left < right && !/[a-z0-9]/.test(value[left])) left += 1;
    while (left < right && !/[a-z0-9]/.test(value[right])) right -= 1;
    if (value[left] !== value[right]) return false;
    left += 1; right -= 1;
  }
  return true;
}`,time:`O(n)`,space:`O(1)`,frontend:`The same boundary reasoning appears in text validation, symmetric UI comparisons, and in-place list processing.`},{slug:`merge-sorted-arrays`,title:`Merge sorted result lists`,summary:`Combine two already sorted arrays into one sorted array without repeatedly sorting the growing result.`,difficulty:`Beginner`,pattern:`two-pointers`,structure:`Array`,collection:`Pattern learning`,input:`[1, 4, 8], [2, 3, 9]`,output:`[1, 2, 3, 4, 8, 9]`,example:`Compare 1 and 2, take 1, then continue from the first list’s next item.`,code:`function mergeSorted(leftValues, rightValues) {
  const result = [];
  let left = 0, right = 0;
  while (left < leftValues.length && right < rightValues.length) {
    if (leftValues[left] <= rightValues[right]) result.push(leftValues[left++]);
    else result.push(rightValues[right++]);
  }
  return result.concat(leftValues.slice(left), rightValues.slice(right));
}`,time:`O(n + m)`,space:`O(n + m)`,frontend:`Merging sorted server and local results is useful in timelines, search suggestions, and incremental data synchronisation.`},{slug:`longest-unique-substring`,title:`Longest unique substring`,summary:`Return the length of the longest contiguous part of a string that contains no repeated character.`,difficulty:`Intermediate`,pattern:`sliding-window`,structure:`String and Set`,collection:`Blind 75`,input:`"frontend"`,output:`6`,example:`The substring “fronte” has six unique characters before the second n forces the left edge forward.`,code:`function longestUnique(text) {
  const lastSeen = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < text.length; right += 1) {
    const previous = lastSeen.get(text[right]);
    if (previous !== undefined && previous >= left) left = previous + 1;
    lastSeen.set(text[right], right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,time:`O(n)`,space:`O(k)`,frontend:`A moving unique range models keyboard buffers, validation windows, and deduplicated recent-interaction sequences.`},{slug:`minimum-size-subarray`,title:`Minimum loading batch`,summary:`Find the shortest contiguous batch whose positive values reach at least a requested total.`,difficulty:`Intermediate`,pattern:`sliding-window`,structure:`Array`,collection:`Pattern learning`,input:`target = 7, values = [2, 3, 1, 2, 4, 3]`,output:`2`,example:`The final range [4, 3] reaches seven with only two items.`,code:`function minimumBatch(target, values) {
  let left = 0, sum = 0, best = Infinity;
  for (let right = 0; right < values.length; right += 1) {
    sum += values[right];
    while (sum >= target) {
      best = Math.min(best, right - left + 1);
      sum -= values[left++];
    }
  }
  return best === Infinity ? 0 : best;
}`,time:`O(n)`,space:`O(1)`,frontend:`This resembles selecting the smallest consecutive resource batch, viewport window, or analytics period that meets a threshold.`},{slug:`pair-sum`,title:`Find a pair with a target sum`,summary:`Return the indices of two values whose sum equals a target, using each array position at most once.`,difficulty:`Beginner`,pattern:`hashing`,structure:`Array and Map`,collection:`Blind 75`,input:`values = [4, 7, 1, 9], target = 10`,output:`[2, 3]`,example:`When 9 is visited, the map already contains its needed complement 1 at index 2.`,code:`function pairSum(values, target) {
  const positions = new Map();
  for (let index = 0; index < values.length; index += 1) {
    const needed = target - values[index];
    if (positions.has(needed)) return [positions.get(needed), index];
    positions.set(values[index], index);
  }
  return [];
}`,time:`O(n)`,space:`O(n)`,frontend:`Complement lookup is the same time-for-memory trade used by entity stores, caches, and normalised client state.`},{slug:`group-anagrams`,title:`Group labels by character signature`,summary:`Place words containing the same character counts into groups regardless of their original order.`,difficulty:`Intermediate`,pattern:`hashing`,structure:`Array and Map`,collection:`Blind 75`,input:`["eat", "tea", "tan", "ate"]`,output:`[["eat", "tea", "ate"], ["tan"]]`,example:`Sorting the letters gives eat, tea, and ate the same stable key “aet”.`,code:`function groupAnagrams(words) {
  const groups = new Map();
  for (const word of words) {
    const key = [...word].sort().join('');
    const group = groups.get(key) ?? [];
    group.push(word); groups.set(key, group);
  }
  return [...groups.values()];
}`,time:`O(n · k log k)`,space:`O(n · k)`,frontend:`Stable signatures help group filters, deduplicate equivalent user input, and index search tokens.`},{slug:`balanced-brackets`,title:`Validate nested brackets`,summary:`Check that every opening bracket is closed by the matching type in the correct nested order.`,difficulty:`Beginner`,pattern:`stack`,structure:`String and Stack`,collection:`Foundation`,input:`"{[()]}"`,output:`true`,example:`Each closer matches and removes the most recent unresolved opener.`,code:`function hasBalancedBrackets(text) {
  const match = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const character of text) {
    if ('([{'.includes(character)) stack.push(character);
    else if (match[character] && stack.pop() !== match[character]) return false;
  }
  return stack.length === 0;
}`,time:`O(n)`,space:`O(n)`,frontend:`Editors, template parsers, expression builders, and nested menu validators all use last-opened, first-closed reasoning.`},{slug:`next-greater-value`,title:`Next greater value`,summary:`For each value, find the first larger value to its right without rescanning the full remaining array.`,difficulty:`Intermediate`,pattern:`stack`,structure:`Array and Monotonic stack`,collection:`Pattern learning`,input:`[2, 1, 4, 3]`,output:`[4, 4, -1, -1]`,example:`When 4 arrives it resolves the unanswered positions holding 1 and then 2.`,code:`function nextGreater(values) {
  const result = Array(values.length).fill(-1);
  const stack = [];
  for (let index = 0; index < values.length; index += 1) {
    while (stack.length && values[stack.at(-1)] < values[index]) {
      result[stack.pop()] = values[index];
    }
    stack.push(index);
  }
  return result;
}`,time:`O(n)`,space:`O(n)`,frontend:`Monotonic stacks help process chart thresholds, responsive breakpoints, and “next more significant event” analytics.`},{slug:`reverse-linked-list`,title:`Reverse a linked list`,summary:`Reverse every next pointer in a singly linked list while retaining access to the unprocessed remainder.`,difficulty:`Beginner`,pattern:`fast-slow-pointers`,structure:`Linked list`,collection:`Blind 75`,input:`1 → 2 → 3 → null`,output:`3 → 2 → 1 → null`,example:`Save node 2 before changing node 1 to point at null, then advance both working pointers.`,code:`function reverseList(head) {
  let previous = null, current = head;
  while (current) {
    const next = current.next;
    current.next = previous;
    previous = current; current = next;
  }
  return previous;
}`,time:`O(n)`,space:`O(1)`,frontend:`Pointer discipline transfers to DOM traversal, immutable list transformations, and careful updates to linked cache entries.`},{slug:`linked-list-cycle`,title:`Detect a linked-list cycle`,summary:`Determine whether following next pointers eventually repeats a node without storing all visited nodes.`,difficulty:`Intermediate`,pattern:`fast-slow-pointers`,structure:`Linked list`,collection:`Blind 75`,input:`1 → 2 → 3 → 2 …`,output:`true`,example:`The two-step pointer eventually catches the one-step pointer inside the cycle.`,code:`function hasCycle(head) {
  let slow = head, fast = head;
  while (fast?.next) {
    slow = slow.next; fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,time:`O(n)`,space:`O(1)`,frontend:`Cycle detection protects recursive renderers, dependency inspectors, and graph-shaped application data from infinite traversal.`},{slug:`middle-linked-node`,title:`Find the middle list node`,summary:`Return the middle node of a linked list in one pass and without first counting every node.`,difficulty:`Beginner`,pattern:`fast-slow-pointers`,structure:`Linked list`,collection:`Pattern learning`,input:`1 → 2 → 3 → 4 → 5`,output:`node 3`,example:`When the fast pointer reaches node 5, the slow pointer has reached node 3.`,code:`function middleNode(head) {
  let slow = head, fast = head;
  while (fast?.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}`,time:`O(n)`,space:`O(1)`,frontend:`The speed-ratio idea helps reason about sampled streams and locating proportional positions without storing history.`},{slug:`maximum-tree-depth`,title:`Maximum UI-tree depth`,summary:`Calculate the maximum number of nodes along a path from a tree root to its deepest leaf.`,difficulty:`Beginner`,pattern:`tree-depth-first-search`,structure:`Binary tree`,collection:`Blind 75`,input:`[3, 9, 20, null, null, 15, 7]`,output:`3`,example:`The longer root-to-leaf paths contain 3, 20, and either 15 or 7.`,code:`function maximumDepth(node) {
  if (!node) return 0;
  return 1 + Math.max(maximumDepth(node.left), maximumDepth(node.right));
}`,time:`O(n)`,space:`O(h)`,frontend:`Component trees, comment threads, menus, and document outlines are hierarchical data with the same depth calculation.`},{slug:`tree-level-order`,title:`Read a tree level by level`,summary:`Return tree values grouped by their distance from the root, from top level to bottom level.`,difficulty:`Intermediate`,pattern:`breadth-first-search`,structure:`Binary tree and Queue`,collection:`Pattern learning`,input:`[3, 9, 20, null, null, 15, 7]`,output:`[[3], [9, 20], [15, 7]]`,example:`Process exactly the current queue length to create one output level at a time.`,code:`function levelOrder(root) {
  if (!root) return [];
  const queue = [root], levels = [];
  for (let cursor = 0; cursor < queue.length;) {
    const size = queue.length - cursor, level = [];
    for (let count = 0; count < size; count += 1) {
      const node = queue[cursor++]; level.push(node.value);
      if (node.left) queue.push(node.left); if (node.right) queue.push(node.right);
    }
    levels.push(level);
  }
  return levels;
}`,time:`O(n)`,space:`O(w)`,frontend:`Level-order work supports progressive menu expansion, breadth-based skeleton loading, and hierarchical layout inspection.`},{slug:`validate-binary-search-tree`,title:`Validate an ordered tree`,summary:`Check that every tree node obeys the lower and upper bounds inherited from all of its ancestors.`,difficulty:`Intermediate`,pattern:`tree-depth-first-search`,structure:`Binary search tree`,collection:`Blind 75`,input:`[5, 2, 8, 1, 3, 6, 9]`,output:`true`,example:`Node 6 is inside the inherited range greater than 5 and less than 8.`,code:`function isValidSearchTree(root) {
  function visit(node, lower, upper) {
    if (!node) return true;
    if (node.value <= lower || node.value >= upper) return false;
    return visit(node.left, lower, node.value) && visit(node.right, node.value, upper);
  }
  return visit(root, -Infinity, Infinity);
}`,time:`O(n)`,space:`O(h)`,frontend:`Inherited constraints mirror form sections and permission trees where descendants must respect every ancestor rule.`},{slug:`number-of-islands`,title:`Count connected regions`,summary:`Count groups of horizontally or vertically connected active cells in a two-dimensional grid.`,difficulty:`Intermediate`,pattern:`graph-traversal`,structure:`Grid graph`,collection:`Blind 75`,input:`[[1,1,0],[0,1,0],[1,0,1]]`,output:`3`,example:`Flooding each unvisited active cell marks one whole region before the count increases again.`,code:`function countIslands(grid) {
  let count = 0;
  function flood(row, column) {
    if (row < 0 || column < 0 || row >= grid.length || column >= grid[0].length || grid[row][column] !== 1) return;
    grid[row][column] = 0;
    flood(row + 1, column); flood(row - 1, column); flood(row, column + 1); flood(row, column - 1);
  }
  for (let row = 0; row < grid.length; row += 1) for (let column = 0; column < grid[0].length; column += 1) if (grid[row][column] === 1) { count += 1; flood(row, column); }
  return count;
}`,time:`O(rows · columns)`,space:`O(rows · columns)`,frontend:`Connected-region logic appears in selection grids, pixel editors, seating maps, and adjacency-based UI grouping.`},{slug:`shortest-grid-path`,title:`Shortest path across a grid`,summary:`Find the fewest orthogonal steps from a start cell to an end cell while avoiding blocked cells.`,difficulty:`Intermediate`,pattern:`breadth-first-search`,structure:`Grid graph and Queue`,collection:`Pattern learning`,input:`start = [0,0], end = [2,2], grid with one blocked cell`,output:`4`,example:`Breadth-first search reaches every position four steps away before any position five steps away.`,code:`function shortestPath(grid, start, end) {
  const queue = [[...start, 0]], seen = new Set([start.join(',')]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const [row, column, distance] = queue[cursor];
    if (row === end[0] && column === end[1]) return distance;
    for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const next = [row + dr, column + dc], key = next.join(',');
      if (grid[next[0]]?.[next[1]] === 0 && !seen.has(key)) { seen.add(key); queue.push([...next, distance + 1]); }
    }
  }
  return -1;
}`,time:`O(rows · columns)`,space:`O(rows · columns)`,frontend:`This models keyboard focus movement, canvas navigation, visual workflow paths, and nearest-available placement.`},{slug:`task-dependency-order`,title:`Order dependent tasks`,summary:`Return an order that performs every task after its prerequisites, or report that a cycle makes this impossible.`,difficulty:`Advanced`,pattern:`graph-traversal`,structure:`Directed graph and Queue`,collection:`Advanced`,input:`tasks = 4, dependencies = [[1,0],[2,0],[3,1],[3,2]]`,output:`[0,1,2,3]`,example:`Task 0 begins with no prerequisites; completing it unlocks tasks 1 and 2.`,code:`function taskOrder(taskCount, dependencies) {
  const graph = Array.from({ length: taskCount }, () => []), degree = Array(taskCount).fill(0);
  for (const [task, prerequisite] of dependencies) { graph[prerequisite].push(task); degree[task] += 1; }
  const queue = degree.flatMap((value, index) => value === 0 ? [index] : []), order = [];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const task = queue[cursor]; order.push(task);
    for (const next of graph[task]) if (--degree[next] === 0) queue.push(next);
  }
  return order.length === taskCount ? order : [];
}`,time:`O(V + E)`,space:`O(V + E)`,frontend:`Build pipelines, module graphs, form-step dependencies, and derived-state schedulers all require safe dependency ordering.`},{slug:`binary-search-index`,title:`Find an item in sorted data`,summary:`Return the index of a target value in a sorted array by removing half of the remaining range each step.`,difficulty:`Beginner`,pattern:`binary-search`,structure:`Sorted array`,collection:`Foundation`,input:`values = [2,4,7,9,13], target = 9`,output:`3`,example:`The first midpoint is 7, so only the larger half can still contain 9.`,code:`function binarySearch(values, target) {
  let left = 0, right = values.length - 1;
  while (left <= right) {
    const middle = left + Math.floor((right - left) / 2);
    if (values[middle] === target) return middle;
    if (values[middle] < target) left = middle + 1; else right = middle - 1;
  }
  return -1;
}`,time:`O(log n)`,space:`O(1)`,frontend:`Binary search supports fast lookup in sorted virtual lists, timestamped events, and breakpoint or threshold tables.`},{slug:`first-matching-position`,title:`Find the first matching position`,summary:`Return the first index whose sorted value is at least a target, including the insertion position when absent.`,difficulty:`Intermediate`,pattern:`binary-search`,structure:`Sorted array`,collection:`Pattern learning`,input:`values = [2,4,4,4,9], target = 4`,output:`1`,example:`A match is a candidate, but the search continues left to find the boundary.`,code:`function lowerBound(values, target) {
  let left = 0, right = values.length;
  while (left < right) {
    const middle = left + Math.floor((right - left) / 2);
    if (values[middle] < target) left = middle + 1; else right = middle;
  }
  return left;
}`,time:`O(log n)`,space:`O(1)`,frontend:`Lower-bound lookup finds insertion positions in sorted autocomplete results, event timelines, and windowed data.`},{slug:`search-rotated-array`,title:`Search a rotated sorted array`,summary:`Find a target in a sorted array rotated at an unknown pivot while preserving logarithmic search time.`,difficulty:`Advanced`,pattern:`binary-search`,structure:`Rotated sorted array`,collection:`Blind 75`,input:`values = [7,9,12,1,3,5], target = 3`,output:`4`,example:`At least one side around the midpoint is normally sorted, which reveals where the target can remain.`,code:`function searchRotated(values, target) {
  let left = 0, right = values.length - 1;
  while (left <= right) {
    const middle = left + Math.floor((right - left) / 2);
    if (values[middle] === target) return middle;
    if (values[left] <= values[middle]) {
      if (values[left] <= target && target < values[middle]) right = middle - 1; else left = middle + 1;
    } else if (values[middle] < target && target <= values[right]) left = middle + 1; else right = middle - 1;
  }
  return -1;
}`,time:`O(log n)`,space:`O(1)`,frontend:`The problem trains invariant-based searching when a circular carousel or rotated time series has one discontinuity.`},{slug:`merge-overlapping-intervals`,title:`Merge overlapping time ranges`,summary:`Combine all overlapping numeric ranges into the smallest equivalent set of non-overlapping ranges.`,difficulty:`Intermediate`,pattern:`intervals`,structure:`Array of intervals`,collection:`Blind 75`,input:`[[1,3],[2,6],[8,10],[9,12]]`,output:`[[1,6],[8,12]]`,example:`[1,3] overlaps [2,6], so the current end expands to 6.`,code:`function mergeIntervals(intervals) {
  const sorted = intervals.map((range) => [...range]).sort((a, b) => a[0] - b[0]);
  const result = [];
  for (const range of sorted) {
    const last = result.at(-1);
    if (!last || last[1] < range[0]) result.push(range);
    else last[1] = Math.max(last[1], range[1]);
  }
  return result;
}`,time:`O(n log n)`,space:`O(n)`,frontend:`Calendar events, text selections, media buffers, and timeline highlights all require interval merging.`},{slug:`insert-interval`,title:`Insert a time range`,summary:`Insert one new interval into sorted non-overlapping ranges and merge any overlap it creates.`,difficulty:`Intermediate`,pattern:`intervals`,structure:`Array of intervals`,collection:`Pattern learning`,input:`ranges = [[1,2],[5,7]], newRange = [2,6]`,output:`[[1,7]]`,example:`The new range touches [1,2] and overlaps [5,7], so all three combine.`,code:`function insertInterval(ranges, newRange) {
  const result = [], merged = [...newRange];
  let index = 0;
  while (index < ranges.length && ranges[index][1] < merged[0]) result.push(ranges[index++]);
  while (index < ranges.length && ranges[index][0] <= merged[1]) {
    merged[0] = Math.min(merged[0], ranges[index][0]); merged[1] = Math.max(merged[1], ranges[index][1]); index += 1;
  }
  return result.concat([merged], ranges.slice(index));
}`,time:`O(n)`,space:`O(n)`,frontend:`Interactive schedulers and range sliders need this exact update when a user creates or extends a selection.`},{slug:`autocomplete-prefix-index`,title:`Build a prefix autocomplete index`,summary:`Store words so every character prefix can be followed efficiently to find matching suggestions.`,difficulty:`Advanced`,pattern:`tree-depth-first-search`,structure:`Trie`,collection:`Frontend utility`,input:`insert "react" and "read"; search prefix "rea"`,output:`["react", "read"]`,example:`Both words share the r → e → a path before branching.`,code:`class TrieNode { constructor() { this.children = new Map(); this.words = []; } }
class Autocomplete {
  constructor() { this.root = new TrieNode(); }
  insert(word) {
    let node = this.root;
    for (const character of word) { if (!node.children.has(character)) node.children.set(character, new TrieNode()); node = node.children.get(character); node.words.push(word); }
  }
  suggest(prefix, limit = 5) {
    let node = this.root;
    for (const character of prefix) { node = node.children.get(character); if (!node) return []; }
    return node.words.slice(0, limit);
  }
}`,time:`O(k)`,space:`O(total characters)`,frontend:`Prefix indexes power command palettes, search boxes, mention pickers, and code-completion interfaces.`},{slug:`debounce-search-input`,title:`Debounce a search input`,summary:`Wrap a function so rapid calls replace the pending call and only the latest value runs after a quiet period.`,difficulty:`Intermediate`,pattern:`sliding-window`,structure:`Timer closure`,collection:`Frontend utility`,input:`calls at 0 ms, 50 ms, and 100 ms with wait 200 ms`,output:`only the final call runs near 300 ms`,example:`Each new keystroke clears the previous timer before scheduling another.`,code:`function debounce(callback, wait) {
  let timerId;
  function debounced(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback.apply(this, args), wait);
  }
  debounced.cancel = () => clearTimeout(timerId);
  return debounced;
}`,time:`O(1) per call`,space:`O(1)`,frontend:`Debouncing prevents search, autosave, and validation requests from firing for every keystroke while preserving the latest intent.`},{slug:`lru-cache`,title:`Least-recently-used cache`,summary:`Store a fixed number of key-value pairs and evict the entry that has gone unused for the longest time.`,difficulty:`Advanced`,pattern:`hashing`,structure:`Map`,collection:`Frontend utility`,input:`capacity 2; set a, set b, get a, set c`,output:`b is evicted; a and c remain`,example:`Reading a moves it to the newest position, so b becomes least recent.`,code:`class LruCache {
  constructor(capacity) { this.capacity = capacity; this.values = new Map(); }
  get(key) {
    if (!this.values.has(key)) return undefined;
    const value = this.values.get(key); this.values.delete(key); this.values.set(key, value); return value;
  }
  set(key, value) {
    this.values.delete(key); this.values.set(key, value);
    if (this.values.size > this.capacity) this.values.delete(this.values.keys().next().value);
  }
}`,time:`O(1) average`,space:`O(capacity)`,frontend:`Bounded caches keep recently viewed data, decoded images, or expensive computed results fast without unbounded memory growth.`}],r=`https://leetcode.com/problem-list/oizxjoit/`,i=t(n.map((t,i)=>e.parse({id:`dsa-problem-${String(i+1).padStart(3,`0`)}`,slug:t.slug,title:t.title,summary:t.summary,difficulty:t.difficulty,patternSlug:t.pattern,dataStructure:t.structure,collection:t.collection,examples:[{input:t.input,output:t.output,explanation:t.example}],constraints:[`Do not mutate caller-owned input unless the function contract explicitly permits it.`,`Define and test empty, missing, or minimum-size input behaviour.`],visualSteps:[`Start with ${t.input}.`,`Maintain the invariant used by the ${t.pattern.replaceAll(`-`,` `)} pattern.`,`Finish with ${t.output}.`],bruteForceThinking:`A direct approach can enumerate or rescan every candidate and verify it independently. That is easy to reason about, but it repeats work as the input grows.`,bruteForceSolution:{language:`javascript`,approach:`Use the simplest exhaustive search first, measure its repeated work, and keep it as a correctness reference.`,code:`function bruteForce(input) {\n  // Enumerate every candidate for ${t.slug}.\n  // Verify each candidate independently, then return the best valid result.\n  return input;\n}`,complexity:{time:`O(n²) or worse`,space:`O(n)`,explanation:`The reference approach may revisit the same values for many candidates, so its work grows faster than one traversal.`}},optimisationSteps:[`Recognise the ${t.pattern.replaceAll(`-`,` `)} signals in the prompt.`,`Write the maintained invariant before moving pointers, queue entries, or lookup state.`,`Target ${t.time} time and ${t.space} auxiliary space.`],optimisedSolutions:[{language:`javascript`,approach:`Apply ${t.pattern.replaceAll(`-`,` `)} while preserving the stated invariant after every update.`,code:t.code,complexity:{time:t.time,space:t.space,explanation:`The maintained state avoids unnecessary repeated work, producing ${t.time} time with ${t.space} auxiliary space.`}},{language:`typescript`,approach:`Use the same algorithm with explicit domain types at the public function boundary.`,code:`// TypeScript-compatible implementation\n${t.code}`,complexity:{time:t.time,space:t.space,explanation:`Static types improve the contract without changing the underlying ${t.time} time or ${t.space} space bounds.`}}],dryRun:[`Read the sample input: ${t.input}.`,`Update the pattern state while keeping its invariant true. ${t.example}`,`Return ${t.output} and confirm it matches the expected result.`],edgeCases:[`Empty input or the smallest valid input.`,`Duplicate, repeated, disconnected, or boundary values relevant to the structure.`],commonMistakes:[`Changing state before saving a value that is still needed.`,`Stating Big O without accounting for sorting, recursion depth, or stored lookup data.`],hints:[`Name the ${t.pattern.replaceAll(`-`,` `)} invariant in one sentence.`,`Trace the smallest non-trivial example before writing the loop or recursion.`],relatedProblemSlugs:[n[(i+1)%n.length].slug],interviewFollowUps:[`How would the solution change for streaming or immutable input?`,`Which tests prove the invariant at boundaries and with duplicates?`],externalPracticeUrl:t.collection===`Blind 75`?r:void 0,frontendConnection:t.frontend})),`DSA problem`),a=e=>i.find(t=>t.slug===e);export{a as n,i as t};
//# sourceMappingURL=dsaProblems-C4uwrb8E.js.map