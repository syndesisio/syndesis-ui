# Entity Relationships
We are in the process of creating a diagram for the Entity Relationships in iPaaS. Below is what we currently have, which is pretty incomplete and under continuous develolpment. Please feel free to edit this document as necessary.

## Models/Entities:
- Connection
    - belongs to Organization
    - has many Tags (many-to-many)
- Environment (a place where integrations run)
    - has many Integration Runtime
- Integrations
    - belongs to an Organisation (whether by using recipe or not?)
    - has many Tags (many-to-many)
- Integration Runtime (a collection of integration containers in an Environment)
    - has an Integration
    - has an Environment in which it runs
    - has many Containers (process instances)
- Organization
    - has many Connections and Integrations
    - has many Users
    - has many Environments (Dev / Test / Staging / UAT)
- Reports (if we want them persisted to a hard disk)
    - belongs to User
- Settings
    - belongs to Organization
    - belongs to User
- Tags
    - has many Integrations (many-to-many)
    - has many Connections (many-to-many)
- User
    - belongs to Organization
    - has many Integrations
    - has many Reports (or should this be under Integrations instead?)
    - has many Settings

