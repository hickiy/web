import sys

if __name__ == "__main__":
  # sys.argv[0] 是脚本文件名，后面的都是命令行参数
  args = sys.argv
  for arg in args:
    print(arg)