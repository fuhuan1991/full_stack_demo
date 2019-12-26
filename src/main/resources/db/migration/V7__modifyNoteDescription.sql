ALTER TABLE note
DROP CONSTRAINT IF EXISTS note_description_key;

ALTER TABLE task
DROP CONSTRAINT IF EXISTS task_description_key;