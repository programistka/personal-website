---
slug: '/testing-redux-apps'
date: '2019-08-19'
title: 'Have Confidence in Your Redux Apps With Integration and Unit Testing'
# Description should be no more than 160 characters in length
description: 'React applications built with Redux should include both integration and unit tests for make sure your app runs with confidence.'
categories: ['react', 'testing']
banner: './images/banner.png'
---

import GithubButton from 'components/mdx/GithubButton';

![Testing Redux Apps With Integration and Unit Tests](./images/banner.png)

When testing a React app built with Redux it's important to test it using both unit and integration testing. This article will explain which parts of a Redux app should be integration tested, which parts should be unit tested, and why you should be using both testing approaches instead of just one.

## Example application

This article uses code from a simple example app I've built specifically for this article. The app allows you to fetch facts about random numbers and save those facts to a list. The app includes an API call to fetch the random facts in order to demonstrate how to mock API calls in tests.

<Video src="/redux-testing-demo-app" />
<span class="caption">Demo of the example app that will be referenced throughout the article.</span>

<GithubButton text="View the repo" link="https://github.com/robertcoopercode/redux-testing" />

### React Component

The app is made up of a single React component named `App`:

<!-- prettier-ignore -->
```jsx
const App = ({
  getRandomNumberFact,
  savedFacts,
  currentFact,
  isLoading,
  saveRandomNumberFact
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    saveRandomNumberFact();
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getRandomNumberFact}>Get new fact!</button>
        <form onSubmit={handleSubmit}>
          {isLoading && <p>Loading...</p>}
          {currentFact && (
            <>
              <p aria-label="Currently displayed random fact">{currentFact}</p>
              <button type="submit">
                Save that fact{" "}
                <span role="img" aria-label="thumbs-up">
                  👍🏼
                </span>
              </button>
            </>
          )}
        </form>
        <h3>Saved random number facts:</h3>
        <ul>
          {savedFacts.map(fact => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </header>
    </div>
  );
};
```

The `App` component is of course connected to Redux:

<!-- prettier-ignore -->
```js
const mapStateToProps = state => ({
  savedFacts: state.randomNumberFacts.savedFacts,
  currentFact: state.randomNumberFacts.currentFact,
  isLoading: state.randomNumberFacts.isLoading
});

const mapDispatchToProps = dispatch => ({
  getRandomNumberFact: () => dispatch(getRandomNumberFact()),
  saveRandomNumberFact: () => dispatch(saveRandomNumberFact())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
```

### Redux action creators

This app uses [redux-thunk](https://github.com/reduxjs/redux-thunk) to simplify the handling of asynchronous operations. If you're not familiar with redux-thunk, it's a middleware that allows you to write action creators that return a functions instead of action objects. This permits the delay of dispatching actions or conditional dispatching of actions based on conditions being met.

Here are the action creators used in the app:

<!-- prettier-ignore -->
```js
export function getRandomNumberFactStarted() {
  return { type: actionTypes.GET_RANDOM_NUMBER_FACT_STARTED };
}

export function getRandomNumberFactSuccess(randomNumberFact) {
  return { type: actionTypes.GET_RANDOM_NUMBER_FACT_SUCCESS, randomNumberFact };
}

export function getRandomNumberFactFailure(error) {
  return { type: actionTypes.GET_RANDOM_NUMBER_FACT_FAILURE, error };
}

// Thunk
export function saveRandomNumberFact() {
  return (dispatch, getState) =>
    dispatch({
      type: actionTypes.SAVE_RANDOM_NUMBER_FACT,
      fact: getState().randomNumberFacts.currentFact
    });
}

// Thunk
export function getRandomNumberFact() {
  return (dispatch) => {
    dispatch(getRandomNumberFactStarted());
    return axios
      .get(`http://numbersapi.com/random/math`)
      .then(res => {
        dispatch(getRandomNumberFactSuccess(res.data));
      })
      .catch(e => {
        console.error(e.message);
        dispatch(getRandomNumberFactFailure("Failed to load random error"));
      });
  };
}
```

Notice how the last two action creators are thunks because they both return functions. The `getRandomNumberFact` action creator is where the API call is made.

### Redux reducers

<!-- prettier-ignore -->
```js
function randomNumberFacts(
  state = {
    currentFact: "",
    savedFacts: [],
    isLoading: false,
    error: ""
  },
  action
) {
  switch (action.type) {
    case actionTypes.GET_RANDOM_NUMBER_FACT_STARTED:
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    case actionTypes.GET_RANDOM_NUMBER_FACT_SUCCESS:
      return {
        ...state,
        currentFact: action.randomNumberFact,
        savedFacts: [...state.savedFacts],
        isLoading: false
      };
    case actionTypes.GET_RANDOM_NUMBER_FACT_FAILURE:
      return {
        ...state,
        savedFacts: [...state.savedFacts],
        isLoading: false,
        error: action.error
      };
    case actionTypes.SAVE_RANDOM_NUMBER_FACT:
      return {
        ...state,
        currentFact: "",
        savedFacts: [...state.savedFacts, action.fact],
        isLoading: false
      };
    default:
      return state;
  }
}

const reducer = combineReducers({
  randomNumberFacts
});

export default reducer;
```

The application's Redux store has the following shape:

<!-- prettier-ignore -->
```ts
{
  randomNumberFacts: {
    currentFact: string,
    savedFacts: Array<string>,
    isLoading: boolean,
    error: string,
  }
}
```

## Integration testing

The idea behind integration testing a Redux app is to make sure that you're testing all the different parts of Redux connected together. This more closely mimics how the application is being used.

We will be using [_React Testing Library_](https://github.com/testing-library/react-testing-library) to test our `App` component which is connected to Redux. _React Testing Library_ deeply renders React components, which resembles how the component is actually rendered in an app. There are also many other advantages to using _React Testing Library_ for testing React components, which I've covered [in this article](https://www.robertcooper.me/testing-stateful-react-function-components-with-react-testing-library).

In our tests, we will be rendering the `App` component wrapped in a Redux Provider component where we can inject our own initial Redux store. Here's our custom render function we will be using to facilitate the rendering of the `App` component with an initial store:

<!-- prettier-ignore -->
```jsx
import { render as rtlRender } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers";
import thunk from "redux-thunk";

const render = (ui: any, initialStore = {}, options = {}) => {
  const store = createStore(rootReducer, initialStore, applyMiddleware(thunk));
  const Providers = ({ children }: any) => (
    <Provider store={store}>{children}</Provider>
  );

  return rtlRender(ui, { wrapper: Providers, ...options });
};
```

For the example application I want to have four test cases:

-   should display a random fact when clicking the generate button
-   should replace the current random fact with a new random fact
-   should save a random fact when clicking the save button
-   should be able to save multiple random facts

The above test cases will be tested by simulating DOM events (e.g. click events), mocking API return values, and making assertions on what gets displayed on the screen. It's important for the assertions to test actual DOM markup as that is what the end user will be seeing.

In these integration tests on connected Redux components, you should not be making assertions that check if particular actions have been dispatched or whether the Redux store updates with the correct values. What we are doing is firing DOM events which will trigger the Redux operations that need to happen, and then assert that the DOM has changed appropriately. This way of testing makes sure to test the complete flow of Redux operations, while avoiding to test implementation details.

It should be pointed out that we are mocking the `axios` module in our tests in order to mock API responses. Therefore, you'll see the following at the top of our test file:

<!-- prettier-ignore -->
```js
import axios from 'axios';
jest.mock('axios');
```

Now, let's visit each test case:

<!-- prettier-ignore -->
```jsx
it("should display a random fact when clicking the generate button", async () => {
  const randomFactText = "Random fact";
  axios.get.mockResolvedValue({ data: randomFactText });
  const { getByText, queryByText } = render(<App/>);

  expect(queryByText(/Save that fact/)).not.toBeInTheDocument();

  fireEvent.click(getByText(/Get new fact!/));

  expect(queryByText(/Loading.../)).toBeInTheDocument();

  await wait(() => {
    expect(queryByText(randomFactText)).toBeInTheDocument();
    expect(queryByText(/Save that fact/)).toBeInTheDocument();
  });
});
```

In this first test, we are firing a click event on the button that says "Get new fact", check that we are displaying our loading state, and then assert that the random fact shows up in the DOM. We need to use the `[wait](https://testing-library.com/docs/dom-testing-library/api-async#wait)` function in order to wait for the mocked API promise to resolve.

<!-- prettier-ignore -->
```js
it("should replace the current random fact with a new random fact", async () => {
  const firstRandomFactText = "First random fact";
  const secondRandomFactText = "Second random fact";

  const { getByText, queryByText } = render(<App/>);

  axios.get.mockResolvedValue({ data: firstRandomFactText });
  fireEvent.click(getByText(/Get new fact!/));

  await wait(() => {
    expect(queryByText(firstRandomFactText)).toBeInTheDocument();
  });

  axios.get.mockResolvedValue({ data: secondRandomFactText });
  fireEvent.click(getByText(/Get new fact!/));

  await wait(() => {
    expect(queryByText(secondRandomFactText)).toBeInTheDocument();
    expect(queryByText(firstRandomFactText)).not.toBeInTheDocument();
  });
});
```

In this second test, we are again firing a click event on the "Get new fact" button, but this time we are doing it twice in order to make sure that we replace the first random fact text with the text of the second random fact. Again, we've mocked API calls in this test.

<!-- prettier-ignore -->
```js
it("should save a random fact when clicking the save button", () => {
  const randomFactText = "Random fact";
  const { queryByLabelText, getByText, getByRole, queryByRole } = render(<App/>, {
    randomNumberFacts: aRandomNumberFacts({ currentFact: randomFactText })
  });

  expect(
    queryByLabelText(/Currently displayed random fact/)
  ).toBeInTheDocument();
  expect(queryByRole("listitem")).not.toBeInTheDocument();

  fireEvent.click(getByText(/Save that fact/));

  expect(
    queryByLabelText(/Currently displayed random fact/)
  ).not.toBeInTheDocument();
  expect(getByRole("listitem")).toHaveTextContent(randomFactText);
});
```

In this test, we render the component with an initial store that already contains a `currentFact`. This prevents us from having to re-write the operations that would populate the store with a value for `currentFact.` After rendering the component with an initialized store, we then fire a click event on the save button and then expect the fact to be part of the saved facts list.

<!-- prettier-ignore -->
```js
it("should be able to save multiple random facts", async () => {
  const firstRandomFactText = "First random fact";
  const secondRandomFactText = "Second random fact";
  const { queryByLabelText, getByText, getAllByRole, queryByRole } = render(<App/>, {
    randomNumberFacts: aRandomNumberFacts({ currentFact: firstRandomFactText })
  });

  expect(
    queryByLabelText(/Currently displayed random fact/)
  ).toBeInTheDocument();
  expect(queryByRole("listitem")).not.toBeInTheDocument();

  fireEvent.click(getByText(/Save that fact/));

  axios.get.mockResolvedValue({ data: secondRandomFactText });
  fireEvent.click(getByText(/Get new fact!/));

  await wait(() => {
    expect(getByText(/Save that fact/)).toBeInTheDocument();
  });

  fireEvent.click(getByText(/Save that fact/));

  expect(getAllByRole("listitem").length).toBe(2);
  getAllByRole("listitem").forEach((listItem, index) => {
    if (index === 0) {
      expect(listItem).toHaveTextContent(firstRandomFactText);
    }
    if (index === 1) {
      expect(listItem).toHaveTextContent(secondRandomFactText);
    }
  });
});
```

This last test again initializes a Redux store when rendering the component, saves the current fact (the one initialized in the store), gets another new fact by clicking the "Get new fact" button, and then checks that we have 2 saved facts that appear in the list in the DOM.

## Unit testing

When it comes to unit testing a Redux application, you'll want to unit test every part of the Redux logic in isolation. In our case, we will be testing our action creators (including thunks), and reducers.

> In this article we will be covering how to unit test action creators (including thunks), and reducers, but your Redux app might use other Redux-related libraries such as [reselect](https://github.com/reduxjs/reselect), [redux-saga](https://github.com/redux-saga/redux-saga), or [redux-observable](https://github.com/redux-observable/redux-observable) (to name a few). You should find ways to unit test any other Redux-related libraries you've included in your application.

### Testing action creators

Let's first take a look at the tests for our simple action creators (the ones that immediately return an action object):

<!-- prettier-ignore -->
```js
it("should create an action when a random fact fetch has started", () => {
  const expectedAction = {
    type: actionTypes.GET_RANDOM_NUMBER_FACT_STARTED
  };
  expect(actions.getRandomNumberFactStarted()).toEqual(expectedAction);
});

it("should create an action for a successful fetch of a random number fact", () => {
  const text = "random fact";
  const expectedAction = {
    type: actionTypes.GET_RANDOM_NUMBER_FACT_SUCCESS,
    randomNumberFact: text
  };
  expect(actions.getRandomNumberFactSuccess(text)).toEqual(expectedAction);
});

it("should create an action for a failed fetch of a random number fact", () => {
  const text = "failed to fetch random fact";
  const expectedAction = {
    type: actionTypes.GET_RANDOM_NUMBER_FACT_FAILURE,
    error: text
  };
  expect(actions.getRandomNumberFactFailure(text)).toEqual(expectedAction);
});
```

These are fairly straightforward tests. We are calling the action creators and the asserting that they return the action we expect.

Next, let's investigate how to test our thunks (action creators that return functions). In order to test thunks, we will be using `[redux-mock-store](https://github.com/dmitry-zaets/redux-mock-store)` in order to have a Redux store from which we can set an initial store value, dispatch actions, get a list of dispatched actions, and subscribe to store changes.

<!-- prettier-ignore -->
```js
it("should create an action for a saved random fact", () => {
  const text = "a random fact";

  const store = mockStore({ randomNumberFacts: { currentFact: text } });

  const expectedAction = {
    type: actionTypes.SAVE_RANDOM_NUMBER_FACT,
    fact: text
  };

  store.dispatch(actions.saveRandomNumberFact() as any);

  expect(store.getActions()).toEqual([expectedAction]);
});

it("should create an action to start the fetch of a random fact and another action to mark the success of the fetch", done => {
  const text = "a random fact";

  const store = mockStore({});
  axios.get.mockResolvedValue({ data: text });

  const expectedActions = [
    { type: actionTypes.GET_RANDOM_NUMBER_FACT_STARTED },
    { type: actionTypes.GET_RANDOM_NUMBER_FACT_SUCCESS, randomNumberFact: text }
  ];

  store.dispatch(actions.getRandomNumberFact() as any);

  store.subscribe(() => {
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});

it("should create an action to start the fetch of a random fact and another action to mark the failure of the fetch", done => {
  const store = mockStore({});
  axios.get.mockRejectedValue(new Error());

  const expectedActions = [
    { type: actionTypes.GET_RANDOM_NUMBER_FACT_STARTED },
    {
      type: actionTypes.GET_RANDOM_NUMBER_FACT_FAILURE,
      error: "Failed to load random error"
    }
  ];

  store.dispatch(actions.getRandomNumberFact() as any);

  store.subscribe(() => {
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});
```

The first test mocks a store with a value for a random fact, dispatches the `saveRandomNumberFact` action creator, and then asserts that the expected action object was dispatched.

The second and third test are testing that the appropriate actions are dispatched for the `getRandomNumberFact` action creator for the scenarios where the API resolves and rejects a value, respectively. You'll notice in both tests that we are mocking API responses, dispatching the `getRandomNumberFact` action creator, and then subscribing to the store in order to assert that the expected action has been dispatched.

### Testing reducers

Finally, we have the tests for our Redux reducers. Basically, we have a test condition that checks that the store is initialized as expected and then tests that check if each of the dispatched actions update the store as expected.

I won't show all the tests, but rather just the test for the store initialization and the tests for the handling of the `GET_RANDOM_NUMBER_FACT_STARTED` and `GET_RANDOM_NUMBER_FACT_SUCCESS` actions:

<!-- prettier-ignore -->
```js
import reducer from "./reducers";
import * as actionTypes from "./actionTypes";

it("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    randomNumberFacts: {
      currentFact: "",
      savedFacts: [],
      isLoading: false,
      error: ""
    }
  });
});

it("should handle GET_RANDOM_NUMBER_FACT_STARTED", () => {
  expect(
    reducer(undefined, {
      type: actionTypes.GET_RANDOM_NUMBER_FACT_STARTED
    })
  ).toEqual({
    randomNumberFacts: {
      currentFact: "",
      savedFacts: [],
      isLoading: true,
      error: ""
    }
  });
});

it("should handle GET_RANDOM_NUMBER_FACT_SUCCESS", () => {
  expect(
    reducer(undefined, {
      type: actionTypes.GET_RANDOM_NUMBER_FACT_SUCCESS,
      randomNumberFact: "a random fact"
    })
  ).toEqual({
    randomNumberFacts: {
      currentFact: "a random fact",
      savedFacts: [],
      isLoading: false,
      error: ""
    }
  });

  expect(
    reducer(
      {
        randomNumberFacts: {
          currentFact: "a random fact",
          savedFacts: [],
          isLoading: false,
          error: ""
        }
      },
      {
        type: actionTypes.GET_RANDOM_NUMBER_FACT_SUCCESS,
        randomNumberFact: "a new random fact"
      }
    )
  ).toEqual({
    randomNumberFacts: {
      currentFact: "a new random fact",
      savedFacts: [],
      isLoading: false,
      error: ""
    }
  });
});
```

Each of these tests are fairly straightforward since they are simply calls of the imported `reducer` function and then assertions on the returned value (which is the expected final state of the store after the `reducer` function has been called.

## Why use both unit and integration testing?

Although integration testing will give you the most confidence in the reliability of your app, you should not solely rely on integration testing. The reason is that unit testing allows you to more concisely test all possible edge cases compared to integration testing.

If we had to rely on integration testing for all the possible edges cases found along the way in our Redux operation (i.e. test for all the possible return values from an API call and test for all the different combinations of initial Redux stores), our test files would blow up in size and it would be cumbersome to maintain such a shear volume of integration tests. This is especially true for larger applications that have a lot of things going on in the Redux flow. In fact, I'd argue that if the Redux portion of your app isn't that big, then you probably should be [using simpler alternatives to Redux anyways](https://kentcdodds.com/blog/application-state-management-with-react).

## Additional considerations

You'll want to move a lot of your shared test logic into a common place, like a `test-utils` file. This file would contain things such as the custom render method that you use for rendering your React components in your tests.

Another thing to consider is to create helper functions that will build out mock API responses and mock Redux store states. You'll find yourself often needing to build out mocked objects and they can quickly because verbose to write if not using any sort of helper function.
