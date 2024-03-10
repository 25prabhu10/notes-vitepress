---
title: Performance
description:
date: 2023-01-09
lastmod: 2023-01-09
---

# Performance

Strategies for analyzing Performance problems:

- When it's slow, what is it doing?

- What is the WHOLE PROGRAM trying to do?

Micro-optimizations such as:

- It always produces the same result: **cache it!**
- It is not even required: **remove!**
- Best optimization is not to run a certain line at all

You need the call stack:

- You want to see a stack trace when it runs slow
- What initiated the slow code?
- And why?

```bash
python -m cProfile app.py

# or

pip install pytest-profiling

pytest --profile-svg -k <keyword>


# or

py-spy record -o profile-svg --pid 7 --subprocesses
```

## References

- [Why is it Slow? Strategies for Solving Performance Issues](https://www.youtube.com/watch?v=RRCGywYTsxI): Caleb Hattingh at Kapiche
