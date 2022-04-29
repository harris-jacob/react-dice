# react-dice

<div align="center"><strong>Physics driven, 3D dice rolling in React 🎲</strong></div>
<div align="center"> Inspired by dndbeyond. Powered by <a href="https://github.com/pmndrs/react-three-fiber">react-three-fiber</a> and 
  <a href="https://github.com/pmndrs/use-cannon">use-cannon</a> </div>


## 🚧 Currently Under Contruction 🚧

Not at all in a working state right now. See current progress [here](https://harris-jacob.github.io/react-dice/)

## Useage

Eventual usage should look something like this:

```tsx

import { DiceProvider, useDice } from 'react-dice'

const App = (): React.FC => (
  <DiceProvider>
    {/* All other components */}
    <RollMe />
  </DiceProvider>
)

const RollMe = (): React.FC => {
  const roll = useDice(
    // specify which dice you're rolling (in this case 3d20s)
    {d20: 3},
    (result) => {
      // do something with result of roll
    },
    {
      // override config values
      shader: myShader,
      physics: myPhysics
    }
  )

  <button onClick={roll}>Roll Me!</button>
}
```

## TODO

A brain dump of what i'll be doing.

- **Hello world**

  - [x] Repo boilerplate and setup
  - [x] Basic proof of concept

- P1: **Make it work**

  - [ ] Figure out exact api (opinionated but a little bit configurable, physics, size, shaders etc)
  - [ ] Support all common dice: d4, d6, d8, d10, d12, d20, d100 (in a nice generic way)
  - [ ] Canvas, camera and bounding box should responsively adapt to screen size and changes
  - [ ] Publish first release

- P2: **Make it random (Lean on physics not animation)**

  - [ ] Randomise starting orientation
  - [ ] Randomise inital force vector (always directed towards center of screen?)
  - [ ] Noisify force magnitude (around some settable mean value)
  - [ ] Noisy inital torque (to further randomize collisions)

- P3: **Make it look cool**:
  - [ ] Add actual numbers to dice faces
  - [ ] Add some preset shaders/materials (wood, plastic, metal)
  - [ ] Add examples of custom shaders
