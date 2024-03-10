---
title: Trie
description: Trie
---

# Trie

A trie, also called _digital tree_ and sometimes _radix tree_ or _prefix tree_ (as they can be searched by prefixes), is a kind of _search tree_

- An ordered tree data structure that is used to store a dynamic set or associative array where the keys are usually strings

- Unlike a [binary search tree](./Trees.md#binary-search-tree-bst), no node in the tree stores the key associated with that node; instead, its position in the tree defines the key with which it is associated

- All the descendants of a node have a common prefix of the string associated with that node, and the root is associated with the empty string.

- Values are not necessarily associated with every node.

- Rather, values tend only to be associated with leaves, and with some inner nodes that correspond to keys of interest.

- Don't look up each prefix from the root, build on the past calls

## Applications

- Spell check
- Word validation problems
- Scrabble
