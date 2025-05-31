# Database Table Schemas

## Locations
Table: `locations`

Field | Type | Description
--- | --- | ---
locID | smallint-U | Location ID
name | tinytext | Location name
type | char(1) | Location type (A, B, C, D)
notes | text | Additional notes
hardPk | boolean | Contains hard parkour
status | enum | Current status (active, built, pending, wip, invalid)