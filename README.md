### react-marquee-line

React Marquee Line is a react component that can be used for creating a horizontal-scrolling-board-like effect, or a vertically fade in and fade up effect.

### 🍾 Features

1. lower pressure on rendering engine
2. running item itself can be a React Element or a string
3. configurable running speed
4. configurable directions, vertical and horizontal

### 🏄🏻‍♀️Demo

coming soon... I promise.

### 🎢 How to use

#### Step 1. Installation

Using npm:

```bash
  npm install react-marquee-line
```

Using yarn:

```bash
  yarn add react-marquee-line
```

#### Step 2. Import `Marquee`

```javascript
import Marquee from 'react-marquee-line';
```

#### Step 3: Pass down your list, and other config that suit your need

1. using horizontal marquee

```javascript
  import Marquee from 'react-marquee-line'

  // create an react element that has onClick handler, sorry for the long name
  const someReactElemYouCanClick = <span>
      <a href="https://codesandbox.io">Click me </a> for more details
    </span>

  // set a list your want it to run
  const list = [
    'the 1st running item',
    someReactElemYouCanClick,
    'the 2rd running item'
  ]
  // pass the list to Marquee, you are good to go
  <Marquee list={list}/>
```

2. using vertical marquee

```javascript
  import Marquee from 'react-marquee-line'

  // create an react element that has onClick handler, sorry for the long name
  const someReactElemYouCanClick = <span>
      <a href="https://codesandbox.io">Click me </a> for more details
    </span>

  // set a list your want it to run
  const list = [
    'the 1st running item',
    someReactElemYouCanClick,
    'the 2rd running item'
  ]
  // pass the list to Marquee, and set `direction`, easy-peasy
  <Marquee list={list} direction='vertical'/>
```

### configurable properties for `<Marquee />`

| properties name | descriptionn                                                                                            | type   | default value | belongs to which direction |
| --------------- | ------------------------------------------------------------------------------------------------------- | ------ | ------------- | -------------------------- |
| list            | the list whose items you want them to run                                                               | Array  | []            | both                       |
| direction       | to specify which direction you want marquee to run, available values: 'horizontal', 'vertical'          | String | 'horizontal'  | both                       |
| lines           | vertical only, specify how many lines of item you want to show at one time                              | Number | 1             | vertical                   |
| gear            | horizontal only, the horizontal running speed control for marquee, available values are: 1, 1.5, 2, 2.5 | Number | 1.5           | horizontal                 |

### Want to overwrite styles of `<Marquee />` ?

Good chance you need this, and you should actually, 'cause the default styles for this `<Marquee />` is way too spartan.
To overwrite its styles, you can simply import a .css file that has your ideal styles after the import of `<Marquee />`.
As for the selectors specific for this `<Marquee />`, you can find them at the Elements Panel of dev tool; find those classname prefixed with 'react-marquee-line-'

### 📝TODO

1. add live demo
2. add validation for prop passed in
