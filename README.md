# DAI Explorer

The following project is a [React](https://react.dev/) application that interacts with the [DAI](https://en.wikipedia.org/wiki/Dai_(cryptocurrency)) smart contract and displays the last `N` DAI transfers, including their transaction hash with [Etherscan](https://etherscan.io/) link, timestamp, transferred value, sender, and recipient.

The data is displayed in (responsive and mobile-friendly) tabular format and updated in real-time whenever there is a new event.

Transfers can be filtered by typing search terms into the appropriate fields, and sorted according to single or multiple criteria by clicking on column headers. Although both filtering and sorting fields are easily configurable, current filtering options include the sender and recipient, while the timestamp and value columns can be used for sorting, as per requirements.

The application is available live via [the following link](http://46.101.203.75:1389/).

Local setup and testing don't require anything unusual, but step-by-step instructions are provided at the bottom of the page nonetheless.

<br />

## Technologies Used
* React.js w/ TypeScript
* Create React App for project setup
* Redux w/ Redux Tookit
* Util libraries: ethers.js, ramda
* Infura API for communicating with Ethereum network
* Tailwind CSS for styling
* Code formatting and dev experience: ESlint, Prettier, Husky
* Jest and React Testing Library for testing

<br />

## Development Decisions

### Choosing Regular React over Next.js

I opted for Create React App instead of Next.js for a couple of reasons.

Since the data we're displaying is updated frequently, rendering the application server-side using Next.js wouldn't bring much benefit from the SEO perspective, but it would add unnecessary complexity.

One issue with client only approach though, is the fact that Infura API key is directly exposed. This could be mitigated by using NextJS and its API routes, for initial data fetching, at least.

However, since API routes are designed to be lightweight and stateless, and one of the key requirements of the project were real-time updates, creating some sort of persistent connection wouldn't make much sense, even though technically possible. This brings us back to square one and either having the API key on the client or integrating with some external messaging service, which is probably out of scope of this initial version.


### Perspective on More Production-Like Setup

Besides potentially being a more serious security issue, even without any bad actors involved, interacting with the blockchain directly from the client is wasteful in terms of Infura quota, as each user is requesting the same data.

In a more real-world scenario, I would probably go with some sort of separate backend solution. For example, we could have a Node/Express server which interacts with the blockchain and has simple in-memory caching or something like Redis. This way, we could push everything to the client through server-sent events or websockets.


### Retrieval of Historical Transaction Data
As far as I was able to figure out, neither Infura nor Alchemy provide a simple way of retrieving historical data for the last `N` ERC20 token transfers. So, in the solution I came up with, the app starts by fetching the data from the last `N` blocks, assuming that there was an average of at least one transfer per block. However, if number of transfers turns out to be less than `N`, we fetch additional blocks until we meet the target. While initializing the app, we also subscribe to new events, which are added to the application state as they arrive.

### State Management
As one of the project requirements was to have a state management library, I decided to go with Redux and Redux Toolkit, which are well-established and commonly used options nowadays.

While I could've got by with a custom-made solution using React context for this particular use case, incorporating Redux won't hurt, as in the real world, where app is planned to grow more complex, having proper state management from the beginning would be no-brainer.


### Test Coverage
Mainly for the purpose of giving a few examples, I have written a total of twenty-something unit tests, mostly for utility functions used throughout the app, and a couple for UI components, using React Testing Library. However, additional test coverage is recommended for further development.

<br />

## Running the Application Locally
To run the application, follow the steps below:

Clone the repository:
```
git clone https://github.com/ElGatoLoco/dai-explorer.git
```

Navigate to the project directory:
```
cd dai-explorer
```

Install dependencies:
```
yarn
```

Make sure you create `.env.` file, based on the provided `.env.example`

Start the development server:
```
yarn start
```

Open the application in a web browser at http://localhost:3000

<br />

## Testing
From the project directory run
```
yarn test
```
