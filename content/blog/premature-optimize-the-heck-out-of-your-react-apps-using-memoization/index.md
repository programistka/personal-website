---
slug: '/premature-optimize-the-heck-out-of-your-react-apps-using-memoization'
date: '2019-07-22'
title: 'Premature Optimize the Heck Out of Your React Apps Using Memoization'
# Description should be no more than 160 characters in length
description: 'Optimize React applications using memoization techniques such as the useCallback and useMemo hooks along with the React.memo higher order component.'
categories: ['react', 'performance', 'javascript']
banner: './images/banner.png'
---

![Premature Optimize the Heck Out of Your React Apps Using Memoization](./images/banner.png)

This article will take a simple non-optimized React app and then incrementally improve the app's performance by using the [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback) and [`useMemo`](https://reactjs.org/docs/hooks-reference.html#usememo) hooks, along with the [`React.memo`](https://reactjs.org/docs/react-api.html#reactmemo) higher order component. All these techniques are based on the idea of memoization.

> _"Memoization is an optimization technique that speeds up applications by storing the results of expensive function calls and returning the cached result when the same inputs are supplied again."_ - [Scotch.io Article](https://scotch.io/tutorials/understanding-memoization-in-javascript)

The app we will be iterating on is a list of numbers and their corresponding square root values. A user is able to add and remove numbers to the list.

<Video src="/react-optimization-demo" />

The first version of the app includes no optimizations and is made up of 3 React components: `App`, `ListOfItems`, and `Item`. Here's a Code Sandbox demo of the non-optimized app:

<Sandbox src="https://codesandbox.io/embed/react-performance-1-hb07j?expanddevtools=1&hidenavigation=1&fontsize=14" title="React Performance (Initial)" />

### `<App />`

<!-- prettier-ignore -->
```jsx
const App = () => {
  console.log("Rendering <App />");

  const [items, setItems] = useState(initialState);
  const [newItem, setNewItem] = useState({ value: "", id: uuid() });

  const addItem = event => {
    event.preventDefault();
    if (newItem.value === "") return;
    setItems([...items, newItem]);
    setNewItem({ value: "", id: uuid() });
  };

  const handleRemove = id => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      <form onSubmit={addItem}>
        <input
          placeholder="New number"
          type="number"
          value={newItem.value}
          onChange={({ target: { value } }) =>
            setNewItem({ value, id: newItem.id })
          }
        />
        <input type="submit" value="Add" />
      </form>
      <ListOfItems items={items} onRemove={handleRemove} />
    </div>
  );
};
```

In the `App` component, we've got two values for state: one for the list of items and one for the new item that will be added to the list. We've also got two methods: a method to add and a method to remove an item from the list.

Notice how there is a `console.log` statement at the beginning of the component. This is to help track renders of the component. You'll see these `console.log` statements in the other components as well for the same reason.

### `<ListOfItems />`

<!-- prettier-ignore -->
```jsx
const ListOfItems = ({ items, onRemove }) => {
  console.log("Rendering <ListOfItems />");

  if (items === []) return null;

  return (
    <ul>
      {items.map(item => {
        return <Item {...item} key={item.id} onRemove={id => onRemove(id)} />;
      })}
    </ul>
  );
};
```

The `ListOfItems` component is a list that renders nothing if there are no items, or it renders a list of items if there are items present.

### `<Item />`

<!-- prettier-ignore -->
```jsx
const Item = ({ value, id, onRemove }) => {
  console.log("Rendering <Item />");

  const getFormattedItemText = () => {
    console.log(`getFormattedItemText called for number ${value}`);

    return `Square root of ${value} is ${squareRoot(value)}`;
  };

  return (
    <li>
      {getFormattedItemText()}
      <button onClick={() => onRemove(id)}>Remove</button>
    </li>
  );
};
```

Finally, the `Item` component renders text that calculates, describes, and displays the square root of the number passed into the component through props. There is also a _Remove_ button allowing the item to be removed from the list.

## Prevent `ListOfItems` from re-rendering on every input change

The first issue we run into is that when we start typing a number in the input element, the `ListOfItems` component re-renders every time the input value changes. This is because we aren't memoizing the `ListOfItems` component using `React.memo`. What the `React.memo` higher order component allows you to do is to wrap a component with `React.memo` and have the wrapper component re-render ONLY when the passed props have changed.

> **Note:** `React.memo` does a [shallow comparison](https://github.com/facebook/react/blob/master/packages/shared/shallowEqual.js) of the props, so if a different reference for a variable is passed in as a prop (which is often the case for arrays and objects), then the component will be re-rendered.

<Video src="/react-optimization-rerender-every-input-change" />

So let's solve this issue by wrapping our `ListOfItems` component with `React.memo`:

<!-- prettier-ignore -->
```jsx
const ListOfItems = React.memo(({ items, onRemove }) => { // highlight-line
  console.log("Rendering <ListOfItems />");

  if (items === []) return null;

  return (
    <ul>
      {items.map(item => {
        return <Item {...item} key={item.id} onRemove={id => onRemove(id)} />;
      })}
    </ul>
  );
}); // highlight-line
```

However, wrapping `ListOfItems` with `React.memo` is not all we need to do in order to prevent the unnecessary re-renders on every input change. Currently, `ListOfItems` receives the `onRemove` prop and on every render of the `App` component, the `handleRemove` method that gets passed down to `ListOfItems` is a newly assigned method. Therefore, since the `handleRemove` is always a new method on every render of `App`, the `ListOfItems` sees that the `onRemove` prop is a different value and therefore it re-renders.

Fortunately, we can solve this problem by using `useCallback`, which will allow us to memoize a function and return the memoized version of the function on every new render. Here's how we can memoize the `handleRemove` method that gets passed to the `onRemove` prop:

<!-- prettier-ignore -->
```jsx
const App = () => {
  console.log("Rendering <App />");

  const [items, setItems] = useState(initialState);
  const [newItem, setNewItem] = useState({ value: "", id: uuid() });

  const addItem = event => {
    event.preventDefault();
    if (newItem.value === "") return;
    setItems([...items, newItem]);
    setNewItem({ value: "", id: uuid() });
  };

  // highlight-range{1,3}
  const handleRemove = useCallback(id => {
    setItems(items.filter(item => item.id !== id));
  }, [items]);

  return (
    <div className="App">
      <form onSubmit={addItem}>
        <input
          placeholder="New number"
          type="number"
          value={newItem.value}
          onChange={({ target: { value } }) =>
            setNewItem({ value, id: newItem.id })
          }
        />
        <input type="submit" value="Add" />
      </form>
      <ListOfItems items={items} onRemove={handleRemove} />
    </div>
  );
};
```

Notice the array passed as the second argument to `useCallback`. The values in the array determine whether the `App` component needs to re-assign a new value to the memoized function. In this case, if the `items` state changes, then the memoized `handleRemove` method should be updated.

Now that we've memoized both the `ListOfItems` component and the `handleRemove` methods, we no longer re-render the list of items every time the input changes.

<Video src="/react-optimization-fixed-input-rerender" />

## Prevent every `Item` from re-rendering when a new item is added to the list

The next issue we run into is that every time we add a new item to the list, every list item re-renders itself.

<Video src="/react-optimization-rerender-every-item" />

Every list item shouldn't have to be re-rendered since they are all the same except for the newly added list item. The reason every list item is being re-rendered is because we aren't memoizing the `Item` component. Let's go ahead and memoize it with `React.memo`:

<!-- prettier-ignore -->
```jsx
const Item = memo(({ value, id, onRemove }) => { // highlight-line
  console.log("Rendering <Item />");

  const getFormattedItemText = () => {
    console.log(`getFormattedItemText called for number ${value}`);

    return `Square root of ${value} is ${squareRoot(value)}`;
  };

  return (
    <li>
      {getFormattedItemText()}
      <button onClick={() => onRemove(id)}>Remove</button>
    </li>
  );
}); // highlight-line
```

However, similarly to what occured with the `ListOfItems` component, the `Item` component will still re-render all list items when a new item is added. This is because the `onRemove` prop passed into the `Item` component is different on every render. We are currently passing an inline-arrow function as the value of the `onRemove` prop. Again, this can be resolved by memoizing the function passed to the `Item` component's `onRemove` prop using `useCallback`:

<!-- prettier-ignore -->
```jsx
const ListOfItems = memo(({ items, onRemove }) => {
  console.log("Rendering <ListOfItems />");

  if (items === []) return null;

  const handleRemove = useCallback(id => onRemove(id), [onRemove]);  // highlight-line

  return (
    <ul>
      {items.map(item => {
        return <Item {...item} key={item.id} onRemove={handleRemove} />; // highlight-line
      })}
    </ul>
  );
});
```

But wait a second...Every list item is still re-rendering when adding a new item to the list! Why is this happening? Well as you can see, the newly memoized `handleRemove` method in `ListOfItems` gets re-assigned whenever the `onRemove` prop changes value (notice `onRemove` is passed into the array of dependencies for the `useCallback` function). Also, whenever we add a new item to the list, that causes the `handleRemove` method to be re-assigned a new value in the `App` component, which means that the `onRemove` in `ListOfItems` has changed its value, which in turn causes the `handleRemove` method in `ListOfItems` to be re-assigned. All that to say that the `Item` component sees a different `onRemove` prop for every list item when a new item is added.

This can be fixed by modifying the `handleRemove` method in the `App` component so that it doesn't get re-assigned when we add a new item to the list:

<!-- prettier-ignore -->
```jsx
const App = () => {
  console.log("Rendering <App />");

  const [items, setItems] = useState(initialState);
  const [newItem, setNewItem] = useState({ value: "", id: uuid() });

  const addItem = event => {
    event.preventDefault();
    if (newItem.value === "") return;
    setItems([...items, newItem]);
    setNewItem({ value: "", id: uuid() });
  };
  // highlight-range{2-3}
  const handleRemove = useCallback(id => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  return (
    <div className="App">
      <form onSubmit={addItem}>
        <input
          placeholder="New number"
          type="number"
          value={newItem.value}
          onChange={({ target: { value } }) =>
            setNewItem({ value, id: newItem.id })
          }
        />
        <input type="submit" value="Add" />
      </form>
      <ListOfItems items={items} onRemove={handleRemove} />
    </div>
  );
};
```

Notice that we no longer pass any dependencies to the second argument of `useCallback` for the `handleRemove` method. Instead, we rely on [functional updates](https://reactjs.org/docs/hooks-reference.html#functional-updates), which allows us to pass a function to the state updater function. The function passed to the updater function allows you to access the previous value of state and return the updated value to set the state. In our case, instead of getting access to the `items` state from the scope of the `App` component, we can now access the value of the `items` state from within the scope of the `useCallback` function (which we've named `prevItems`). This allows us not to have any dependencies on the `useCallback` function and so the `handleRemove` method will always be memoized with the same value.

Now if you add an item to the list, you will see that none of the existing `Item` components are re-rendered and the new `Item` component gets rendered:

<Video src="/react-optimization-fixed-item-rerender" />

## Memoize "expensive" calculations

The last "improvement" I'm going to do is to memoize the method that returns the text describing the square root of the list item's number. To do this, we need to use `useMemo`:

<!-- prettier-ignore -->
```jsx
const Item = memo(({ value, id, onRemove }) => {
  console.log("Rendering <Item />");

  const formattedItemText = useMemo(() => { // highlight-line
    console.log(`getFormattedItemText called for number ${value}`);

    return `Square root of ${value} is ${squareRoot(value)}`;
  }, [value]); // highlight-line

  // highlight-range{3}
  return (
    <li>
      {formattedItemText}
      <button onClick={() => onRemove(id)}>Remove</button>
    </li>
  );
});
```

I call this an "improvement" (notice the quotation marks), because we currently don't gain any performance benefits from doing this. We would gain a performance benefit if either one of the following conditions were true:

1. The computations done inside of `useMemo` are complex and expensive in terms of computing power
2. The `Item` component re-renders with a the same `value` prop

However, in our case, the computations done in the `useMemo` are quite simple and there is no way for our item to re-render with the same `value` prop because of all the other performance improvements we've done. Therefore you could argue that this is a premature optimization.

## Final Result

Here's the Code Sandbox illustrating the final version of our app. It's blazingly fast 🚀.

<Sandbox src="https://codesandbox.io/embed/react-performance-final-0nv5v?expanddevtools=1&fontsize=14&hidenavigation=1" title="React Performance (Final)" />

## Premature optimization

I've titled this blog post "**Premature Optimize** the Heck Out of Your React Apps Using Memoization" for 3 reasons:

1. Click bait

2. To trigger people

3. It might not be in your best interest to memoize everything with `useCallback`, `useMemo`, and `React.memo`

Regarding the last point, I mention that it may not be the best idea to memoize everything that you can because I don't know the down sides to memoizing everything. If you need to store cached versions of all these functions and values, surely that will have to take a toll on the browser's memory at some point? For simple components where re-renders are very cheap to perform, it might be better to just let React re-render the component and not worry memoizing everything.

That being said, `useCallback`, `useMemo`, and `React.memo` are important tools that you should use to improve the performance of your React function components.

---

## Useful Resources

[Preventing list re-renders. Hooks version.](https://staleclosures.dev/preventing-list-rerenders/)

[Use React.memo() wisely](https://dmitripavlutin.com/use-react-memo-wisely/)

[Optimizing Performance (Official React Docs)](https://reactjs.org/docs/optimizing-performance.html)

---

Hit me up on [Twitter](https://twitter.com/RobertCooper_RC) if you have some more insights on memoizing things in React.
