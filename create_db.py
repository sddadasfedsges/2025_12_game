import sqlite3

#izveido db ja nav
conn = sqlite3.connect('rezultati.db')
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