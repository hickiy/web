add_one() {
  result=$(( $1 + 1 ))
  echo $result
}

echo $(add_one 1)