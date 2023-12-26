# RENAME_ME



## ideas

- Always follow a specific ball.

- Always same pixel size/scale.  Bigger screens just show more.

- Spawn other balls.



## Handling loading infinitely.

- A tile system. We have a grid and we:
  1. Take the cell we're in
  2. Take the camera dimensions
  3. Determine how many cells around us we need to have.
  4. Populate cells, starting with big tiles, filling gaps with small tiles.



- I need a TileManager attached to the Scene.
  - The Scene calls update() on it every frame.
  - It controls adding/removing tiles.
  - It has a reference to the Scene.

- I need a BallManager that spawns balls outside the camera
  - So they've had time to settle into the tile rather than looking "fresh"

- The Scene spawns the main ball. The camera follows it.
  - Locked on, or a more elastic follow?


- I need a simple debugger to know the state of what tiles are loaded.



