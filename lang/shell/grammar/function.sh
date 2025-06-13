increment() {
  local input=$1
  echo $((input + 1))
}

echo "$(increment "$1")"