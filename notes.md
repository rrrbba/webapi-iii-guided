# Middleware Notes

#Jargon
- Seperation of Concerns (want a unit of my software to only do one thing and only one reason to change)

#We don't write code for the computer
- code is a communication device
- a way to reveal our intentions to the next developer

**EVERYTHING IS MIDDLEWARE**
...Well almost everything 

- Middleware is a pipeline/queue

# ORDER MATTERS
- Top to bottom, left to right

# Types of middleware

- built in (included with express however may not be active out the box) 
  (ex: `express.json()`)
- third party (must be installed from `npm`)
- custom (we code these)


# Types (based on how it's being used)
- Global Middleware- executes on every request on our api