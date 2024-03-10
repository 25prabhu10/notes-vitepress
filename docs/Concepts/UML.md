---
title: Unified Modelling Language (UML)
description: Unified Modelling Language (UML) is a general-purpose, developmental modelling language
---

# Unified Modelling Language (UML)

UML is a general-purpose, developmental modelling language that is intended to provide a standard way to visualize the design of a system

## Model

Model is a partial abstract representation of a real-world system

- An inexpensive way to analyze, communicate, test, and document our understanding of the system

Types of Models:

1. Computational

   - Computer simulations representing time-varying behaviour of a system

2. Analytical:

   - Mathematical models of relationships among variables in a system

3. Non-Analytical/descriptive:

   - Describe components and their relationships in a system

   - Models in Software can be categorized into 2 groups:

     1. Data Models: like Entity Relationship models,etc.

     2. Application Models: UML models, SysML models, BPMN models, etc.

## Types of UML

1. _Structure_: Represents static view of the system and its components

   1. Class diagram
   2. Component diagram
   3. Object diagram
   4. Composite structure diagram
   5. Package diagram
   6. Deployment diagram

2. _behaviour_: Represents dynamic view of the system and its components

   1. Use case diagram:

      - Capture high-level functionality of a system using notations for actors, use cases, and relationships among them

      - Often drawn by business analysts to depict the summary all use cases in a system

      - Key elements:

        - Use cases:

          - Notation is a bubble that carries use case title

        - Systems
        - Actors:

          - A user's role with respect to the system
          - Maybe a human or another system
          - _Primary actor_: whose goal is fulfilled by the use case

          - _Secondary actor_: who is involved in the use case

            - Often an external system

        - Associations

   2. Activity diagram
   3. State machine diagram
   4. Interaction

3. _Interaction_ (part of _behaviour_): Represents interaction, among components of the system and between system and external actors

   1. Sequence diagram
   2. Communication diagram
   3. Timing diagram
   4. interaction overview diagram

## Class Diagram

- Class Name
- Attributes
- behaviours

## References

- [Unified Modelling Language (UML) specification 2.5](https://www.omg.org/spec/UML/)

  - controlled by Object Management Group (OMG)
  - Releases: UML-1 (1997), UML-2 (2005), UML-2.5 (2015)

- UML Distilled by Martin Fowler

- Applying UML and Patterns by Craig Larman
