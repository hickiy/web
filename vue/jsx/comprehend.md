# 个人的理解

* 在vue中使用jsx不受使用语言影响，例如js、ts影响
* 在vue中使用jsx不受组件风格影响，例如class组件、sfc组件
* 核心在于正确配置jsx插件，jsx插件默认只处理后缀为jsx、tsx的文件
* 因此在使用jsx语法的class组件中将文件后缀声明为jsx或者tsx，或者在sfc中将script标签的lang属性声明为jsx或者tsx
* 在构建工具中正确的配置jsx插件，确保正确构建，否则会出现js执行异常或者构建工具编译异常