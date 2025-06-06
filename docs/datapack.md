# MTR Quest 2.0 Datapack Design

## Data Types

Storage `mtrq:completions` (`Map(string, Map(int, int))`)

### Objective
A single location to visit and/or complete a task. \
*Mirrors database schema [`locations`](/docs/database.md#locations)* \
**Stored In:** Storage `mtrq:objectives` (`Objective[]`) \
**Properties:**
- ID: `int` - Unique ID
- Name: `string` - Display name
- Type: `string` - [A, B, C, D] Objective type

### Quest
A series of objectives that need to be completed in order. \
*Mirrors database schema [`quests`](/docs/database.md#quests)* \
**Stored In:** Storage `mtrq:quests` (`Quest[]`) \
**Properties:**
- ID: `int` - Unique ID
- Name: `string` - Display name
- Difficulty: `int` - Quest difficulty
- Reward: `int` - Quest QP + XP reward
- Objectives: `int[]` - Array of objective IDs
