### react-marquee-line

React Marquee Line is a react component for running item(s) of an array of any length automatically, infinitely within one line, with configurable gap, running speed, styles.

### 🍾 Features

1. lower pressure on rendering engine
2. no minimum cap on the length of array and its item(s)
3. running item itself can be React Element
4. configurable running speed
5. configurable and consistent gap between every two items
6. support marquee movement in 2 directions, both vertical and horizontal

### 🧐Component and its props

```react
  <Marquee
    list: [], // optional, item can be either plain text or React Element
    gear: 1, // optional, for speed control, available values are as following: 0.5, 1, 1.5, 2, 2.5
    viewBoxStyle: {width: '100%', top: 0, left: 0, backgrounColor: '#ccc'}, // optional, for override the default styling of the visible area of this marquee
    itemStyle: {color: 'red'}, // optional, for override the default styling of item(s)
  />
```

**default values of props:**

```javascript
Marquee.defaultProps = {
  list: [].
  gear: 1,
  viewBoxStyle: {
    width: '100%',
    height: '30px',
    color: '#000000',
    border: '1px solid #ccc'
  },
  itemStyle: {}
}
```

### 🎢How to use

#### 1. Installation

Using npm:

```bash
  npm install react-marquee-line
```

Using yarn:

```bash
  yarn add react-marquee-line
```

#### 2. Example

```javascript
  import Marquee from 'react-marquee-line'

  // prep for content of array to run
  const template = <span onClick={() => {console.log('clicked')}}>click me</span>
  const list = [
    'this is the first item',
    template
  ]

  <Marquee list={list} gear={1.5} viewBoxStyle={{border: "0px", backgroundColor: "rgba(0,0,0,0.7)"}} />
```

### 📝TODO

~~1. add support for vertically auto running~~✅

2. add hover-to-pause feature
3. update this readme.md for direction of vertical marquee
4. add live demo
