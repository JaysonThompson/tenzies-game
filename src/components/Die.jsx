/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#fff",
  };
  return (
    <div
      className="die"
      key={props.id}
      id={props.id}
      isHeld={props.isHeld}
      onClick={() => props.holdDice(props.id)}
      style={styles}
    >
      {props.value}
    </div>
  );
}
