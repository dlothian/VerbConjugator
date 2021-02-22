#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

import json
import sqlite3
import os

with open("/Volumes/Data/github_repos/gramble_ts/Week_3/MichifVerb_Sheet1.json", encoding="UTF-8") as f:
    json_db = json.load(f)

conn = sqlite3.connect("MichifVerb.sqlite3")

"""
    "person": "1",
    "tense": "PST",
    "type": "VAIT",
    "mood": "INDIC",
    "order": "IND",
    "subject": "1SG",
    "object": "3SG",
    "text": "gii-ayaan",
    "preverb: "nohtee",
    "verb": "ayaan",
    "verb_translation"
    "gloss": "1-PST-null-have-VAIT-IND-1SG-",
    "p": "2.03e-8"
"""

conn.executescript(
    """
    DROP TABLE IF EXISTS verb;

    CREATE TABLE verb (
        text    TEXT NOT NULL,
        preverb TEXT,
        verb    TEXT NOT NULL,
        verb_translation TEXT NOT NULL,
        type    TEXT NOT NULL,
        person  TEXT,
        tense   TEXT,
        mood    TEXT NOT NULL,
        `order` TEXT,
        subject TEXT NOT NULL,
        object TEXT,
        gloss   TEXT NOT NULL
    );
    """
)


def generate_rows():
    for entry in json_db:
        for key in "person", "preverb", "verb", "verb_translation", "type", "tense", "mood", "order", "subject", "object", "gloss":
            entry.setdefault(key, None)
        yield entry


with conn:
    conn.executemany(
        """
        INSERT INTO verb (text, preverb, verb, verb_translation, type, person, tense, mood, `order`, subject, object, gloss)
        VALUES (:text, :preverb, :verb, :verb_translation, :type, :person, :tense, :mood, :order, :subject, :object, :gloss);
        """,
        generate_rows(),
    )

os.system("sqlite3 -csv MichifVerb.sqlite3 '.header on' 'SELECT * FROM verb' > MichifVerb.csv")