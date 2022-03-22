# p5.gradient

> Fill shapes in p5.js with Linear, Radial and Conic Gradients.

---

### Linear Gradient

```js
gradient('linear', {
    from : [0, 0],   // x, y
    to : [400, 400], // x, y
    steps : [
        color(255),
        color(0, 96, 164),
        color(0)
    ]   // p5.color objects
});
```

### Radial Gradient

```js
gradient('radial', {
    from : [200, 200, 0], // x, y, radius
    to : [200, 200, 200], // x, y, radius
    steps : [
        color(255),
        color(0, 96, 164),
        color(0)
    ]   // p5.color objects
});
```

### Conic Gradient

```js
gradient('conic', {
    from : [200, 200, 0], // x, y, angle(degrees)
    steps : [
        color(255),
        color(0, 96, 164),
        color(0)
    ]   // p5.color objects
});
```

---

&mdash; [@alterebro](https://twitter.com/alterebro)
