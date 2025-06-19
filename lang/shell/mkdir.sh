create_empty_file() {
  local dir_path="$1"
  local file_name="$2"
  mkdir -p "$dir_path" && touch "$dir_path/$file_name"
}

# 用法示例:
create_empty_file "E:\tmp\testdir" "myfile.txt"