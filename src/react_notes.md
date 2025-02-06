# React

### JSX

```jsx
const JSXExample = () => {
  const message = "Hello, JSX!";
  return <h1>{message}</h1>;
};
```

### Functional Component

```jsx
const FunctionalComponent = () => {
  return <h2>I am a Functional Component!</h2>;
};
export default FunctionalComponent;

export default JSXExample;
```

### Props

```jsx
const Greeting = ({ name }) => {
  return <h3>Hello, {name}!</h3>;
};
// Usage
<Greeting name="Jeff" />;
```

### State

```jsx
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;
```

### 4. Event Handling - onClick, onChange, and Synthetic Events

```jsx
const EventHandling = () => {
  const handleClick = () => alert("Button Clicked!");
  const handleChange = (event) =>
    console.log("Input Changed:", event.target.value);

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Type something..."
      />
    </div>
  );
};
export default EventHandling;
```

### 5. Conditional Rendering - &&, Ternary Operators, and Conditional Components

```jsx
Using &&
const ShowMessage = ({ show }) => {
  return <div>{show && <p>This message is visible!</p>}</div>;
};

Using a Ternary Operator
const UserStatus = ({ isLoggedIn }) => {
  return <h3>{isLoggedIn ? "Welcome back!" : "Please log in"}</h3>;
};

Conditonal Components
const AdminPanel = ({ isAdmin }) => {
  if (!isAdmin) {
    return <h3>Access Denied</h3>;
  }
  return <h3>Welcome to the Admin Panel</h3>;
};

```

### Lists & Keys - Handling Arrays with .map()

```jsx
const ListExample = () => {
  const items = ["Apple", "Banana", "Cherry"];

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li> // Always use a unique key!
      ))}
    </ul>
  );
};
export default ListExample;
```

### Example: Counter Component - State and passing setState into an onClick event

```jsx
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};

export default Counter;
```

### Example: Fetching Data from an API - using .then()

```jsx
import { useState, useEffect } from "react";

const FetchData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setData(json.slice(0, 5))); // Get first 5 posts
  }, []); // Empty dependency array means this runs only once after the component mounts

  return (
    <div>
      <h2>API Data:</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchData;
```

### Example: `useEffect` with Dependency - Runs After Re-Render - Updating Document Title Based on State Changes

```jsx
import { useState, useEffect } from "react";

const DocumentTitleUpdater = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]); // Runs after every re-render where `count` changes

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default DocumentTitleUpdater;
```

### useEffect with async/await & filter for results - isLoading

```javaScript
import React, { useState, useEffect } from "react";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=150"
        );
        if (!response.ok) {
          throw new Error("Network response not ok. ");
        }
        const result = await response.json();
        setPokemonList(result.results);
        setFilteredPokemonList(result.results);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  function handleSearch(event) {
    const searchValue = event.target.value.toLowerCase().trim();
    setSearchTerm(searchValue);
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().trim().includes(searchValue)
    );

    setFilteredPokemonList(filtered);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error:{error.message}</div>;
  }

  return (
    <>
      <h1>Pokemon</h1>
      <h3>Search</h3>
      <input
        type="text"
        placeholder="Search a Pokemon!"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredPokemonList.map((pokemon) => (
          <li>{pokemon.name}</li>
        ))}
      </ul>
    </>
  );
};

export default PokemonList;

```

# React Native

### ✅ Core Components Example: Using Core Components in React Native

```jsx
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";

const data = [
  { id: "1", name: "Lion" },
  { id: "2", name: "Elephant" },
  { id: "3", name: "Tiger" },
];

const App = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Animals</Text>
      <Image
        source={{ uri: "https://example.com/lion.jpg" }}
        style={styles.image}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 24, fontWeight: "bold" },
  image: { width: 200, height: 200, marginVertical: 10 },
  item: { fontSize: 18, marginVertical: 5 },
});

export default App;
```

### ✅ Navigation Example: Basic Navigation in React Native

```jsx
import React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const HomeScreen = ({ navigation }) => (
  <View>
    <Text>Home Screen</Text>
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate("Details")}
    />
  </View>
);

const DetailsScreen = () => (
  <View>
    <Text>Details Screen</Text>
  </View>
);

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
```

### ✅ Styling Example: Layout with Flexbox

```jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FlexBoxExample = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>Box 1</Text>
      </View>
      <View style={styles.box}>
        <Text>Box 2</Text>
      </View>
      <View style={styles.box}>
        <Text>Box 3</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 200,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FlexBoxExample;
```

### ✅ Handling Touch Events Example: Using `TouchableOpacity`

```jsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TouchableExample = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text>Count: {count}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: { backgroundColor: "blue", padding: 10, marginTop: 10 },
  buttonText: { color: "white", fontSize: 18 },
});
```

### ✅ Fetching Data Example: Fetching Data from API using useEffect & async await

```jsx
export default TouchableExample;

const FetchDataExample = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const json = await response.json();
        setData(json.slice(0, 10)); // Limit to first 10 items
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        keyExtractor={(item, index) => index.toString()} // To use the index as the key extractor
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

export default FetchDataExample;
```
