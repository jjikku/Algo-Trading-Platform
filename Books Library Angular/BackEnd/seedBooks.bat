@echo off
echo Seeding Books..
mongoimport --db BookStore --collection books --jsonArray --file books.json
:finish
pause
