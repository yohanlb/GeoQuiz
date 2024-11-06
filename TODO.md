BUGS:

- On logout, redirect to /home i create a white page when doing it from results for example

CLEANUP:

- delete unused code (country history store)
- in quiz page, avoid fetching ALL user stats.
- check duplicate types UserStats and the one in the store

NEW FEATURES:

- delete account button
- deck and country guessed counter for auth users

FINISH MIGRATING TO COUNTRIES_STATS TABLE
shouldnt use countries_complete_view anymore
calculate the success rate FE side, dont store it in the db
