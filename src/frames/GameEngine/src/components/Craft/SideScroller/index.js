// State variables
let [isJumping, setIsJumping] = useState(false);
let [velocity, setVelocity] = useState(0);

/*
  SideScroller
*/

class SideScroller extends MapScroller {
  // Pan the map quickly up then return to y origin
  jump() {
    console.log('Pan up and back down');
  }
}
