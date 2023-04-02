[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10615221&assignment_repo_type=AssignmentRepo)

# Client Side Pagination

Let us suppose that you are building a Pokémon client app that would use our Pokémon API server to get the data.

The client app will fetch all the Pokémons and paginate the Pokémons to a user. For example, you may choose to display 10 Pokémons at a time and allow the user to navigate back and forth using `next` and `prev` buttons. Or even better, choose a page number.

This means that instead of displaying all 809 Pokémons, you could have 81 pages with each page showing 10 records.

Here’s what the app looks like with pagination.

![](https://cdn.discordapp.com/attachments/1017862173881544775/1040360698523418705/image.png)

# Additional Requirements

- Show only 10 pages at a time
- For each page, display the Pokémon in a responsive grid.
- Hide the `prev` and `next` buttons if you are at the first or last pages, respectively.
- Using CSS, highlight the selected page in the pagination controls.

# Challenges

- Cache the response in browser's `localStorage` so even if you close and reopen the browser, you don't have to fetch all the Pokémons again.

# To Read

- https://www.w3schools.com/REACT/react_events.asp

# Attended Class!
