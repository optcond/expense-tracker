# expense-tracker

An implementation of the https://roadmap.sh/projects/expense-tracker

## Utility
The user can:
* Users can add an expense with a description and amount.
* Users can update an expense.
* Users can delete an expense.
* Users can view all expenses.
* Users can view a summary of all expenses.
* Users can view a summary of expenses for a specific month (of current year).

## Skills battle tested
* commander npm package
* uuid npm package
* repository pattern with generic JSON storage
* command pattern for each cli command

## Installation
```
yarn build
```
## Usage
```
yarn expense tracker [command]
# use for all available commands with description:
yarn expense tracker --help
```
## Examples
```
# Adding a new task
yarn expense-tracker add --description "Dinner" --amount 10
# Expense added successfully (ID: d9c83835-8a93-41de-9d5c-f871a1b77fab)
```
## Additional information
```
yarn test
```
unit tests
