# Scrum

An [Agile](./Agile.md) framework.

The term **Scrum** was first introduced by professors Hirotaka Takeuchi and Ikujiro Nonaka in their article _"The New New Product Development Game"_ at Harvard Business Review in 1986.

They borrowed the name Scrum from the game of rugby, to stress the importance of teamwork to deal with a complex problem.

Jeff Sutherland implemented first Scrum project at the Easel Corporation in 1993.

Ken Schwaber and Jeff Sutherland co-present a paper called "The Scrum Development Process" at the OOPSLA Conference in 1995

## The Scrum Process

In Scrum, you break down the phases of your project into smaller pieces that can be completed by a cross-functional team within a prescribed time period (called a **sprint**)

- User Stories (Product Owner) --> Sprint Backlog --> Planning (Team) --> Implementation (24 hours) --> Review (Scrum Master) --> Retrospect --> Definition of Done --> Shippable Product Increment
- The duration of the sprint in Scrum is anywhere from **2 to 4 weeks to almost a month**
- **Once the sprint begins, you aren't allowed to add any new requirements**

- Prioritized Backlog (PO discuss with Developers)
- Sprint Planning Meeting (Run by Scrum Master attended by PO, Developers): Team pulls a small chunk from the top of Product backlog work items to work on during the sprint. That chunk becomes the Sprint Backlog
- Daily Scrum (meeting to access the progress): Scrum board is used as a visual representation of the workflow. Scrum board:

  - To Do
  - Build
  - Test
  - Done

- Sprint Review: Held by development team to demonstrate the work accomplished during the sprint to stakeholders
- Sprint Retrospective: To discuss What went right or wrong, and areas for improvements for further sprints. Scrum teams follow an inspect and adapt approach (improve continuously taking lessons from their previous sprints)

### Roles and Responsibilities

- Scrum is self managed and everybody is equal.

- Business Owner and End Users --> Product Owner (Optimizes the value of the product) --> Scrum Master (Servant-leader of the scrum team) and Development Team (Self-organized cross-functional group)

## Scrum vs Kanban

- Scrum: is more structured, allows for forecasting emphasizes teamwork, accountability, and iterative progress toward a well-defined goal

- Kanban: is a bit more flexible, and it is a visual system for managing work as it moves through a continuous process

### Kanban

Kanban is highly visual way of executing agile.

A Toyota engineer, named Taiichi Ohno, created a systme that used paper cards for signaling and tracking demand in his factory, naming the new system Kanban in 1940

The way the items were restocked in the marketplaces inspired Taiichi. **If there are empty shelves in the shop, then more inventory is ordered to meet the demand again**.

Taiichi brought this **JIT (just-in-time) principle** to the Toyota facilities to ramp up the car development process

In 2004, David J. Anderson was the first to apply **Kanban to IT, software development**

The Kanban Process:

Kanban **focuses on maintaining a continuous task flow and continuous delivery**. At the same time, the team is never given more work than it can handle. This is accomplished through the two primary principles of Kanban: **Visualize your work, Limiting Work-in-progress**

### Similarities

- **Pull System**: With pull system you create a workflow where work is pulled only if there is a demand for it

- **Limit Work-in-progress (WIP)**: Limiting WIP will allow teams to identify bottlenecks and improves throughput

- **Break Down Complex Tasks**: They allow large and complex tasks to be broken down and completed efficiently

- **High Value on Continual Improvement**: They place a high value on continual improvement, optimization of the work and the process

### Differences

| Scrum                                                                                                                                                             | Kanban                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scrum has **sprints**. The Sprint is a timebox of one month or less during which the team produces a potentially shippable product increment                      | Kanban Flow, there are **no required time boxes or iterations**. It focuses on maintaining a continuous task flow and continuous delivery.                                                           |
| Scrum has a set of mandatory roles that you must implement. The Product Owner, Scrum Master, and Team Members                                                     | Under Kanban, no set roles are prescribed. Although, there might still be an agile coach.                                                                                                            |
| The team commits to a specific amount of work for each iteration. If the capacity is not measured accurately, sprint might fail.                                  | Commitment is based on capacity. Work-in-progress (WIP) limits prevent team members from working on multiple tasks                                                                                   |
| Planning happens iteratively at the **beginning of each sprint**                                                                                                  | With Kanban, there's close to 0 planning involved. It includes **Just-In-Time planning**, instead of planning for a bigger time period                                                               |
| Scrum **limits work in progress per iteration**. The development team has to commit to the number of tasks that they are ready to accomplish during the sprint    | Limits work in progress by assigning a **limit to the number of cards in any active-work columns**. When the limit is met, no new work can enter the column until a task is completed.               |
| Once the **sprint begins, you aren't allowed to add any new requirements**. When more tasks than planned are added, **scope creep** occurs                        | You can **insert or add tasks constantly to the backlog** and existing cards can get blocked or removed all together based on prioritization                                                         |
| Scrum measures productivity using a metric called **velocity**, which is the number of story points completed in a sprint. Uses Burndown chart and Velocity chart | **Lead time and cycle time** are important metrics for Kanban teams. They are used to calculate the average amount of time that it takes for a task to move from start to finish. Then there is CFD. |
| On a Scrum Board, the columns are labeled to show the workflow states. At the beginning of the sprint all the stories are added to the board.                     | Kanban board also has the columns labeled to show the workflow states. The difference is that Kanban board has WIP limits visualized on it.                                                          |
| Ideal for projects where you want to move fast but you need some degree of planning and coordination                                                              | Kanban is the best choice when you have a lot of incoming tasks with changing priorities                                                                                                             |
| Goal-driven projects with fixed deliverables                                                                                                                      | It is better suitable for mature teams                                                                                                                                                               |
| Suitable for non-mature teams                                                                                                                                     | Teams involved in industries such as marketing, software development, or content creation can benefit from Kanban                                                                                    |

Summary:

| Items               | Scrum                                                  | Kanban                                                                         |
| ------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Cadence             | Regular fixed length sprints                           | Continuous flow                                                                |
| Release Methodology | At the end of each sprint                              | Continuous delivery                                                            |
| Key Metrics         | Velocity                                               | Lead time, cycle time, WIP                                                     |
| Roles               | Product owner, scrum master, development team          | No required roles                                                              |
| Teams               | Must be cross-functional                               | Can be specialized                                                             |
| Modifications       | Changes during the sprint are strongly discouraged     | Change can happen at any time                                                  |
| WIP Limits          | Limits work in progress per iteration                  | Limits WIP by limiting the number of cards in any active-work columns          |
| Commitment          | Teams are required to commit a specific amount of work | Commitment not necessary it is optional for teams                              |
| Storyboard          | Scrum board is rest after every sprint                 | Kanban board is persistent, low continues for as long as the project continues |

## SCRUMBAN

Scrumban is a project management framework that combines important features of two popular agile methodologies: **Scrum and Kanban**

- Scrumban provides the structure of Scrum with the flexibility and visualization of Kanban, making it a highly versatile approach to workflow management.
- Was initially created as a way to transition from Scrum to Kanban
