/*
  Stage
*/

class Stage extends FixedCanvas2D {
  // Handle render
  onRender() {
    // Set color
    context.fillStyle = COLORS.GREEN;

    // Fill canvas
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (Player) {
      Player.onRender();
    }
  }
}
