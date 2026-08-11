import{s as e,t}from"./contentSchemas-__43q20_.js";var n=e([{slug:`two-pointers`,title:`Two pointers`,simple:`Move two positions through ordered or mirrored data instead of repeatedly scanning it.`,identify:[`The input is sorted or can be compared from both ends.`,`You need a pair, partition, palindrome, or in-place compaction.`],keywords:[`sorted pair`,`palindrome`,`opposite ends`],analogy:`Two people start at opposite ends of a shelf and move inward until they meet.`,steps:[`Place a pointer at each useful boundary.`,`Compare the values and decide which boundary can move.`,`Stop when the pointers meet or the answer is found.`],js:`function twoPointers(values) {
  let left = 0, right = values.length - 1;
  while (left < right) { left += 1; right -= 1; }
}`,ts:`function twoPointers<T>(values: readonly T[]): void {
  let left = 0, right = values.length - 1;
  while (left < right) { left += 1; right -= 1; }
}`,problems:[`valid-palindrome`,`merge-sorted-arrays`,`pair-sum`],time:`O(n)`,space:`O(1)`,related:[`binary-search`,`sliding-window`]},{slug:`sliding-window`,title:`Sliding window`,simple:`Maintain information about one moving contiguous range instead of rebuilding it for every range.`,identify:[`The question asks about a contiguous substring or subarray.`,`You need a longest, shortest, maximum, or minimum valid range.`],keywords:[`contiguous`,`longest substring`,`minimum window`],analogy:`Move a picture frame across a mural, adding what enters and removing what leaves.`,steps:[`Expand the right edge and update window state.`,`Shrink the left edge while the rule is broken or can improve.`,`Record the best valid window along the way.`],js:`function windowScan(values) {
  let left = 0;
  for (let right = 0; right < values.length; right += 1) {
    while (left < right) left += 1;
  }
}`,ts:`function windowScan<T>(values: readonly T[]): void {
  let left = 0;
  for (let right = 0; right < values.length; right += 1) {
    while (left < right) left += 1;
  }
}`,problems:[`longest-unique-substring`,`minimum-size-subarray`,`debounce-search-input`],time:`O(n)`,space:`O(k)`,related:[`two-pointers`,`hashing`]},{slug:`hashing`,title:`Hashing and lookup tables`,simple:`Trade some memory for fast membership, counting, and lookup by a stable key.`,identify:[`You repeatedly ask whether a value was seen or how often it occurred.`,`A nested search can become one pass with stored information.`],keywords:[`frequency`,`duplicate`,`lookup`,`group by`],analogy:`Use labelled drawers so you can go directly to an item instead of searching the whole room.`,steps:[`Choose the exact value or derived signature to use as a key.`,`Read or update its stored state during one pass.`,`Return results without scanning previous values again.`],js:`function frequencies(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}`,ts:`function frequencies<T>(values: readonly T[]): Map<T, number> {
  const counts = new Map<T, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}`,problems:[`pair-sum`,`group-anagrams`,`lru-cache`],time:`O(n)`,space:`O(n)`,related:[`sliding-window`,`stack`]},{slug:`stack`,title:`Stack`,simple:`Keep unfinished work in last-in, first-out order so the newest item is handled first.`,identify:[`Nested pairs or scopes must close in reverse order.`,`You need undo, parsing, monotonic neighbours, or iterative depth-first work.`],keywords:[`balanced`,`next greater`,`undo`,`nested`],analogy:`You remove the top plate from a stack before reaching any plate below it.`,steps:[`Push an item when work begins or remains unresolved.`,`Inspect or pop the top when a matching event occurs.`,`Validate that no unresolved work remains at the end.`],js:`function stackPattern(values) {
  const stack = [];
  for (const value of values) {
    while (stack.length && stack.at(-1) < value) stack.pop();
    stack.push(value);
  }
}`,ts:`function stackPattern(values: readonly number[]): number[] {
  const stack: number[] = [];
  for (const value of values) {
    while (stack.length && stack.at(-1)! < value) stack.pop();
    stack.push(value);
  }
  return stack;
}`,problems:[`balanced-brackets`,`next-greater-value`,`balanced-brackets`],time:`O(n)`,space:`O(n)`,related:[`tree-depth-first-search`,`hashing`]},{slug:`fast-slow-pointers`,title:`Fast and slow pointers`,simple:`Move two pointers at different speeds to reveal cycles or a midpoint without extra storage.`,identify:[`You need the middle of a linked structure.`,`A cycle may exist but storing every visited node is avoidable.`],keywords:[`cycle`,`middle`,`linked list`],analogy:`On a circular track, a faster runner eventually laps a slower runner.`,steps:[`Start both pointers at the same node.`,`Move one by one step and the other by two.`,`Interpret their meeting or the fast pointer reaching the end.`],js:`function hasCycle(head) {
  let slow = head, fast = head;
  while (fast?.next) { slow = slow.next; fast = fast.next.next; if (slow === fast) return true; }
  return false;
}`,ts:`function hasCycle<T>(head: Node<T> | null): boolean {
  let slow = head, fast = head;
  while (fast?.next) { slow = slow!.next; fast = fast.next.next; if (slow === fast) return true; }
  return false;
}`,problems:[`middle-linked-node`,`linked-list-cycle`,`reverse-linked-list`],time:`O(n)`,space:`O(1)`,related:[`two-pointers`,`graph-traversal`]},{slug:`tree-depth-first-search`,title:`Tree depth-first search`,simple:`Finish one branch before returning to explore the next branch.`,identify:[`The problem asks about paths, depth, subtrees, or recursive structure.`,`A node answer depends on answers from its children.`],keywords:[`tree path`,`subtree`,`maximum depth`],analogy:`Explore one hallway and every room connected to it before returning to the junction.`,steps:[`Define what one recursive call means.`,`Handle an empty node as the base case.`,`Combine results from child calls into the current result.`],js:`function dfs(node) {
  if (!node) return 0;
  return 1 + Math.max(dfs(node.left), dfs(node.right));
}`,ts:`function dfs(node: TreeNode | null): number {
  if (!node) return 0;
  return 1 + Math.max(dfs(node.left), dfs(node.right));
}`,problems:[`maximum-tree-depth`,`validate-binary-search-tree`,`autocomplete-prefix-index`],time:`O(n)`,space:`O(h)`,related:[`breadth-first-search`,`stack`]},{slug:`breadth-first-search`,title:`Breadth-first search`,simple:`Visit everything one step away before moving to items two steps away.`,identify:[`You need the shortest path in an unweighted graph.`,`The answer is organised by levels or distance.`],keywords:[`shortest steps`,`level order`,`nearest`],analogy:`Ripples reach all nearby points before spreading to the next ring.`,steps:[`Add the starting item to a queue and mark it visited.`,`Remove the oldest item and inspect its neighbours.`,`Add unseen neighbours and repeat level by level.`],js:`function bfs(start) {
  const queue = [start], seen = new Set([start]);
  for (let i = 0; i < queue.length; i += 1) {
    for (const next of queue[i].neighbors) if (!seen.has(next)) { seen.add(next); queue.push(next); }
  }
}`,ts:`function bfs<T extends { neighbors: T[] }>(start: T): T[] {
  const queue = [start], seen = new Set<T>([start]);
  for (let i = 0; i < queue.length; i += 1) for (const next of queue[i]!.neighbors) if (!seen.has(next)) { seen.add(next); queue.push(next); }
  return queue;
}`,problems:[`tree-level-order`,`shortest-grid-path`,`number-of-islands`],time:`O(V + E)`,space:`O(V)`,related:[`graph-traversal`,`tree-depth-first-search`]},{slug:`graph-traversal`,title:`Graph traversal`,simple:`Visit connected items while remembering what has already been seen.`,identify:[`Data is a network rather than one strict hierarchy.`,`You need connected groups, dependencies, routes, or reachability.`],keywords:[`connected`,`dependencies`,`islands`,`network`],analogy:`Explore a city map while marking each visited junction so you do not walk in circles.`,steps:[`Represent each item and its neighbours.`,`Start DFS or BFS from an unvisited item.`,`Mark before exploring and repeat for remaining components.`],js:`function visit(node, graph, seen = new Set()) {
  if (seen.has(node)) return seen;
  seen.add(node);
  for (const next of graph.get(node) ?? []) visit(next, graph, seen);
  return seen;
}`,ts:`function visit<T>(node: T, graph: Map<T, T[]>, seen = new Set<T>()): Set<T> {
  if (seen.has(node)) return seen;
  seen.add(node);
  for (const next of graph.get(node) ?? []) visit(next, graph, seen);
  return seen;
}`,problems:[`number-of-islands`,`task-dependency-order`,`shortest-grid-path`],time:`O(V + E)`,space:`O(V)`,related:[`breadth-first-search`,`tree-depth-first-search`]},{slug:`binary-search`,title:`Binary search`,simple:`Discard half of an ordered search space after every comparison.`,identify:[`The values or answer space are monotonic.`,`A yes-or-no condition changes only once across an ordered range.`],keywords:[`sorted`,`first valid`,`minimum possible`],analogy:`Find a dictionary word by repeatedly opening near the middle and choosing one half.`,steps:[`Define inclusive or half-open search boundaries.`,`Compare the midpoint with the target condition.`,`Keep only the half that can still contain the answer.`],js:`function binarySearch(values, target) {
  let left = 0, right = values.length - 1;
  while (left <= right) { const mid = left + Math.floor((right - left) / 2); if (values[mid] === target) return mid; values[mid] < target ? left = mid + 1 : right = mid - 1; }
  return -1;
}`,ts:`function binarySearch(values: readonly number[], target: number): number {
  let left = 0, right = values.length - 1;
  while (left <= right) { const mid = left + Math.floor((right - left) / 2); if (values[mid] === target) return mid; values[mid]! < target ? left = mid + 1 : right = mid - 1; }
  return -1;
}`,problems:[`binary-search-index`,`first-matching-position`,`search-rotated-array`],time:`O(log n)`,space:`O(1)`,related:[`two-pointers`,`sliding-window`]},{slug:`intervals`,title:`Intervals`,simple:`Sort ranges by a boundary, then compare each range with the last accepted range.`,identify:[`The input contains start and end times or numeric ranges.`,`You need overlap, scheduling, merging, or gaps.`],keywords:[`overlap`,`calendar`,`range`,`schedule`],analogy:`Lay appointment cards in start-time order, then combine cards whose times overlap.`,steps:[`Sort ranges by start boundary.`,`Compare the next start with the current end.`,`Merge overlap or safely begin a new result range.`],js:`function mergeIntervals(ranges) {
  ranges = [...ranges].sort((a, b) => a[0] - b[0]);
  const result = [];
  for (const range of ranges) { const last = result.at(-1); if (!last || last[1] < range[0]) result.push([...range]); else last[1] = Math.max(last[1], range[1]); }
  return result;
}`,ts:`function mergeIntervals(ranges: readonly [number, number][]): [number, number][] {
  const sorted = ranges.map((range) => [...range] as [number, number]).sort((a, b) => a[0] - b[0]);
  const result: [number, number][] = [];
  for (const range of sorted) { const last = result.at(-1); if (!last || last[1] < range[0]) result.push(range); else last[1] = Math.max(last[1], range[1]); }
  return result;
}`,problems:[`merge-overlapping-intervals`,`insert-interval`,`merge-overlapping-intervals`],time:`O(n log n)`,space:`O(n)`,related:[`two-pointers`,`sorting`]}].map((e,n)=>t.parse({id:`dsa-pattern-${String(n+1).padStart(2,`0`)}`,slug:e.slug,title:e.title,description:`${e.title} is a reusable problem-solving shape. Learn the recognition signals before memorising any implementation.`,simpleExplanation:e.simple,identifyWhen:e.identify,keywords:e.keywords,analogy:e.analogy,visualSteps:e.steps,javascriptTemplate:e.js,typescriptTemplate:e.ts,beginnerProblemSlug:e.problems[0],intermediateProblemSlug:e.problems[1],advancedProblemSlug:e.problems[2],commonMistakes:[`Using the pattern before confirming its invariant.`,`Moving or updating state without explaining why it remains correct.`],complexity:{time:e.time,space:e.space,explanation:`The standard ${e.title.toLowerCase()} traversal uses ${e.time} time and ${e.space} auxiliary space for its maintained state.`},relatedPatterns:e.related,interviewQuestions:[`Which words in a prompt suggest ${e.title.toLowerCase()}?`,`What invariant makes a ${e.title.toLowerCase()} solution correct?`]})),`DSA pattern`),r=e=>n.find(t=>t.slug===e);export{r as n,n as t};
//# sourceMappingURL=dsaPatterns-CBVCbYIE.js.map