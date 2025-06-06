# Database Table Schemas

## Locations
Table: `locations` \
**Data table**

Field | Type | Description
--- | --- | ---
locID | smallint-u | Location ID
name | tinytext | Location name
type | char(1) | Location type (A, B, C, D)
notes | text | Additional notes
hardPk | boolean | Contains hard parkour
status | enum | Current status (active, built, pending, wip, invalid)

Table: `loc_owners` \
**Data field table (one-to-many)**

Field | Type | Description
--- | --- | ---
locID | smallint-u | Location ID
onwerIndex | smallint-u | Index of owner within location
onwerID | bigint-u | Discord owner ID
ownerName | tinytext | Discord owner username

## Quests
Table: `quests` \
**Data table**

Field | Type | Description
--- | --- | ---
questID | smallint-u | Quest ID
name | tinytext | Quest name
difficulty | tinyint U | Difficulty
reward | smallint-u | QP and XP reward

Table: `quest_obj` \
**Data field table (one-to-many)**

Field | Type | Description
--- | --- | ---
questID | smallint-u | Quest ID
locIndex | smallint-u | Position of location within Quest
locID | smallint-u | Objective location ID
