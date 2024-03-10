---
title: Chess
description:
date: 2022-12-29
lastmod: 2023-01-05
---

# Chess

Chess is played on a board of 64 squares arranged in eight vertical rows called files and eight horizontal rows called ranks

## Setup

- The eight ranks are numbered `1` through `8` beginning with the rank closest to White
- The files are labelled `a` through `h` beginning with the file at White's left hand

```text
 -------------------------------
| *R| *N| *B| *K| *Q| *B| *N| *R| 8 Black
|---+---+---+---+---+---+---+---|           ^
| *P| *P| *P| *P| *P| *P| *P| *P| 7         |
|---+---+---+---+---+---+---+---|           |
|   |   |   |   |   |   |   |   | 6         |
|---+---+---+---+---+---+---+---|           |
|   |   |   |   |   |   |   |   | 5
|---+---+---+---+---+---+---+---|          file
|   |   |   |   |   |   |   |   | 4
|---+---+---+---+---+---+---+---|           |
|   |   |   |   |   |   |   |   | 3         |
|---+---+---+---+---+---+---+---|           |
| P | P | P | P | P | P | P | P | 2         |
|---+---+---+---+---+---+---+---|           |
| R | N | B | K | Q | B | N | R | 1 White
 -------------------------------
  a   b   c   d   e   f   g   h

  ----------- rank ----------->
```

### Algebraic Notation (AN)

AN is the standard method for recording and describing the moves in a game of chess

It is language of chess

- `K`: King
- `Q`: Queen
- `R`: Rook
- `B`: Bishop
- `N`: Knight
- `P`: Pawn (omitted from notation)

Special Symbols:

- `x`: captures
- `0-0`: kingside castle
- `0-0-0`: queenside castle
- `+`: check
- `#`: checkmate
- `!`: good move
- `?`: poor move
- more `!s` and `?s` can be added for emphasis

## Movements

White moves first

### King

- 1 square in any direction

```text
 -------------------------------
|   |   |   |   |   |   |   |   | 8
|---+---+---+---+---+---+---+---|
|   |   |   |   |   |   |   |   | 7
|---+---+---+---+---+---+---+---|
|   |   |   |   | . | . | . |   | 6
|---+---+---+---+---+---+---+---|
|   |   |   |   | . | K | . |   | 5
|---+---+---+---+---+---+---+---|
|   |   |   |   | . | . | . |   | 4
|---+---+---+---+---+---+---+---|
|   |   |   |   |   |   |   |   | 3
|---+---+---+---+---+---+---+---|
|   |   |   |   |   |   |   |   | 2
|---+---+---+---+---+---+---+---|
|   |   |   |   |   |   |   |   | 1
 -------------------------------
  a   b   c   d   e   f   g   h
```

- Castling: The king moves two spaces to the left or to the right, and the rook moves over and in front of the king, all in one move!

  - Rules for castling:

    - Your king can not have moved
    - Your rook can not have moved
    - Your king can NOT be in check
    - Your king can not pass through check
    - No pieces can be between the king and rook

### Queen

- 9 Points

```text
 -------------------------------
| . |   |   | . |   |   | . |   | 8
|---+---+---+---+---+---+---+---|
|   | . |   | . |   | . |   |   | 7
|---+---+---+---+---+---+---+---|
|   |   | . | . | . |   |   |   | 6
|---+---+---+---+---+---+---+---|
| . | . | . | Q | . | . | . | . | 5
|---+---+---+---+---+---+---+---|
|   |   | . | . | . |   |   |   | 4
|---+---+---+---+---+---+---+---|
|   | . |   | . |   | . |   |   | 3
|---+---+---+---+---+---+---+---|
| . |   |   | . |   |   | . |   | 2
|---+---+---+---+---+---+---+---|
|   |   |   | . |   |   |   | . | 1
 -------------------------------
  a   b   c   d   e   f   g   h
```

### Rook

- 5 Points

```text
 -------------------------------
|   |   |   |   |   | . |   |   | 8
|---+---+---+---+---+---+---+---|
|   |   |   |   |   | . |   |   | 7
|---+---+---+---+---+---+---+---|
|   |   |   |   |   | . |   |   | 6
|---+---+---+---+---+---+---+---|
| . | . | . | . | . | R | . | . | 5
|---+---+---+---+---+---+---+---|
|   |   |   |   |   | . |   |   | 4
|---+---+---+---+---+---+---+---|
|   |   |   |   |   | . |   |   | 3
|---+---+---+---+---+---+---+---|
|   |   |   |   |   | . |   |   | 2
|---+---+---+---+---+---+---+---|
|   |   |   |   |   | . |   |   | 1
 -------------------------------
  a   b   c   d   e   f   g   h
```

### Bishop

- 3 Points (3.25 - 3.15)

```text
 -------------------------------
| . |   |   |   |   |   | . |   | 8
|---+---+---+---+---+---+---+---|
|   | . |   |   |   | . |   |   | 7
|---+---+---+---+---+---+---+---|
|   |   | . |   | . |   |   |   | 6
|---+---+---+---+---+---+---+---|
|   |   |   | B |   |   |   |   | 5
|---+---+---+---+---+---+---+---|
|   |   | . |   | . |   |   |   | 4
|---+---+---+---+---+---+---+---|
|   | . |   |   |   | . |   |   | 3
|---+---+---+---+---+---+---+---|
| . |   |   |   |   |   | . |   | 2
|---+---+---+---+---+---+---+---|
|   |   |   |   |   |   |   | . | 1
 -------------------------------
  a   b   c   d   e   f   g   h
```

### Knight

- 3 Points

```text
 -------------------------------
|   |   |   |   |   |   |   |   | 8
|---+---+---+---+---+---+---+---|
|   |   | . |   | . |   |   |   | 7
|---+---+---+---+---+---+---+---|
|   | . |   |   |   | . |   |   | 6
|---+---+---+---+---+---+---+---|
|   |   |   | N |   |   |   |   | 5
|---+---+---+---+---+---+---+---|
|   | . |   |   |   | . |   |   | 4
|---+---+---+---+---+---+---+---|
|   |   | . |   | . |   |   |   | 3
|---+---+---+---+---+---+---+---|
|   |   |   |   |   |   |   |   | 2
|---+---+---+---+---+---+---+---|
|   |   |   |   |   |   |   |   | 1
 -------------------------------
  a   b   c   d   e   f   g   h
```

### Pawn

- 1 Point

```text
 -------------------------------
|   |   |   |   |   |   |   |   | 8
|---+---+---+---+---+---+---+---|
|   |   |   |   |   |   |   |   | 7
|---+---+---+---+---+---+---+---|
|   |   |   | . |   |   |   |   | 6
|---+---+---+---+---+---+---+---|
|   |   |   | P |   |   |   |   | 5
|---+---+---+---+---+---+---+---|
|   |   |   |   |   | . |   |   | 4
|---+---+---+---+---+---+---+---|
|   |   |   |   |   | . |   |   | 3
|---+---+---+---+---+---+---+---|
|   |   |   |   |   | P |   |   | 2
|---+---+---+---+---+---+---+---|
|   |   |   |   |   |   |   |   | 1
 -------------------------------
  a   b   c   d   e   f   g   h
```

- Promotion: to queen, rook, bishop, or knight of the same color, when a pawn advances to its eighth rank, as part of the move (mandatory)

  - Promotion to a queen is known as _queening_
  - Promotion to any other piece is known as _under-promotion_

- [En Passant](https://www.chess.com/terms/en-passant)

## Situations

### Check

### Checkmate

- Fool's mate: 2 move checkmate

  1. `f3` `e6`
  2. `g4` `Qh4#`

- Scholar's mate: The 4 Move Checkmate

### Stalemate

### Others

- Zugzwang

## Phases

3 Phases in Chess:

1. The opening, where piece development and control of the centre predominate

2. The middlegame, where maneuvering in defense and attack against the opponent's king or weaknesses occurs

3. The endgame, where, generally after several piece exchanges, pawn promotion becomes the dominant theme

### Opening

Setups:

- Sicilian Defence:

  1. e4 c5

- London system
- Evans Gambit

- King's Gambit:

  1. e4 e5
  2. f4

- King's Indian Defence:

  1. d4 Nf6
  2. c4 g6

- Benko Gambit (or Volga Gambit):

  1. d4 Nf6
  2. c4 c5
  3. d5 b5

What is the first worst move that a white can play at the starting position?

- F3 with the Pawn?

What is the best opening?

- Caro–Kann Defence (e4, c6)

### Middlegame

- Strategic play
- Tactical play

### Endgame

## Names of Moves

- Scholar's Mate: The 4 Move Checkmate
- Sicilian Defence
- Wing Gambit
- Rossolimo Attack Variation

## Games

- Adams vs Fabrego (1988) (white checkmates in 2 moves)

```text
 -------------------------------
| *R|   |   |   |   | *K| *R|   | 8
|---+---+---+---+---+---+---+---|
|   | *B|   |   | R |   | *N|   | 7
|---+---+---+---+---+---+---+---|
| *P| *Q|   |   |   |   | *P|   | 6
|---+---+---+---+---+---+---+---|
|   |   |   |   | Q |   |   |   | 5
|---+---+---+---+---+---+---+---|
|   | *P|   |   |   |   | P |   | 4
|---+---+---+---+---+---+---+---|
|   |   |   |   |   | P |   |   | 3
|---+---+---+---+---+---+---+---|
| P | P | P |   |   |   |   | P | 2
|---+---+---+---+---+---+---+---|
|   | K |   |   | R |   |   |   | 1
 -------------------------------
  a   b   c   d   e   f   g   h
```

- The Gold Coin Game: Stefan Levitsky vs Frank Marshall (1912)

- Opera Game: Paul Morphy vs Duke Karl (1858)

## Puzzles

- Paul Morphy (white checkmate in 2 moves)

```text
 -------------------------------
|   |   |   |   |   | K | *B| *K| 8
|---+---+---+---+---+---+---+---|
|   |   |   |   |   |   | *P| *P| 7
|---+---+---+---+---+---+---+---|
|   |   |   |   |   |   | P |   | 6
|---+---+---+---+---+---+---+---|
|   |   |   |   |   |   |   |   | 5
|---+---+---+---+---+---+---+---|
|   |   |   |   |   |   |   |   | 4
|---+---+---+---+---+---+---+---|
|   |   |   |   |   |   |   |   | 3
|---+---+---+---+---+---+---+---|
|   |   |   |   |   |   |   |   | 2
|---+---+---+---+---+---+---+---|
|   |   |   |   |   |   |   | R | 1
 -------------------------------
  a   b   c   d   e   f   g   h
```

## Chess Engines

- [Stockfish](https://github.com/official-stockfish/Stockfish)
- [LeelaChessZero](https://github.com/LeelaChessZero/lc0)

## References

- Dvoretsky's Endgame Manual
