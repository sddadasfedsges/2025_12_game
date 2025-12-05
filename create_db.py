import sqlite3

#izveido db ja nav
conn = sqlite3.connect('dati.db')
c = conn.cursor()

#izveido tabulu rezultātiem
c.execute('''
CREATE TABLE IF NOT EXISTS tops (
          id INTEGER PRIMARY KEY AUTOINCREAMENT,
          vards TEXT NOT NULL,
          klikski INTEGER NOT NULL,
          laiks INTEGER NOT NULL,
          datums TEXT NOT NULL
          )

''')

ieraksti = [
    ("Anonīmais", 200, 500, "2020-01-01"),
    ("Anonīmais", 200, 500, "2020-01-01"),
    ("Anonīmais", 200, 500, "2020-01-01"),
    ("Anonīmais", 200, 500, "2020-01-01"),
    ("Anonīmais", 200, 500, "2020-01-01"),
    ("Anonīmais", 200, 500, "2020-01-01"),
    ("Anonīmais", 200, 500, "2020-01-01"),
    ("Anonīmais", 200, 500, "2020-01-01"),
    ("Anonīmais", 200, 500, "2020-01-01"),
    ("Anonīmais", 200, 500, "2020-01-01"),
]

c.executemany('''
INSERT INTO rezultati (vards, klikski, laiks, datums)
VALUES (?, ?, ?, ?)
''', ieraksti)

#saglabā datus, aizver konekciju
conn.commit()
conn.close()