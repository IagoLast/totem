# Totem
Handle user movement in VR environment using [A-Frame](https://aframe.io/).

## What is totem?
Totem is a custon A-Frame component which allows users to move arround the scene by looking at them.

![](https://i.gyazo.com/53a3e96fe92c5f6b9ff3f9191afae300.gif)

Since it uses `<a-animation>` with a fixed duration, the movement speed is inversely proportional to the totem distance, allowing fine-grain movement when the user is close to the totem.

Slow Movement example:
![Slow movement example](https://i.gyazo.com/d8803a7a24aab1b8538fac55001c2c2f.gif)

Fast Movement example:
![Slow movement example](https://i.gyazo.com/556dfb563bcc854fdbcc34eca4b6ed59.gif)

## TODO
Totem won´t work with the current `A-frame`version because when you remove an animation, the animated property is set to the default value [see source.](https://github.com/aframevr/aframe/blob/master/src/core/a-animation.js#L246)

Im opening a issue to control this behaviour through a parameter.
```javascript
    // ...
    if (!tween) { return; }
    tween.stop();
    this.isRunning = false;
    // Totem works with this line commented.
    this.partialSetAttribute(this.initialValue);
    this.emit('animationstop');
    // ...
```