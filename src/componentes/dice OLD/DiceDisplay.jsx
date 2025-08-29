export default function DiceDisplay({dice}) {
  return (
    <>
      - [{dice[0]}] [{dice[1]}] You got a {dice[0] + dice[1]}! 
    </>
  )
}