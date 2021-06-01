# TODO's

## Awaiting

2. Add React Memo to each component. It is implemented in Button component
3. Bugs on design, responsive in timeline is not working
4. Response Modal on timeline after adding a new phrase
5. Bug when liking a phrase, the first element on the array is not changing the color
6. Change the dispatch from an object to an action function

## In Progress

3. Backend is returning 400 with no users on search
4. Missing add friend button functionality
5. Missing infinite loading on search bar
6. Bug on liking phrases and on the add friend button, somehow the state is not getting reactive, maybe getters doesn't work

## Done

1. Timeline Should be Lazy Loading with infinite loading. Missing pagination on backend
2. Use the addNewPhrase as a card, as first element, instead of a modal, like facebook do
3. Working on add new phrase modal
4. Timeline is not in correct order, should be from the oldest to the newest ones
5. Add new phrase response to the phrases array in redux
6. Backend returning duplicates on the timeline getPhrases
7. Working on search bar - need to implement a new redux to manipulate async connection to the server to get back the results
